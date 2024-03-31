"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import TextareaAutosize from "react-textarea-autosize";
import ChatMessage from "./chat-message";
import { Message, useChat } from "ai/react";
import { useRecoilState } from "recoil";
import { counterAtom } from "@/store/atom";

const Chat = () => {
  const [histories, setHistories] = useRecoilState(counterAtom);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: "api/chat",
    onError: (e) => {
      console.log(e);
    },
    onFinish(message) {
      //setHistories([...histories, message])
      //setHistories([...messages])
      console.log("完了")
    },
    initialMessages: histories,
  });

  useEffect(() => {
    setHistories([...messages]);
  }, [chatEndpointIsLoading]);



  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    console.log("#今までの保存履歴");
    console.log(histories);
    e.preventDefault();
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      console.log("処理中？");
      return;
    }
    handleSubmit(e);
  }

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // if (messageContainerRef.current) {
    //   messageContainerRef.current.scrollIntoView({ behavior: "auto" });
    // }

    if (messageContainerRef.current) {
      const element = messageContainerRef.current;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }

  }, [messages]);

  return (
    <div className={styles["chat-container"]} id="chat-log" ref={messageContainerRef}>
      {messages.length > 0
        ? [...messages].map((message) => {
            return (
              <ChatMessage
              key={message.id}
                message={message.content}
                messageType="user-message"
              />
            );
          })
        : ""}
      <form onSubmit={sendMessage}>
        <div className={styles["chat-input"]}>
          <TextareaAutosize
            id="user-input"
            className={styles["chat-textarea"]}
            placeholder="質問を入力..."
            value={input}
            onChange={handleInputChange}
          ></TextareaAutosize>
          <div className={styles["button-bottom-container"]}>
            <button type="submit">送信</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
