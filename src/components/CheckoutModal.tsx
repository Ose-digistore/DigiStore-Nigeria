import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Download, Star } from 'lucide-react';
import FlutterwavePaymentModal from './FlutterwavePaymentModal';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  downloadUrl: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [showPayment, setShowPayment] = useState(false);

  if (!product) return null;

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleCloseAll = () => {
    setShowPayment(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPayment} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Product Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Info */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">One-time payment</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll Get:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Instant access to high-quality digital content</li>
                <li>• Downloadable files delivered to your email</li>
                <li>• Lifetime access - download anytime</li>
                <li>• Premium content worth much more</li>
              </ul>
            </div>

            {/* Payment Security */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Secure Payment:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Powered by Flutterwave (trusted by millions)</li>
                <li>• Bank-level security encryption</li>
                <li>• Multiple payment options available</li>
                <li>• Instant confirmation and delivery</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToPayment}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FlutterwavePaymentModal
        isOpen={showPayment}
        onClose={handleCloseAll}
        product={product}
      />
    </>
  );
}