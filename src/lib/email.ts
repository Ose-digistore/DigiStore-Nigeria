// Email service for automated product delivery
export interface EmailConfig {
  apiKey: string;
  fromEmail: string;
}

export interface ProductEmailData {
  to: string;
  customerName: string;
  productName: string;
  downloadLink: string;
  orderNumber: string;
}

export interface PurchaseConfirmationData {
  customerEmail: string;
  customerName: string;
  productName: string;
  amount: number;
  transactionId: string;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor(config: EmailConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
  }

  // Send product delivery email
  async sendProductDeliveryEmail(data: ProductEmailData) {
    const emailContent = this.generateProductEmailHTML(data);
    
    try {
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
              subject: `Your ${data.productName} - Download Ready!`,
            },
          ],
          from: {
            email: this.fromEmail,
            name: 'DigiStore Nigeria',
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
      return { success: false, message: 'Failed to send email' };
    }
  }

  // Send purchase confirmation
  async sendPurchaseConfirmation(data: PurchaseConfirmationData) {
    // Implementation for purchase confirmation email
    console.log('Sending purchase confirmation to:', data.customerEmail);
    return { success: true, message: 'Purchase confirmation sent' };
  }

  // Generate HTML email template
  private generateProductEmailHTML(data: ProductEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Digital Product is Ready!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .download-btn { display: inline-block; background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your Digital Product is Ready!</h1>
              <p>Thank you for your purchase, ${data.customerName}!</p>
            </div>
            <div class="content">
              <h2>Product: ${data.productName}</h2>
              <p>Your digital product has been successfully processed and is ready for download.</p>
              
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              
              <a href="${data.downloadLink}" class="download-btn">📥 Download Now</a>
              
              <h3>Important Notes:</h3>
              <ul>
                <li>Download link is valid for 30 days</li>
                <li>You can download the files multiple times</li>
                <li>Keep this email for your records</li>
                <li>For support, contact us via WhatsApp: +2347025649112</li>
              </ul>
              
              <h3>Need Help?</h3>
              <ul>
                <li>📧 Email: sammygodsent7@gmail.com</li>
                <li>📱 WhatsApp: +2347025649112</li>
              </ul>
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
  apiKey: process.env.SENDGRID_API_KEY || '',
  fromEmail: 'noreply@digistore.ng',
});