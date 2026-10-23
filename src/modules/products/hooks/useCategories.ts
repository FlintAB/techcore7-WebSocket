import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/modules/products/api/productsApi"

export const useCategories = () => {
   return useQuery({
      queryKey: ["product-categories"],
      queryFn: getCategories,
      staleTime: Infinity,
   })
}
