import type {
   Product,
   ProductCategory,
   ProductsResponse,
} from "@/modules/products/types/products.types"

const DUMMYJSON_API_URL = "https://dummyjson.com"

type GetProductsParams = {
   limit: number
   skip: number
   category?: string | null
}

export async function getProducts({
   limit,
   skip,
   category,
}: GetProductsParams): Promise<ProductsResponse> {
   const path = category
      ? `/products/category/${encodeURIComponent(category)}`
      : "/products"

   const searchParams = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
   })

   const response = await fetch(
      `${DUMMYJSON_API_URL}${path}?${searchParams.toString()}`,
   )

   if (!response.ok) {
      throw new Error("Не удалось загрузить товары")
   }

   return await response.json()
}

export async function getCategories(): Promise<ProductCategory[]> {
   const response = await fetch(`${DUMMYJSON_API_URL}/products/categories`)

   if (!response.ok) {
      throw new Error("Не удалось загрузить категории")
   }

   return await response.json()
}

export async function getProductById(productId: number): Promise<Product> {
   const response = await fetch(`${DUMMYJSON_API_URL}/products/${productId}`)

   if (!response.ok) {
      throw new Error(`Не удалось загрузить товар ${productId}`)
   }

   return await response.json()
}
