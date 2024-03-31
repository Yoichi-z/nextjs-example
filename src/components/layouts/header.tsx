import styles from "./styles.module.css";

import React from "react";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <>
      <header className={styles.header}>{children}</header>
    </>
  );
}
