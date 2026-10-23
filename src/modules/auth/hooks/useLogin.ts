import { useMutation } from "@tanstack/react-query";
import { login } from "@/modules/auth/api/authApi";
import { useAuthStore } from "@/modules/auth/store/authStore";;

export const useLogin = () => {
   const setTokens = useAuthStore((state) => state.setTokens);

   return useMutation({
      mutationFn: login,
         onSuccess: (data) => {
            setTokens(data.accessToken, data.refreshToken)
      },
   });
};