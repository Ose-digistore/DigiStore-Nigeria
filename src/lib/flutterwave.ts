// Updated Flutterwave service with correct API parameters
export interface FlutterwaveConfig {
  public_key: string; // Updated from PBFPubKey
  tx_ref: string;
  amount: number;
  currency: string;
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
  callback: (response: any) => void;
  onClose: () => void;
}

export interface PaymentResponse {
  status: 'successful' | 'cancelled' | 'failed';
  transaction_id?: string;
  tx_ref?: string;
  flw_ref?: string;
  amount?: number;
  currency?: string;
  customer?: {
    email: string;
    name: string;
  };
}

class FlutterwaveService {
  private publicKey: string;

  constructor() {
    // Use correct environment variable names
    this.publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-b8d0c3c9d4e5f6a7b8c9d0e1f2a3b4c5-X';
  }

  // Generate transaction reference
  generateTxRef(): string {
    return `digistore-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create payment configuration with correct parameters
  createPaymentConfig(
    amount: number,
    customerEmail: string,
    customerName: string,
    customerPhone: string,
    productName: string,
    onSuccess: (response: any) => void,
    onClose: () => void
  ): FlutterwaveConfig {
    return {
      public_key: this.publicKey, // Correct parameter name
      tx_ref: this.generateTxRef(),
      amount: amount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd,banktransfer',
      customer: {
        email: customerEmail,
        phone_number: customerPhone,
        name: customerName,
      },
      customizations: {
        title: 'DigiStore Nigeria',
        description: `Payment for ${productName}`,
        logo: 'https://digi-store-nigeria.vercel.app/logo.svg',
      },
      callback: onSuccess,
      onClose: onClose,
    };
  }

  // Get public key
  getPublicKey(): string {
    return this.publicKey;
  }

  // Validate configuration
  isConfigValid(): boolean {
    return this.publicKey && !this.publicKey.includes('your_key_here');
  }
}

export const flutterwaveService = new FlutterwaveService();
export default flutterwaveService;