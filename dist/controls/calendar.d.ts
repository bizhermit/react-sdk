import React, { FC, VFC } from "react";
import { FitToOuter } from "../utils/classname-utils";
import { ControlProps } from "../utils/component-utils";
export declare const calendarClassName = "bh-cal";
export declare type CalendarController = {
    focus: () => CalendarController;
    blur: () => CalendarController;
    getDate: () => Date;
    setDate: (date: Date) => CalendarController;
};
export declare type CalendarCellFC<P = {}> = VFC<P & {
    date: Date;
    targetYM: boolean;
}>;
export declare type CalendarOptions<P> = {
    year?: number;
    month?: number;
    monthTexts?: "en" | "en-s" | "ja" | "num" | Array<string>;
    weekTexts?: "en" | "ja" | Array<string>;
    startWeek?: number;
    cellComponent?: CalendarCellFC<P>;
    cellComponentProps?: P;
};
export declare type CalendarEventListener = {
    changed?: (after: Date, before: Date) => void;
};
export declare type CalendarProps<P> = ControlProps<CalendarController> & CalendarOptions<P> & CalendarEventListener & {
    fitToOuter?: FitToOuter;
};
interface CalendarFunctionComponent extends React.VoidFunctionComponent {
    <P = {}>(props: CalendarProps<P>, context?: any): React.ReactElement<any, any> | null;
}
declare const Calendar: CalendarFunctionComponent;
export default Calendar;
export declare const CalendarCellLabel: FC;
export declare const CalendarStyle: JSX.Element;
