import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const LoginForm = () => {
   const { mutate, isPending, error } = useLogin()
   const [userName, setUserName] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   const navigate = useNavigate()

   if(error) return 'Произошла ошибка:' + error.message

   function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault()
         mutate(
            {
               username: userName.trim(),
               password: password.trim(),
            },
            {
               onSuccess: () => {
                  navigate({ to: '/products' })
            },
            },
         )
   } 

return (
   <Box
      sx={{
         minHeight: "calc(100vh - 64px)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         px: 2,
      }}
   >
      <Box
         component="form"
         onSubmit={handleSubmit}
         sx={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "background.paper",
         }}
      >
         <Box
            sx={{
               fontSize: "1.75rem",
               fontWeight: 600,
               textAlign: "center",
               mb: 1,
            }}
         >
            Вход
         </Box>

         <TextField
            label="Username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            required
         />

         <TextField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            type="password"
            required
         />

         <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            fullWidth
         >
            {isPending ? "Вход..." : "Войти"}
         </Button>

         <Box
            sx={{
               mt: 1,
               p: 2,
               borderRadius: 2,
               backgroundColor: "action.hover",
               textAlign: "center",
               fontSize: "0.875rem",
            }}
         >
            <Box sx={{ mb: 0.5, color: "text.secondary" }}>
               Тестовый аккаунт
            </Box>

            <Box>
               <strong>emilys</strong> / <strong>emilyspass</strong>
            </Box>
         </Box>
      </Box>
   </Box>
)
}