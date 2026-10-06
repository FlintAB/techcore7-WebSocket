import type { Product } from "../../products/types/products.types";

export type FavoriteItem = Pick<
   Product,
   "id" | "title" | "thumbnail" | "price"
>