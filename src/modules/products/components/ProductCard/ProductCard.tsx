
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { Product } from "../../types/products.types";
import { Link } from "@tanstack/react-router";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
   product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => (
   <Card
      sx={{
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
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
);