
import { useState } from "react";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const LoginForm = () => {
   const { mutate, isPending, error, reset } = useLogin()
   const [userName, setUserName] = useState('')
   const [password, setPassword] = useState('')
   const [validationError, setValidationError] = useState<string | null>(null)

   const navigate = useNavigate()

   function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault()

      const username = userName.trim()

      if (!username || !password) {
         setValidationError('Заполните логин и пароль')
         return
      }

      setValidationError(null)

      mutate(
         {
            username,
            password,
         },
         {
            onSuccess: () => {
               navigate({ to: '/products' })
            },
         },
      )
   }

   function handleUsernameChange(value: string) {
      setUserName(value)
      setValidationError(null)
      reset()
   }

   function handlePasswordChange(value: string) {
      setPassword(value)
      setValidationError(null)
      reset()
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

            {(validationError || error) && (
               <Alert severity="error">
                  {validationError || error?.message}
               </Alert>
            )}

            <TextField
               label="Username"
               name="username"
               value={userName}
               onChange={(e) => handleUsernameChange(e.target.value)}
               error={Boolean(validationError && !userName.trim())}
               fullWidth
               required
               autoComplete="username"
               disabled={isPending}
            />

            <TextField
               label="Password"
               name="password"
               value={password}
               onChange={(e) => handlePasswordChange(e.target.value)}
               error={Boolean(validationError && !password)}
               fullWidth
               type="password"
               required
               autoComplete="current-password"
               disabled={isPending}
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
