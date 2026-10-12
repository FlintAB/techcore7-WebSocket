
import { useState } from "react";
import type { SyntheticEvent } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import type { Product } from "../../types/products.types";
import { Link } from "@tanstack/react-router";

import { useFavoritesStore } from "../../../favorites/store/favoritesStore";
import { useCartStore } from "../../../cart/store/cartStore";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
   product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
   const isFavorite = useFavoritesStore((state) =>
      state.isFavorite(product.id)
   );

   const cartItem = useCartStore((state) =>
      state.items.find((item) => item.id === product.id)
   );

   const addItem = useCartStore((state) => state.addItem);
   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

   const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

   const handleAddToCart = () => {
      addItem({
         id: product.id,
         title: product.title,
         thumbnail: product.thumbnail,
         price: product.price,
         quantity: 1,
      });

      setIsSnackbarOpen(true);
   };

   const handleSnackbarClose = (
      _event: Event | SyntheticEvent,
      reason?: string,
   ) => {
      if (reason === "clickaway") {
         return;
      }

      setIsSnackbarOpen(false);
   };

   return (
      <Card className={styles.card}>
         <Link
            to="/products/$productId"
            params={{
               productId: String(product.id),
            }}
         >
            <CardMedia
               component="img"
               image={product.thumbnail}
               alt={product.title}
                  sx={{
                     display: "block",
                     width: "100%",
                     height: 200,
                     objectFit: "contain",
                     objectPosition: "center",
                     }}
            />
         </Link>

         <IconButton
            className={styles.favoriteButton}
            onClick={() =>
               toggleFavorite({
                  id: product.id,
                  title: product.title,
                  thumbnail: product.thumbnail,
                  price: product.price,
               })
            }
            aria-label={
               isFavorite
                  ? "Удалить из избранного"
                  : "Добавить в избранное"
            }
         >
            {isFavorite ? "★" : "☆"}
         </IconButton>

         <CardContent className={styles.cardContent}>
            <Typography variant="h6">
               {product.price} $
            </Typography>

            <Link
               to="/products/$productId"
               params={{
                  productId: String(product.id),
               }}
               className={styles.productLink}
            >
               <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
               >
                  {product.title}
               </Typography>
            </Link>

            <Typography variant="body2">
               {product.rating} ⭐
            </Typography>

            <Typography variant="body2">
               Бренд: {product.brand}
            </Typography>

            <Typography variant="body2">
               В наличии: {product.stock}
            </Typography>

            <div className={styles.cartActions}>
               {cartItem ? (
                  <div className={styles.quantityControl}>
                     <IconButton
                        color="primary"
                        aria-label="Уменьшить количество"
                        onClick={() => decreaseQuantity(product.id)}
                     >
                        −
                     </IconButton>

                     <span
                        className={styles.quantity}
                        aria-live="polite"
                     >
                        {cartItem.quantity}
                     </span>

                     <IconButton
                        color="primary"
                        aria-label="Увеличить количество"
                        onClick={() => increaseQuantity(product.id)}
                        disabled={cartItem.quantity >= product.stock}
                     >
                        +
                     </IconButton>
                  </div>
               ) : (
                  <Button
                     variant="contained"
                     fullWidth
                     onClick={handleAddToCart}
                     disabled={product.stock <= 0}
                  >
                     В корзину
                  </Button>
               )}
            </div>
         </CardContent>

         <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={2500}
            onClose={handleSnackbarClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
         >
            <Alert
               severity="success"
               variant="filled"
               onClose={() => setIsSnackbarOpen(false)}
            >
               Товар добавлен в корзину
            </Alert>
         </Snackbar>
      </Card>
   );
};
