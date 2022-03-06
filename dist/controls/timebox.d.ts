import Time from "@bizhermit/time";
import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare const timeBoxClassName = "bh-tmb";
export declare type TimeBoxController = {
    focus: () => TimeBoxController;
    blur: () => TimeBoxController;
    getValue: () => number;
    setValue: () => TimeBoxController;
    getTime: () => Time;
    setTime: (time: Time) => TimeBoxController;
};
declare type TimeBoxMode = "hms" | "hm" | "h" | "ms";
export declare type TimeBoxOptions = {
    mode?: TimeBoxMode;
    labelFormat?: string | ((date: Time) => string);
    pulldownButton?: boolean;
    clearButton?: boolean;
    disabledInputs?: boolean;
    hourInterval?: number;
    minuteInterval?: number;
    secondInterval?: number;
    incrementWhenKeydown?: boolean;
    hourIncrementInterval?: number;
    minuteIncrementInterval?: number;
    secondIncrementInterval?: number;
    unit?: "hour" | "minute" | "second" | "millisecond";
};
export declare type TimeBoxEventListener = {
    changed?: (after: number, before: number) => void;
    focus?: (value: number) => void;
    blur?: (value: number) => void;
};
export declare type TimeBoxProps = InputControlProps<TimeBoxController, number> & TimeBoxOptions & TimeBoxEventListener;
declare const TimeBox: VFC<TimeBoxProps>;
export default TimeBox;
export declare const TimeBoxStyle: JSX.Element;
