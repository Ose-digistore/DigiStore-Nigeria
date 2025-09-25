import { Shield, Lock, CheckCircle, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SecurityBadge() {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Live Rates</span>
          </div>
        </div>
        <p className="text-center text-xs text-green-700 mt-2">
          Your data is protected with bank-level security. Real-time currency conversion.
        </p>
      </CardContent>
    </Card>
  );
}