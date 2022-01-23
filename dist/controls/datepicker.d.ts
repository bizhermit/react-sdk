import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare const datePickerClassName = "bh-dtp";
declare type DatePickerValue = string | number | Date;
export declare type DatePickerController = {
    focus: () => DatePickerController;
    blur: () => DatePickerController;
    getValue: () => DatePickerValue;
    setValue: (value: DatePickerValue) => DatePickerController;
};
export declare type DatePickerOptions = {
    mode?: "ymd" | "ym" | "y";
    dataType?: "string" | "number" | "date";
    format?: string;
    positiveButtonLabel?: string | JSX.Element;
    negativeButtonLabel?: string | JSX.Element;
    uiType?: "list" | "calendar";
    monthTexts?: "en" | "en-s" | "ja" | "num" | Array<string>;
    weekTexts?: "en" | "ja" | Array<string>;
    startWeek?: number;
    rangeFrom?: Date;
    rangeTo?: Date;
};
export declare type DatePickerEventListener = {
    clickPositive?: (date: Date) => void | Promise<void>;
    clickNegative?: () => void | Promise<void>;
    clickCell?: (date: Date) => void;
};
export declare type DatePickerProps = InputControlProps<DatePickerController, DatePickerValue> & DatePickerOptions & DatePickerEventListener;
declare const DatePicker: VFC<DatePickerProps>;
export default DatePicker;
export declare const DatePickerStyle: JSX.Element;
