import { FC, VFC } from "react";
export declare const popupClassName = "bh-popup";
export declare const PopupClassNames: {
    b: string;
    b_t: string;
    m_p: string;
    m_s: string;
};
export declare type PopupPosition = {
    x?: PopupPositionX;
    y?: PopupPositionY;
};
export declare type PopupPositionX = "outer" | "inner" | "outer-left" | "outer-right" | "inner-left" | "inner-right";
export declare type PopupPositionY = "outer" | "inner" | "outer-bottom" | "outer-top" | "inner-bottom" | "inner-top";
export declare type PopupOptions = {
    transparent?: boolean;
    className?: string;
    hideCallback?: () => void | boolean;
};
declare const usePopup: <T extends {}>(Component: FC | VFC, options?: PopupOptions) => {
    hide: (absolute?: boolean) => void;
    show: (anchorElement: HTMLElement, showOptions?: {
        position?: PopupPosition;
        componentProps?: T;
        createMountElementCallback?: (elem: HTMLDivElement) => void;
        showedCallback?: () => void;
        hideCallback?: () => void | boolean;
    }) => void;
    getElement: () => HTMLDivElement;
    isShowed: () => boolean;
};
export default usePopup;
export declare const PopupStyle: JSX.Element;
