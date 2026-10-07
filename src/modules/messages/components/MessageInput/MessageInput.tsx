import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

type MessageInputProps = {
   onSend: (message: string) => void
   disabled?: boolean
}

export const MessageInput = ({ onSend, disabled = false }: MessageInputProps) => {
   const [message, setMessage] = useState("")

   const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()

      const trimmedMessage = message.trim()

      if (!trimmedMessage) {
         return
      }

      onSend(trimmedMessage)
      setMessage("")
   }

   return (
      <Stack
         component="form"
         spacing={1}
         onSubmit={handleSubmit}
         direction={{
            xs: "column",
            sm: "row",
         }}
      >
         <TextField
            fullWidth
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Введите сообщение"
            disabled={disabled}
         />

         <Button
            type="submit"
            variant="contained"
            disabled={disabled || !message.trim()}
         >
            Отправить
         </Button>
      </Stack>
   )
}