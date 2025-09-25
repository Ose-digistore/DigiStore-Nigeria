import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, CreditCard, MessageCircle, Wallet, Copy } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const handlePurchase = () => {
    const message = `Hi! I want to purchase "${product.name}" for ₦5,000. Please provide payment confirmation details.`;
    const whatsappUrl = `https://wa.me/2347063807077?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {product.category}
            </Badge>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Price:</span>
              <span className="text-3xl font-bold text-primary">₦5,000</span>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Instant digital download</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Multiple secure payment options</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="bank" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              <TabsTrigger value="crypto">Crypto Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bank" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bank Transfer Details:
                </h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span><strong>Bank:</strong> Wema Bank</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span><strong>Account Name:</strong> Ose Okunmwendia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span><strong>Account Number:</strong> 0276380707</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("0276380707", "Account number")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span><strong>Amount:</strong> ₦5,000</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="crypto" className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  Crypto Payment (USDT BEP20):
                </h4>
                <div className="text-sm text-purple-800 space-y-2">
                  <div>
                    <span className="block mb-1"><strong>Network:</strong> Binance Smart Chain (BEP20)</span>
                    <span className="block mb-1"><strong>Token:</strong> USDT</span>
                    <span className="block mb-2"><strong>Amount:</strong> $13.50 USDT (≈ ₦5,000)</span>
                  </div>
                  <div>
                    <span className="block mb-1"><strong>Wallet Address:</strong></span>
                    <div className="flex items-center space-x-2 bg-purple-100 p-2 rounded">
                      <code className="text-xs break-all flex-1">
                        0xc82c80c9e977cd77cf3cc2b24ae0cb925f4e128f
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("0xc82c80c9e977cd77cf3cc2b24ae0cb925f4e128f", "Wallet address")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-purple-700 mt-3 bg-purple-100 p-2 rounded">
                  ⚠️ Important: Only send USDT on BEP20 network. Other tokens or networks may result in loss of funds.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">Next Steps:</h4>
            <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
              <li>Make payment using your preferred method above</li>
              <li>Take a screenshot of your payment confirmation</li>
              <li>Click the WhatsApp button below to send proof</li>
              <li>Receive your download link instantly!</li>
            </ol>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={handlePurchase} className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Payment Proof via WhatsApp
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}