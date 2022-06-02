import React from "react";
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
  hidden: boolean;
  id: string;
};

// wrapper actionable component
const Accordion = ({ children }: AccordionProps) => {
  return <div className={styles.jui__accordion}>{children}</div>;
};
// optional summary
const Summary = ({ children, expandIcon }: SummaryProps) => {
  return (
    <div role='button'>
      <header className={styles.jui__header}>{children}</header>
      <div className={styles.jui__icon}>{expandIcon}</div>
    </div>
  );
};
// content of header
const Content = ({ children, hidden, id }: ContentProps) => {
  return <>{hidden && <div className={styles.jui__content}>{children}</div>}</>;
};

Accordion.Content = Content;
Accordion.Summary = Summary;

export default Accordion;
