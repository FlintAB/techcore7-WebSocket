import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";;

export const useLogin = () => {
   const setTokens = useAuthStore((state) => state.setTokens);

   return useMutation({
      mutationFn: login,
         onSuccess: (data) => {
            setTokens(data.accessToken, data.refreshToken)
      },
   });
};