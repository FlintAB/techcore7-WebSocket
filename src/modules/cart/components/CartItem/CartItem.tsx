import {
   Box,
   Button,
   Card,
   CardContent,
   CardMedia,
   IconButton,
   Stack,
   Typography,
} from "@mui/material";
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
      <Card>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 2,
               p: 2,
               flexWrap: "wrap",
            }}
         >
            <CardMedia
               component="img"
               image={thumbnail}
               alt={title}
               sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 1,
               }}
            />

            <CardContent sx={{ flex: 1, p: 0, minWidth: 180 }}>
               <Typography variant="h6" component="h3">
                  {title}
               </Typography>

               <Typography variant="body1" sx={{ mt: 1 }}>
                  ${price}
               </Typography>
            </CardContent>

            <Stack
               direction="row"
               spacing={1}
            >
               <IconButton
                  size="small"
                  onClick={() => decrement(id)}
               >
                  -
               </IconButton>

               <Typography>
                  {quantity}
               </Typography>

               <IconButton
                  size="small"
                  onClick={() => increment(id)}
               >
                  +
               </IconButton>
            </Stack>

            <Button
               variant="outlined"
               color="error"
               onClick={() => remove(id)}
            >
               Удалить
            </Button>
         </Box>
      </Card>
   )
}