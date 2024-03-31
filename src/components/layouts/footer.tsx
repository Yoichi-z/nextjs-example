import styles from "./styles.module.css";

import React from "react";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>フッターです</footer>
    </>
  );
}
