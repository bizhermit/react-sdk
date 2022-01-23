import React, { VFC } from "react";
import { InputControlProps, InputValidation } from "../hooks/value";
export declare const textBoxClassName = "bh-txb";
export declare type TextBoxController = {
    focus: () => TextBoxController;
    blur: () => TextBoxController;
    getValue: () => string;
    setValue: (value: string) => TextBoxController;
};
export declare type TextBoxOptions = {
    textAlign?: "left" | "center" | "right";
    placeholder?: string;
    maxLength?: number;
    resize?: boolean;
    validation?: InputValidation<string>;
};
export declare type TextBoxEventListener = {
    changed?: (after: string, before: string) => void;
    keydown?: (event: React.KeyboardEvent) => void;
    focus?: (value: string) => void;
    blur?: (value: string) => void;
    resized?: (width: number) => void;
};
export declare type TextBoxProps = InputControlProps<TextBoxController, string> & TextBoxOptions & TextBoxEventListener;
declare const TextBox: VFC<TextBoxProps>;
export default TextBox;
