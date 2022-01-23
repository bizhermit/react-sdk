/// <reference types="react" />
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
export declare const listViewRadioButtonColumnClassName = "bh-lv_c-rdb";
declare type RadioButtonValue = boolean | number | string;
export declare type ListViewRadioButtonColumnProps = ListViewEditColumnProps<{
    [key: string]: any;
}> & {
    selectedValue?: RadioButtonValue;
    unselectedValue?: RadioButtonValue;
    selectWhenRowClicked?: boolean;
    radioButtonSize?: number;
};
declare const ListViewRadioButtonColumn: ListViewColumnFunction<ListViewRadioButtonColumnProps>;
export default ListViewRadioButtonColumn;
export declare const ListViewRadioButtonColumnStyle: JSX.Element;
