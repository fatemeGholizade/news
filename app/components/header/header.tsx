import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <h1 className={styles.logo}>News</h1>
      </div>
    </header>
  );
};

export default Header;
