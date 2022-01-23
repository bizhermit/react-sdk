import React from "react";
import { InputControlProps } from "../hooks/value";
export declare const checkBoxClassName = "bh-ckb";
export declare type CheckBoxController<T = boolean> = {
    focus: () => CheckBoxController<T>;
    blur: () => CheckBoxController<T>;
    isChecked: () => boolean;
    setChecked: (checked: boolean) => CheckBoxController<T>;
    getValue: () => T;
    setValue: (value: T) => CheckBoxController<T>;
};
export declare type CheckBoxOptions<T = boolean> = {
    checkedValue?: T;
    uncheckedValue?: T;
    title?: string;
};
export declare type CheckBoxEventListener<T = boolean> = {
    changed?: (after: T, before: T) => void;
    focus?: (value: T) => void;
    blur?: (value: T) => void;
};
export declare type CheckBoxProps<T = boolean> = InputControlProps<CheckBoxController, T> & CheckBoxOptions<T> & CheckBoxEventListener<T>;
interface CheckBoxFunctionComponent extends React.FunctionComponent {
    <T = boolean>(props: React.PropsWithChildren<CheckBoxProps<T>>, context?: any): React.ReactElement<any, any> | null;
}
declare const CheckBox: CheckBoxFunctionComponent;
export default CheckBox;
export declare const CheckBoxStyle: JSX.Element;
