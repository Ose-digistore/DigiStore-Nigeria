import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Clock, BookOpen, Shield } from 'lucide-react';
import { Product } from '@/data/products';
import { CurrencyConverter } from '@/lib/currencyConverter';

interface EnhancedProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAutoBuy: (product: Product) => void;
}

export default function EnhancedProductCard({ product, onProductClick, onAutoBuy }: EnhancedProductCardProps) {
  const [priceDisplay, setPriceDisplay] = useState(`₦${product.price.toLocaleString()}`);

  useEffect(() => {
    const updatePrice = async () => {
      try {
        const formattedPrice = await CurrencyConverter.formatPrice(product.price);
        setPriceDisplay(formattedPrice);
      } catch (error) {
        console.warn('Failed to update price display:', error);
      }
    };
    
    updatePrice();
  }, [product.price]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={getDifficultyColor(product.difficulty)}>
            {product.difficulty}
          </Badge>
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">Secure</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {product.name}
        </CardTitle>
        
        <CardDescription className="text-sm line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Course Details for Forex Courses */}
          {product.category === 'Forex Trading' && (
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {product.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{product.duration}</span>
                </div>
              )}
              {product.modules && (
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-3 w-3" />
                  <span>{product.modules} modules</span>
                </div>
              )}
            </div>
          )}
          
          {/* Key Features Preview */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700">Key Features:</p>
            <ul className="text-xs text-gray-600 space-y-0.5">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-blue-600 text-xs">+{product.features.length - 3} more features...</li>
              )}
            </ul>
          </div>
          
          {/* Price and Download Info */}
          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{product.downloadSize}</span>
            </div>
            <span>{product.format}</span>
          </div>
          
          {/* Price Display */}
          <div className="text-center py-2">
            <div className="text-2xl font-bold text-gray-900">{priceDisplay}</div>
            <div className="text-xs text-gray-500">Real-time conversion</div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={() => onAutoBuy(product)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              🚀 Auto Buy Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onProductClick(product)}
              className="w-full hover:bg-gray-50"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}