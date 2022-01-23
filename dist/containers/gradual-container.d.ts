import { VFC } from "react";
import { Direction } from "../utils/classname-utils";
import { AccessorVFC, ContainerProps } from "../utils/component-utils";
export declare const gradualContainerClassName = "bh-gdl_ctr";
export declare type GradualContentControlelr = {
    showNext: (props: {
        [key: string]: any;
    }, absolute?: boolean) => void;
    closeNexts: () => void;
    close: () => void;
    setNextProps: (props: {
        [key: string]: any;
    }, absolute?: boolean) => void;
};
export declare type GradualContentFC<P = {}> = AccessorVFC<P & {
    gcc: GradualContentControlelr;
}>;
export declare type GradualContent<P = {}> = {
    key: string;
    component: GradualContentFC<P>;
    props?: P;
    flexRate?: number;
    minSize?: number;
};
export declare type GradualContainerProps = ContainerProps & {
    contents: Array<GradualContent>;
    direction?: Direction;
};
declare const GradualContainer: VFC<GradualContainerProps>;
export default GradualContainer;
export declare const GradualContainerStyle: JSX.Element;
