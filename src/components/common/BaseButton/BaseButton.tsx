import React from "react";
import styles from "./BaseButton.module.scss";
import { IBaseButton } from "../../../types/data";

const BaseButton: React.FC<IBaseButton> = (props) => {
  const { text, onClick, type } = props;
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default BaseButton;
