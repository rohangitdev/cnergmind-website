const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
    }

    try {
        const data = JSON.parse(event.body);

        if (!data.name || !data.email || !data.message) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields' }) };
        }

        const emailHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
                <div style="background: linear-gradient(135deg, #1A3A6B 0%, #FF8C00 100%); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
                    <h2 style="margin: 0;">New Enquiry Received</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">CNERG Mind Steel Structures</p>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
                    <h3 style="color: #1A3A6B; margin-top: 0;">Client Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B; width: 150px;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #FF8C00;">${data.email}</a></td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #FF8C00;">${data.phone}</a></td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>
                    </table>
                    <h3 style="color: #1A3A6B; margin-top: 20px;">Project Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B; width: 150px;">Project Type:</td><td style="padding: 8px 0;">${data.projectType}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B;">Area of Interest:</td><td style="padding: 8px 0;">${data.area}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #1A3A6B;">Timeline:</td><td style="padding: 8px 0;">${data.timeline}</td></tr>
                    </table>
                    <h3 style="color: #1A3A6B; margin-top: 20px;">Message</h3>
                    <div style="background: white; padding: 12px; border-left: 4px solid #FF8C00; border-radius: 4px; margin: 10px 0;">
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <div style="text-align: center; font-size: 12px; color: #999;">
                        <p style="margin: 5px 0;"><strong>Submitted:</strong> ${data.timestamp}<br><strong>Source:</strong> CNERG Mind Website</p>
                    </div>
                </div>
                <div style="background: #1A3A6B; padding: 15px 20px; border-radius: 0 0 8px 8px; color: white; font-size: 12px; text-align: center;">
                    <p style="margin: 0;">© 2026 CNERG MIND STEEL STRUCTURE PVT. LTD. | Enduring Strength, Creating Landmarks</p>
                </div>
            </div>
        `;

        await sgMail.send({
            to: 'sales@cnergmind.com',
            from: 'noreply@cnergmind.com',
            subject: `New Enquiry from ${data.name} - CNERG Mind`,
            html: emailHtml,
            replyTo: data.email
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Enquiry email sent successfully', timestamp: new Date().toISOString() })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send enquiry email', error: error.message })
        };
    }
};
