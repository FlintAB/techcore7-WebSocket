
import {
   AppBar,
   Badge,
   Box,
   Button,
   Toolbar,
   Typography,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../modules/auth/store/authStore";
import { useCartStore } from "../../../modules/cart/store/cartStore";
import { useFavoritesStore } from "../../../modules/favorites/store/favoritesStore";

import styles from "./Header.module.css";

export const Header = () => {
   const navigate = useNavigate()
   const accessToken = useAuthStore((state) => state.accessToken)
   const logout = useAuthStore((state) => state.logout)

   const cartItems = useCartStore((state) => state.items)
   const favoriteItems = useFavoritesStore((state) => state.items)

   const cartCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
   )

   const favoritesCount = favoriteItems.length

   const handleLogout = () => {
      logout()
      navigate({ to: "/products" })
   }

   return (
      <>
         <AppBar position="fixed">
            <Toolbar sx={{ gap: 2 }}>
               <Typography
                  variant="h6"
                  component={Link}
                  to="/products"
                  sx={{
                     color: "inherit",
                     textDecoration: "none",
                     mr: 2,
                  }}
               >
                  Marketplace
               </Typography>

               <Box
                  sx={{
                     display: "flex",
                     gap: 1,
                     flex: 1,
                  }}
               >
                  <Button
                     component={Link}
                     to="/products"
                     sx={{ color: "inherit" }}
                  >
                     Каталог
                  </Button>

                  <Button
                     component={Link}
                     to="/cart"
                     sx={{ color: "inherit" }}
                  >
                     <Badge badgeContent={cartCount} color="error" className={styles.counter}>
                        Корзина
                     </Badge>
                  </Button>

                  <Button
                     component={Link}
                     to="/favorites"
                     sx={{ color: "inherit" }}
                  >
                     <Badge badgeContent={favoritesCount} color="error" className={styles.counter}>
                        Избранное
                     </Badge>
                  </Button>

                  {accessToken && (
                     <>
                        <Button
                           component={Link}
                           to="/messages"
                           sx={{ color: "inherit" }}
                        >
                           Сообщения
                        </Button>

                        <Button
                           component={Link}
                           to="/profile"
                           sx={{ color: "inherit" }}
                        >
                           Профиль
                        </Button>
                     </>
                  )}
               </Box>

               {accessToken ? (
                  <Button
                     color="inherit"
                     onClick={handleLogout}
                  >
                     Выйти
                  </Button>
               ) : (
                  <Button
                     component={Link}
                     to="/login"
                     color="inherit"
                  >
                     Войти
                  </Button>
               )}
            </Toolbar>
         </AppBar>

         <Toolbar />
      </>
   )
}
