import { VFC } from "react";
import { MenuItemProps } from "../controls/menu-list";
import { Direction } from "../utils/classname-utils";
import { PopupPosition } from "./popup";
export declare const popupMenuClassName = "bh-ppu_menu";
export declare type PopupMenuProps = {
    className?: string;
    items: Array<MenuItemProps>;
    hide: () => void;
    direction?: Direction;
};
export declare const PopupMenu: VFC<PopupMenuProps>;
export declare const PopupMenuStyle: JSX.Element;
export declare type UseMenuOptions = {
    className?: string;
    direction?: Direction;
};
declare const useMenu: (menuItems: Array<MenuItemProps>, options?: UseMenuOptions) => {
    hide: (absolute?: boolean) => void;
    show: (anchorElement: HTMLElement, showOptions?: {
        position?: PopupPosition;
        direction?: Direction;
    }) => void;
};
export default useMenu;
