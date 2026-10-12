import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
   const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
   })

   if (!response.ok) {
      if (response.status === 400 || response.status === 401) {
         throw new Error('Неверный логин или пароль')
      }

      throw new Error('Не удалось выполнить вход. Попробуйте позже.')
   }

   return await response.json()
}