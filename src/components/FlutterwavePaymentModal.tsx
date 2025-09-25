import React, { useEffect } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { toast } from 'sonner';

interface FlutterwavePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (response: any) => void;
  onError: (error: string) => void;
  paymentData: {
    amount: number;
    email: string;
    phone: string;
    name: string;
    title: string;
    description: string;
  };
}

export default function FlutterwavePaymentModal({
  isOpen,
  onClose,
  onSuccess,
  onError,
  paymentData,
}: FlutterwavePaymentModalProps) {
  
  // Flutterwave configuration with correct parameter names
  const config = {
    public_key: 'FLWPUBK_TEST-b8d0c3c9d4e5f6a7b8c9d0e1f2a3b4c5-X', // Updated parameter name
    tx_ref: `digistore-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    amount: paymentData.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    customer: {
      email: paymentData.email,
      phone_number: paymentData.phone,
      name: paymentData.name,
    },
    customizations: {
      title: 'DigiStore Nigeria',
      description: paymentData.description,
      logo: 'https://digi-store-nigeria.vercel.app/logo.svg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    if (isOpen && paymentData) {
      // Small delay to ensure modal is ready
      const timer = setTimeout(() => {
        initiatePayment();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, paymentData]);

  const initiatePayment = () => {
    try {
      handleFlutterPayment({
        callback: (response) => {
          console.log('Payment callback response:', response);
          closePaymentModal();
          
          if (response.status === 'successful') {
            toast.success('Payment successful!');
            onSuccess(response);
          } else if (response.status === 'cancelled') {
            toast.info('Payment was cancelled');
            onClose();
          } else {
            toast.error('Payment failed. Please try again.');
            onError('Payment failed');
          }
        },
        onClose: () => {
          console.log('Payment modal closed by user');
          onClose();
        },
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initialize payment. Please try again.');
      onError('Payment initialization failed');
    }
  };

  return null; // This component doesn't render anything visible
}