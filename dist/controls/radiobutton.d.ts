import React from "react";
import { InputControlProps } from "../hooks/value";
export declare const radioButtonClassName = "bh-rbt";
declare type RadioButtonValue = number | string;
declare type Data = {
    [key: string]: any;
};
export declare type RadioButtonController<T = RadioButtonValue> = {
    focus: () => RadioButtonController<T>;
    blur: () => RadioButtonController<T>;
    getValue: () => T;
    setValue: (value: T) => RadioButtonController<T>;
};
export declare type RadioButtonOptions = {
    source: Array<Data> | (() => Promise<Array<Data>>);
    labelDataName?: string;
    valueDataName?: string;
    titleDataName?: string;
    wrap?: boolean;
    direction?: "horizontal" | "vertical";
};
export declare type RadioButtonEventListener<T = RadioButtonValue> = {
    changed?: (after: {
        value: T;
        data: Data;
    }, before: {
        value: T;
        data: Data;
    }) => void;
    focus?: (value: T) => void;
    blur?: (value: T) => void;
};
export declare type RadioButtonProps<T = RadioButtonValue> = InputControlProps<RadioButtonController<T>, T, {
    value: T;
    data: Data;
}> & RadioButtonOptions & RadioButtonEventListener<T>;
interface RadioButtonFunctionComponent extends React.VoidFunctionComponent {
    <T = RadioButtonValue>(props: RadioButtonProps<T>, context?: any): React.ReactElement<any, any> | null;
}
declare const RadioButton: RadioButtonFunctionComponent;
export default RadioButton;
export declare const RadioButtonStyle: JSX.Element;
