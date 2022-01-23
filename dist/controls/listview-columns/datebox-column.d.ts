/// <reference types="react" />
import { DateBoxOptions } from "../datebox";
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
export declare const listViewDateBoxColumnClassName = "bh-lv_c-dtb";
export declare type ListViewDateBoxColumnProps = ListViewEditColumnProps<{}> & {
    labelDataName?: string;
    labelFormat?: string | ((date: Date) => string);
    dateBoxOptions?: DateBoxOptions;
    optimizeEditedRowData?: boolean;
};
declare const ListViewDateBoxColumn: ListViewColumnFunction<ListViewDateBoxColumnProps>;
export default ListViewDateBoxColumn;
export declare const ListViewDateBoxColumnStyle: JSX.Element;
