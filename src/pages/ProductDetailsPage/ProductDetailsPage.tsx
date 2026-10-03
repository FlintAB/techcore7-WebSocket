import { useParams } from "@tanstack/react-router";
import { useProduct } from "../../modules/products/hooks/useProduct";
import { ProductDetails } from "../../modules/products/components/ProductDetails/ProductDetails";

export const ProductDetailsPage = () => {
   const productId = useParams({
      from: '/products/$productId',
      select: (params) => Number(params.productId),
   })

   const { data, isPending, error } = useProduct(productId)

   if (isPending) {
      return <div>Загрузка...</div>
   }

   if (error) {
      return <div>{error.message} | {error.name}</div>
   }

   return <ProductDetails product={data} />
}