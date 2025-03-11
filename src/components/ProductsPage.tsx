import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'morrales', name: 'Morrales' },
    { id: 'mochilas', name: 'Mochilas' },
  ];

  const allProducts = [
    {
      id: 1,
      title: 'Messenger Bag',
      description:
        'Ideal para quienes buscan una solución práctica y segura para llevar sus pertenencias. Diseño moderno y características que se adaptan a cualquier ocasión.',
      characteristics: [
        'Resistente al agua',
        'Materiales premium',
        'Diseño versátil',
      ],
      price: '$39.900',
      imageSrc: '/MessengerBagAll.webp',
      category: 'morrales',
    },
    {
      id: 2,
      title: 'Traveler Bag',
      description:
        'Tela Oxford de alta densidad, es resistente al agua y al desgarro, garantizando durabilidad y seguridad en cada uso. Cremalleras metálicas de alta calidad.',
      price: '$43.000',
      imageSrc: '/traveler-bag.webp',
      category: 'morrales',
    },
    {
      id: 3,
      title: 'Mochila Impermeable',
      description:
        'Materiales de alta calidad cubiertos con una membrana resistente al agua para la superficie. Ideal para llevarlas cuando necesitas llevar muchas cosas.',
      price: '$50.000',
      imageSrc: '/Mochila.webp',
      category: 'mochilas',
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
