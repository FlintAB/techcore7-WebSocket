import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../CartItem/CartItem";

export const CartList = () => {
   const items = useCartStore((state) => state.items)

   return (
      items.length === 0 
         ? <p>Корзина пуста</p>  
         : items.map((item) => (
               <CartItem key={item.id} product={item}/>
            ))
      
   )
}