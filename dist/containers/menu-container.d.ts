import { FC } from "react";
import { MenuItemProps } from "../controls/menu-list";
import { ContainerProps } from "../utils/component-utils";
export declare const menuContainerClassName = "bh-menu_ctr";
export declare type NavMenuPosition = "top" | "right" | "bottom" | "left";
export declare type NavMenuHideMode = "visible" | "closeToHeader" | "closeToEdge";
export declare type MenuContainerProps = ContainerProps & {
    header?: {
        jsx: JSX.Element;
        height?: number;
    };
    menu?: {
        items: Array<MenuItemProps>;
        position?: NavMenuPosition;
        mode?: NavMenuHideMode;
        width?: number;
        judgeSelected?: (prop: MenuItemProps) => boolean;
        resize?: boolean;
    };
    maskName?: string;
};
declare const MenuContainer: FC<MenuContainerProps>;
export default MenuContainer;
export declare const MenuContainerStyle: JSX.Element;
