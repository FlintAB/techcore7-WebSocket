
import {
   Box,
   Button,
   Card,
   CardContent,
   CardMedia,
   Chip,
   Divider,
   IconButton,
   Stack,
   Typography,
} from "@mui/material";

import type { Product } from "@/modules/products/types/products.types";
import { useCartStore } from "@/modules/cart/store/cartStore";

type ProductDetailsProps = {
   product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
   const {
      id,
      title,
      description,
      category,
      price,
      rating,
      stock,
      tags,
      brand,
      thumbnail,
   } = product;

   const cartItem = useCartStore((state) =>
      state.items.find((item) => item.id === id)
   );

   const addItem = useCartStore((state) => state.addItem);
   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

   const handleAddToCart = () => {
      addItem({
         id,
         title,
         thumbnail,
         price,
         quantity: 1,
      });
   };

   return (
      <Card>
         <Box
            sx={{
               display: "grid",
               gridTemplateColumns: {
                  xs: "1fr",
                  md: "40% 60%",
               },
            }}
         >
            <CardMedia
               component="img"
               image={thumbnail}
               alt={title}
               sx={{
                  width: "100%",
                  height: {
                     xs: 300,
                     md: 550,
                  },
                  minHeight: {
                     xs: 300,
                     md: 400,
                  },
                  objectFit: "contain",
               }}
            />

            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
               <Stack spacing={2}>
                  <Box>
                     <Typography
                        variant="overline"
                        color="text.secondary"
                     >
                        {category}
                     </Typography>

                     <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                     >
                        {title}
                     </Typography>
                  </Box>

                  <Typography
                     variant="body1"
                     color="text.secondary"
                  >
                     {description}
                  </Typography>

                  <Divider />

                  <Box>
                     <Typography
                        variant="h4"
                        component="p"
                        sx={{ fontWeight: 700 }}
                     >
                        {price} $
                     </Typography>

                     <Typography variant="body2">
                        {rating} ⭐
                     </Typography>
                  </Box>

                  <Box>
                     <Typography variant="body2">
                        <strong>Бренд:</strong> {brand}
                     </Typography>

                     <Typography variant="body2">
                        <strong>В наличии:</strong> {stock} шт.
                     </Typography>
                  </Box>

                  <Box>
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                     >
                        Теги
                     </Typography>

                     <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ flexWrap: "wrap" }}
                     >
                        {tags.map((tag) => (
                           <Chip
                              key={tag}
                              label={tag}
                              size="small"
                           />
                        ))}
                     </Stack>
                  </Box>

                  {cartItem ? (
                     <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                     >
                        <IconButton
                           color="primary"
                           aria-label="Уменьшить количество"
                           onClick={() => decreaseQuantity(id)}
                        >
                           −
                        </IconButton>

                        <Box
                           component="span"
                           aria-live="polite"
                           sx={{
                              minWidth: 24,
                              textAlign: "center",
                              fontWeight: 600,
                           }}
                        >
                           {cartItem.quantity}
                        </Box>

                        <IconButton
                           color="primary"
                           aria-label="Увеличить количество"
                           onClick={() => increaseQuantity(id)}
                           disabled={cartItem.quantity >= stock}
                        >
                           +
                        </IconButton>
                     </Stack>
                  ) : (
                     <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        disabled={stock <= 0}
                     >
                        В корзину
                     </Button>
                  )}
               </Stack>
            </CardContent>
         </Box>
      </Card>
   );
};
