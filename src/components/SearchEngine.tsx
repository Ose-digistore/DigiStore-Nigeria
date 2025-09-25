import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, TrendingUp } from 'lucide-react';
import { Product, products } from '@/data/products';

interface SearchEngineProps {
  onProductSelect: (product: Product) => void;
  onAutoBuy: (product: Product) => void;
}

export default function SearchEngine({ onProductSelect, onAutoBuy }: SearchEngineProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchResults, setSearchResults] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [popularSearches] = useState([
    'WhatsApp marketing', 'Forex trading', 'Instagram monetization', 'Dropshipping',
    'YouTube income', 'Passive income', 'Email marketing', 'SEO traffic',
    'Cryptocurrency', 'Online courses', 'Freelancing', 'Content creation'
  ]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const filterProducts = () => {
    let filtered = products;

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(product => product.difficulty === selectedDifficulty);
    }

    setSearchResults(filtered);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Find Your Perfect Digital Solution</h2>
        <p className="text-lg text-gray-600">Search through 70+ premium digital products designed to solve your immediate needs</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search for products, solutions, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-20 h-12 text-lg"
        />
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </div>

      {/* Popular Searches */}
      {!searchQuery && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Popular Searches:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                onClick={() => handlePopularSearch(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filter Products</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty Level</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear All Filters
              </Button>
              <Button onClick={() => setShowFilters(false)} size="sm">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'} 
            <span className="text-gray-500 ml-2">({searchResults.length} products)</span>
          </h3>
        </div>

        {searchResults.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <Search className="h-16 w-16 text-gray-400 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={getDifficultyColor(product.difficulty)}>
                      {product.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm line-clamp-3">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="text-center py-2">
                      <div className="text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">~$3.03 USD</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        onClick={() => onAutoBuy(product)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        🚀 Auto Buy Now
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => onProductSelect(product)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}