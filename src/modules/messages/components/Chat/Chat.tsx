import { Alert, CircularProgress, Stack, Typography } from "@mui/material";

import { useWebSocket } from "../../hooks/useWebSocket";
import { MessageInput } from "../MessageInput/MessageInput";
import { MessageList } from "../MessageList/MessageList";

export const Chat = () => {
   const {
      messages,
      isConnected,
      error,
      sendMessage,
   } = useWebSocket()

   return (
      <Stack spacing={2}>
         <Typography variant="h4" component="h1">
            Сообщения
         </Typography>

         {!isConnected && !error && (
            <Stack direction="row" spacing={1} >
               <CircularProgress size={20} />
               <Typography>
                  Подключение...
               </Typography>
            </Stack>
         )}

         {error && (
            <Alert severity="error">
               {error}
            </Alert>
         )}

         <MessageList messages={messages} />

         <MessageInput
            onSend={sendMessage}
            disabled={!isConnected}
         />
      </Stack>
   )
}