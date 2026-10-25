import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter using your Google Account
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Your 16-digit App Password
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"Cortex Academy" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html, // We use HTML to make it look professional
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;