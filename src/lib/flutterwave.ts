// Updated Flutterwave payment integration service for v3 API
export interface FlutterwaveConfig {
  publicKey: string;
  secretKey: string;
  environment: 'sandbox' | 'production';
}

export interface PaymentData {
  amount: number;
  currency: string;
  email: string;
  phone: string;
  name: string;
  title: string;
  description: string;
  logo: string;
  redirect_url: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

export interface PaymentResponse {
  status: 'successful' | 'cancelled' | 'failed';
  transaction_id?: string;
  tx_ref?: string;
  flw_ref?: string;
  amount?: number;
  currency?: string;
  charged_amount?: number;
  app_fee?: number;
  merchant_fee?: number;
  processor_response?: string;
  auth_model?: string;
  ip?: string;
  narration?: string;
  status_message?: string;
  validation_required?: boolean;
  account_id?: number;
  meta?: any;
}

class FlutterwaveService {
  private config: FlutterwaveConfig;

  constructor(config: FlutterwaveConfig) {
    this.config = config;
  }

  // Initialize payment using Flutterwave v3 API
  async initializePayment(data: PaymentData): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Updated payload structure for Flutterwave v3
      const paymentPayload = {
        tx_ref: `digistore-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: data.amount,
        currency: data.currency || 'NGN',
        redirect_url: data.redirect_url,
        payment_options: 'card,banktransfer,ussd',
        customer: data.customer,
        customizations: data.customizations,
        meta: {
          product_name: data.title,
          product_description: data.description,
        },
      };

      console.log('Initializing payment with payload:', paymentPayload);

      const response = await fetch('https://api.flutterwave.com/v3/payments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment initialization failed:', errorData);
        throw new Error(`Payment initialization failed: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Payment initialization successful:', result);

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error('Payment initialization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initialization failed',
      };
    }
  }

  // Verify payment using Flutterwave v3 API
  async verifyPayment(transactionId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      };
    }
  }

  // Get public key for frontend
  getPublicKey(): string {
    return this.config.publicKey;
  }

  // Generate unique transaction reference
  generateTxRef(): string {
    return `digistore-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validate public key format
  isValidPublicKey(): boolean {
    const key = this.config.publicKey;
    return key && (key.startsWith('FLWPUBK_TEST-') || key.startsWith('FLWPUBK-'));
  }
}

// Initialize Flutterwave service with correct API keys
const flutterwaveConfig: FlutterwaveConfig = {
  publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-b8d0c3c9d4e5f6a7b8c9d0e1f2a3b4c5-X',
  secretKey: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY || 'FLWSECK_TEST-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p-X',
  environment: 'sandbox', // Change to 'production' for live environment
};

export const flutterwaveService = new FlutterwaveService(flutterwaveConfig);

// Export for use in components
export default flutterwaveService;