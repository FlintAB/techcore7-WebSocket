import type { Product, ProductsResponse } from "../types/products.types";

export async function getProducts(limit: number, skip: number): Promise<ProductsResponse> {
   const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
   )

   if (!response.ok) {
      throw new Error("Failed while get products")
   }

   return await response.json()
}

export async function getProductById (productId: number): Promise<Product> {
   const response = await fetch(`https://dummyjson.com/products/${productId}`)

   if(!response.ok) throw new Error(`Failed while get product - ${productId}`)

   return await response.json()
}