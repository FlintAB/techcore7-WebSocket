import { Alert, Button, CircularProgress, Container, Stack } from "@mui/material"
import { useState } from "react"

import { DeleteProfileDialog } from "@/modules/profile/components/DeleteProfileDialog/DeleteProfileDialog"
import { ProfileCard } from "@/modules/profile/components/ProfileCard/ProfileCard"
import { useDeleteProfile } from "@/modules/profile/hooks/useDeleteProfile"
import { useProfile } from "@/modules/profile/hooks/useProfile"

export const ProfilePage = () => {
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

   const { data, isPending, error } = useProfile()
   const deleteProfile = useDeleteProfile()

   if (isPending) {
      return <CircularProgress />
   }

   if (error) {
      return <Alert severity="error">{error.message}</Alert>
   }

   if (!data) {
      return null
   }

   const handleCloseDeleteDialog = () => {
      setIsDeleteDialogOpen(false)
      deleteProfile.reset()
   }

   return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
         <Stack spacing={3}>
            <ProfileCard user={data} />

            <Button
               color="error"
               variant="outlined"
               sx={{ alignSelf: "flex-end" }}
               onClick={() => setIsDeleteDialogOpen(true)}
            >
               Удалить профиль
            </Button>
         </Stack>

         <DeleteProfileDialog
            open={isDeleteDialogOpen}
            isPending={deleteProfile.isPending}
            error={deleteProfile.error?.message}
            onClose={handleCloseDeleteDialog}
            onConfirm={() => deleteProfile.mutate()}
         />
      </Container>
   )
}
