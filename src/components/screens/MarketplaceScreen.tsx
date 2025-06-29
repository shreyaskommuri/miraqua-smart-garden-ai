
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Store, 
  Search,
  ShoppingCart,
  Star,
  Filter,
  Package,
  Wifi,
  Droplets
} from 'lucide-react';

const MarketplaceScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Smart Moisture Sensor',
          price: 49.99,
          rating: 4.5,
          reviews: 124,
          category: 'sensors',
          image: '/placeholder.svg',
          description: 'Real-time soil moisture monitoring',
          inStock: true,
          bestseller: true
        },
        {
          id: 2,
          name: 'Automatic Watering Kit',
          price: 129.99,
          rating: 4.8,
          reviews: 89,
          category: 'irrigation',
          image: '/placeholder.svg',
          description: 'Complete drip irrigation system',
          inStock: true,
          bestseller: false
        },
        {
          id: 3,
          name: 'pH Testing Kit',
          price: 24.99,
          rating: 4.3,
          reviews: 156,
          category: 'testing',
          image: '/placeholder.svg',
          description: 'Digital soil pH meter',
          inStock: false,
          bestseller: false
        },
        {
          id: 4,
          name: 'Weather Station Pro',
          price: 199.99,
          rating: 4.7,
          reviews: 67,
          category: 'monitoring',
          image: '/placeholder.svg',
          description: 'Complete weather monitoring solution',
          inStock: true,
          bestseller: true
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: Store },
    { id: 'sensors', name: 'Sensors', icon: Wifi },
    { id: 'irrigation', name: 'Irrigation', icon: Droplets },
    { id: 'testing', name: 'Testing', icon: Package },
    { id: 'monitoring', name: 'Monitoring', icon: Package }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold">Marketplace</h1>
            </div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-blue-900">Marketplace</h1>
              <p className="text-sm text-blue-700">Smart garden equipment & supplies</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-blue-200"
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/80 text-blue-700 border-blue-200'
                }`}
              >
                <category.icon className="w-4 h-4 mr-1" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                            {product.bestseller && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                Bestseller
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-blue-600">
                          ${product.price}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                            }
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                          <Button 
                            size="sm"
                            disabled={!product.inStock}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="border-gray-200 bg-white/80">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MarketplaceScreen;
