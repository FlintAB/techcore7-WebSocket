import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { useAuthStore } from "@/modules/auth/store/authStore"
import { deleteProfile } from "@/modules/profile/api/profileApi"

export const useDeleteProfile = () => {
   const queryClient = useQueryClient()
   const navigate = useNavigate()
   const logout = useAuthStore((state) => state.logout)

   return useMutation({
      mutationFn: deleteProfile,
      onSuccess: () => {
         queryClient.removeQueries({ queryKey: ["profile"] })
         logout()
         navigate({ to: "/products", replace: true })
      },
   })
}
