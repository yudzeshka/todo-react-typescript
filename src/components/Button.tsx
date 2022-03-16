import React from "react";

interface IButton {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButton> = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
