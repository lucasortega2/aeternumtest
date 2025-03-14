import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/types';
import React from 'react';
type ProductCard = Omit<Product, 'is_active' | 'category'>;
const ProductCard: React.FC<ProductCard> = ({
  id,
  name,
  description,
  price,
  url,
  featured = false,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-aeternum-medium border border-aeternum-accent/10 transition-all duration-500 ease-out hover:border-aeternum-accent/30 ${
        featured ? 'hover:translate-y-[-10px]' : 'hover:scale-[1.02]'
      }`}
    >
      <div className="aspect-square overflow-hidden bg-aeternum-light">
        <img
          src={url}
          alt={name}
          className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-medium text-aeternum-highlight mb-2">
          {name}
        </h3>
        <p className="text-sm text-aeternum-accent/70 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-aeternum-highlight font-medium">
            ${new Intl.NumberFormat('es-AR').format(Number(price))}
          </span>
          <button
            onClick={() => addItem({ id, price, name, url, quantity: 1 })}
            className="text-xs uppercase tracking-wider text-aeternum-accent hover:text-aeternum-highlight transition-colors duration-300 flex items-center gap-1 py-1 px-2 rounded-full border border-aeternum-accent/20 hover:border-aeternum-accent/50 hover:cursor-pointer"
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            background:
              'radial-gradient(circle at bottom, rgba(138,43,226,0.6), transparent 40%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductCard;
