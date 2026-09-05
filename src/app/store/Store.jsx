import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      product: [],
      updatePro: (newPro) =>
        set((state) => {
          const existing = state.product.find((p) => p.id === newPro.id);
          if (existing) {
            return {
              product: state.product.map((p) =>
                p.id === newPro.id ? { ...p, count: p.count + 1 } : p
              ),
            };
          }
          return { product: [...state.product, newPro] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ product: state.product.filter((p) => p.id !== id) })),
      updateCount: (id, count) =>
        set((state) => ({
          product: state.product.map((p) =>
            p.id === id ? { ...p, count: Math.max(1, Number(count) || 1) } : p
          ),
        })),
      user: null,
      updateUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ product: state.product }), // only persist the cart
    }
  )
);

export default useStore;