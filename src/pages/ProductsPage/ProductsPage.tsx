import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { ProductList } from "../../modules/products/components/ProductList/ProductList";
import { useProducts } from "../../modules/products/hooks/useProducts";
import { useEffect, useRef } from "react";

export const ProductsPage = () => {
   const {
      data,
      isPending,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
   } = useProducts()
   const sentinelRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            const [entry] = entries

            if (entry.isIntersecting && hasNextPage) {
               fetchNextPage()
            }
         },
      )

      const sentinel = sentinelRef.current

      if (sentinel) {
         observer.observe(sentinel)
      }

      return () => {
         observer.disconnect()
      }
   }, [fetchNextPage, hasNextPage])

   if (error) {
      return <Alert severity="error">{error.message}</Alert>
   }

   if (isPending) {
      return <CircularProgress />
   }

   const products = data.pages.flatMap(
      (page) => page.products
   )

   if (!products.length) {
      return <div>Список товаров пуст</div>
   }

   return (
      <>
         <ProductList products={products} sentinelRef={sentinelRef}/> 
      
         {isFetchingNextPage && <CircularProgress />}
      </>
   )
}