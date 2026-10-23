import type { Product } from "@/modules/products/types/products.types";

export type FavoriteItem = Pick<
   Product,
   "id" | "title" | "thumbnail" | "price"
>