import { CSSProperties, VFC } from "react";
import { Direction } from "../utils/classname-utils";
import { AccessorVFC, ContainerProps } from "../utils/component-utils";
export declare const splitContainerClassName = "bh-spl_ctr";
export declare type SplitContainerController = {
    callContent1: (params?: {
        [key: string]: any;
    }) => SplitContainerController;
    callContent2: (params?: {
        [key: string]: any;
    }) => SplitContainerController;
    setVisible: (visible: {
        content1: boolean;
        content2: boolean;
    }) => SplitContainerController;
};
declare type SplitContentController = {
    call: (params?: {
        [key: string]: any;
    }) => SplitContentController;
    setCalled: (func: (params: {
        [key: string]: any;
    }) => void) => SplitContentController;
    setVisible: (visible: {
        self?: boolean;
        partner?: boolean;
    }) => SplitContentController;
};
export declare type SplitContentFC<P = {}> = AccessorVFC<P & {
    scc: SplitContentController;
}>;
export declare type SplitContent<P = {}> = {
    component: SplitContentFC<P>;
    props?: P;
    style?: CSSProperties;
};
export declare type SplitContainerProps = ContainerProps & {
    controller?: SplitContainerController;
    direction?: Direction;
    reverse?: boolean;
    content1: SplitContent;
    content2: SplitContent & {
        visible?: boolean;
        size?: number | string;
    };
    disabled?: boolean;
};
declare const SplitContainer: VFC<SplitContainerProps>;
export default SplitContainer;
export declare const SplitContainerStyle: JSX.Element;
