import { CSSProperties, FC } from "react";
import { AccessorVFC } from "../utils/component-utils";
export declare const dialogWindowClassName = "bh-dw";
export declare type DialogWindowController = {
    close: () => void;
    hide: () => void;
};
export declare type DialogWindowContentFC<P = {}> = AccessorVFC<P & {
    dwc: DialogWindowController;
}>;
export declare type DialogWindowProps = {
    component: DialogWindowContentFC | FC;
    props: {
        [key: string]: any;
    };
    contentStyle: CSSProperties;
    dwc: DialogWindowController;
    zIndex: number;
    setZIndex: (zIndex: number) => number;
    modal?: boolean;
    header?: boolean;
    title?: string;
    closeButton?: boolean;
    minimizeButton?: boolean;
    move?: boolean;
    resize?: boolean;
    fullScreen?: boolean;
    maskClickMode?: "none" | "close" | "hide";
    top?: number | string;
    left?: number | string;
    height?: number | string;
    width?: number | string;
};
export declare const DialogWindow: FC<DialogWindowProps>;
export declare const DialogWindowStyle: JSX.Element;
export declare type UseDialogWindowOptions = {
    modal?: boolean;
    header?: boolean;
    title?: string;
    closeButton?: boolean;
    hideButton?: boolean;
    minimizeButton?: boolean;
    move?: boolean;
    resize?: boolean;
    fullScreen?: boolean;
    maskClickMode?: "none" | "close" | "hide";
    top?: number | string;
    left?: number | string;
    height?: number | string;
    width?: number | string;
    componentProps?: {
        [key: string]: any;
    };
    contentStyle?: CSSProperties;
    closed?: () => void;
    hided?: () => void;
};
declare const useDialogWindow: (component: DialogWindowContentFC<any> | FC<any>, options?: UseDialogWindowOptions) => {
    show: (showOptions?: UseDialogWindowOptions) => void;
    close: () => void;
    hide: () => void;
};
export default useDialogWindow;
