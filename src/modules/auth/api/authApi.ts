import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login (credentials: LoginRequest): Promise<LoginResponse> {
   const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
      credentials: 'include'
   })

   if(!response.ok) throw new Error('Failed on sign in request')

   return await response.json()
}