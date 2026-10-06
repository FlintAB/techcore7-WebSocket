import {
   Avatar,
   Card,
   CardContent,
   Stack,
   Typography,
} from "@mui/material";
import type { LoginResponse } from "../../../auth/types/auth.types";

type ProfileCardProps = {
   user: LoginResponse
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
   return (
      <Card>
         <CardContent>
            <Stack
               spacing={2}
            >
               <Avatar
                  src={user.image}
                  alt={user.username}
                  sx={{
                     width: 120,
                     height: 120,
                  }}
               />

               <Typography variant="h5">
                  {user.firstName} {user.lastName}
               </Typography>

               <Typography color="text.secondary">
                  @{user.username}
               </Typography>

               <Typography>
                  {user.email}
               </Typography>
            </Stack>
         </CardContent>
      </Card>
   )
}