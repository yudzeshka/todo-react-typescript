import React from "react";
import styles from "./Button.module.scss";

interface IButton {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit";
}

const Button: React.FC<IButton> = (props) => {
  console.log(styles);
  const { text, onClick, type } = props;
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
