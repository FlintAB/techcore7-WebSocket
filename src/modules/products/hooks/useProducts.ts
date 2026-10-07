import { useInfiniteQuery } from "@tanstack/react-query"
import { getProducts } from "../api/productsApi"

const PRODUCTS_LIMIT = 20

export const useProducts = () => {
   return useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam }) =>
         getProducts(PRODUCTS_LIMIT, pageParam),

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