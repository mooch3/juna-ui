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
};

type OnOffProps = {
  children: React.ReactNode;
};

type SwitchCtx = {
  loading?: boolean;
  on: boolean;
  toggle: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const SwitchContext = createContext<SwitchCtx>({
  loading: false,
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

const Switch = ({ onSwitch, children, loading, toggledOn }: SwitchProps) => {
  const [on, setOn] = useState(toggledOn || false);
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

  const value = useMemo(() => ({ on, loading, toggle }), [on, loading, toggle]);
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
  const { on, toggle, loading } = useSwitchContext();
  console.log("trying to render");
  return (
    <label className={styles["toggle__wrapper"]}>
      <input
        type='checkbox'
        checked={on}
        onClick={!loading ? toggle : undefined}
        className={styles["toggle__input"]}
      />
      <span
        className={
          loading
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
