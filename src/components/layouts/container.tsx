import styles from "./styles.module.css";

import React from "react";

type Container = {
  children: React.ReactNode;
};

export default function Container({ children }: Container) {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
}
