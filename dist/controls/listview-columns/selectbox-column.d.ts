/// <reference types="react" />
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
import { SelectBoxOptions } from "../selectbox";
export declare const listViewSelectBoxColumnClassName = "bh-lv_c-slb";
export declare type ListViewSelectBoxColumnProps = ListViewEditColumnProps<{
    value: number | string;
    label: string;
}> & {
    labelDataName?: string;
    selectBoxOptions?: SelectBoxOptions;
    source: Array<{
        [key: string]: any;
    }> | (() => Promise<Array<{
        [key: string]: any;
    }>>);
};
declare const ListViewSelectBoxColumn: ListViewColumnFunction<ListViewSelectBoxColumnProps>;
export default ListViewSelectBoxColumn;
export declare const ListViewSelectBoxColumnStyle: JSX.Element;
