import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteItem } from "../types/favorites.types";

type FavoritesState = {
   items: FavoriteItem[],

   addFavorite: (item: FavoriteItem) => void,
   removeFavorite: (id: number) => void,
   
   toggleFavorite: (item: FavoriteItem) => void,
   isFavorite: (id: number) => boolean,
}

export const useFavoritesStore = create<FavoritesState>()(
   persist(
      (set, get) => ({
         items: [],

         addFavorite: (item) => {
            const { items } = get()

            if (items.some((i) => i.id === item.id)) {
               return
            }

            set({
               items: [...items, item],
            })
         },

         removeFavorite: (id) => {
            const { items } = get()

            set({
               items: items.filter((item) => item.id !== id),
            })
         },

         toggleFavorite: (item) => {
            const { items } = get()
            const existingItem = items.some((i) => i.id === item.id)

            if (existingItem) {
               set({
                  items: items.filter((i) => i.id !== item.id),
               })
            } else {
               set({
                  items: [...items, item],
               })
            }
         },

         isFavorite: (id) => {
            return get().items.some((item) => item.id === id)
         },
      }),
      {
         name: "favorites-storage",
      },
   ),
)