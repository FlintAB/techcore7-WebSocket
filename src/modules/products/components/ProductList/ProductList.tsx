import Grid from "@mui/material/Grid";
import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "../../types/products.types";

type ProductListProps = {
   products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => (
   <Grid container spacing={2}>
         {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
               <ProductCard key={product.id} product={product}/>
            </Grid>
         ))}
   </Grid>
)