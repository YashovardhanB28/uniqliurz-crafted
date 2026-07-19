import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LocalProduct } from '@/data/products';

export interface EnquiryItem {
  product: LocalProduct;
  quantity: number;
}

interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  notes: string;
  referenceLinks: string;
}

interface EnquiryStore {
  items: EnquiryItem[];
  formData: EnquiryFormData;
  addItem: (product: LocalProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearItems: () => void;
  updateForm: (data: Partial<EnquiryFormData>) => void;
  resetForm: () => void;
  totalItems: () => number;
  generateWhatsAppMessage: () => string;
}

const defaultForm: EnquiryFormData = {
  name: '',
  email: '',
  phone: '',
  occasion: '',
  notes: '',
  referenceLinks: '',
};

export const useEnquiryStore = create<EnquiryStore>()(
  persist(
    (set, get) => ({
      items: [],
      formData: { ...defaultForm },

      addItem: (product) => {
        const { items } = get();
        const existing = items.find(i => i.product.id === product.id);
        if (existing) {
          set({ items: items.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )});
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearItems: () => set({ items: [] }),
      updateForm: (data) => set(state => ({ formData: { ...state.formData, ...data } })),
      resetForm: () => set({ formData: { ...defaultForm } }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      generateWhatsAppMessage: () => {
        const { items, formData } = get();
        const lines: string[] = [];

        lines.push("Hello Uniqliurz! I would like to enquire about the following:");

        if (items.length > 0) {
          lines.push("");
          lines.push("*Products Interested In:*");
          items.forEach((item, i) => {
            lines.push(`${i + 1}. ${item.product.title} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`);
          });
          const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
          lines.push("");
          lines.push(`Estimated Total: $${total.toFixed(2)}`);
        }

        if (formData.name || formData.email || formData.phone) {
          lines.push("");
          lines.push("*My Details:*");
          if (formData.name) lines.push("Name: " + formData.name);
          if (formData.email) lines.push("Email: " + formData.email);
          if (formData.phone) lines.push("Phone: " + formData.phone);
        }

        if (formData.occasion) {
          lines.push("");
          lines.push("*Occasion:* " + formData.occasion);
        }

        if (formData.notes) {
          lines.push("");
          lines.push("*Special Requests:* " + formData.notes);
        }

        if (formData.referenceLinks) {
          lines.push("");
          lines.push("*Reference Images/Links:* " + formData.referenceLinks);
        }

        lines.push("");
        lines.push("Looking forward to your response. Thank you!");

        return encodeURIComponent(lines.join("\n"));
      },
    }),
    {
      name: 'uniqliurz-enquiry',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, formData: state.formData }),
    }
  )
);
