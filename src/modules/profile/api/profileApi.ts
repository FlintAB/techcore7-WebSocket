import type { LoginResponse } from "@/modules/auth/types/auth.types";

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

const DELETE_PROFILE_DELAY_MS = 700

export async function deleteProfile(): Promise<void> {
   // DummyJSON doesn't expose an account deletion endpoint, so emulate it.
   await new Promise<void>((resolve) => {
      setTimeout(resolve, DELETE_PROFILE_DELAY_MS)
   })
}
