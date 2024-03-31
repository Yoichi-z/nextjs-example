import styles from "./chat.module.css";

import React from 'react'
import Markdown from 'react-markdown'

type ChatMessageType = {
    message:string,
    messageType:"user-message" | "gpt-response"
}

const ChatMessage = ({message, messageType}:ChatMessageType) => {
  return (
    <div className={`${styles["message"]} ${styles[messageType]}`}><Markdown>{message}</Markdown></div>
  )
}

export default ChatMessage