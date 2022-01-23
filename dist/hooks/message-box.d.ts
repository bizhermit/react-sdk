import { FC } from "react";
import { TextBoxProps } from "../controls/textbox";
import { IconImage } from "../graphics/icon";
export declare const messageBoxClassName = "bh-msg_box";
export declare type MessageBoxButton = {
    code: string;
    text?: string;
    iconImage?: IconImage;
    click?: (params: {
        [key: string]: any;
    }) => void;
};
export declare type MessageBoxConfirmTemplate = "delete" | "registration" | "update" | "modification" | "save" | "saveover" | "saveas";
export declare type MessageBoxProps = {
    title?: string;
    iconImage?: IconImage;
    message: string | JSX.Element;
    buttons: Array<MessageBoxButton>;
    bind?: {
        [key: string]: any;
    };
    textbox?: {
        defaultValue?: string;
        width?: number;
        options?: TextBoxProps;
    };
    click?: (btn: MessageBoxButton) => void;
    preventButtonClickEvent?: boolean;
};
export declare const MessageBox: FC<MessageBoxProps>;
declare const useMessageBox: () => {
    layout: any;
    open: (props: MessageBoxProps) => Promise<string>;
    alert: (message: string | JSX.Element) => Promise<string>;
    confirm: (options?: {
        message?: string | JSX.Element;
        title?: string;
        template?: MessageBoxConfirmTemplate;
        subject?: string;
        iconImage?: IconImage;
    }) => Promise<boolean>;
    textbox: (options: {
        message: string | JSX.Element;
        title: string;
        defaultValue?: string;
        textboxWidth?: number;
        textboxOptions?: TextBoxProps;
    }) => Promise<{
        judge: boolean;
        value: string;
    }>;
};
export default useMessageBox;
