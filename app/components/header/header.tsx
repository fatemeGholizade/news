import React from "react";
import styles from "app/components/header/header.module.scss";
import SearchInput from "app/components/searchInput/searchInput";

const Header = () => {
  return (
    <header className={styles.site_header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>News</h1>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
