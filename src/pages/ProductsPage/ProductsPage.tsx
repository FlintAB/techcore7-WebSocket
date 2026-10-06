import Alert from "@mui/material/Alert";
import { ProductList } from "../../modules/products/components/ProductList/ProductList";
import { useProducts } from "../../modules/products/hooks/useProducts";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductsPage = () => {
   const {data, isPending, error} = useProducts()

   if (error) {
      return <Alert severity="error">{error.message}</Alert>
   }

   if (!data?.products.length) {
      return <div>Список товаров пуст</div>
   }

   return (
      <>
         {isPending ? <CircularProgress /> : <ProductList products={data.products}/>}
      </>
   )
}