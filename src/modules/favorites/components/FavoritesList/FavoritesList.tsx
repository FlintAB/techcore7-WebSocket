import {
   Alert,
   Card,
   CardContent,
   CardMedia,
   Grid,
   Typography,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useFavoritesStore } from "../../store/favoritesStore";

export const FavoritesList = () => {
   const items = useFavoritesStore((state) => state.items)

   if (items.length === 0) {
      return (
         <Alert severity="info">
            В избранном пока нет товаров
         </Alert>
      )
   }

   return (
      <Grid container spacing={2}>
         {items.map((item) => (
            <Grid
               key={item.id}
               size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
               <Card sx={{ height: "100%" }}>
                  <Link
                     to="/products/$productId"
                     params={{
                        productId: String(item.id),
                     }}
                  >
                     <CardMedia
                        component="img"
                        image={item.thumbnail}
                        alt={item.title}
                        sx={{
                           height: 200,
                           objectFit: "cover",
                        }}
                     />
                  </Link>

                  <CardContent>
                     <Typography variant="h6">
                        {item.title}
                     </Typography>

                     <Typography variant="body1">
                        ${item.price}
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
         ))}
      </Grid>
   )
}