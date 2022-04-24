import React, {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useMemo,
  useRef,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./Select.module.scss";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { collapse, containerFastCollapse, item } from "../../gestures/gestures";

type SelectProps<OptionType> = PropsWithChildren<{
  defaultValue?: any;
  onChange?: (value: OptionType) => void;
  style?: React.CSSProperties;
  showSearch?: boolean;
  filterOption?: (input: string, option: React.ReactChild) => void;
  allowClear?: boolean;
  loading?: boolean;
  placeholder: string;
}>;

type OptionProps<OptionType> = PropsWithChildren<{
  value: OptionType;
  disabled?: boolean;
}>;

type OptGroupProps = PropsWithChildren<{
  label: string;
  children: React.ReactNode;
}>;

type SelectCtx<OptionType> = {
  selectedValue: OptionType | null;
  displayNode: React.ReactNode | null;
  selectValue: (value: any) => void;
  setDisplayNode: (child: React.ReactNode) => void;
};

const useSelectContext = () => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error("This component must be a child of Select");
  }
  return ctx;
};

const SelectContext = createContext<SelectCtx<unknown>>({
  selectedValue: null,
  displayNode: null,
  selectValue: (value: unknown) => {},
  setDisplayNode: (child: React.ReactNode) => {},
});

const Select = <OptionType,>({
  defaultValue,
  onChange,
  style,
  showSearch,
  filterOption,
  allowClear,
  loading,
  placeholder,
  children,
}: SelectProps<OptionType>) => {
  const [selectedValue, setSelectValue] = useState<OptionType>();
  const [displayNode, setDisplayNode] = useState<React.ReactNode>();
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));

  const handleClick = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleClear = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDisplayNode(null);
  };

  const value = useMemo(
    () => ({
      selectedValue,
      displayNode,
      selectValue: (value: OptionType) => {
        setSelectValue(value);
        if (onChange) {
          onChange(value);
        }
      },
      setDisplayNode: (node: React.ReactNode) => {
        setDisplayNode(node);
      },
    }),
    [selectedValue, setSelectValue, displayNode, onChange]
  );

  return (
    <SelectContext.Provider value={value}>
      <div className={styles["jui-wrapper"]}>
        <div
          tabIndex={0}
          className={styles["jui-dd-select"]}
          onClick={handleClick}
          ref={selectRef}
        >
          {!displayNode &&
            (typeof defaultValue === "string" ||
              typeof defaultValue === "number") &&
            defaultValue}
          {!displayNode &&
            typeof (
              defaultValue !== "string" || typeof defaultValue !== "number"
            ) && <div className={styles["jui-placeholder"]}>{placeholder}</div>}
          {!allowClear && displayNode && displayNode}
          {allowClear && displayNode && (
            <div className={styles["jui-clear"]}>
              <span>{displayNode}</span>
              <div className={styles["jui-close"]} onClick={handleClear} />
            </div>
          )}
          <FaChevronDown />
        </div>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {open && (
            <motion.div
              className={styles["jui-dd"]}
              initial='collapsed'
              animate='open'
              exit='collapsed'
              variant={collapse}
            >
              <motion.div variants={containerFastCollapse}>
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SelectContext.Provider>
  );
};

const Option = <OptionType,>({
  value,
  disabled,
  children,
}: OptionProps<OptionType>) => {
  const { selectedValue, selectValue, setDisplayNode } = useSelectContext();
  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    selectValue(value);
    setDisplayNode(children);
  };

  return (
    <motion.li
      className={
        disabled
          ? styles["jui-disabled"]
          : value === selectedValue
          ? styles["jui-selected"]
          : styles["jui-item"]
      }
      onClick={handleSelect}
      variants={item}
    >
      {children}
    </motion.li>
  );
};

const OptGroup = ({ label, children }: OptGroupProps) => {
  return (
    <ul>
      <label>{label}</label>
      <div>{children}</div>
    </ul>
  );
};

Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;
