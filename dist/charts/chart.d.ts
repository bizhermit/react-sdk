import { CSSProperties, VFC } from "react";
import { FitToOuter } from "../utils/classname-utils";
export declare type ChartDataProps = {
    type: "bar" | "line";
    values: Array<number>;
};
export declare type ChartOptions = {};
export declare type ChartProps = {
    className?: string;
    style?: CSSProperties;
    fitToOuter?: FitToOuter;
    labels: Array<string | {
        label: string;
    }>;
    data: Array<ChartDataProps>;
    options?: ChartOptions;
};
declare const Chart: VFC<ChartProps>;
export default Chart;
export declare const ChartStyle: JSX.Element;
