import type { ProductsResponse } from "../types/products.types";

export async function getProducts(): Promise<ProductsResponse> {
   const response = await fetch('https://dummyjson.com/products')

   if(!response.ok) throw new Error('Failed while get products')

   return await response.json()
}