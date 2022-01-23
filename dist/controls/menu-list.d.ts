import { CSSProperties, FC } from "react";
import { IconImage } from "../graphics/icon";
import { Direction } from "../utils/classname-utils";
import { ControlProps } from "../utils/component-utils";
export declare const menuClassName = "bh-menu";
export declare type MenuListController = {
    focus: () => MenuListController;
};
export declare type MenuListProps = ControlProps<MenuListController> & {
    items: Array<MenuItemProps>;
    direction?: Direction;
    selected?: (props: MenuItemProps) => boolean;
    style?: CSSProperties;
    reverse?: boolean;
    openChildren?: boolean;
    width?: number;
    clicked?: (props: MenuItemProps, retFlag?: boolean | void) => void;
};
declare const MenuList: FC<MenuListProps>;
export default MenuList;
export declare type MenuItemProps = {
    label?: string | JSX.Element;
    iconImage?: IconImage;
    childItems?: Array<MenuItemProps>;
    clicked?: (props: MenuItemProps) => boolean | void;
};
export declare const MenuStyle: JSX.Element;
