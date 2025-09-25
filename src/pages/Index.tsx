import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Users, Award, BookOpen, Menu, X } from 'lucide-react';
import { products } from '@/data/products';
import CheckoutModal from '@/components/CheckoutModal';
import CourseCategories from '@/components/CourseCategories';
import Testimonials from '@/components/Testimonials';
import MarketingBanner from '@/components/MarketingBanner';
import { Link } from 'react-router-dom';

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.name.toLowerCase().includes(selectedCategory) ||
        product.description.toLowerCase().includes(selectedCategory)
      );

  const handleBuyNow = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="DigiStore" className="h-8 w-8" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DigiStore
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                53 Courses Available
              </Badge>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Badge variant="secondary" className="bg-green-100 text-green-700 w-fit">
                  53 Courses Available
                </Badge>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Marketing Banner */}
      <MarketingBanner />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Master Your Financial Future
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional forex trading courses, business development materials, and digital skills training - all at launch special prices!
          </p>
          
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">2,500+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Expert Content</span>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <CourseCategories 
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700">
                    Digital Course
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">₦15,000</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    67% OFF
                  </Badge>
                </div>
                <Button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Summary */}
        <div className="text-center mb-12">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} courses
            {selectedCategory !== 'all' && (
              <Button 
                variant="link" 
                onClick={() => setSelectedCategory('all')}
                className="ml-2 text-blue-600"
              >
                Show All Courses
              </Button>
            )}
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="DigiStore" className="h-8 w-8 filter brightness-0 invert" />
                <h3 className="text-xl font-bold">DigiStore</h3>
              </div>
              <p className="text-gray-300">
                Professional education platform for forex trading, business development, and digital skills.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>Email: sammygodsent7@gmail.com</p>
                <p>WhatsApp: +2347025649112</p>
                <p>Benin City, Nigeria</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 DigiStore. All rights reserved. Built with ❤️ in Nigeria.</p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}