/**
 * Netlify function: sends website enquiries via SendGrid.
 *
 * Configure in Netlify → Site configuration → Environment variables
 * (then redeploy so the function picks up changes):
 *   SENDGRID_API_KEY     required  SendGrid API key with "Mail Send" permission
 *   ENQUIRY_TO_EMAIL     optional  where enquiries go (default: sales@cnergmind.com)
 *   ENQUIRY_FROM_EMAIL   optional  sender; must be verified in SendGrid (default: noreply@cnergmind.com)
 */
const sgMail = require('@sendgrid/mail');

const TO_EMAIL = (process.env.ENQUIRY_TO_EMAIL || 'sales@cnergmind.com').trim();
const FROM_EMAIL = (process.env.ENQUIRY_FROM_EMAIL || 'noreply@cnergmind.com').trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, phone: 40, company: 160, projectType: 120, area: 20, timeline: 60, message: 5000 };

const json = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
});

// Escape visitor input so it can't inject links or markup into the sales email.
const esc = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const clean = (value, max) => String(value == null ? '' : value).trim().slice(0, max);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return json(405, { message: 'Method not allowed' });
    }

    if (!process.env.SENDGRID_API_KEY) {
        console.error('SENDGRID_API_KEY is not set in Netlify environment variables');
        return json(500, { message: 'Email service is not configured' });
    }

    let raw;
    try {
        raw = JSON.parse(event.body || '{}');
    } catch (_) {
        return json(400, { message: 'Invalid request' });
    }

    // Honeypot: real visitors never see or fill the "website" field; bots usually do.
    if (raw.website) {
        return json(200, { message: 'Enquiry received' });
    }

    const d = {};
    for (const key of Object.keys(LIMITS)) d[key] = clean(raw[key], LIMITS[key]);

    if (!d.name || !d.email || !d.phone || !d.message) {
        return json(400, { message: 'Please fill in all required fields' });
    }
    if (!EMAIL_RE.test(d.email)) {
        return json(400, { message: 'Please enter a valid email address' });
    }

    const submitted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
    const row = (label, value) => `
        <tr>
            <td style="padding:8px 12px 8px 0;font-weight:600;color:#262B5E;width:150px;vertical-align:top;">${label}</td>
            <td style="padding:8px 0;">${value || '<span style="color:#999;">Not provided</span>'}</td>
        </tr>`;
    const phoneHref = d.phone.replace(/[^0-9+]/g, '');

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#2C2F3A;max-width:620px;">
        <div style="background:#262B5E;padding:20px 24px;border-radius:8px 8px 0 0;color:#fff;border-bottom:4px solid #EF7D1E;">
            <h2 style="margin:0;font-size:20px;">New website enquiry</h2>
            <p style="margin:4px 0 0;opacity:.85;font-size:14px;">CNERG Mind Steel Structure Pvt. Ltd.</p>
        </div>
        <div style="background:#F7F8FA;padding:20px 24px;border:1px solid #E0E3EA;border-top:none;">
            <h3 style="color:#262B5E;margin:0 0 8px;font-size:16px;">Contact</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
                ${row('Name', esc(d.name))}
                ${row('Email', `<a href="mailto:${esc(d.email)}" style="color:#D86A0E;">${esc(d.email)}</a>`)}
                ${row('Phone', `<a href="tel:${esc(phoneHref)}" style="color:#D86A0E;">${esc(d.phone)}</a>`)}
                ${row('Company', esc(d.company))}
            </table>
            <h3 style="color:#262B5E;margin:20px 0 8px;font-size:16px;">Project</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
                ${row('Project type', esc(d.projectType))}
                ${row('Estimated area', d.area ? `${esc(d.area)} sq. ft.` : '')}
                ${row('Timeline', esc(d.timeline))}
            </table>
            <h3 style="color:#262B5E;margin:20px 0 8px;font-size:16px;">Project details</h3>
            <div style="background:#fff;padding:12px 14px;border-left:4px solid #EF7D1E;border-radius:4px;font-size:14px;white-space:pre-wrap;">${esc(d.message)}</div>
            <p style="margin:20px 0 0;font-size:12px;color:#888;">Submitted ${esc(submitted)} IST via cnergmind.com. Reply to this email to respond directly to ${esc(d.name)}.</p>
        </div>
    </div>`;

    const text = [
        'New website enquiry - CNERG Mind',
        '',
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Phone: ${d.phone}`,
        `Company: ${d.company || '-'}`,
        `Project type: ${d.projectType || '-'}`,
        `Estimated area: ${d.area ? d.area + ' sq. ft.' : '-'}`,
        `Timeline: ${d.timeline || '-'}`,
        '',
        'Project details:',
        d.message,
        '',
        `Submitted ${submitted} IST`
    ].join('\n');

    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
            to: TO_EMAIL,
            from: { email: FROM_EMAIL, name: 'CNERG Mind Website' },
            replyTo: { email: d.email, name: d.name },
            subject: `New enquiry from ${d.name.replace(/[\r\n]+/g, ' ')}${d.company ? ' (' + d.company.replace(/[\r\n]+/g, ' ') + ')' : ''}`,
            text,
            html
        });
        return json(200, { message: 'Enquiry sent' });
    } catch (error) {
        // Full detail goes to Netlify function logs only, never to the visitor.
        console.error('SendGrid error:', error.code, JSON.stringify(error.response && error.response.body));
        return json(502, { message: 'Could not send enquiry' });
    }
};
