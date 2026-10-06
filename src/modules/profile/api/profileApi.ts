import type { LoginResponse } from "../../auth/types/auth.types";

export async function getProfile(accessToken: string): Promise<LoginResponse> {
   const response = await fetch("https://dummyjson.com/auth/me", {
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
   })

   if (!response.ok) {
      throw new Error("Ошибка при загрузке данных профиля")
   }

   return await response.json()
}