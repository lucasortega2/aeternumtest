import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'timepieces', name: 'Timepieces' },
    { id: 'audio', name: 'Audio' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const allProducts = [
    {
      id: 1,
      title: 'Aeternum Chrono',
      description: 'Precision timepiece with metallic finish',
      price: '$2,999',
      category: 'timepieces',
      imageSrc:
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      title: 'Aeternum Sonus',
      description: 'Premium sound system with eternal clarity',
      price: '$1,899',
      category: 'audio',
      imageSrc:
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      title: 'Aeternum Lumen',
      description: 'Everlasting illumination for your space',
      price: '$899',
      category: 'lighting',
      imageSrc:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      title: 'Aeternum Tempus',
      description: 'Classic timepiece with modern functionality',
      price: '$1,899',
      category: 'timepieces',
      imageSrc:
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 5,
      title: 'Aeternum Harmonix',
      description: 'Wireless audio with exceptional clarity',
      price: '$799',
      category: 'audio',
      imageSrc:
        'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 6,
      title: 'Aeternum Pendant',
      description: 'Sleek lighting fixture for any space',
      price: '$599',
      category: 'lighting',
      imageSrc:
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 7,
      title: 'Aeternum Clavis',
      description: 'Precision crafted keychain accessory',
      price: '$199',
      category: 'accessories',
      imageSrc:
        'https://images.unsplash.com/photo-1611105637889-3afd7295bdbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 8,
      title: 'Aeternum Carta',
      description: 'Slim wallet with timeless design',
      price: '$249',
      category: 'accessories',
      imageSrc:
        'https://images.unsplash.com/photo-1627123409790-1a99914ad273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    // Apply both category and search filters
    setIsLoading(true);
    setShowProducts(false);

    // Simulate loading delay to make the fade-in effect more noticeable
    setTimeout(() => {
      const filtered = allProducts.filter((product) => {
        // Apply category filter
        const categoryMatch =
          selectedCategory === 'all' || product.category === selectedCategory;

        // Apply search filter (case insensitive)
        const searchMatch =
          searchTerm === '' ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
      });

      setFilteredProducts(filtered);
      setIsLoading(false);

      // Trigger fade-in animation after loading
      setTimeout(() => {
        setShowProducts(true);
      }, 200);
    }, 300);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="pt-28 pb-20">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Our Collection
        </h1>
        <p className="text-aeternum-accent/70 max-w-2xl mx-auto">
          Discover products that stand the test of time, meticulously crafted
          for the discerning individual.
        </p>
      </div>
      {/* Category Filter and Search */}
      <div className="mb-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category Filter */}
          <div className="overflow-x-auto scrollbar-hidden w-full md:w-auto">
            <div className="flex space-x-2 min-w-max py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-aeternum-accent/20 text-aeternum-highlight'
                      : 'bg-transparent text-aeternum-accent/70 hover:text-aeternum-highlight'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-aeternum-medium border border-aeternum-accent/20 rounded-full py-2 pl-10 pr-4 text-aeternum-highlight placeholder:text-aeternum-accent/40 focus:outline-none focus:border-aeternum-accent/50 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aeternum-accent/50 w-4 h-4" />
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="min-h-[500px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-aeternum-medium/50 rounded-lg h-80 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ease-in-out ${
                  showProducts
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  featured
                />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-aeternum-accent/70">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
