import React from "react";
declare type PrettyButtonProps = {
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
declare const Button: ({ danger, onClick, type, children, customStyles, disabled, hidden, id, loading, form, }: PrettyButtonProps) => JSX.Element;
export default Button;
