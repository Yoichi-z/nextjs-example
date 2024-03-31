import styles from "./styles.module.css";

import React from "react";

type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <>
      <nav className={styles.sidebar}>{children}</nav>
    </>
  );
}
