import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from '@/components/ui/button';
import { flutterwaveService } from '@/lib/flutterwave';
import { toast } from 'sonner';

interface FlutterwavePaymentModalProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  productName: string;
  onSuccess: (response: any) => void;
  onClose: () => void;
}

export default function FlutterwavePaymentModal({
  amount,
  customerEmail,
  customerName,
  productName,
  onSuccess,
  onClose
}: FlutterwavePaymentModalProps) {
  
  const config = flutterwaveService.createPaymentConfig(
    amount,
    customerEmail,
    customerName,
    productName,
    (response) => {
      console.log('Payment response:', response);
      if (response.status === 'successful') {
        toast.success('Payment successful! Redirecting...');
        onSuccess(response);
      } else {
        toast.error('Payment failed. Please try again.');
      }
      closePaymentModal();
    },
    () => {
      toast.info('Payment cancelled');
      onClose();
    }
  );

  const handleFlutterPayment = useFlutterwave(config);

  const initiatePayment = () => {
    try {
      handleFlutterPayment({
        callback: (response) => {
          console.log('Flutterwave callback:', response);
          if (response.status === 'successful') {
            toast.success('Payment successful!');
            onSuccess(response);
          } else {
            toast.error('Payment was not completed');
          }
          closePaymentModal();
        },
        onClose: () => {
          toast.info('Payment window closed');
          onClose();
        },
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Payment initialization failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Complete Your Payment</h3>
        <p className="text-gray-600 mb-4">
          You're about to purchase: <strong>{productName}</strong>
        </p>
        <p className="text-2xl font-bold text-green-600 mb-4">
          ₦{amount.toLocaleString()}
        </p>
      </div>
      
      <Button 
        onClick={initiatePayment}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
        size="lg"
      >
        Pay with Flutterwave
      </Button>
      
      <div className="text-xs text-gray-500 text-center">
        <p>Secure payment powered by Flutterwave</p>
        <p>Supports: Cards, Bank Transfer, USSD, Mobile Money</p>
      </div>
    </div>
  );
}