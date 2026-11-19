import sendEmail from '../utils/sendEmail.js';
import { isValidEmail, normalizeEmail, validateString } from '../utils/validators.js';

const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// @desc    Submit contact form message
// @route   POST /api/contact
export const submitContactForm = async (req, res) => {
  try {
    const name = validateString(req.body.name, 2, 100);
    const email = normalizeEmail(req.body.email);
    const subject = validateString(req.body.subject || 'General Inquiry', 2, 150);
    const message = validateString(req.body.message, 10, 3000);

    if (!name) {
      return res.status(400).json({ message: 'Please enter your name (2–100 characters).' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (!message) {
      return res.status(400).json({ message: 'Message must be between 10 and 3000 characters.' });
    }

    const recipient = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;
    if (!recipient) {
      return res.status(503).json({ message: 'Contact email service is not configured.' });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #EAE6DF; border-radius: 12px;">
        <h2 style="color: #1C1C1C;">New Cortex Contact Message</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: none; border-top: 1px solid #EAE6DF; margin: 16px 0;" />
        <p style="white-space: pre-wrap; color: #333;">${escapeHtml(message)}</p>
      </div>
    `;

    await sendEmail({
      email: recipient,
      subject: `[Cortex Contact] ${subject}`,
      html,
    });

    return res.status(200).json({ message: 'Your message has been sent! We will get back to you soon.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
