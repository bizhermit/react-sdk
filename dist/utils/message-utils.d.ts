/// <reference types="react" />
export declare type MessageType = "info" | "warn" | "err";
export declare type MessageItem = {
    title?: string;
    type?: MessageType;
    message: string;
    target?: string;
    timestamp?: number;
};
export declare type MessageGroup = {
    title?: string;
    type?: MessageType;
    messages: Array<MessageItem>;
    verified?: boolean;
    popuped?: boolean;
    timestamp?: number;
};
declare type MessageCounts = {
    total: number;
    info: number;
    warn: number;
    err: number;
    verified: number;
};
export declare type MessageCallback = (counts: MessageCounts) => void;
export declare type MessagesManager = {
    messages: Array<MessageGroup>;
    callbacks: Array<MessageCallback>;
    append: (messages: Array<MessageGroup>) => void;
    clear: () => void;
    popup: (messages: Array<MessageGroup>) => void;
    showHistory: () => void;
    closeHistory: () => void;
    getTimeText: (timestamp: number) => string;
    getCounts: () => MessageCounts;
};
export declare const MessagesContext: import("react").Context<MessagesManager>;
export {};
