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
};

type SummaryProps = {
  children: React.ReactNode;
  expandIcon: React.ReactNode;
};

type ContentProps = {
  children: React.ReactNode;
};

type AccordionCtx = {
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
  hidden: true,
  toggle: () => {},
});

// wrapper actionable component
const Accordion = ({ children }: AccordionProps) => {
  const [hidden, setHidden] = useState(true);
  const value = useMemo(
    () => ({
      hidden,
      toggle: () => {
        setHidden((prevValue) => !prevValue);
      },
    }),
    [hidden]
  );
  return (
    <AccordionContext.Provider value={value}>
      <div
        className={
          hidden
            ? styles.jui__accordion
            : `${styles.jui__accordion} ${styles.expanded}`
        }
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const Summary = ({ children, expandIcon }: SummaryProps) => {
  const { hidden, toggle } = useAccordionContext();

  const handleExpand = () => {
    toggle();
  };

  return (
    <div role='button' className={styles.jui__summary} onClick={handleExpand}>
      <header>{children}</header>
      <div
        aria-label='expand accordion'
        className={
          hidden
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
