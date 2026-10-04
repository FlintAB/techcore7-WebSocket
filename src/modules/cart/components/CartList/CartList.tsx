import { Stack, Typography } from "@mui/material";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../CartItem/CartItem";

export const CartList = () => {
   const items = useCartStore((state) => state.items)

   return (
      items.length === 0 
         ? <Typography variant="body1">Корзина пуста</Typography>
         : (
            <Stack spacing={2}>
               {items.map((item) => (
                  <CartItem key={item.id} product={item}/>
               ))}
            </Stack>
         )
   )
}