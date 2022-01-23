import { VFC } from "react";
import { MaskAccessor } from "../utils/component-utils";
export declare const maskClassName = "bh-msk";
export declare type MaskImage = "none" | "spin-circle" | "flow";
export declare type MaskProps = {
    image?: MaskImage;
    text?: string;
    zIndex?: number;
};
export declare const Mask: VFC<MaskProps>;
export declare const MaskStyle: JSX.Element;
declare const useMask: (options?: {
    accessor?: MaskAccessor;
    name?: string;
    showAtFirst?: boolean;
    maskProps?: MaskProps;
}) => {
    show: (maskProps?: MaskProps, callback?: () => void) => void;
    close: () => void;
};
export default useMask;
