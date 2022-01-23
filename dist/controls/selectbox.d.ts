import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare const selectBoxClassName = "bh-slb";
declare type SelectBoxValue = string | number;
declare type Data = {
    [key: string]: any;
};
export declare type SelectBoxController = {
    focus: () => SelectBoxController;
    blur: () => SelectBoxController;
    getValue: () => SelectBoxValue;
    setValue: (value: SelectBoxValue) => SelectBoxController;
};
export declare type SelectBoxOptions = {
    source?: Array<{
        [key: string]: any;
    }> | (() => Promise<Array<{
        [key: string]: any;
    }>>);
    textAlign?: "left" | "center" | "right";
    valueDataName?: string;
    labelDataName?: string;
    placeholder?: string;
    resize?: boolean;
    listMaxHeight?: number;
    inputText?: boolean;
    appendEmptyItem?: boolean;
    defaultItemIsFirstItem?: boolean;
};
declare type ChangedArgData = {
    value: SelectBoxValue;
    data: Data;
};
export declare type SelectBoxEventListener = {
    changed?: (after: ChangedArgData, before: ChangedArgData) => void;
    resized?: (width: number) => void;
    focus?: (value: SelectBoxValue) => void;
    blur?: (value: SelectBoxValue) => void;
};
export declare type SelectBoxProps = InputControlProps<SelectBoxController, SelectBoxValue> & SelectBoxOptions & SelectBoxEventListener;
declare const SelectBox: VFC<SelectBoxProps>;
export default SelectBox;
export declare const SelectBoxStyle: JSX.Element;
