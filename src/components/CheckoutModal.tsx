import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Clock, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import FlutterwavePaymentModal from './FlutterwavePaymentModal';

interface Product {
  id: number;
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
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!customerData.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!customerData.email.trim() || !customerData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!customerData.phone.trim() || customerData.phone.length < 10) {
      toast.error('Please enter a valid phone number (minimum 10 digits)');
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Brief processing delay for better UX
    setTimeout(() => {
      setIsProcessing(false);
      setShowPayment(true);
    }, 1000);
  };

  const handlePaymentSuccess = async (response: any) => {
    try {
      console.log('Payment successful:', response);
      
      // Store order information in localStorage
      const orderData = {
        transactionId: response.transaction_id || response.tx_ref,
        productId: product.id,
        productName: product.name,
        amount: product.price,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        status: 'completed',
        createdAt: new Date().toISOString(),
        flwRef: response.flw_ref,
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('digistore_orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('digistore_orders', JSON.stringify(existingOrders));

      toast.success('🎉 Payment successful! Thank you for your purchase!');
      
      // Close modals and reset form
      setShowPayment(false);
      onClose();
      setCustomerData({ name: '', email: '', phone: '' });
      
      // Show success message with download instructions
      setTimeout(() => {
        toast.success('📧 Download instructions have been sent to your email!', {
          duration: 5000,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error processing successful payment:', error);
      toast.error('Payment successful but there was an issue processing your order. Please contact support.');
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    toast.error(error || 'Payment failed. Please try again.');
    setShowPayment(false);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleModalClose = () => {
    if (!showPayment) {
      onClose();
      setCustomerData({ name: '', email: '', phone: '' });
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showPayment} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Secure Checkout
            </DialogTitle>
            <DialogDescription>
              Complete your purchase safely and securely
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                  67% OFF
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Customer Information
              </h4>
              
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={customerData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={customerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., 08123456789"
                  value={customerData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Secure Payment Guarantee</span>
              </div>
              <div className="text-sm text-green-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Instant delivery after payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-3 w-3" />
                  <span>Download links valid for 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3" />
                  <span>Powered by Flutterwave - Bank-level security</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleModalClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToPayment} 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₦${product.price.toLocaleString()}`
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Flutterwave Payment Modal */}
      {showPayment && (
        <FlutterwavePaymentModal
          isOpen={showPayment}
          onClose={handleClosePayment}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          paymentData={{
            amount: product.price,
            email: customerData.email,
            phone: customerData.phone,
            name: customerData.name,
            title: product.name,
            description: product.description,
          }}
        />
      )}
    </>
  );
}