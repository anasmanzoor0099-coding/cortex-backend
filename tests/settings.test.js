import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile, changePassword } from '../controllers/userController.js';

const createMockRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
};

describe('User Settings & Token Revocation', () => {
  it('getProfile returns sanitized user without password hash', async () => {
    const req = {
      user: { _id: 'u1', name: 'Ada Lovelace', email: 'ada@test.dev', role: 'student', password: 'secret' },
    };
    const res = createMockRes();
    await getProfile(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepStrictEqual(res.body.user, {
      _id: 'u1',
      name: 'Ada Lovelace',
      email: 'ada@test.dev',
      role: 'student',
    });
    assert.equal(res.body.user.password, undefined);
  });

  it('updateProfile rejects empty, whitespace, and oversized names with 400', async () => {
    for (const badName of ['', '   ', 'A', 'X'.repeat(85)]) {
      const req = { user: { _id: 'u1' }, body: { name: badName } };
      const res = createMockRes();
      await updateProfile(req, res);
      assert.equal(res.statusCode, 400);
    }
  });

  it('updateProfile updates only req.user._id name and preserves email/role', async () => {
    const mockUserDoc = {
      _id: 'u1',
      name: 'Old Name',
      email: 'ada@test.dev',
      role: 'student',
      async save() { return this; },
    };
    const origFindById = User.findById;
    let queriedId = null;
    User.findById = async (id) => {
      queriedId = id;
      return mockUserDoc;
    };

    try {
      const req = {
        user: { _id: 'u1' },
        body: { _id: 'attacker_other_id', email: 'hacked@evil.dev', role: 'admin', name: '  Ada Byron  ' },
      };
      const res = createMockRes();
      await updateProfile(req, res);
      assert.equal(queriedId, 'u1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.user.name, 'Ada Byron');
      assert.equal(res.body.user.email, 'ada@test.dev');
      assert.equal(res.body.user.role, 'student');
    } finally {
      User.findById = origFindById;
    }
  });

  it('changePassword validates length, mismatch, same-password, and wrong current password', async () => {
    const hash = await bcrypt.hash('CurrentPass!1', 10);
    const mockUserDoc = {
      _id: 'u1',
      password: hash,
      tokenVersion: 0,
      async matchPassword(candidate) { return bcrypt.compare(candidate, this.password); },
      async save() {
        this.password = await bcrypt.hash(this.password, 10);
        return this;
      },
    };
    const origFindById = User.findById;
    User.findById = () => ({ select: async () => mockUserDoc });

    try {
      // Short password
      let res = createMockRes();
      await changePassword({ user: { _id: 'u1' }, body: { currentPassword: 'CurrentPass!1', newPassword: 'short', confirmPassword: 'short' } }, res);
      assert.equal(res.statusCode, 400);

      // Mismatch confirmation
      res = createMockRes();
      await changePassword({ user: { _id: 'u1' }, body: { currentPassword: 'CurrentPass!1', newPassword: 'NewStrong!123', confirmPassword: 'OtherStrong!123' } }, res);
      assert.equal(res.statusCode, 400);

      // Same as current password
      res = createMockRes();
      await changePassword({ user: { _id: 'u1' }, body: { currentPassword: 'CurrentPass!1', newPassword: 'CurrentPass!1', confirmPassword: 'CurrentPass!1' } }, res);
      assert.equal(res.statusCode, 400);

      // Wrong current password
      res = createMockRes();
      await changePassword({ user: { _id: 'u1' }, body: { currentPassword: 'WrongPass!99', newPassword: 'NewStrong!123', confirmPassword: 'NewStrong!123' } }, res);
      assert.equal(res.statusCode, 401);

      // Valid password change increments tokenVersion & hides password hash
      res = createMockRes();
      await changePassword({ user: { _id: 'u1' }, body: { currentPassword: 'CurrentPass!1', newPassword: 'NewStrong!123', confirmPassword: 'NewStrong!123' } }, res);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.requireRelogin, true);
      assert.equal(res.body.password, undefined);
      assert.equal(mockUserDoc.tokenVersion, 1);
      assert.equal(await bcrypt.compare('NewStrong!123', mockUserDoc.password), true);
      assert.equal(await bcrypt.compare('CurrentPass!1', mockUserDoc.password), false);
    } finally {
      User.findById = origFindById;
    }
  });

  it('protect rejects revoked JWTs when user.tokenVersion has incremented', async () => {
    const prevSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test_secret_key_for_settings';
    const origFindById = User.findById;
    User.findById = () => ({
      select: async () => ({ _id: 'u1', role: 'student', tokenVersion: 1 }),
    });

    try {
      const staleToken = jwt.sign({ id: 'u1', tokenVersion: 0 }, process.env.JWT_SECRET);
      const req = { headers: { authorization: `Bearer ${staleToken}` } };
      const res = createMockRes();
      let nextCalled = false;
      await protect(req, res, () => { nextCalled = true; });
      assert.equal(res.statusCode, 401);
      assert.equal(nextCalled, false);

      const freshToken = jwt.sign({ id: 'u1', tokenVersion: 1 }, process.env.JWT_SECRET);
      const req2 = { headers: { authorization: `Bearer ${freshToken}` } };
      const res2 = createMockRes();
      let next2 = false;
      await protect(req2, res2, () => { next2 = true; });
      assert.equal(next2, true);
    } finally {
      User.findById = origFindById;
      process.env.JWT_SECRET = prevSecret;
    }
  });
});
