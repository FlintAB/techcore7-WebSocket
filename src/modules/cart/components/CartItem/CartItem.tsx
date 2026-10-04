import { useCartStore } from "../../store/cartStore";
import type { CartItemData } from "../../types/cart.types";

type CartItemProps = {
   product: CartItemData
}

export const CartItem = ({ product }: CartItemProps) => {
   const {id, title, thumbnail, price, quantity} = product

   const increment = useCartStore((state) => state.increaseQuantity)
   const decrement = useCartStore((state) => state.decreaseQuantity)
   const remove = useCartStore((state) => state.removeItem)

   return (
   <>
      <p>Кол-во: {quantity}</p>
      <p>{title}</p>
      <p>{price}</p>
      <img src={thumbnail} alt={title} />

      <button type="button" onClick={() => decrement(id)}>-</button>
      <button type="button" onClick={() => increment(id)}>+</button>

      <button type="button" onClick={() => remove(id)}>Убрать товар из корзины</button>
   </>
   )
}