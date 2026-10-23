import { Alert, CircularProgress, Stack, Typography } from "@mui/material";

import { useWebSocket } from "@/modules/messages/hooks/useWebSocket";
import { MessageInput } from "@/modules/messages/components/MessageInput/MessageInput";
import { MessageList } from "@/modules/messages/components/MessageList/MessageList";

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

         <Stack
            sx={{
               height: {
                  xs: 400,
                  sm: 500,
                  md: 600,
               },
               border: 1,
               borderColor: "divider",
               borderRadius: 2,
               p: 2,
               overflowY: "auto",
            }}
         >
            <MessageList messages={messages} />
         </Stack>

         <MessageInput
            onSend={sendMessage}
            disabled={!isConnected}
         />
      </Stack>
   )
}