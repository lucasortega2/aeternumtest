import type { CartItem } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: CartItem) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Incrementar cantidad si ya existe
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set((state) => {
            return {
              items: updatedItems,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + Number(product.price),
            };
          });
        } else {
          // Añadir nuevo producto
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));
        }
      },

      removeItem: (productId: string) => {
        const items = get().items;
        const itemToRemove = items.find((item) => item.id === productId);

        if (!itemToRemove) return;

        const updatedItems = items.filter((item) => item.id !== productId);
        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice:
            state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        const items = get().items;
        const item = items.find((item) => item.id === productId);

        if (!item) return;

        const quantityDiff = quantity - item.quantity;
        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        );

        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + item.price * quantityDiff,
        }));
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'shopping-cart',
    },
  ),
);
