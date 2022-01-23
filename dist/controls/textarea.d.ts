import React, { VFC } from "react";
import { InputControlProps, InputValidation } from "../hooks/value";
export declare const textAreaClassName = "bh-txa";
export declare type TextAreaController = {
    focus: () => TextAreaController;
    blur: () => TextAreaController;
    getValue: () => string;
    setValue: (value: string) => TextAreaController;
};
export declare type TextAreaOptions = {
    placeholder?: string;
    maxLength?: number;
    resize?: boolean | "horizontal" | "vertical";
    validation?: InputValidation<string>;
};
export declare type TextAreaEventListener = {
    changed?: (after: string, before: string) => void;
    resized?: (size: {
        height: number;
        width: number;
    }) => void;
    keydown?: (event: React.KeyboardEvent) => void;
    focus?: (value: string) => void;
    blur?: (value: string) => void;
};
export declare type TextAreaProps = InputControlProps<TextAreaController, string> & TextAreaOptions & TextAreaEventListener;
declare const TextArea: VFC<TextAreaProps>;
export default TextArea;
export declare const TextAreaStyle: JSX.Element;
