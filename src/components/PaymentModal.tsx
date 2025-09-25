import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, CreditCard, Shield, Clock } from 'lucide-react';
import { Product } from '@/data/products';
import { paystack } from '@/lib/paystack';
import { emailService } from '@/lib/email';
import { orderManager } from '@/lib/database';

interface PaymentModalProps {
  product: Product;
  onClose: () => void;
}

export default function PaymentModal({ product, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Generate payment reference
      const reference = paystack.generateReference();
      
      // Create order in database
      const order = orderManager.createOrder({
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        productId: product.id,
        productName: product.name,
        amount: product.price * 100, // Convert to kobo
        reference: reference,
      });

      // Initialize Paystack payment
      const paymentData = {
        email: formData.email,
        amount: product.price * 100, // Amount in kobo
        reference: reference,
        callback_url: `${window.location.origin}/payment/callback`,
        metadata: {
          product_id: product.id,
          product_name: product.name,
          customer_name: `${formData.firstName} ${formData.lastName}`,
        },
      };

      const paymentResponse = await paystack.initializePayment(paymentData);

      if (paymentResponse.status && paymentResponse.data?.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = paymentResponse.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Payment initialization failed. Please try again.');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate successful payment for demo purposes
  const handleDemoPayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order
      const reference = paystack.generateReference();
      const order = orderManager.createOrder({
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        productId: product.id,
        productName: product.name,
        amount: product.price * 100,
        reference: reference,
      });

      // Update order status to completed
      orderManager.updateOrderStatus(order.id, 'completed', new Date());

      // Get product files
      const productFiles = orderManager.getProductFiles(product.id);
      const downloadLinks = productFiles.map(file => file.downloadUrl);

      // Send delivery email
      await emailService.sendProductDeliveryEmail({
        to: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        productName: product.name,
        productId: product.id,
        downloadLinks: downloadLinks,
        orderReference: reference,
      });

      setPaymentStatus('success');
    } catch (error) {
      console.error('Demo payment error:', error);
      setErrorMessage('Payment processing failed. Please try again.');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>
              Your purchase has been completed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              📧 Check your email for download instructions
            </p>
            <p className="text-sm text-gray-600">
              📱 WhatsApp support: +234 702 564 9112
            </p>
            <Button onClick={onClose} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Complete Your Purchase</CardTitle>
              <CardDescription>Secure payment with Paystack</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Product Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
            <div className="flex justify-between items-center">
              <Badge variant="outline">{product.category}</Badge>
              <div className="text-right">
                <div className="text-lg font-bold">₦{product.price.toLocaleString()}</div>
                <div className="text-xs text-gray-500">~$3.03 USD</div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Payment Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Instant delivery via email</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4 text-purple-600" />
              <span>Paystack secure payment</span>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              disabled={isProcessing || paymentStatus === 'processing'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isProcessing ? 'Processing...' : `Pay ₦${product.price.toLocaleString()}`}
            </Button>

            {/* Demo Payment Button */}
            <Button
              onClick={handleDemoPayment}
              disabled={isProcessing || paymentStatus === 'processing'}
              variant="outline"
              className="w-full border-dashed"
            >
              {isProcessing ? 'Processing Demo...' : '🧪 Demo Payment (Test)'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By completing this purchase, you agree to our terms of service.
            Digital products are delivered instantly via email.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}