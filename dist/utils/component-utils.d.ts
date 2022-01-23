import { CSSProperties, FC, VFC } from "react";
import { FitToOuter } from "./classname-utils";
export declare type MaskAccessor = {
    _fetchMask?: () => HTMLDivElement;
};
export declare type AccessorFC<P = {}> = FC<P & {
    ma: MaskAccessor;
}>;
export declare type AccessorVFC<P = {}> = VFC<P & {
    ma: MaskAccessor;
}>;
export declare type ContainerProps = {
    style?: CSSProperties;
    className?: string;
    fitToOuter?: FitToOuter;
};
export declare type ControlProps<T extends {
    [key: string]: any;
} = {}> = {
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    title?: string;
    controller?: T | {
        [key: string]: any;
    };
};
