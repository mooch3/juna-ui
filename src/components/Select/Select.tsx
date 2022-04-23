import React, {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useMemo,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Select.module.scss";

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
  children?: React.ReactNode;
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
  const handleClick = () => {
    setOpen((prevValue) => !prevValue);
  };

  const value = useMemo(
    () => ({
      selectedValue,
      displayNode,
      selectValue: (value: OptionType) => {
        console.log(value);
        setSelectValue(value);
      },
      setDisplayNode: (node: React.ReactNode) => {
        setDisplayNode(node);
      },
    }),
    [selectedValue, setSelectValue, displayNode]
  );
  return (
    <SelectContext.Provider value={value}>
      <div className={styles["jui-wrapper"]}>
        <div
          tabIndex={0}
          className={styles["jui-dd-select"]}
          onClick={handleClick}
        >
          {typeof defaultValue === "string" || typeof defaultValue === "number"
            ? defaultValue
            : placeholder}
          {!open ? <FaChevronDown /> : <FaChevronUp />}
        </div>
        {open && <div className={styles["jui-dd"]}>{children}</div>}
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
    <li
      className={
        disabled
          ? styles["jui-disabled"]
          : value === selectedValue
          ? styles["jui-selected"]
          : styles["jui-item"]
      }
      onClick={handleSelect}
    >
      {children}
    </li>
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
