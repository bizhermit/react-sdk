"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogWindowStyle = exports.DialogWindow = exports.dialogWindowClassName = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const icon_1 = __importDefault(require("../graphics/icon"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
const popup_1 = require("./popup");
exports.dialogWindowClassName = "bh-dw";
const resizeSize = `var(--${exports.dialogWindowClassName}-resize-size, 8px)`;
const dialogWindowBaseZIndex = 100000000;
const dialogWindowZIndexInterval = 5;
const DialogWindow = (props) => {
    const eref = (0, react_1.useRef)();
    const mref = (0, react_1.useRef)();
    const [zIndex, setZIndex] = (0, react_1.useState)(props.zIndex);
    const [sizeMode, setSizeMode] = (0, react_1.useState)(() => props.fullScreen === true ? "maximize" : "");
    const keydownMask = (e) => {
        if (e.key === "Tab")
            e.preventDefault();
    };
    const clickMask = () => {
        switch (props.maskClickMode) {
            case "close":
                props.dwc.close();
                break;
            case "hide":
                props.dwc.hide();
                break;
            default:
                break;
        }
    };
    const mousedownHeader = (e) => {
        if (props.move === false || sizeMode === "maximize")
            return;
        const rect = eref.current.getBoundingClientRect();
        const lPosX = rect.left, lPosY = rect.top, posX = e.clientX, posY = e.clientY;
        const pRect = document.body.getBoundingClientRect();
        const maxTop = pRect.height - rect.height, maxLeft = pRect.width - rect.width;
        const move = (e) => {
            eref.current.style.top = Math.max(0, Math.min(maxTop, lPosY + e.clientY - posY)) + "px";
            eref.current.style.left = Math.max(0, Math.min(maxLeft, lPosX + e.clientX - posX)) + "px";
        };
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, dom_utils_1.releaseCursor)();
        };
        (0, dom_utils_1.setCursor)(getComputedStyle(e.currentTarget).cursor);
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    };
    const dblclickHeader = () => {
        if (props.resize === false)
            return;
        setSizeMode((cur) => {
            if (cur === "maximize")
                return "";
            return "maximize";
        });
    };
    const resizeMousedown = (e, x, left, y, top) => {
        if (props.resize === false || sizeMode === "maximize")
            return;
        const posX = e.clientX, posY = e.clientY;
        let lPosX = 0, lPosY = 0, lHeight = 0, lWidth = 0, minHeight = 0, maxHeight = 0, minWidth = 0, maxWidth = 0, maxTop = 0, maxLeft = 0, moveTop = false, moveLeft = false, resizeX = false, resizeY = false;
        const rect = eref.current.getBoundingClientRect();
        const pRect = document.body.getBoundingClientRect();
        if (x) {
            resizeX = true;
            if (left) {
                lPosX = eref.current.offsetLeft;
                lWidth = rect.width;
                maxWidth = eref.current.offsetLeft + rect.width;
                maxLeft = maxWidth - minWidth;
                moveLeft = true;
            }
            else {
                lPosX = rect.width;
                maxWidth = pRect.width - eref.current.offsetLeft;
            }
        }
        if (y) {
            resizeY = true;
            if (top) {
                lPosY = eref.current.offsetTop;
                lHeight = rect.height;
                maxHeight = eref.current.offsetTop + rect.height;
                maxTop = maxHeight - minHeight;
                moveTop = true;
            }
            else {
                lPosY = rect.height;
                maxHeight = pRect.height - eref.current.offsetTop;
            }
        }
        const move = (e) => {
            if (resizeX) {
                if (moveLeft) {
                    eref.current.style.left = Math.max(0, Math.min(maxLeft, lPosX + e.clientX - posX)) + "px";
                    eref.current.style.width = Math.max(minWidth, Math.min(maxWidth, lWidth - e.clientX + posX)) + "px";
                }
                else {
                    eref.current.style.width = Math.max(minWidth, Math.min(maxWidth, lPosX + e.clientX - posX)) + "px";
                }
            }
            if (resizeY) {
                if (moveTop) {
                    eref.current.style.top = Math.max(0, Math.min(maxTop, lPosY + e.clientY - posY)) + "px";
                    eref.current.style.height = Math.max(minHeight, Math.min(maxHeight, lHeight - e.clientY + posY)) + "px";
                }
                else {
                    eref.current.style.height = Math.max(minHeight, Math.min(maxHeight, lPosY + e.clientY - posY)) + "px";
                }
            }
        };
        (0, dom_utils_1.setCursor)(getComputedStyle(e.currentTarget).cursor);
        const resizeClassName = `div[class^="bh-resize-"]`;
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, dom_utils_1.releaseCursor)();
            eref.current?.querySelectorAll(resizeClassName).forEach((elem) => {
                elem.style.cursor = elem.getAttribute("data-cursor");
            });
        };
        eref.current.querySelectorAll(resizeClassName).forEach((elem) => {
            elem.style.cursor = "inherit";
        });
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    };
    const clickDialogWindow = () => {
        const zi = getDialogWindowMaxZIndex(eref.current?.parentElement) + 1;
        if (zi === zIndex)
            return;
        setZIndex(props.setZIndex(zi));
    };
    (0, react_1.useEffect)(() => {
        const first = eref.current.style.visibility === "hidden";
        switch (sizeMode) {
            case "maximize":
                break;
            default:
                const rect = eref.current.getBoundingClientRect(), pRect = document.body.getBoundingClientRect();
                const height = Math.min(rect.height, pRect.height), width = Math.min(rect.width, pRect.width);
                eref.current.style.height = height + "px";
                eref.current.style.width = width + "px";
                if (first) {
                    eref.current.style.top = Math.max(0, Math.min(props.top != null ? rect.top : pRect.height, (pRect.height - height) / 2)) + "px";
                    eref.current.style.left = Math.max(0, Math.min(props.left != null ? rect.left : pRect.width, (pRect.width - width) / 2)) + "px";
                }
                else {
                    if (rect.top + height > pRect.height)
                        eref.current.style.top = (pRect.height - height) + "px";
                    if (rect.left + width > pRect.width)
                        eref.current.style.left = (pRect.width - width) + "px";
                }
                break;
        }
        if (first)
            eref.current.style.removeProperty("visibility");
    }, [sizeMode]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.modal === true ? react_1.default.createElement("div", { className: `${popup_1.PopupClassNames.m_p} ${exports.dialogWindowClassName}-mask`, style: { zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval }, tabIndex: 0, onKeyDown: keydownMask }) : react_1.default.createElement(react_1.default.Fragment, null),
        react_1.default.createElement("div", { ref: eref, className: (0, classname_utils_1.className)("bh-popup", exports.dialogWindowClassName, props.move === false || sizeMode === "maximize" ? "" : "bh-move", sizeMode === "maximize" ? "bh-max" : ""), style: { zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval + 2, visibility: "hidden", top: props.top, left: props.left, height: props.height, width: props.width }, onClick: clickDialogWindow },
            react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-root` },
                props.header === false ? react_1.default.createElement(react_1.default.Fragment, null) :
                    react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-header`, onMouseDown: mousedownHeader, onDoubleClick: dblclickHeader },
                        react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-header-title` }, props.title),
                        props.minimizeButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-header-minimize`, onClick: () => props.dwc.hide(), onMouseDown: e => e.stopPropagation() },
                            react_1.default.createElement(icon_1.default, { image: "minus" })),
                        props.closeButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-header-close`, onClick: () => props.dwc.close(), onMouseDown: e => e.stopPropagation() },
                            react_1.default.createElement(icon_1.default, { image: "close" }))),
                react_1.default.createElement("div", { className: `${exports.dialogWindowClassName}-body` },
                    react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.dialogWindowClassName}-content`, style: props.contentStyle },
                        react_1.default.createElement(props.component, { ...props.props, ma: { _fetchMask: () => mref.current }, dwc: props.dwc })),
                    react_1.default.createElement("div", { ref: mref, className: `${exports.dialogWindowClassName}-mask` }))),
            props.resize === false || sizeMode === "maximize" ? react_1.default.createElement(react_1.default.Fragment, null) :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "bh-resize-lt", onMouseDown: e => resizeMousedown(e, true, true, true, true) }),
                    react_1.default.createElement("div", { className: "bh-resize-ct", onMouseDown: e => resizeMousedown(e, false, false, true, true) }),
                    react_1.default.createElement("div", { className: "bh-resize-rt", onMouseDown: e => resizeMousedown(e, true, false, true, true) }),
                    react_1.default.createElement("div", { className: "bh-resize-lm", onMouseDown: e => resizeMousedown(e, true, true, false, false) }),
                    react_1.default.createElement("div", { className: "bh-resize-rm", onMouseDown: e => resizeMousedown(e, true, false, false, false) }),
                    react_1.default.createElement("div", { className: "bh-resize-lb", onMouseDown: e => resizeMousedown(e, true, true, true, false) }),
                    react_1.default.createElement("div", { className: "bh-resize-cb", onMouseDown: e => resizeMousedown(e, false, false, true, false) }),
                    react_1.default.createElement("div", { className: "bh-resize-rb", onMouseDown: e => resizeMousedown(e, true, false, true, false) }))),
        props.modal === true ? react_1.default.createElement("div", { className: `${popup_1.PopupClassNames.m_s} ${exports.dialogWindowClassName}-mask`, style: { zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval + 1 }, tabIndex: 0, onKeyDown: keydownMask, onClick: clickMask }) : react_1.default.createElement(react_1.default.Fragment, null),
        popup_1.PopupStyle,
        exports.DialogWindowStyle));
};
exports.DialogWindow = DialogWindow;
const getDialogWindowMaxZIndex = (self) => {
    let zindex = 0;
    document.querySelectorAll("body > div[data-name='bhDialogwindow']").forEach((elem) => {
        if (elem === self)
            return;
        zindex = Math.max(zindex, Number(elem.getAttribute("data-zindex") || "0"));
    });
    return zindex;
};
exports.DialogWindowStyle = react_1.default.createElement(style_1.default, { id: exports.dialogWindowClassName, depsDesign: true, css: ({ design }) => `
.${exports.dialogWindowClassName} {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
  flex: none;
  top: 0px;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  padding: ${resizeSize};
  overflow: hidden;
}
.${exports.dialogWindowClassName}.bh-max {
  height: 100% !important;
  width: 100% !important;
  top: 0px !important;
  left: 0px !important;
  padding: 0px;
}
.${exports.dialogWindowClassName}.bh-max > div[class^="bh-resize-"] {
  display: none;
}
.${exports.dialogWindowClassName}-root {
  ${style_1.CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  ${style_1.CssPV.fill}
  overflow: hidden;
  background: ${style_1.CssVar.bg.c};
}
.${exports.dialogWindowClassName}-header {
  ${style_1.CssPV.flex_r_r}
  flex: none;
  height: ${style_1.CssVar.size};
  user-select: none;
  z-index: 1;
  overflow: hidden;
}
.${exports.dialogWindowClassName}.bh-move .${exports.dialogWindowClassName}-header {
  cursor: move;
}
.${exports.dialogWindowClassName}-header-title {
  ${style_1.CssPV.flex_r}
  flex: 1;
  padding: 2px 5px 0px 5px;
  overflow: hidden;
}
.${exports.dialogWindowClassName}-header-close,
.${exports.dialogWindowClassName}-header-minimize {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  cursor: pointer;
}
.${exports.dialogWindowClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
  z-index: 0;
}
.${exports.dialogWindowClassName}-content {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
}
.${exports.dialogWindowClassName} > div[class^="bh-resize-"]  {
  background: transparent;
  position: absolute;
}
.${exports.dialogWindowClassName} > .bh-resize-lt,
.${exports.dialogWindowClassName} > .bh-resize-rb {
  height: ${resizeSize};
  width: ${resizeSize};
  cursor: nwse-resize;
}
.${exports.dialogWindowClassName} > .bh-resize-lt {
  top: 0px;
  left: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-rb {
  bottom: 0px;
  right: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-rt,
.${exports.dialogWindowClassName} > .bh-resize-lb {
  height: ${resizeSize};
  width: ${resizeSize};
  cursor: nesw-resize;
}
.${exports.dialogWindowClassName} > .bh-resize-rt {
  top: 0px;
  right: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-lb {
  bottom: 0px;
  left: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-ct,
.${exports.dialogWindowClassName} > .bh-resize-cb {
  height: ${resizeSize};
  width: calc(100% - ${resizeSize} * 2);
  left: ${resizeSize};
  cursor: ns-resize;
}
.${exports.dialogWindowClassName} > .bh-resize-ct {
  top: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-cb {
  bottom: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-lm,
.${exports.dialogWindowClassName} > .bh-resize-rm {
  height: calc(100% - ${resizeSize} * 2);
  width: ${resizeSize};
  top: ${resizeSize};
  cursor: ew-resize;
}
.${exports.dialogWindowClassName} > .bh-resize-lm {
  left: 0px;
}
.${exports.dialogWindowClassName} > .bh-resize-rm {
  right: 0px;
}
.${exports.dialogWindowClassName}-mask {
  z-index: ${dialogWindowBaseZIndex};
}
${design === "material" ? `
.${exports.dialogWindowClassName}-root {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.dialogWindowClassName}-header {
  box-shadow: ${style_1.CssParam.m.sdBtm};
  border-bottom: 1px solid ${style_1.CssVar.bdc};
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
  margin-bottom: ${style_1.CssParam.m.sdPdd};
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.dialogWindowClassName}-header-close,
.${exports.dialogWindowClassName}-header-minimize {
  background: ${style_1.CssVar.bg.c_h};
  border: 1px solid transparent;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  border-radius: ${style_1.CssParam.m.r};
  margin-right: 5px;
}
.${exports.dialogWindowClassName}-header-close:hover,
.${exports.dialogWindowClassName}-header-minimize:hover {
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  margin-top: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  border-color: ${style_1.CssVar.bdc};
}
.${exports.dialogWindowClassName}-header-close:hover:active,
.${exports.dialogWindowClassName}-header-minimize:hover:active {
  box-shadow: none;
  margin-top: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * -0.5);
}
` : ""}
${design === "neumorphism" ? `
.${exports.dialogWindowClassName}-root {
  border-radius: ${style_1.CssParam.n.r};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
.${exports.dialogWindowClassName}-header {
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
  padding: ${style_1.CssParam.n.sdPdd};
  border-radius: ${style_1.CssParam.n.r};
  margin: ${style_1.CssParam.n.accent.sdPdd};
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
}
.${exports.dialogWindowClassName}-header-close,
.${exports.dialogWindowClassName}-header-minimize {
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  border-radius: ${style_1.CssParam.n.r};
  margin-left: ${style_1.CssParam.n.sdPdd};
}
.${exports.dialogWindowClassName}-header-close:hover,
.${exports.dialogWindowClassName}-header-minimize:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  background: ${style_1.CssParam.n.cvxBg};
}
.${exports.dialogWindowClassName}-header-close:hover:active,
.${exports.dialogWindowClassName}-header-minimize:hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding-top: 1.5px;
}
` : ""}
` });
const useDialogWindow = (component, options) => {
    const eref = (0, react_1.useRef)();
    const showed = (0, react_1.useRef)(false);
    const lastShowOptions = (0, react_1.useRef)();
    const callbacks = (0, react_1.useRef)({ closed: () => { }, hided: () => { } });
    const layout = (0, style_1.useLayout)();
    const hide = (0, react_1.useCallback)(() => {
        if (eref.current == null)
            return;
        eref.current.style.display = "none";
        eref.current.removeAttribute("data-zindex");
        callbacks.current.hided?.();
        showed.current = false;
    }, []);
    const close = (0, react_1.useCallback)(() => {
        if (eref.current == null)
            return;
        react_dom_1.default.unmountComponentAtNode(eref.current);
        eref.current.removeAttribute("data-zindex");
        callbacks.current.closed?.();
        showed.current = false;
    }, []);
    const show = (0, react_1.useCallback)((showOptions) => {
        if (eref.current == null) {
            eref.current = document.createElement("div");
            eref.current.setAttribute("data-name", "bhDialogwindow");
            document.body.appendChild(eref.current);
        }
        const zindex = getDialogWindowMaxZIndex(eref.current) + 1;
        const dwc = {
            close,
            hide,
        };
        lastShowOptions.current = showOptions;
        callbacks.current.closed = showOptions?.closed ?? options?.closed;
        callbacks.current.hided = showOptions?.hided ?? options?.hided;
        const opts = { ...options, ...showOptions };
        react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: layout },
            react_1.default.createElement(exports.DialogWindow, { dwc: dwc, zIndex: zindex, component: component, props: { ...options?.componentProps, ...showOptions?.componentProps }, setZIndex: (zi) => {
                    eref.current.setAttribute("data-zindex", String(zi));
                    return zi;
                }, contentStyle: { ...options?.contentStyle, ...showOptions?.contentStyle }, modal: opts.modal, header: opts.header, title: opts.title, closeButton: opts.closeButton, minimizeButton: opts.minimizeButton, move: opts.move, resize: opts.resize, fullScreen: opts.fullScreen, maskClickMode: opts.maskClickMode, top: opts.top, left: opts.left, height: opts.height, width: opts.width })), eref.current, () => {
            setTimeout(() => {
                showed.current = true;
                eref.current.setAttribute("data-zindex", String(zindex));
                eref.current.style.removeProperty("display");
            }, 0);
        });
    }, [layout]);
    (0, react_1.useEffect)(() => {
        if (showed.current)
            show(lastShowOptions.current);
    }, [layout]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (eref.current != null) {
                react_dom_1.default.unmountComponentAtNode(eref.current);
                eref.current?.parentElement.removeChild(eref.current);
                eref.current = null;
            }
        };
    }, []);
    return { show, close, hide };
};
exports.default = useDialogWindow;
