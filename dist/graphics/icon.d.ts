import { CSSProperties, VFC } from "react";
export declare const iconClassName = "bh-icon";
export declare type IconImage = "" | "favicon" | "add" | "minus" | "check" | "delete" | "close" | "edit" | "save" | "saveas" | "gear" | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "pulldown" | "pullup" | "pullleft" | "pullright" | "info" | "warn" | "err" | "reload" | "download" | "upload" | "cloud" | "messages" | "filter" | "search" | "home" | "signin" | "signout" | "menu" | "nest-menu" | "user" | "users" | "post" | "connect" | "lock" | "unlock" | "key" | "guard" | "play" | "backwards" | "stop" | "pose" | "fast-forward" | "rewind" | "calendar" | "clock" | "list" | "history" | "reorder";
export declare type IconProps = {
    style?: CSSProperties;
    className?: string;
    image?: IconImage;
};
declare const Icon: VFC<IconProps>;
export default Icon;
export declare const iconChildCount: (image: IconImage) => 1 | 0 | 2 | 3;
export declare const IconStyle: JSX.Element;
