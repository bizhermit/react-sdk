/// <reference types="react" />
import { ListViewColumnFunction } from "../listview";
export declare const listViewGanttChartColumnClassName = "bh-lv_c-gtc";
declare type GanttChartColumnData = {
    dataName: string;
    fromDataName: string;
    toDataName: string;
    barLabelDataName?: string;
    rateDataName?: string;
    barClassName?: string;
    disabled?: boolean;
};
declare type GanttChartUnit = "day" | "week" | "month";
export declare type ListViewGanttChartColumnProps = {
    name: string;
    disabled?: boolean;
    term: {
        from: Date;
        to: Date;
    };
    dateCellWidth?: number;
    dataNames: Array<GanttChartColumnData>;
    dataType?: "string" | "number" | "date";
    dateFormat?: string;
    progressLine?: boolean;
    unit?: GanttChartUnit;
    barTitleFormat?: (params: {
        from: Date;
        to: Date;
        length: number;
    }) => string;
};
declare const ListViewGanttChartColumn: ListViewColumnFunction<ListViewGanttChartColumnProps>;
export default ListViewGanttChartColumn;
export declare const ListViewGanttChartColumnStyle: JSX.Element;
