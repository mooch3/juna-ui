import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
  useRef,
} from "react";
import styles from "./Switch.module.scss";

type SwitchProps = {
  onSwitch: (checked: boolean) => void;
  children: React.ReactNode;
  loading?: boolean;
  toggledOn?: boolean;
  disabled?: boolean;
};

type OnOffProps = {
  children: React.ReactNode;
};

type SwitchCtx = {
  loading?: boolean;
  on: boolean;
  disabled?: boolean;
  toggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SwitchContext = createContext<SwitchCtx>({
  loading: false,
  disabled: false,
  on: false,
  toggle: () => {},
});

const useSwitchContext = () => {
  const ctx = useContext(SwitchContext);
  if (!ctx) {
    throw new Error(
      `Switch components cannot be rendered outside of Switch context`
    );
  }
  return ctx;
};

const Switch = ({
  onSwitch,
  children,
  loading,
  toggledOn,
  disabled,
}: SwitchProps) => {
  const [on, setOn] = useState(toggledOn || false);
  const firstMount = useRef(true);
  const toggle = useCallback(() => {
    if (loading || disabled) {
      return;
    }
    setOn((prevValue) => {
      onSwitch(!prevValue);
      return !prevValue;
    });
  }, [onSwitch, loading, disabled]);

  useEffect(() => {
    if (firstMount.current) {
      onSwitch(on);
    }
    return () => {
      firstMount.current = false;
    };
  }, [on, onSwitch]);

  const value = useMemo(
    () => ({ on, loading, disabled, toggle }),
    [on, loading, disabled, toggle]
  );
  return (
    <SwitchContext.Provider value={value}>
      <div className={styles["switch__container"]}>{children}</div>
    </SwitchContext.Provider>
  );
};

const OnText = ({ children }: OnOffProps) => {
  const { on } = useSwitchContext();
  return on ? <>{children}</> : null;
};

const OffText = ({ children }: OnOffProps) => {
  const { on } = useSwitchContext();
  return on ? null : <>{children}</>;
};

const Toggle = () => {
  const { on, toggle, loading, disabled } = useSwitchContext();
  return (
    <label className={styles["toggle__wrapper"]}>
      <input
        type='checkbox'
        checked={on}
        disabled={disabled}
        onChange={toggle}
        className={styles["toggle__input"]}
      />
      <span
        aria-label='toggle switch'
        className={
          disabled
            ? on
              ? `${styles["toggle__btn--disabled"]} ${styles["toggle__btn--on"]}`
              : `${styles["toggle__btn--disabled"]} ${styles["toggle__btn--off"]}`
            : loading
            ? on
              ? `${styles["toggle__btn--loading"]} ${styles["toggle__btn--on"]}`
              : `${styles["toggle__btn--loading"]} ${styles["toggle__btn--off"]}`
            : on
            ? `${styles["toggle__btn"]} ${styles["toggle__btn--on"]}`
            : `${styles["toggle__btn"]} ${styles["toggle__btn--off"]}`
        }
      />
    </label>
  );
};

Switch.OnText = OnText;
Switch.OffText = OffText;
Switch.Toggle = Toggle;

export default Switch;
