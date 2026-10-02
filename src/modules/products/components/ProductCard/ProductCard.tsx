
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { Product } from "../../types/products.types";

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
      <CardMedia
         component="img"
         image={product.thumbnail}
         alt={product.title}
         sx={{
         height: 200,
         objectFit: "contain",
         }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
         <Typography
            variant="h6"
            component="h2"
            gutterBottom
         >
            {product.title}
         </Typography>

         <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
         >
            {product.category}
         </Typography>

         <Typography variant="h6">
            {product.price} $
         </Typography>

         <Typography variant="body2">
            {product.rating} ⭐
         </Typography>

         <Typography variant="body2">
            Бренд: {product.brand}
         </Typography>

         <Typography variant="body2">
            Теги: {product.tags.join(" | ")}
         </Typography>

         <Typography variant="body2">
            В наличии: {product.stock}
         </Typography>
      </CardContent>
   </Card>
);