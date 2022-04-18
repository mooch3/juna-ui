import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";
import styles from "./Steps.module.scss";

type StepsProps = {
  children: React.ReactNode;
  current: number;
  direction?: "vertical";
};

type StepProps = {
  title?: string;
  index?: number;
  subtitle?: string;
  description?: string;
  isLast?: boolean;
  direction?: "vertical";
};

type StepsContext = {
  current: number;
  totalSteps: number;
};

const useCardContext = () => {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("This component must be a child of Steps");
  }

  return context;
};

const StepContext = createContext<StepsContext>({
  current: 0,
  totalSteps: 0,
});

const Steps = ({ children, current, direction }: StepsProps) => {
  const [totalSteps] = useState(React.Children.count(children));

  const arrayChildren = React.Children.toArray(children);

  const value = useMemo(() => ({ current, totalSteps }), [current, totalSteps]);
  return (
    <StepContext.Provider value={value}>
      <ul
        className={direction === "vertical" ? styles.stepsVert : styles.steps}
      >
        {Children.map(arrayChildren, (child, index) => {
          const isLast = index === arrayChildren.length - 1;
          if (!React.isValidElement(child)) {
            throw new Error("This is not a valid react element ");
          }
          return (
            <>
              {cloneElement(child, {
                index: index,
                title: child.props.title,
                subtitle: child.props.subtitle,
                isLast,
                direction,
              })}
            </>
          );
        })}
      </ul>
    </StepContext.Provider>
  );
};

const Step = ({
  title,
  index,
  subtitle,
  description,
  isLast,
  direction,
}: StepProps) => {
  const { current } = useCardContext();

  return (
    <>
      {direction !== "vertical" ? (
        <div className={styles.col}>
          <div
            className={styles.col}
            style={{
              width: isLast ? "fit-content" : "100%",
              flex: isLast ? "none" : "1 1 75px",
            }}
          >
            <li className={styles.stepHolder}>
              <div
                className={
                  current !== index ? styles.circle : styles.circleSelected
                }
              >
                {index !== undefined && current > index && <FaCheck />}
                {index !== undefined && current <= index && index + 1}
              </div>
              {(title || description) && (
                <div className={styles.row}>
                  {title && <h4>{title}</h4>}
                  {description && <h5>{description}</h5>}
                </div>
              )}

              {!isLast && index !== current - 1 && (
                <div className={styles.line} />
              )}
              {!isLast && index === current - 1 && (
                <div className={styles.lineSelected} />
              )}
            </li>
            {!isLast && index !== current - 1 && (
              <div className={styles.lineVertical} />
            )}
            {!isLast && index === current - 1 && (
              <div className={styles.lineVerticalSelected} />
            )}
          </div>
          {subtitle && <h6>{subtitle}</h6>}
        </div>
      ) : (
        <div className={styles.vertCol}>
          <li className={styles.vertStepHolder}>
            <div
              className={
                current !== index ? styles.circle : styles.circleSelected
              }
            >
              {index !== undefined && current > index && <FaCheck />}
              {index !== undefined && current <= index && index + 1}
            </div>
            {(title || description) && (
              <div className={styles.row}>
                {title && <h4>{title}</h4>}
                {description && <h5>{description}</h5>}
              </div>
            )}
          </li>
          {subtitle && <h6>{subtitle}</h6>}
          {!isLast && index !== current - 1 && (
            <div className={styles.lineVert} />
          )}
          {!isLast && index === current - 1 && (
            <div className={styles.lineVertSelected} />
          )}
        </div>
      )}
    </>
  );
};

Steps.Step = Step;

export default Steps;
