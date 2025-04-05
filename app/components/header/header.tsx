import React from "react";
import styles from "./header.module.scss";
import SearchInput from "../search-Input/searchInput";

const Header = () => {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <h1 className={styles.logo}>News</h1>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
