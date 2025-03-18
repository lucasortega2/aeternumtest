import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/types';
import { useCartStore } from '@/stores/cartStore';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

const CartItem: React.FC<CartItemProps> = ({ item, className }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div
      className={'flex gap-4 py-4 border-b border-aeternum-accent/10 text-md'}
    >
      <div className="h-24 w-24 rounded overflow-hidden bg-aeternum-light flex-shrink-0">
        <img
          src={item.url}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-medium text-aeternum-highlight mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className=" text-aeternum-accent/70 mb-2 line-clamp-1">
          {item.price}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-aeternum-accent/10 hover:bg-aeternum-accent/20 text-aeternum-accent transition-colors"
              type="button"
            >
              <Minus size={14} />
            </button>

            <span className=" text-aeternum-highlight w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-aeternum-accent/10 hover:bg-aeternum-accent/20 text-aeternum-accent transition-colors"
              type="button"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-aeternum-accent/70 hover:text-aeternum-highlight"
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
