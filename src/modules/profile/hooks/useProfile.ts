import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/authStore";
import { getProfile } from "../api/profileApi";

export const useProfile = () => {
   const accessToken = useAuthStore((state) => state.accessToken)

   return useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfile(accessToken!),
      enabled: Boolean(accessToken),
   })
}