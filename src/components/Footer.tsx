import { MessageCircle, Mail, MapPin, Shield, Clock, Download } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="lg" className="text-white" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Nigeria's premier digital products marketplace. 70+ premium solutions for online business success.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-green-400">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Instant</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <Download className="h-4 w-4" />
                <span className="text-xs">Automated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">All Products</a></li>
              <li><a href="#forex" className="text-gray-300 hover:text-white transition-colors">Forex Trading</a></li>
              <li><a href="#whatsapp" className="text-gray-300 hover:text-white transition-colors">WhatsApp Marketing</a></li>
              <li><a href="#ecommerce" className="text-gray-300 hover:text-white transition-colors">E-commerce</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Social Media Marketing</span></li>
              <li><span className="text-gray-300">Digital Marketing</span></li>
              <li><span className="text-gray-300">Content Creation</span></li>
              <li><span className="text-gray-300">Online Business</span></li>
              <li><span className="text-gray-300">Passive Income</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Benin City, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:sammygodsent7@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  sammygodsent7@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <a href="https://wa.me/2347025649112" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  +234 702 564 9112
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">Bank Transfer</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">USDT</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">Crypto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 DigiStore by Ose Okunmwendia. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#refund" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}