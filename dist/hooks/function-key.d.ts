import React, { CSSProperties, FC } from "react";
import { IconImage } from "../graphics/icon";
import { ContainerProps } from "../utils/component-utils";
declare type FunctionKeyCode = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12";
export declare const functionKeyContainerClassName = "bh-fnk_ctr";
export declare type FunctionKeyProps = {
    label?: string | JSX.Element;
    image?: IconImage;
    title?: string;
    disabled?: boolean;
    click?: (unlock: () => void) => (void | Promise<void>);
};
export declare type FunctionKeyActions = Array<FunctionKeyProps>;
export declare type FunctionKeyContainerProps = ContainerProps & {
    contentStyle?: CSSProperties;
    defaultActions?: FunctionKeyActions;
    disabled?: boolean;
    buttonVisible?: boolean;
};
export declare const FunctionKeyContainer: FC<FunctionKeyContainerProps>;
export declare const useFunctionKey: (actions: FunctionKeyActions, deps?: React.DependencyList) => void;
export default useFunctionKey;
export declare const FnKeyContainerStyle: JSX.Element;
declare type generateFunctionKeyActionsController = {
    set: (key: FunctionKeyCode, props: FunctionKeyProps) => generateFunctionKeyActionsController;
};
export declare const generateFunctionKeyActions: (func?: (con: generateFunctionKeyActionsController) => void) => any[];
