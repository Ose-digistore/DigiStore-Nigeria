import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Adebayo Johnson',
    role: 'Forex Trader',
    content: 'DigiStore transformed my trading journey. The forex courses are practical and profitable. I\'ve made consistent profits since completing the program.',
    rating: 5,
    initials: 'AJ'
  },
  {
    name: 'Chioma Okafor',
    role: 'Business Owner',
    content: 'The business development courses helped me scale my startup from ₦50k to ₦2M monthly revenue. Excellent investment!',
    rating: 5,
    initials: 'CO'
  },
  {
    name: 'Ibrahim Musa',
    role: 'Digital Marketer',
    content: 'Best educational platform in Nigeria. The digital marketing strategies I learned generated ₦500k in my first month.',
    rating: 5,
    initials: 'IM'
  },
  {
    name: 'Grace Eze',
    role: 'Financial Analyst',
    content: 'Professional quality content at affordable prices. The personal finance course changed my entire approach to money management.',
    rating: 5,
    initials: 'GE'
  }
];

export default function Testimonials() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers and financial future
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}