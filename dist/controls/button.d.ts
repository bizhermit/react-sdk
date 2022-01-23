import { FC, ReactNode } from "react";
import { IconImage } from "../graphics/icon";
import { ControlProps } from "../utils/component-utils";
export declare const buttonClassName = "bh-btn";
export declare type ButtonController = {
    focus: () => ButtonController;
    blur: () => ButtonController;
    click: () => void;
};
export declare type ButtonOptions = {
    children?: string | ReactNode;
    image?: IconImage;
    tabIndex?: number;
};
export declare type ButtonEventListener = {
    click?: (unlock: (preventFocus?: boolean) => void, element: HTMLButtonElement) => void;
};
export declare type ButtonProps = ControlProps<ButtonController> & ButtonOptions & ButtonEventListener;
declare const Button: FC<ButtonProps>;
export default Button;
export declare const ButtonStyle: JSX.Element;
