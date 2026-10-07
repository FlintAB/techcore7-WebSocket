import { Stack, Typography } from "@mui/material";
import type { Message } from "../../types/messages.types";

type MessageListProps = {
   messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => {
   if (!messages.length) {
      return (
         <Typography>
            Сообщений пока нет
         </Typography>
      )
   }

   return (
      <Stack spacing={1}>
         {messages.map((message) => (
            <Typography key={message.id}>
               {message.isOwn ? "Вы: " : "Сервер: "}
               {message.text}
            </Typography>
         ))}
      </Stack>
   )
}