"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pressPositiveKey = exports.horizontalResizeMousedown = exports.getDomEventManager = exports.DomComponentClass = exports.releaseCursor = exports.setCursor = exports.setStyleProps = exports.cloneElement = exports.useDevice = exports.isClient = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = require("react");
const isClient = () => typeof window !== "undefined";
exports.isClient = isClient;
const useDevice = () => {
    const [touchable, setTouchable] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setTouchable((0, exports.isClient)() && (window?.ontouchstart !== undefined && window?.navigator.maxTouchPoints > 0));
    }, []);
    return { touchable };
};
exports.useDevice = useDevice;
const cloneElement = (element, option) => {
    if (element == null)
        return undefined;
    const elem = element.cloneNode(true);
    if (option == null)
        return elem;
    if (string_utils_1.default.isString(option))
        elem.classList.add(option);
    else if (Array.isArray(option))
        option.forEach(cn => elem.classList.add(cn));
    else if (typeof option === "function")
        option(elem);
    else
        (0, exports.setStyleProps)(elem, option);
    return elem;
};
exports.cloneElement = cloneElement;
const setStyleProps = (element, props) => {
    if (element == null || props == null)
        return element;
    Object.keys(props).forEach((key) => {
        const prop = props[key];
        if (string_utils_1.default.isEmpty(prop)) {
            element.style.removeProperty(key);
            return;
        }
        element.style[key] = String(prop);
    });
    return element;
};
exports.setStyleProps = setStyleProps;
const setCursor = (cursor) => {
    if (document?.body == null)
        return () => { };
    document.onselectstart = () => false;
    let elem = document.getElementById("bhCursorStyle");
    if (elem == null) {
        elem = document.createElement("style");
        elem.id = "bhCursorStyle";
        elem.type = "text/css";
        document.head.appendChild(elem);
    }
    elem.textContent = `*,button,a{cursor:${cursor} !important;}`;
    return () => (0, exports.releaseCursor)();
};
exports.setCursor = setCursor;
const releaseCursor = () => {
    document.onselectstart = () => true;
    try {
        document.head.removeChild(document.getElementById("bhCursorStyle"));
    }
    catch { }
};
exports.releaseCursor = releaseCursor;
class DomComponentClass {
    events;
    constructor() {
        this.events = [];
    }
    dispose() {
        this.events.forEach((props) => {
            try {
                props.element.removeEventListener(props.type, props.listener);
            }
            catch { }
            ;
        });
        this.events = [];
    }
    addEvent(element, type, listener, options) {
        if (element == null)
            return element;
        this.events.push({ element, type, listener });
        element.addEventListener(type, listener, options);
        return element;
    }
    removeEvent(element, type, listener) {
        if (element == null)
            return element;
        for (let i = this.events.length - 1; i >= 0; i--) {
            const props = this.events[i];
            if (props.element !== element)
                continue;
            if (type != null && props.type !== type)
                continue;
            if (listener != null && props.listener !== listener)
                continue;
            try {
                props.element.removeEventListener(props.type, props.listener);
                this.events.splice(i, 1);
            }
            catch { }
        }
        return element;
    }
    removeEventIterator(func) {
        for (let i = this.events.length - 1; i >= 0; i--) {
            const props = this.events[i];
            if (func(props) === true) {
                try {
                    props.element.removeEventListener(props.type, props.listener);
                }
                catch { }
                this.events.splice(i, 1);
            }
        }
        return this;
    }
}
exports.DomComponentClass = DomComponentClass;
;
const getDomEventManager = () => {
    return new DomComponentClass();
};
exports.getDomEventManager = getDomEventManager;
const horizontalResizeMousedown = (props, reverse) => {
    return (0, react_1.useCallback)((e) => {
        if (props.resize === false)
            return;
        const elem = e.target.parentElement;
        let lWidth = elem.getBoundingClientRect().width, pos = e.clientX;
        const move = (e) => { elem.style.width = (e.clientX - pos) * (reverse ? -1 : 1) + lWidth + "px"; };
        (0, exports.setCursor)("col-resize");
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, exports.releaseCursor)();
            props.resized?.(elem.getBoundingClientRect().width);
        };
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    }, [props.resize, props.resized]);
};
exports.horizontalResizeMousedown = horizontalResizeMousedown;
const pressPositiveKey = (e, func, stopEvent) => {
    if (e.key === " " || e.key === "Enter") {
        func(e);
        if (stopEvent === true) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
};
exports.pressPositiveKey = pressPositiveKey;
