import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CourseCategoriesProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  { id: 'all', name: 'All Courses', count: 53 },
  { id: 'forex', name: 'Forex Trading', count: 15 },
  { id: 'business', name: 'Business Skills', count: 12 },
  { id: 'digital', name: 'Digital Marketing', count: 10 },
  { id: 'finance', name: 'Personal Finance', count: 8 },
  { id: 'crypto', name: 'Cryptocurrency', count: 8 },
];

export default function CourseCategories({ onCategoryChange, selectedCategory }: CourseCategoriesProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Course Categories</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            {category.name}
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}