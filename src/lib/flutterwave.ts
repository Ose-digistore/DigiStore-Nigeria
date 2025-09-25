// Flutterwave payment integration
export interface FlutterwaveConfig {
  public_key: string;
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

export class FlutterwaveService {
  private publicKey: string;

  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  // Generate transaction reference
  generateTxRef(): string {
    return `DS-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  // Create payment configuration
  createPaymentConfig(
    amount: number,
    customerEmail: string,
    customerName: string,
    productName: string,
    onSuccess: (response: any) => void,
    onClose: () => void
  ): FlutterwaveConfig {
    return {
      public_key: this.publicKey,
      tx_ref: this.generateTxRef(),
      amount: amount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd,banktransfer',
      customer: {
        email: customerEmail,
        phone_number: '+2347025649112',
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

  // Verify payment
  async verifyPayment(transactionId: string): Promise<any> {
    try {
      // In a real application, this would be done on the backend
      console.log('Verifying payment:', transactionId);
      return { status: 'success', transaction_id: transactionId };
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }
}

// Initialize Flutterwave service
export const flutterwaveService = new FlutterwaveService(
  process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-b8b3c0d4c8f1e2a3d4e5f6g7h8i9j0k1-X'
);