import { Container, Typography } from "@mui/material";
import { FavoritesList } from "../../modules/favorites/components/FavoritesList/FavoritesList";

export const FavoritesPage = () => {
   return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
         <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 3 }}
         >
            Избранное
         </Typography>

         <FavoritesList />
      </Container>
   )
}