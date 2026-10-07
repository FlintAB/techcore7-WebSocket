import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/messages.types";

export const useWebSocket = () => {
   const [messages, setMessages] = useState<Message[]>([])
   const [isConnected, setIsConnected] = useState(false)
   const [error, setError] = useState<string | null>(null)

   const socketRef = useRef<WebSocket | null>(null)

   useEffect(() => {
      const socket = new WebSocket("wss://ws.ifelse.io/")

      socketRef.current = socket

      socket.onopen = () => {
         setIsConnected(true)
      }

      socket.onmessage = (event) => {
         setMessages((prev) => [
            ...prev,
            {
               id: crypto.randomUUID(),
               text: event.data,
               isOwn: false,
            },
         ])
      }

      socket.onerror = () => {
         setError("Ошибка WebSocket")
      }

      socket.onclose = () => {
         setIsConnected(false)
      }

      return () => {
         socket.close()
         socketRef.current = null
      }
   }, [])

   const sendMessage = (text: string) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) {
         return
      }

      socketRef.current.send(text)

      setMessages((prev) => [
         ...prev,
         {
            id: crypto.randomUUID(),
            text,
            isOwn: true,
         },
      ])
   }  

   return {
      messages,
      isConnected,
      error,
      sendMessage,
   }
}