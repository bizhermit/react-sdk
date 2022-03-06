import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
import { NumericBoxOptions } from "../numericbox";
export declare const listViewNumericBoxColumnClassName = "bh-lv_c-nub";
export declare type ListViewNumericBoxColumnProps = ListViewEditColumnProps<{
    value: number;
    label: string;
}> & {
    labelDataName?: string;
    numericBoxOptions?: NumericBoxOptions;
};
declare const ListViewNumericBoxColumn: ListViewColumnFunction<ListViewNumericBoxColumnProps>;
export default ListViewNumericBoxColumn;
