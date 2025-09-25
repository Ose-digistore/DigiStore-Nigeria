import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Mail, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentSuccessPageProps {
  transactionId: string;
  customerEmail: string;
  productTitle: string;
  amount: number;
}

export default function PaymentSuccessPage({ 
  transactionId, 
  customerEmail, 
  productTitle, 
  amount 
}: PaymentSuccessPageProps) {
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Simulate email sending process
    const timer = setTimeout(() => {
      setEmailSent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl text-green-600 mb-2">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-green-600">₦{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Delivery Status</h3>
            </div>
            
            {!emailSent ? (
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="h-4 w-4 animate-spin" />
                <span>Preparing your course materials...</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Course materials sent to your email!</span>
                </div>
                <p className="text-sm text-gray-600">
                  Check your inbox (and spam folder) for download links and access instructions.
                </p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="w-4 h-4 rounded-full p-0" />
                Check your email for download links
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="w-4 h-4 rounded-full p-0" />
                Download and save your course materials
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="w-4 h-4 rounded-full p-0" />
                Join our WhatsApp community for support
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="w-4 h-4 rounded-full p-0" />
                Start learning and implementing strategies
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Store
              </Button>
            </Link>
            
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://wa.me/2347025649112', '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Get Support
            </Button>
          </div>

          {/* Support Information */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Need help? Contact us:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="mailto:sammygodsent7@gmail.com" className="text-blue-600 hover:underline">
                Email Support
              </a>
              <a href="https://wa.me/2347025649112" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}