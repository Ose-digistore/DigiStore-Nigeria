// Paystack integration for Nigerian payments
export interface PaystackConfig {
  publicKey: string;
  secretKey: string;
}

export interface PaymentData {
  email: string;
  amount: number; // in kobo (₦1 = 100 kobo)
  reference: string;
  callback_url?: string;
  metadata?: {
    product_id: string;
    product_name: string;
    customer_name: string;
  };
}

export class PaystackService {
  private publicKey: string;
  private secretKey: string;

  constructor(config: PaystackConfig) {
    this.publicKey = config.publicKey;
    this.secretKey = config.secretKey;
  }

  // Initialize payment
  async initializePayment(data: PaymentData) {
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  // Verify payment
  async verifyPayment(reference: string) {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Paystack verification error:', error);
      throw error;
    }
  }

  // Generate payment reference
  generateReference(): string {
    return `DS_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Initialize Paystack with environment variables
export const paystack = new PaystackService({
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key',
  secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key',
});