import type { Product, ProductsResponse } from "../types/products.types";

export async function getProducts(): Promise<ProductsResponse> {
   const response = await fetch('https://dummyjson.com/products')

   if(!response.ok) throw new Error('Failed while get products')

   return await response.json()
}

export async function getProductById (productId: number): Promise<Product> {
   const response = await fetch(`https://dummyjson.com/products/${productId}`)

   if(!response.ok) throw new Error(`Failed while get product - ${productId}`)

   return await response.json()
}