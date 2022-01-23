/// <reference types="react" />
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
import { TextBoxOptions } from "../textbox";
export declare const listViewTextBoxColumnClassName = "bh-lv_c-txb";
export declare type ListViewTextBoxColumnProps = ListViewEditColumnProps<string> & {
    textBoxOptions?: TextBoxOptions;
};
declare const ListViewTextBoxColumn: ListViewColumnFunction<ListViewTextBoxColumnProps>;
export default ListViewTextBoxColumn;
export declare const ListViewTextBoxColumnStyle: JSX.Element;
