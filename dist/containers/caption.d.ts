import { FC } from "react";
import { Direction } from "../utils/classname-utils";
import { ContainerProps } from "../utils/component-utils";
export declare const captionClassName = "bh-cap";
export declare type CaptionProps = ContainerProps & {
    label: string;
    labelWidth?: number;
    labelAlign?: "left" | "center" | "right";
    direction?: Direction;
};
declare const Caption: FC<CaptionProps>;
export default Caption;
export declare const CaptionStyle: JSX.Element;
