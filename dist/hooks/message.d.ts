import { VFC } from "react";
import { MessageCallback, MessageItem } from "../utils/message-utils";
export declare const popupMessageClassName = "bh-ppu_msg";
export declare const messageHistoryClassName = "bh-msg_his";
export declare type PopupMessageProps = {};
export declare const PopupMessage: VFC<PopupMessageProps>;
export declare type MessageHistoryProps = {};
export declare const MessageHistory: VFC<MessageHistoryProps>;
export declare const PopupMessageStyle: JSX.Element;
declare const useMessage: (callback?: MessageCallback) => {
    append: (messages: Array<MessageItem>) => void;
    error: (e: any) => void;
    clear: () => void;
    showHistory: () => void;
    closeHistory: () => void;
};
export default useMessage;
