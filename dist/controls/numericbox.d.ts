import React, { VFC } from "react";
import { InputControlProps, InputValidation } from "../hooks/value";
export declare const numericBoxClassName = "bh-nub";
export declare type NumericBoxController = {
    focus: () => NumericBoxController;
    blur: () => NumericBoxController;
    getValue: () => number;
    setValue: (value: number) => NumericBoxController;
};
export declare type NumericBoxOptions = {
    textAlign?: "left" | "center" | "right";
    placeholder?: string;
    max?: number;
    min?: number;
    sign?: "only-positive" | "only-negative" | "";
    float?: number;
    incrementInterval?: number;
    incrementWhenKeydown?: boolean;
    buttons?: boolean;
    thousandsSeparator?: boolean;
    resize?: boolean;
    validation?: InputValidation<number>;
};
export declare type NumericBoxEventListener = {
    changed?: (after: number, before: number) => void;
    keydown?: (event: React.KeyboardEvent) => void;
    focus?: (value: number) => void;
    blur?: (value: number) => void;
    resized?: (width: number) => void;
};
export declare type NumericBoxProps = InputControlProps<NumericBoxController, number> & NumericBoxOptions & NumericBoxEventListener;
declare const NumericBox: VFC<NumericBoxProps>;
export default NumericBox;
export declare const NumericBoxStyle: JSX.Element;
