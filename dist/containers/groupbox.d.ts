import { CSSProperties, FC } from "react";
import { Direction } from "../utils/classname-utils";
import { ContainerProps } from "../utils/component-utils";
export declare const groupBoxClassName = "bh-grp_box";
export declare type GroupBoxProps = ContainerProps & {
    direction?: Direction;
    caption: string;
    containerStyle?: CSSProperties;
};
declare const GroupBox: FC<GroupBoxProps>;
export default GroupBox;
export declare const GroupBoxStyle: JSX.Element;
