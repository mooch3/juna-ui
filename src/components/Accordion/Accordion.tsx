import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Accordion.module.scss";

type AccordionProps = {
  children?: React.ReactNode;
  expanded?: boolean;
  removeGutters?: boolean;
  disabled?: boolean;
};

type SummaryProps = {
  children: React.ReactNode;
  expandIcon: React.ReactNode;
};

type ContentProps = {
  children: React.ReactNode;
};

type AccordionCtx = {
  disabled?: boolean;
  hidden: boolean;
  toggle: () => void;
};

const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("This component must be a child of Accordion");
  }
  return ctx;
};

const AccordionContext = createContext<AccordionCtx>({
  disabled: false,
  hidden: true,
  toggle: () => {},
});

// wrapper actionable component
const Accordion = ({
  children,
  expanded,
  removeGutters,
  disabled,
}: AccordionProps) => {
  const [hidden, setHidden] = useState(expanded ? false : true);
  const value = useMemo(
    () => ({
      hidden,
      disabled,
      toggle: () => {
        setHidden((prevValue) => !prevValue);
      },
    }),
    [hidden, disabled]
  );
  // move to function
  let appliedClasses;

  if (disabled) {
    appliedClasses = `${styles.jui__accordion} ${styles.disabled}`;
  } else {
    if (hidden || removeGutters) {
      appliedClasses = styles.jui__accordion;
    } else {
      appliedClasses = `${styles.jui__accordion} ${styles.expanded}`;
    }
  }

  return (
    <AccordionContext.Provider value={value}>
      <div className={appliedClasses}>{children}</div>
    </AccordionContext.Provider>
  );
};

const Summary = ({ children, expandIcon }: SummaryProps) => {
  const { hidden, toggle, disabled } = useAccordionContext();

  const handleExpand = () => {
    if (disabled) {
      return;
    }
    toggle();
  };

  return (
    <div
      role='button'
      className={
        !disabled
          ? styles.jui__summary
          : `${styles.jui__summary} ${styles.disabled}`
      }
      onClick={handleExpand}
    >
      <header>{children}</header>
      <div
        aria-label='expand accordion'
        className={
          disabled
            ? `${styles["jui__summary--icon"]} ${styles.disabled}`
            : hidden
            ? styles["jui__summary--icon"]
            : `${styles["jui__summary--icon"]} ${styles.expanded}`
        }
      >
        {expandIcon}
      </div>
    </div>
  );
};
// content of header
const Content = ({ children }: ContentProps) => {
  const { hidden } = useAccordionContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hidden && contentRef.current) {
      contentRef.current.style.maxHeight =
        contentRef.current.scrollHeight.toString() + "px";
    } else if (contentRef.current && hidden) {
      contentRef.current.style.maxHeight = "0";
    }
  }, [hidden, contentRef]);

  return (
    <div ref={contentRef} className={styles["jui__content--wrapper"]}>
      <div className={styles.jui__content}>{children}</div>
    </div>
  );
};

Accordion.Content = Content;
Accordion.Summary = Summary;

export default Accordion;
