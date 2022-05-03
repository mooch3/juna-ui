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
import { collapse, container, item } from "../../gestures/gestures";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// TODO: if default value is used find the the select option with the corresponding value
// TODO: and set it as selected
// TODO: Add opt group to group options together under subheaders
type BaseProps<OptionT> = {
  defaultValue?: OptionT;
  onChange?: (value: OptionT) => void;
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
  defaultValue?: never;
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

type SelectCtx<OptionT> = {
  selectedValue: OptionT | null;
  selectedValues?: OptionT[];
  displayNode: React.ReactNode | null;
  filteredChildren: React.ReactNode | null;
  multiSelect?: boolean;
  selectValue: (value: any) => void;
  selectValues: (value: any) => void;
  setDisplayNode: (child: React.ReactNode) => void;
  setDisplayNodes: (nodeValue: [React.ReactNode, any]) => void;
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
  setDisplayNodes: (nodeValue: [React.ReactNode, unknown]) => {},
});

const Select = <OptionT,>({
  defaultValue,
  onChange,
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
  const [displayNodes, setDisplayNodes] = useState<
    [React.ReactNode, OptionT][]
  >([]);
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

  const handleRemoveNode = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: React.ReactNode,
    value: OptionT
  ) => {
    e.stopPropagation();
    const remainingNodes = displayNodes.filter(
      ([childNode]) => childNode !== node
    );
    const remainingValues = selectedValues.filter(
      (selectedValue) => selectedValue !== value
    );
    setSelectedValues(remainingValues);
    setDisplayNodes(remainingNodes);
  };

  const handleFilter = () => {
    if (loading) {
      return;
    }
    if (inputRef?.current) {
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
        if (inputRef && inputRef?.current) {
          inputRef.current.value = "";
          setFilteredChildren(null);
        }
        setSelectValue(value);
        if (onChange) {
          onChange(value);
        }
      },
      selectValues: (value: OptionT) => {
        const duplicate = displayNodes.some(
          ([, oldValue]) => value === oldValue
        );
        if (duplicate) {
          // remove from displayNodes and selectValues
          const remainingNodes = displayNodes.filter(
            ([, oldValue]) => oldValue !== value
          );
          const remainingValues = selectedValues.filter(
            (selectedValue) => selectedValue !== value
          );
          setSelectedValues(remainingValues);
          setDisplayNodes(remainingNodes);
          return;
        }
        setSelectedValues((prevValue) => [...prevValue, value]);
      },
      setDisplayNode: (node: React.ReactNode) => {
        setDisplayNode(node);
      },
      setDisplayNodes: (nodeValue: [React.ReactNode, OptionT]) => {
        const [newNode] = nodeValue;
        const duplicate = displayNodes.some(([node]) => node === newNode);
        if (duplicate) {
          return;
        }
        setDisplayNodes((prevValue) => [...prevValue, nodeValue]);
      },
    }),
    [
      selectedValue,
      selectedValues,
      displayNode,
      filteredChildren,
      multiSelect,
      onChange,
      displayNodes,
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
          aria-label='Open drop down'
        >
          {!displayNode &&
            !filterOption &&
            (typeof defaultValue === "string" ||
              typeof defaultValue === "number") &&
            defaultValue}
          {!displayNode &&
            !filterOption &&
            (typeof defaultValue !== "string" ||
              typeof defaultValue !== "number") && (
              <div className={styles["jui__placeholder"]}>{placeholder}</div>
            )}
          {!allowClear && displayNode && displayNode}
          {allowClear && displayNode && (
            <div className={styles["jui__clear"]}>
              <span aria-label='Selected option'>{displayNode}</span>
              <div
                className={styles["jui__close"]}
                aria-label='Remove option'
                onClick={handleClear}
              />
            </div>
          )}
          {displayNodes &&
            // TODO: flex wrapper
            displayNodes.map(([node, value], index) => (
              <div className={styles["jui__clear"]} key={index}>
                <span aria-label='Selected options'>{node}</span>
                <div
                  className={styles["jui__close"]}
                  onClick={(e) => handleRemoveNode(e, node, value)}
                />
              </div>
            ))}
          {!displayNode && !displayNodes.length && filterOption && (
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
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles["jui__dd"]}
              initial='collapsed'
              animate='open'
              exit='collapsed'
              variants={container}
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
    selectedValues,
    selectValue,
    selectValues,
    setDisplayNode,
    setDisplayNodes,
    multiSelect,
  } = useSelectContext();
  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (multiSelect) {
      setDisplayNodes([children, value]);
      selectValues(value);
      // put select values into an array
      return;
    }
    selectValue(value);
    setDisplayNode(children);
  };

  let className = styles["jui__item"];
  if (disabled) {
    className = styles["jui__item--disabled"];
  } else {
    if (multiSelect) {
      if (selectedValues?.includes(value)) {
        className = styles["jui__item--selected"];
      }
    } else {
      if (value === selectedValue) {
        className = styles["jui__item--selected"];
      }
    }
  }

  return (
    <motion.li
      aria-label={`Select ${children}`}
      className={className}
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

Select.Option = Option;

export default Select;
