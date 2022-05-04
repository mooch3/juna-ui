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
};

type OnOffProps = {
  children: React.ReactNode;
};

type SwitchCtx = {
  on: boolean;
  toggle: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const SwitchContext = createContext<SwitchCtx>({
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

const Switch = ({ onSwitch, children }: SwitchProps) => {
  const [on, setOn] = useState(false);
  const firstMount = useRef(true);
  const toggle = useCallback(() => setOn((prevValue) => !prevValue), []);

  useEffect(() => {
    if (firstMount.current) {
      onSwitch(on);
    }
    return () => {
      firstMount.current = false;
    };
  }, [on, onSwitch]);

  const value = useMemo(() => ({ on, toggle }), [on, toggle]);
  return (
    <SwitchContext.Provider value={value}>{children}</SwitchContext.Provider>
  );
};

const On = ({ children }: OnOffProps) => {
  const { on } = useSwitchContext();
  return on ? <>{children}</> : null;
};

const Off = ({ children }: OnOffProps) => {
  const { on } = useSwitchContext();
  return on ? null : <>{children}</>;
};

const Toggle = () => {
  const { on, toggle } = useSwitchContext();
  console.log("trying to render");
  return (
    <label className={styles["toggle__wrapper"]}>
      <input
        type='checkbox'
        checked={on}
        onClick={toggle}
        className={styles["toggle__input"]}
      />
      <span
        className={
          on
            ? `${styles["toggle__btn"]} ${styles["toggle__btn--on"]}`
            : `${styles["toggle__btn"]} ${styles["toggle__btn--off"]}`
        }
      />
    </label>
  );
};

Switch.On = On;
Switch.Off = Off;
Switch.Toggle = Toggle;

export default Switch;
