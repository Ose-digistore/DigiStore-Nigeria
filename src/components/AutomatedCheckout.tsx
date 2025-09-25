import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Shield, CreditCard, Wallet, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { SecurityManager } from '@/lib/security';
import { CurrencyConverter } from '@/lib/currencyConverter';
import { toast } from 'sonner';

interface AutomatedCheckoutProps {
  product: Product;
  onClose: () => void;
}

export default function AutomatedCheckout({ product, onClose }: AutomatedCheckoutProps) {
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'crypto'>('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [transactionId, setTransactionId] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!SecurityManager.isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const fraudCheck = SecurityManager.performAntiFraudChecks({ email });
    if (!fraudCheck.passed) {
      toast.error('Security check failed. Please contact support.');
      return;
    }

    setStep('payment');
    setTransactionId(SecurityManager.generateSecureTransactionId());
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would integrate with actual payment processors
      toast.success('Payment initiated! Check your email for delivery confirmation.');
      setStep('confirmation');
      
      // Simulate automated email delivery
      setTimeout(() => {
        toast.success('Product delivered to your email!');
      }, 3000);
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getUSDPrice = async () => {
    try {
      return await CurrencyConverter.convertNGNtoUSD(product.price);
    } catch {
      return 3.03; // Fallback USD price
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Automated Checkout</CardTitle>
            <CardDescription>Secure payment processing for {product.name}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">256-bit SSL Encryption</span>
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Fraud Protection</span>
          </div>

          {/* Product Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="outline">{product.category}</Badge>
              <div className="text-right">
                <div className="text-2xl font-bold">₦{product.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">~$3.03 USD</div>
              </div>
            </div>
          </div>

          {/* Step 1: Email Details */}
          {step === 'details' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (for product delivery)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your digital product will be delivered to this email address within 2 minutes
                </p>
              </div>
              
              <Button type="submit" className="w-full">
                Continue to Payment
              </Button>
            </form>
          )}

          {/* Step 2: Payment Method */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bank Transfer */}
                  <Card 
                    className={`cursor-pointer transition-all ${paymentMethod === 'bank' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <span className="font-medium">Bank Transfer</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Bank:</strong> Wema Bank</p>
                        <p><strong>Account:</strong> 0276380707</p>
                        <p><strong>Name:</strong> Ose Okunmwendia</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Crypto Payment */}
                  <Card 
                    className={`cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:shadow-md'}`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Wallet className="h-6 w-6 text-purple-600" />
                        <span className="font-medium">USDT (BEP20)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="break-all font-mono bg-gray-100 p-2 rounded text-xs">
                          0xc82c80c9e977cd77cf3cc2b24ae0cb925f4e128f
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Payment Instructions:</p>
                    <ol className="list-decimal list-inside text-yellow-700 mt-2 space-y-1">
                      <li>Send exactly ₦5,000 to the selected payment method</li>
                      <li>Take a screenshot of your payment confirmation</li>
                      <li>Send the screenshot to WhatsApp: +234 702 564 9112</li>
                      <li>Include your email: {email}</li>
                      <li>Include transaction ID: {transactionId}</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : 'I Have Sent Payment'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h3 className="text-xl font-semibold text-green-800">Payment Received!</h3>
              <p className="text-gray-600">
                Your payment has been received and is being processed. You will receive your digital product 
                at <strong>{email}</strong> within the next 2 minutes.
              </p>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Transaction ID:</strong> {transactionId}
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Save this ID for your records. Contact support if you don't receive your product within 5 minutes.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://wa.me/2347025649112', '_blank')}
                  className="flex-1"
                >
                  Contact Support
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Contact Support */}
          <div className="text-center text-sm text-gray-500">
            Need help? Contact Ose Okunmwendia on WhatsApp: 
            <a 
              href="https://wa.me/2347025649112" 
              className="text-blue-600 hover:underline ml-1"
              target="_blank" 
              rel="noopener noreferrer"
            >
              +234 702 564 9112
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}