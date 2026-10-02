export type Product = {
   id: number
   title: string
   description: string
   category: string
   price: number
   rating: number
   stock: number
   tags: string[]
   brand: string
   thumbnail: string
}

export type ProductsResponse = {
   products: Product[]
   total: number
   skip: number
   limit: number
}