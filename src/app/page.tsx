import Chat from "@/components/chat/chat";
import styles from "./chat-page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles["chat-main-wrapper"]}>
        <Chat />
      </main>
    </>
  );
}
