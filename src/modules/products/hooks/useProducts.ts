import { useInfiniteQuery } from "@tanstack/react-query"
import { getProducts } from "@/modules/products/api/productsApi"

const PRODUCTS_LIMIT = 20

export const useProducts = (category: string | null = null) => {
   return useInfiniteQuery({
      queryKey: ["products", category],
      queryFn: ({ pageParam }) =>
         getProducts({
            limit: PRODUCTS_LIMIT,
            skip: pageParam,
            category,
         }),

      initialPageParam: 0,

      getNextPageParam: (lastPage) => {
         const nextSkip = lastPage.skip + lastPage.limit

         if (nextSkip >= lastPage.total) {
            return undefined
         }

         return nextSkip
      },
   })
}
