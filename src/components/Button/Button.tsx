import React from "react";
import styles from "./Button.module.scss";

type PrettyButtonProps = {
  danger?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
  disabled?: boolean;
  hidden?: boolean;
  id?: string;
  loading?: boolean;
  form?: string;
};

const Button = ({
  danger,
  onClick,
  type,
  children,
  customStyles,
  disabled,
  hidden,
  id,
  loading,
  form,
}: PrettyButtonProps) => {
  const appliedClass = danger ? styles.danger : styles.pretty;

  return (
    <button
      onClick={onClick}
      type={type}
      style={customStyles}
      className={appliedClass}
      disabled={disabled || loading}
      hidden={hidden}
      id={id}
      form={form}
    >
      {children}
    </button>
  );
};

export default Button;
