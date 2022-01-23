/// <reference types="react" />
import { ListViewColumnFunction, ListViewEditColumnProps } from "../listview";
import { SliderOptions } from "../slider";
export declare const listViewSliderColumnClassName = "bh-lv_c-sld";
export declare type ListViewSliderColumnProps = ListViewEditColumnProps<number> & {
    labelDataName?: string;
    sliderOptions?: SliderOptions;
    progressAlign?: "left" | "right";
    labelDisplay?: boolean;
    format?: (value: number) => string;
    progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
};
declare const ListViewSliderColumn: ListViewColumnFunction<ListViewSliderColumnProps>;
export default ListViewSliderColumn;
export declare const ListViewSliderColumnStyle: JSX.Element;
