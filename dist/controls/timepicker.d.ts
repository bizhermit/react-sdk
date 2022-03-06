import Time from "@bizhermit/time";
import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare type TimePickerController = {
    focus: () => TimePickerController;
    blur: () => TimePickerController;
    getValue: () => number;
    setValue: (value: number) => TimePickerController;
};
declare type TimePickerMode = "hms" | "hm" | "h" | "ms";
export declare type TimePickerOptions = {
    mode?: TimePickerMode;
    labelFormat?: string | ((date: Time) => string);
    pulldownButton?: boolean;
    clearButton?: boolean;
    disabledInputs?: boolean;
    incrementWhenKeydown?: boolean;
    hourInterval?: number;
    minuteInterval?: number;
    secondInterval?: number;
    unit?: "hour" | "minute" | "second" | "millisecond";
    positiveButtonLabel?: string | JSX.Element;
    negativeButtonLabel?: string | JSX.Element;
};
export declare type TimePickerEventListener = {
    clickPositive?: (time: number) => void | Promise<void>;
    clickNegative?: () => void | Promise<void>;
    clickCell?: (time: number) => void;
};
export declare type TimePickerProps = InputControlProps<TimePickerController, number> & TimePickerOptions & TimePickerEventListener;
declare const TimePicker: VFC<TimePickerProps>;
export default TimePicker;
export declare const TimePickerStyle: JSX.Element;
