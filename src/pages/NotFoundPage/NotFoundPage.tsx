
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const NotFoundPage = () => {
   const navigate = useNavigate();

   return (
      <Box
         sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 2,
            px: 2,
         }}
      >
         <Typography
            variant="h1"
            sx={{ fontWeight: 700, fontSize: { xs: 72, md: 120 } }}
         >
            404
         </Typography>

         <Typography variant="h5" component="h1">
            Страница не найдена
         </Typography>

         <Typography color="text.secondary">
            Возможно, адрес указан неверно или страница была удалена.
         </Typography>

         <Button
            variant="contained"
            onClick={() => navigate({ to: "/products" })}
         >
            Вернуться в каталог
         </Button>
      </Box>
   );
};
