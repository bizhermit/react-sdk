import { FC } from "react";
import { FitToOuter } from "../utils/classname-utils";
import { ContainerProps } from "../utils/component-utils";
export declare const FlexBoxClassNames: {
    c: string;
    r: string;
    fill: string;
    ff_y: string;
    ff_x: string;
    left: string;
    center: string;
    right: string;
    top: string;
    middle: string;
    bottom: string;
    design: string;
};
declare type FlexBoxProps = ContainerProps & {
    column?: boolean;
    row?: boolean;
    left?: boolean;
    center?: boolean;
    right?: boolean;
    top?: boolean;
    middle?: boolean;
    bottom?: boolean;
    fitToOuter?: FitToOuter;
    scroll?: boolean;
    design?: boolean;
};
declare const FlexBox: FC<FlexBoxProps>;
export default FlexBox;
export declare const FlexBoxStyle: JSX.Element;
