import Grid from "@mui/material/Grid";
import { ProductCard } from "@/modules/products/components/ProductCard/ProductCard";
import type { Product } from "@/modules/products/types/products.types";
import type React from "react";

type ProductListProps = {
   products: Product[],
   sentinelRef: React.RefObject<HTMLDivElement | null>
}

export const ProductList = ({ products, sentinelRef }: ProductListProps) => (
   <>
      <Grid container spacing={2}>
         {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
               <ProductCard  product={product}/>
            </Grid>
         ))}
      </Grid>
      
      <div ref={sentinelRef}/>
   </>
)