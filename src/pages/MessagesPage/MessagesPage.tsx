import { Chat } from "@/modules/messages/components/Chat/Chat";
import { Container } from "@mui/material";

export const MessagesPage = () => {
   return (
      <Container maxWidth="md" sx={{ py: 4 }}>
         <Chat />
      </Container>
   )
}