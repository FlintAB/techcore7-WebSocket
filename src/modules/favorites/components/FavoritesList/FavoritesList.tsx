import {
   Alert,
   Card,
   CardContent,
   CardMedia,
   Grid,
   IconButton,
   Typography,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useFavoritesStore } from "@/modules/favorites/store/favoritesStore";

export const FavoritesList = () => {
   const items = useFavoritesStore((state) => state.items);
   const removeFavoriteItem = useFavoritesStore(
      (state) => state.removeFavorite,
   );

   if (items.length === 0) {
      return (
         <Alert severity="info">
            В избранном пока нет товаров
         </Alert>
      );
   }

   return (
      <Grid container spacing={2}>
         {items.map((item) => (
            <Grid
               key={item.id}
               size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
               <Card
                  sx={{
                     height: "100%",
                     display: "flex",
                     flexDirection: "column",
                  }}
               >
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
                           width: "100%",
                           objectFit: "contain",
                           objectPosition: "center",
                        }}
                     />
                  </Link>

                  <CardContent
                     sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                     }}
                  >
                     <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                           minHeight: "3.6em",
                           display: "-webkit-box",
                           WebkitBoxOrient: "vertical",
                           WebkitLineClamp: 2,
                           overflow: "hidden",
                        }}
                     >
                        {item.title}
                     </Typography>

                     <Typography
                        variant="body1"
                        sx={{ fontWeight: 600 }}
                     >
                        ${item.price}
                     </Typography>

                     <IconButton
                        aria-label={`Удалить ${item.title} из избранного`}
                        onClick={() => removeFavoriteItem(item.id)}
                        sx={{
                           alignSelf: "flex-end",
                           mt: "auto",
                           width: 36,
                           height: 36,
                           borderRadius: 2,
                           "&:hover": {
                           color: "error.main",
                           },
                        }}
                        >
                           ×
                        </IconButton>
                  </CardContent>
               </Card>
            </Grid>
         ))}
      </Grid>
   );
};
