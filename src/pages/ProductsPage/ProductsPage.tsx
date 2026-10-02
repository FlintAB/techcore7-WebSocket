import { ProductList } from "../../modules/products/components/ProductList/ProductList";
import { useProducts } from "../../modules/products/hooks/useProducts";

export const ProductsPage = () => {
   const {data, isPending, error} = useProducts()

   if (error) return <div>{error.name} | {error.message}</div>

   if (!data?.products.length) {
      return <div>Список товаров пуст</div>
   }

   return (
      <>
         {isPending ? 'Загрузка....' : <ProductList products={data.products}/>}
      </>
   )
}