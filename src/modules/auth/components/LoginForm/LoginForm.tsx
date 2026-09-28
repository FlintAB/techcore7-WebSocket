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
               username: userName,
               password,
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
         component='form'
         onSubmit={handleSubmit}
      >
         <TextField 
            label="UserName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value.trim())}
            fullWidth
         />
         <TextField 
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            fullWidth
            type="password"
         />

         <Button 
            type="submit" 
            variant='contained' 
            disabled={isPending}
            >
               {isPending ? "Вход..." : "Войти"}
         </Button>
         <div>
            emilys
               |
            emilyspass
         </div>
      </Box>
   )
}