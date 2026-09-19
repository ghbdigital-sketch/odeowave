export default async function handler(req, res) {
  // Enable CORS if needed and handle preflight
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, space, site, brief } = req.body || {};

  if (!name && !contact) {
    return res.status(400).json({ error: 'Name or contact details are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'sunainamahesh1@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'OdeoWave Enquiries <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured in Vercel environment variables.');
    return res.status(500).json({
      error: 'RESEND_API_KEY is not configured yet. Please add it to your Vercel Environment Variables.'
    });
  }

  const cleanName = escapeHtml(name || 'Not provided');
  const cleanContact = escapeHtml(contact || 'Not provided');
  const cleanSpace = escapeHtml(space || 'Not specified');
  const cleanSite = escapeHtml(site || 'Not specified');
  const cleanBrief = escapeHtml(brief || 'None').replace(/\n/g, '<br>');

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="border-bottom: 2px solid #111; padding-bottom: 8px; margin-bottom: 16px;">New Project Enquiry — ODEOWAVE</h2>
      <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
        <tr style="background: #f9f9f9;">
          <td style="font-weight: bold; width: 140px; color: #555;">Name</td>
          <td>${cleanName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #555;">Contact</td>
          <td><b>${cleanContact}</b></td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="font-weight: bold; color: #555;">Space Type</td>
          <td>${cleanSpace}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #555;">City & Area</td>
          <td>${cleanSite}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="font-weight: bold; vertical-align: top; color: #555;">Project Brief</td>
          <td>${cleanBrief}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 12px;">
        Sent directly from your website form via Vercel Serverless & Resend.
      </p>
    </div>
  `;

  try {
    const isEmail = contact && contact.includes('@') && !contact.includes(' ');
    const emailPayload = {
      from: fromEmail,
      to: [toEmail],
      subject: `Project enquiry: ${name || 'New Client'} (${space || 'Space'})`,
      html: emailHtml
    };

    if (isEmail) {
      emailPayload.reply_to = contact.trim();
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API response error:', data);
      return res.status(response.status).json({
        error: data.message || 'Failed to send email via Resend'
      });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error sending email:', err);
    return res.status(500).json({ error: 'Internal server error while dispatching email.' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
