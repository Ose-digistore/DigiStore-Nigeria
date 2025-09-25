// Email service for automated product delivery
export interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
}

export interface ProductEmailData {
  to: string;
  customerName: string;
  productName: string;
  productId: string;
  downloadLinks: string[];
  orderReference: string;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private fromName: string;

  constructor(config: EmailConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  // Send product delivery email
  async sendProductDeliveryEmail(data: ProductEmailData) {
    const emailContent = this.generateProductEmailHTML(data);

    try {
      // Using SendGrid API
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: data.to, name: data.customerName }],
              subject: `🚀 Your ${data.productName} is Ready for Download!`,
            },
          ],
          from: {
            email: this.fromEmail,
            name: this.fromName,
          },
          content: [
            {
              type: 'text/html',
              value: emailContent,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Email sending failed: ${response.statusText}`);
      }

      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }

  // Generate HTML email template
  private generateProductEmailHTML(data: ProductEmailData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your DigiStore Purchase</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .download-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
            .download-link { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🚀 DigiStore</div>
                <p>by Ose Okunmwendia</p>
                <h1>Thank You for Your Purchase!</h1>
            </div>
            
            <div class="content">
                <h2>Hi ${data.customerName},</h2>
                
                <p>🎉 <strong>Congratulations!</strong> Your purchase of <strong>"${data.productName}"</strong> has been successfully processed.</p>
                
                <div class="download-section">
                    <h3>📥 Download Your Product</h3>
                    <p>Your digital product is ready for immediate download. Click the link(s) below:</p>
                    
                    ${data.downloadLinks.map(link => 
                        `<a href="${link}" class="download-link">📥 Download Now</a><br>`
                    ).join('')}
                    
                    <p><strong>Order Reference:</strong> ${data.orderReference}</p>
                    <p><strong>Download Instructions:</strong></p>
                    <ul>
                        <li>Links are valid for 30 days from purchase date</li>
                        <li>Download limit: 5 times per link</li>
                        <li>For support, contact us via WhatsApp: +234 702 564 9112</li>
                    </ul>
                </div>
                
                <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>💡 Need Help?</h3>
                    <p>If you have any questions or need assistance:</p>
                    <ul>
                        <li>📧 Email: sammygodsent7@gmail.com</li>
                        <li>📱 WhatsApp: +234 702 564 9112</li>
                        <li>🌐 Visit: DigiStore by Ose Okunmwendia</li>
                    </ul>
                </div>
                
                <p>Thank you for choosing DigiStore - Nigeria's Most Trusted Digital Marketplace!</p>
                
                <p>Best regards,<br>
                <strong>Ose Okunmwendia</strong><br>
                Founder, DigiStore<br>
                Benin City, Nigeria</p>
            </div>
            
            <div class="footer">
                <p>© 2025 DigiStore by Ose Okunmwendia. All rights reserved.</p>
                <p>This email was sent because you made a purchase on our platform.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}

// Initialize email service
export const emailService = new EmailService({
  apiKey: process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key',
  fromEmail: 'noreply@digistore.ng',
  fromName: 'DigiStore by Ose Okunmwendia',
});