import { Container } from "@mui/material";
import { Chat } from "../../modules/messages/components/Chat/Chat";

export const MessagesPage = () => {
   return (
      <Container maxWidth="md" sx={{ py: 4 }}>
         <Chat />
      </Container>
   )
}