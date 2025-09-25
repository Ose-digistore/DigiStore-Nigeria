import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Gift } from 'lucide-react';

export default function MarketingBanner() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Zap className="h-6 w-6" />
            <Badge variant="secondary" className="bg-white text-green-600 font-bold">
              LIMITED TIME OFFER
            </Badge>
            <Zap className="h-6 w-6" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">
            Launch Special: All Courses ₦5,000 Only!
          </h2>
          
          <p className="text-lg mb-4 opacity-90">
            Regular price ₦15,000 - Save ₦10,000 on every course!
          </p>
          
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              <span>Bonus Materials</span>
            </div>
          </div>
          
          <div className="text-sm opacity-75">
            ⏰ Offer ends when Flutterwave verification completes - Don't miss out!
          </div>
        </div>
      </div>
    </div>
  );
}