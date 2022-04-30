import React, {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useMemo,
  useRef,
  cloneElement,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./Select.module.scss";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { collapse, item } from "../../gestures/gestures";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type BaseProps<OptionT> = {
  defaultValue?: any;
  onChange?: (value: OptionT) => void;
  style?: React.CSSProperties;
  filterOption?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  multiSelect?: boolean;
};

interface MultiSelectProps<OptionT> extends BaseProps<OptionT> {
  multiSelect: true;
  allowClear: true;
}

interface SelectProps<OptionT> extends BaseProps<OptionT> {
  multiSelect?: false;
  allowClear?: boolean;
}
// show search and filterOption are required together
type OptionProps<OptionT> = PropsWithChildren<{
  value: OptionT;
  disabled?: boolean;
}>;

type OptGroupProps = PropsWithChildren<{
  label: string;
  children: React.ReactNode;
}>;

type SelectCtx<OptionT> = {
  selectedValue: OptionT | null;
  selectedValues?: OptionT[];
  displayNode: React.ReactNode | null;
  filteredChildren: React.ReactNode | null;
  multiSelect?: boolean;
  selectValue: (value: any) => void;
  selectValues: (value: any) => void;
  setDisplayNode: (child: React.ReactNode) => void;
  setDisplayNodes: (child: React.ReactNode) => void;
};
// ** enforce context ** //
const useSelectContext = () => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error("This component must be a child of Select");
  }
  return ctx;
};
// ** declare context ** //
const SelectContext = createContext<SelectCtx<unknown>>({
  selectedValue: null,
  displayNode: null,
  filteredChildren: null,
  selectedValues: [],
  multiSelect: false,
  selectValues: (value: unknown) => {},
  selectValue: (value: unknown) => {},
  setDisplayNode: (child: React.ReactNode) => {},
  setDisplayNodes: (child: React.ReactNode) => {},
});

const Select = <OptionT,>({
  defaultValue,
  onChange,
  style,
  filterOption,
  allowClear,
  loading,
  placeholder,
  children,
  multiSelect,
}: SelectProps<OptionT> | MultiSelectProps<OptionT>) => {
  const [selectedValue, setSelectValue] = useState<OptionT | null>();
  const [selectedValues, setSelectedValues] = useState<OptionT[]>([]);
  const [displayNode, setDisplayNode] = useState<React.ReactNode>();
  const [displayNodes, setDisplayNodes] = useState<React.ReactNode[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<React.ReactNode>();
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(selectRef, () => setOpen(false));

  const handleClick = () => {
    if (loading) {
      return;
    }
    setOpen((prevValue) => !prevValue);
  };

  const handleClear = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDisplayNode(null);
    setSelectValue(null);
  };

  const handleFilter = () => {
    if (loading) {
      return;
    }
    if (inputRef.current) {
      const filteredOptions = React.Children.toArray(children)
        .filter(
          (child) =>
            React.isValidElement(child) &&
            child.props.children
              .toString()
              .toLowerCase()
              .indexOf(inputRef.current!.value.toLowerCase()) > -1
        )
        .map((child) => {
          if (!React.isValidElement(child)) {
            throw new Error("This is not a valid react element ");
          }
          return cloneElement(child);
        });
      setFilteredChildren(filteredOptions);
    }
  };

  const value = useMemo(
    () => ({
      selectedValue,
      selectedValues,
      displayNode,
      filteredChildren,
      multiSelect,
      selectValue: (value: OptionT) => {
        if (inputRef.current) {
          inputRef.current.value = "";
          setFilteredChildren(null);
        }
        setSelectValue(value);
        if (onChange) {
          onChange(value);
        }
      },
      selectValues: (value: OptionT) => {
        setSelectedValues((prevValue) => [...prevValue, value]);
      },
      setDisplayNode: (node: React.ReactNode) => {
        setDisplayNode(node);
      },
      setDisplayNodes: (node: React.ReactNode) => {
        setDisplayNodes((prevValue) => [...prevValue, node]);
      },
    }),
    [
      selectedValue,
      setSelectValue,
      selectedValues,
      setSelectedValues,
      displayNode,
      multiSelect,
      filteredChildren,
      onChange,
    ]
  );

  return (
    <SelectContext.Provider value={value}>
      <div className={styles["jui__wrapper"]}>
        <div
          tabIndex={0}
          className={styles["jui__dd--select"]}
          onClick={handleClick}
          ref={selectRef}
        >
          {!displayNode &&
            !filterOption &&
            (typeof defaultValue === "string" ||
              typeof defaultValue === "number") &&
            defaultValue}
          {!displayNode &&
            !filterOption &&
            typeof (
              defaultValue !== "string" || typeof defaultValue !== "number"
            ) && (
              <div className={styles["jui__placeholder"]}>{placeholder}</div>
            )}
          {!allowClear && displayNode && displayNode}
          {allowClear && displayNode && (
            <div className={styles["jui__clear"]}>
              <span aria-label='Selected option'>{displayNode}</span>
              <div className={styles["jui__close"]} onClick={handleClear} />
            </div>
          )}
          {/* TODO: map display nodes here with jui clear */}
          {!displayNode && filterOption && (
            <input
              disabled={loading}
              placeholder={loading ? "Loading..." : "Search..."}
              aria-label='filter options'
              type='text'
              ref={inputRef}
              onChange={handleFilter}
            />
          )}
          {loading ? <LoadingSpinner /> : <FaChevronDown />}
        </div>
        <AnimatePresence initial={"collapsed"} exitBeforeEnter={true}>
          {open && (
            // clone elements as children, save them to context, then filter context on change
            <motion.div
              className={styles["jui__dd"]}
              initial='collapsed'
              animate='open'
              exit='collapsed'
              variant={collapse}
            >
              <motion.div variants={collapse}>
                {filteredChildren || children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SelectContext.Provider>
  );
};

const Option = <OptionT,>({
  value,
  disabled,
  children,
}: OptionProps<OptionT>) => {
  const {
    selectedValue,
    selectValue,
    setDisplayNode,
    setDisplayNodes,
    multiSelect,
  } = useSelectContext();
  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (multiSelect) {
      setDisplayNodes(children);
      // put select values into an array
      return;
    }
    selectValue(value);
    setDisplayNode(children);
  };

  return (
    <motion.li
      aria-label={`Select ${children}`}
      className={
        disabled
          ? styles["jui__item--disabled"]
          : value === selectedValue
          ? styles["jui__item--selected"]
          : styles["jui__item"]
      }
      onClick={
        !disabled
          ? handleSelect
          : (e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
              e.stopPropagation()
      }
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
