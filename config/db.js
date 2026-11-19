import dns from 'node:dns/promises';
import mongoose from 'mongoose';

let cached = globalThis.__cortexMongooseCache;
if (!cached) {
  cached = globalThis.__cortexMongooseCache = { conn: null, promise: null };
}

/**
 * Resolves SRV shard hosts directly when DNS TXT lookups time out for mongodb+srv:// URIs.
 * Returns null if the URI is not SRV or if SRV resolution itself fails.
 */
async function buildDirectSeedUri(srvUri) {
  const match = srvUri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)(\/[^?]*)?(\?.*)?$/);
  if (!match) return null;

  const [, creds, srvHost, dbPath = '/cortex', rawQuery = ''] = match;
  const srvRecords = await dns.resolveSrv(`_mongodb._tcp.${srvHost}`);
  if (!srvRecords || srvRecords.length === 0) return null;

  const hosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(',');
  const params = new URLSearchParams(rawQuery.replace(/^\?/, ''));
  if (!params.has('ssl') && !params.has('tls')) params.set('ssl', 'true');
  if (!params.has('authSource')) params.set('authSource', 'admin');
  if (!params.has('retryWrites')) params.set('retryWrites', 'true');
  if (!params.has('w')) params.set('w', 'majority');

  return `mongodb://${creds}@${hosts}${dbPath || '/cortex'}?${params.toString()}`;
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not configured.');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
      })
      .catch(async (error) => {
        const isSrvTxtTimeout =
          process.env.MONGO_URI.startsWith('mongodb+srv://') &&
          /queryTxt|ETIMEOUT|ESERVFAIL|ENOTFOUND/i.test(error.message || '');
        if (!isSrvTxtTimeout) {
          throw error;
        }
        const fallbackUri = await buildDirectSeedUri(process.env.MONGO_URI);
        if (!fallbackUri) {
          throw error;
        }
        return mongoose.connect(fallbackUri, { bufferCommands: false });
      })
      .then((mongooseInstance) => {
        console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
