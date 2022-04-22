import React, {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useMemo,
} from "react";
import { FaChevronDown } from "react-icons/fa";
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
  selectValue: (value: any) => void;
};

const useSelectContext = () => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error("This component must be a child of Select");
  }
  return ctx;
};

const SelectContext = createContext<SelectCtx<any>>({
  selectedValue: null,
  selectValue: (value: any) => {},
});

const Select = <OptionType extends any>({
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
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevValue) => !prevValue);
  };
  const value = useMemo(
    () => ({ selectedValue, selectValue: () => setSelectValue }),
    [selectedValue, setSelectValue]
  );
  return (
    <SelectContext.Provider value={value}>
      <div className={styles["jui-dd-select"]} onClick={handleClick}>
        {typeof defaultValue === "string" || typeof defaultValue === "number"
          ? defaultValue
          : placeholder}
        <FaChevronDown />
        {open && <div className={styles["jui-dd"]}>{children}</div>}
      </div>
    </SelectContext.Provider>
  );
};

const Option = <OptionType extends any>({
  value,
  disabled,
  children,
}: OptionProps<OptionType>) => {
  const { selectedValue, selectValue } = useSelectContext();

  const handleSelect = () => {
    selectValue(value);
  };

  return (
    <li
      className={
        disabled
          ? styles["juna-ui-disabled"]
          : value === selectedValue
          ? styles["juna-ui-selected"]
          : styles["juna-ui_item"]
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
