import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Buttton";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className="container">
      <form className={styles.searchBar}>
        <Input type="date"/>
        <Input type="date"/>
        <Button className={styles.btn}>Buscar</Button>
      </form>
    </div>
  );
};

export default SearchBar;
