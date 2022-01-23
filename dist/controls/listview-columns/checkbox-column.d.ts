/// <reference types="react" />
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
export declare const listViewCheckBoxClassName = "bh-lv_col-checkbox";
declare type CheckBoxValue = boolean | number | string;
export declare type ListViewCheckBoxColumnProps = ListViewEditColumnProps<{
    value: CheckBoxValue;
    checked: boolean;
}> & {
    checkedValue?: CheckBoxValue;
    uncheckedValue?: CheckBoxValue;
    batchCheck?: boolean;
    toggleCheckedWhenRowClicked?: boolean;
    checkBoxSize?: number;
};
declare const ListViewCheckBoxColumn: ListViewColumnFunction<ListViewCheckBoxColumnProps>;
export default ListViewCheckBoxColumn;
export declare const ListViewCheckBoxColumnStyle: JSX.Element;
