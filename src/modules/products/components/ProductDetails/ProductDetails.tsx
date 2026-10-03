import {
   Box,
   Card,
   CardContent,
   CardMedia,
   Chip,
   Divider,
   Stack,
   Typography,
} from "@mui/material";

import type { Product } from "../../types/products.types";

type ProductDetailsProps = {
   product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
   const {
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
               minHeight: 400,
               objectFit: "cover",
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
                  sx={{
                     flexWrap: "wrap",
                  }}
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
            </Stack>
         </CardContent>
         </Box>
      </Card>
   );
};