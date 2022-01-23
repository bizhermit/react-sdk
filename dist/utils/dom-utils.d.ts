import { CSSProperties } from "react";
export declare const isClient: () => boolean;
export declare type DomEventProps = {
    element: HTMLElement | Window;
    type: keyof HTMLElementEventMap;
    listener: EventListenerOrEventListenerObject;
};
export declare const cloneElement: <T extends HTMLElement>(element: T, option?: string | string[] | CSSProperties | ((element: T) => void)) => T;
export declare const setStyleProps: <T extends HTMLElement>(element: T, props: CSSProperties) => T;
export declare const setCursor: (cursor: string) => () => void;
export declare const releaseCursor: () => void;
export declare class DomComponentClass {
    protected events: Array<DomEventProps>;
    constructor();
    dispose(): void;
    addEvent<T extends HTMLElement | Window>(element: T, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): T;
    removeEvent<T extends HTMLElement | Window>(element: T, type?: keyof HTMLElementEventMap, listener?: EventListenerOrEventListenerObject): T;
    removeEventIterator(func: (props: DomEventProps) => boolean | void): this;
}
export declare const getDomEventManager: () => DomComponentClass;
export declare const horizontalResizeMousedown: (props: {
    resize?: boolean;
    resized?: (width: number) => void;
}, reverse?: boolean) => (e: React.MouseEvent) => void;
export declare const pressPositiveKey: (e: React.KeyboardEvent, func: (e: React.KeyboardEvent) => void, stopEvent?: boolean) => void;
