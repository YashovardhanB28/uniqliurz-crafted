import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LocalProduct } from '@/data/products';

export interface CartItem {
  product: LocalProduct;
  quantity: number;
  customText?: string;
  customColor?: string;
  customNotes?: string;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          i => i.product.id === item.product.id && i.customText === item.customText
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex].quantity += item.quantity;
          set({ items: updated });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (productId, quantity) => {
        set(state => ({
          items: quantity <= 0
            ? state.items.filter(i => i.product.id !== productId)
            : state.items.map(i =>
                i.product.id === productId ? { ...i, quantity } : i
              ),
        }));
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(i => i.product.id !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: 'uniqliurz-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
