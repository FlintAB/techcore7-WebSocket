import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import type { Product } from "../../types/products.types";
import { Link } from "@tanstack/react-router";

import styles from "./ProductCard.module.css";
import { useFavoritesStore } from "../../../favorites/store/favoritesStore";

type ProductCardProps = {
   product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
   const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))

   return(
   <Card
      sx={{
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
         position: 'relative',
      }}  
   >
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
               height: 200,
               objectFit: "contain",
            }}
         />
      </Link>

      <IconButton
         className={styles.favoriteButton}
         onClick={() => toggleFavorite({
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
         })}
         aria-label={
            isFavorite
               ? "Удалить из избранного"
               : "Добавить в избранное"
         }
      >
         {isFavorite ? "★" : "☆"}
      </IconButton>

      <CardContent sx={{ flexGrow: 1 }}>
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
      </CardContent>
   </Card>
)
};