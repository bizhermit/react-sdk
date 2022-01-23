/// <reference types="react" />
import { IconImage } from "../../graphics/icon";
import { ListViewColumnFunction, ListViewColumnProps } from "../listview";
export declare const listViewButtonColumnClassName = "bh-lv_c-btn";
export declare type ListViewButtonColumnProps = ListViewColumnProps & {
    buttonLabel?: string;
    iconImage?: IconImage;
    iconSize?: number;
    valid?: (itemData: {
        [key: string]: any;
    }) => boolean | {
        valid: boolean;
        visible?: boolean;
        buttonLabel?: string;
    };
};
declare const ListViewButtonColumn: ListViewColumnFunction<ListViewButtonColumnProps>;
export default ListViewButtonColumn;
export declare const ListViewButtonColumnStyle: JSX.Element;
