'use client';

import { useRef, useEffect, useState, type JSX } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import CartItem from './CartItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

// Utility function to combine class names

export default function CartDrawer(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const { items, totalItems, totalPrice, clearCart } = useCartStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close cart when clicking outside
  useOnClickOutside(cartRef, () => setIsOpen(false));

  // Close cart when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Control scroll when cart is open
  // Prevent scroll events but keep scrollbar visible
  const preventDefault = (e) => e.preventDefault();

  useEffect(() => {
    if (isOpen) {
      // Prevent wheel and touchmove events
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
      // Remove listeners
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    }

    return () => {
      // Cleanup
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [isOpen]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  if (!mounted)
    return (
      <button
        className="relative flex items-center text-aeternum-silver/30"
        aria-label="Carrito"
      >
        <ShoppingBag size={22} />
      </button>
    );

  return (
    <>
      {/* Cart toggle button */}
      <button
        onClick={toggleCart}
        className="relative flex items-center text-aeternum-accent hover:text-aeternum-highlight transition-all duration-300 cursor-pointer"
        aria-label="Abrir carrito"
        type="button"
      >
        <ShoppingBag size={22} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart overlay */}
      <div
        className={`fixed inset-0 h-dvh w-full bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* Cart drawer */}
      <div
        ref={cartRef}
        className={`
          fixed top-0 -right-4 h h-dvh w-full max-w-md bg-aeternum-medium border-l border-gray-800 shadow-xl z-[100] transition-transform duration-300 ease-in-out flex flex-col overflow-hidden
          ${isOpen ? ':translate-x-0 md:-translate-x-4' : 'translate-x-full'}`}
      >
        {/* Cart header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-aeternum-accent" />
            <h2 className="text-lg font-medium text-aeternum-accent">
              Tu carrito
            </h2>
            {totalItems > 0 && (
              <span className="ml-2 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-grow overflow-y-auto p-5 bg-aeternum-medium">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-600 mb-4" />
              <p className="text-gray-400">No hay productos en tu carrito</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-sm underline text-white hover:text-gray-300"
                type="button"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Cart footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-800 bg-aeternum-medium">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white font-medium">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <a
                href="/checkout/checkout"
                className="block w-full py-3 px-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-md text-center font-medium"
              >
                Checkout
              </a>

              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-400 hover:text-white underline transition-colors"
                type="button"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
