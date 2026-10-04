import type { Product } from "../../products/types/products.types";

type Quantity = {
   quantity: number
}

type ProductInCart = Pick<Product, 'id' | 'title' | 'thumbnail' | 'price'>

export type CartItemData = ProductInCart & Quantity