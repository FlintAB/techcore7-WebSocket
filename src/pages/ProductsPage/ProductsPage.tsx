import { Alert, CircularProgress, Container, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { CategoryFilter } from "@/modules/products/components/CategoryFilter/CategoryFilter"
import { ProductList } from "@/modules/products/components/ProductList/ProductList"
import { useCategories } from "@/modules/products/hooks/useCategories"
import { useProducts } from "@/modules/products/hooks/useProducts"

export const ProductsPage = () => {
   const [category, setCategory] = useState<string | null>(null)
   const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null)

   const {
      data: categories,
      isPending: isCategoriesPending,
      error: categoriesError,
   } = useCategories()

   const {
      data,
      isPending,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
   } = useProducts(category)

   useEffect(() => {
      if (!sentinelNode) {
         return
      }

      const observer = new IntersectionObserver(
         (entries) => {
            const [entry] = entries

            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
               fetchNextPage()
            }
         },
      )

      observer.observe(sentinelNode)

      return () => {
         observer.disconnect()
      }
   }, [sentinelNode, fetchNextPage, hasNextPage, isFetchingNextPage])

   const products = data?.pages.flatMap((page) => page.products) ?? []

   const emptyMessage = category
      ? "В этой категории пока нет товаров"
      : "Список товаров пуст"

   return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
         <Stack spacing={3}>
            <Typography variant="h4" component="h1">
               Каталог
            </Typography>

            <Stack
               direction={{ xs: "column", sm: "row" }}
               spacing={2}
               sx={{ alignItems: { sm: "center" } }}
            >
               <CategoryFilter
                  categories={categories ?? []}
                  value={category}
                  onChange={setCategory}
                  isLoading={isCategoriesPending}
               />

               {categoriesError && (
                  <Alert severity="warning">
                     Не удалось загрузить категории
                  </Alert>
               )}
            </Stack>

            {error ? (
               <Alert severity="error">{error.message}</Alert>
            ) : isPending ? (
               <CircularProgress />
            ) : products.length ? (
               <>
                  <ProductList
                     products={products}
                     sentinelRef={setSentinelNode}
                  />

                  {isFetchingNextPage && <CircularProgress />}
               </>
            ) : (
               <Typography color="text.secondary">
                  {emptyMessage}
               </Typography>
            )}
         </Stack>
      </Container>
   )
}
