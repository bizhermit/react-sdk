import { FC, MutableRefObject } from "react";
import { ContainerProps } from "../utils/component-utils";
export declare const rowClassName = "bh-row";
export declare type RowProps = ContainerProps & {
    ref?: MutableRefObject<HTMLDivElement>;
    right?: boolean;
    center?: boolean;
    fill?: boolean;
    nowrap?: boolean;
};
declare const Row: FC<RowProps>;
export default Row;
export declare const RowStyle: JSX.Element;
