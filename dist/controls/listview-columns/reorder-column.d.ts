/// <reference types="react" />
import { ListViewColumnFunction } from "../listview";
export declare const listViewReorderColumnClassName = "bh-lv_c-rod";
export declare type ListViewReorderColumnProps = {
    name?: string;
    width?: number;
    disabled?: boolean;
    iconSize?: number;
    range?: "cell" | "row";
    fixed?: boolean;
};
declare const ListViewReorderColumn: ListViewColumnFunction<ListViewReorderColumnProps>;
export default ListViewReorderColumn;
export declare const ListViewReorderColumnStyle: JSX.Element;
