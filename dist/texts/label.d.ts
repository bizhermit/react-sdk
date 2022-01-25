import { CSSProperties, FC } from "react";
export declare const labelClassName = "bh-lbl";
export declare type LabelProps = {
    className?: string;
    style?: CSSProperties;
    bold?: boolean;
    padding?: boolean;
};
declare const Label: FC<LabelProps>;
export default Label;
export declare const LabelStyle: JSX.Element;
