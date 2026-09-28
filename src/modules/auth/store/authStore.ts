import { create } from "zustand";
import type { AuthState } from "../types/auth.types";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         accessToken: null,
         refreshToken: null,

         setTokens: (accessToken, refreshToken) =>
         set({ accessToken, refreshToken }),

         logout: () =>
         set({
            accessToken: null,
            refreshToken: null,
         }),
      }),
         {
            name: "auth-storage",
      },
   ),
);