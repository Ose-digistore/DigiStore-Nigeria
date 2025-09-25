// Flutterwave payment integration for DigiStore Nigeria
export interface FlutterwavePaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number: string;
  name: string;
  tx_ref: string;
  redirect_url: string;
  payment_options: string;
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
  meta: {
    product_id: string;
    product_name: string;
    customer_email: string;
  };
}

export interface FlutterwaveResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

export interface FlutterwaveVerificationResponse {
  status: string;
  message: string;
  data: {
    id: string;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    status: string;
    customer: {
      email: string;
      name: string;
    };
  };
}

class FlutterwaveService {
  private publicKey: string;
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-a77cc7c714b014a0d9b346149c0e5f8e-X';
    this.secretKey = import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY || 'FLWSECK-bab713c3f3c3295ecf1fde8d81683a17-19982578449vt-X';
    this.baseUrl = 'https://api.flutterwave.com/v3';
  }

  async initializePayment(paymentData: FlutterwavePaymentData): Promise<FlutterwaveResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`Payment initialization failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Flutterwave payment initialization error:', error);
      throw error;
    }
  }

  async verifyPayment(transactionId: string): Promise<FlutterwaveVerificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/${transactionId}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Flutterwave payment verification error:', error);
      throw error;
    }
  }

  generateTransactionRef(): string {
    return `DS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Demo mode for testing without real payments
  async initializeDemoPayment(paymentData: FlutterwavePaymentData): Promise<FlutterwaveResponse> {
    console.log('Demo payment initialized:', paymentData);
    
    // Simulate successful payment initialization
    return {
      status: 'success',
      message: 'Payment link generated successfully',
      data: {
        link: `https://checkout.flutterwave.com/demo/${paymentData.tx_ref}`
      }
    };
  }

  async verifyDemoPayment(transactionId: string): Promise<FlutterwaveVerificationResponse> {
    console.log('Demo payment verified:', transactionId);
    
    // Simulate successful payment verification
    return {
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        id: transactionId,
        tx_ref: transactionId,
        flw_ref: `FLW_${transactionId}`,
        amount: 5000,
        currency: 'NGN',
        status: 'successful',
        customer: {
          email: 'customer@example.com',
          name: 'Demo Customer'
        }
      }
    };
  }
}

// Export the service instance
export const flutterwaveService = new FlutterwaveService();