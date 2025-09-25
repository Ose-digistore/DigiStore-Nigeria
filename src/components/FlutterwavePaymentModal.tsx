import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { flutterwaveService, FlutterwavePaymentData } from '@/lib/flutterwave';
import { emailService } from '@/lib/email';
import { orderService, Order } from '@/lib/database';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  downloadUrl: string;
}

interface FlutterwavePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function FlutterwavePaymentModal({ isOpen, onClose, product }: FlutterwavePaymentModalProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'info' | 'processing' | 'success'>('info');
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!customerInfo.email.trim() || !customerInfo.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!product || !validateForm()) return;

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      const transactionRef = flutterwaveService.generateTransactionRef();
      
      const paymentData: FlutterwavePaymentData = {
        amount: product.price,
        currency: 'NGN',
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        name: customerInfo.name,
        tx_ref: transactionRef,
        redirect_url: `${window.location.origin}/payment-success`,
        payment_options: 'card,banktransfer,ussd,mobilemoney',
        customer: {
          email: customerInfo.email,
          phone_number: customerInfo.phone,
          name: customerInfo.name,
        },
        customizations: {
          title: 'DigiStore Nigeria',
          description: `Purchase: ${product.name}`,
          logo: `${window.location.origin}/logo.svg`,
        },
        meta: {
          product_id: product.id,
          product_name: product.name,
          customer_email: customerInfo.email,
        },
      };

      // Use demo payment for testing
      const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY?.startsWith('FLWPUBK_');
      
      let paymentResponse;
      if (isDemoMode) {
        // Demo mode - simulate successful payment
        paymentResponse = await flutterwaveService.initializeDemoPayment(paymentData);
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment verification
        const verificationResponse = await flutterwaveService.verifyDemoPayment(transactionRef);
        
        if (verificationResponse.status === 'success') {
          // Create order record
          const order = await orderService.createOrder({
            id: transactionRef,
            productId: product.id,
            productName: product.name,
            customerName: customerInfo.name,
            customerEmail: customerInfo.email,
            customerPhone: customerInfo.phone,
            amount: product.price,
            status: 'completed',
            paymentReference: transactionRef,
            downloadUrl: product.downloadUrl,
            createdAt: new Date().toISOString()
          });

          // Send confirmation email
          await emailService.sendPurchaseConfirmation({
            customerName: customerInfo.name,
            customerEmail: customerInfo.email,
            productName: product.name,
            downloadUrl: product.downloadUrl,
            orderReference: transactionRef,
            amount: product.price
          });

          setOrderDetails(order);
          setPaymentStep('success');
          toast.success('Payment successful! Check your email for download link.');
        }
      } else {
        // Real payment mode
        paymentResponse = await flutterwaveService.initializePayment(paymentData);
        
        if (paymentResponse.status === 'success') {
          // Redirect to Flutterwave payment page
          window.open(paymentResponse.data.link, '_blank');
          toast.success('Redirecting to payment page...');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initialization failed. Please try again.');
      setPaymentStep('info');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setCustomerInfo({ name: '', email: '', phone: '' });
    setPaymentStep('info');
    setOrderDetails(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {paymentStep === 'success' ? 'Payment Successful!' : 'Complete Your Purchase'}
          </DialogTitle>
        </DialogHeader>

        {paymentStep === 'info' && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₦{product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Secure payment powered by Flutterwave</span>
            </div>

            <Button 
              onClick={handlePayment} 
              className="w-full bg-green-600 hover:bg-green-700"
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
        )}

        {paymentStep === 'processing' && (
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
            <p className="text-gray-600">Please wait while we process your payment.</p>
          </div>
        )}

        {paymentStep === 'success' && orderDetails && (
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your purchase of <strong>{product.name}</strong> has been completed.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-green-800">
                <strong>Order Reference:</strong> {orderDetails.id}
              </p>
              <p className="text-sm text-green-800">
                Download link sent to: {customerInfo.email}
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}