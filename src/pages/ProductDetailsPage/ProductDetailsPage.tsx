import { useParams } from "@tanstack/react-router";
import { useProduct } from "../../modules/products/hooks/useProduct";
import { ProductDetails } from "../../modules/products/components/ProductDetails/ProductDetails";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductDetailsPage = () => {
   const productId = useParams({
      from: '/products/$productId',
      select: (params) => Number(params.productId),
   })

   const { data, isPending, error } = useProduct(productId)

   if (isPending) {
      return <CircularProgress />
   }

   if (error) {
      return <Alert severity="error">{error.message}</Alert>
   }

   return <ProductDetails product={data} />
}