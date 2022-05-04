import React from "react";
import styles from "./LoadingSpinner.module.scss";

type LoadingSpinnerProps = {
  large?: boolean;
};

const LoadingSpinner = ({ large }: LoadingSpinnerProps) => {
  return (
    <div
      className={
        large ? styles["lds__ring--large"] : styles["lds__ring--small"]
      }
      role='alert'
      aria-label='loading'
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
