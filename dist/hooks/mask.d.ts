import { FC, VFC } from "react";
import { ContainerProps, MaskAccessor } from "../utils/component-utils";
export declare const maskClassName = "bh-msk";
export declare const maskContainerClassName = "bh-mask_ctr";
export declare type MaskImage = "none" | "spin-circle" | "flow";
export declare type MaskProps = {
    image?: MaskImage;
    text?: string;
    zIndex?: number;
};
export declare const Mask: VFC<MaskProps>;
export declare const MaskStyle: JSX.Element;
export declare type MaskContainerProps = ContainerProps & {
    mask: {
        setElement: (element: HTMLDivElement) => void;
    };
    name?: string;
    scroll?: boolean;
};
export declare const MaskContainer: FC<MaskContainerProps>;
declare const useMask: (options?: {
    accessor?: MaskAccessor;
    name?: string;
    showAtFirst?: boolean;
    maskProps?: MaskProps;
}) => {
    show: (maskProps?: MaskProps, callback?: () => void) => void;
    close: () => void;
    setElement: (element: HTMLDivElement) => void;
};
export default useMask;
