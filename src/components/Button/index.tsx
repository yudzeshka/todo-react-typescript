import React from "react";
import styles from "./Button.module.scss";
import { IButton } from "../../types/data";

const Button: React.FC<IButton> = (props) => {
  const { text, onClick, type } = props;
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
