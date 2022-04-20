import React from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  value?: string | number | readonly string[];
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: boolean;
  disabled?: boolean;
};

const Checkbox = ({
  value,
  checked,
  onChange,
  defaultChecked,
  disabled,
}: CheckboxProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };
  return (
    <input
      className={styles.checkbox}
      type='checkbox'
      value={value}
      checked={checked}
      onChange={onChangeHandler}
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  );
};

export default Checkbox;
