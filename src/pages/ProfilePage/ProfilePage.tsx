import {
   Alert,
   CircularProgress,
   Container,
} from "@mui/material";
import { ProfileCard } from "../../modules/profile/components/ProfileCard/ProfileCard";
import { useProfile } from "../../modules/profile/hooks/useProfile";

export const ProfilePage = () => {
   const { data, isPending, error } = useProfile()

   if (isPending) {
      return <CircularProgress />
   }

   if (error) {
      return <Alert severity="error">{error.message}</Alert>
   }

   if (!data) {
      return null
   }

   return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
         <ProfileCard user={data} />
      </Container>
   )
}