import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemData } from "../types/cart.types";

type CartState = {
   items: CartItemData[],

   addItem: (item: CartItemData) => void,
   removeItem: (id: number) => void,

   increaseQuantity: (id: number) => void,
   decreaseQuantity: (id: number) => void,

   clearCart: () => void
}

export const useCartStore = create<CartState>()(
   persist(
      (set, get) => ({
         items: [],
         
         addItem: (item) => {
            const { items } = get()
            const existingItem = items.find((i) => i.id === item.id)

            if (existingItem) {
               set({
                  items: items.map((i) => i.id === item.id ? {...i, quantity: i.quantity + 1}: i)
               })
            } else {
               set({ items: [...items, item] })
            }
         },

         removeItem: (id) => {
            const { items } = get()

            set({ items: items.filter(i => i.id !== id) })
         },

         increaseQuantity: (id) => set((state) => ({
            items: state.items.map((i) => i.id === id ? {...i, quantity: i.quantity + 1} : i)
         })),

         decreaseQuantity: (id) => {
            const { items } = get()
            const currentItem = items.find((i) => i.id === id)
            
            if (currentItem?.quantity === 1) {
               set({
                  items: items.filter((i) => i.id !== id)
               })
            } else {
               set({
                  items: items.map((i) => i.id === id ? {...i, quantity: i.quantity - 1} : i)
               })
            }
         },

         clearCart: () => set({ items: [] }),
      }),
      {
         name: "cart-storage",
      },
   ),
)