import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productsApi";

export const useProduct = (productId: number) => {
   return useQuery({
      queryKey: ['product', productId],
      queryFn: () => getProductById(productId)
   })
}