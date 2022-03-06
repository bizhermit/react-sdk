import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare const dateBoxClassName = "bh-dtb";
declare type DateBoxValue = string | number | Date;
export declare type DateBoxController = {
    focus: () => DateBoxController;
    blur: () => DateBoxController;
    getValue: () => DateBoxValue;
    setValue: (value: DateBoxValue) => DateBoxController;
    getDate: () => Date;
    setDate: (date: Date) => DateBoxController;
};
export declare type DateBoxOptions = {
    mode?: "ymd" | "ym" | "y";
    dataType?: "string" | "number" | "date";
    labelFormat?: string | ((date: Date) => string);
    pulldownButton?: boolean;
    clearButton?: boolean;
    disabledInputs?: boolean;
};
export declare type DateBoxEventListener = {
    changed?: (after: DateBoxValue, before: DateBoxValue) => void;
    focus?: (value: DateBoxValue) => void;
    blur?: (value: DateBoxValue) => void;
};
export declare type DateBoxProps = InputControlProps<DateBoxController, DateBoxValue> & DateBoxOptions & DateBoxEventListener;
declare const DateBox: VFC<DateBoxProps>;
export default DateBox;
export declare const DateBoxStyle: JSX.Element;
