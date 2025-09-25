import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, CreditCard, Shield } from 'lucide-react';
import FlutterwavePaymentModal from './FlutterwavePaymentModal';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProceedToPayment = () => {
    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = async (response: any) => {
    setIsProcessing(true);
    
    try {
      console.log('Payment successful:', response);
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Check your email for download instructions.');
      
      // Redirect to success page or close modal
      setTimeout(() => {
        onClose();
        setIsProcessing(false);
        setShowPayment(false);
        setCustomerInfo({ name: '', email: '', phone: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Order processing failed:', error);
      toast.error('Payment successful but order processing failed. Please contact support.');
      setIsProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const handleModalClose = () => {
    if (!isProcessing) {
      onClose();
      setShowPayment(false);
      setCustomerInfo({ name: '', email: '', phone: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Checkout</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleModalClose}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {isProcessing ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
            <p className="text-gray-600">Please don't close this window</p>
          </div>
        ) : !showPayment ? (
          <div className="space-y-6">
            {/* Product Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  ₦{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">₦15,000</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Your Information
              </h4>
              
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Proceed Button */}
            <Button 
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>

            <div className="text-xs text-gray-500 text-center">
              <p>🔒 Your information is secure and encrypted</p>
              <p>📧 Download link will be sent to your email instantly</p>
            </div>
          </div>
        ) : (
          <FlutterwavePaymentModal
            amount={product.price}
            customerEmail={customerInfo.email}
            customerName={customerInfo.name}
            productName={product.name}
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}