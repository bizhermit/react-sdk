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
exports.MenuContainerStyle = exports.menuContainerClassName = void 0;
const react_1 = __importStar(require("react"));
const menu_list_1 = __importStar(require("../controls/menu-list"));
const icon_1 = __importDefault(require("../graphics/icon"));
const mask_1 = require("../hooks/mask");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const dom_utils_1 = require("../utils/dom-utils");
exports.menuContainerClassName = "bh-menu_ctr";
const MenuContainer = (props) => {
    const [opened, setOpened] = (0, react_1.useState)(false);
    const width = (0, react_1.useRef)(props.menu?.width);
    const pos = props.menu?.position ?? "left";
    const mode = props.menu?.mode ?? "visible";
    const direction = pos === "top" || pos === "bottom" ? "horizontal" : "vertical";
    const resizeMouseDown = (0, dom_utils_1.horizontalResizeMousedown)({
        resized: (w) => width.current = w,
    }, pos === "right");
    const mouseEnter = () => {
        if (mode !== "closeToEdge")
            return;
        setOpened(true);
    };
    const mouseLeave = () => {
        if (mode !== "closeToEdge")
            return;
        setOpened(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.menuContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter ?? "fill"), props.className), style: props.style },
            props.header == null && props.menu?.mode !== "closeToHeader" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-header-wrap` },
                react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-header`, style: { height: props.header?.height }, "data-pos": pos },
                    props.menu?.mode === "closeToHeader" ? react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-header-menu_icon`, onClick: () => setOpened(c => !c) },
                        react_1.default.createElement(icon_1.default, { image: opened ? "close" : "menu" })) : react_1.default.createElement(react_1.default.Fragment, null),
                    react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-header-content` }, props.header?.jsx))),
            react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-body`, "data-pos": pos, "data-mode": mode },
                props.menu == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                    mode === "closeToEdge" ? react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-nav-dummy` }) : react_1.default.createElement(react_1.default.Fragment, null),
                    react_1.default.createElement("nav", { className: `${exports.menuContainerClassName}-nav`, style: { width: width.current, display: opened || mode !== "closeToHeader" ? null : "none" }, "data-opened": opened, onMouseEnter: mouseEnter, onMouseLeave: mouseLeave },
                        react_1.default.createElement(menu_list_1.default, { items: props.menu.items, direction: direction, reverse: pos === "bottom", openChildren: direction === "vertical", clicked: (p, retFlag) => {
                                if ((p.childItems?.length ?? 0) > 0)
                                    return;
                                if (retFlag !== false)
                                    setOpened(false);
                            }, selected: props.menu.judgeSelected }),
                        direction === "vertical" && props.menu.resize !== false ? react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-nav-resizer`, onMouseDown: resizeMouseDown }) : react_1.default.createElement(react_1.default.Fragment, null))),
                react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-content` },
                    react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.menuContainerClassName}-content-body` }, props.children),
                    react_1.default.createElement("div", { className: `${exports.menuContainerClassName}-mask`, "data-role": mask_1.maskClassName, "data-name": props.maskName ?? "_" })))),
        exports.MenuContainerStyle));
};
exports.default = MenuContainer;
exports.MenuContainerStyle = react_1.default.createElement(style_1.default, { id: exports.menuContainerClassName, depsDesign: true, css: ({ design }) => `
.${exports.menuContainerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.menuContainerClassName)}
.${exports.menuContainerClassName}-header-wrap {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
  overflow: visible;
  z-index: 1;
}
.${exports.menuContainerClassName}-header {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
  height: calc(${style_1.CssVar.size} + 10px);
}
.${exports.menuContainerClassName}-header[data-pos="right"] {
  flex-direction: row-reverse;
}
.${exports.menuContainerClassName}-header-menu_icon {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.${exports.menuContainerClassName}-header-content {
  ${style_1.CssPV.flex_r}
  ${style_1.CssPV.f_x}
  overflow: hidden;
}
.${exports.menuContainerClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
  overflow: hidden;
  z-index: 0;
}
.${exports.menuContainerClassName}-nav {
  ${style_1.CssPV.flex_r_t}
  flex: none;
  z-index: 2;
  overflow: hidden;
  min-width: ${style_1.CssVar.size};
  min-height: ${style_1.CssVar.size};
  background: ${style_1.CssVar.bg.c};
  max-height: 100%;
  max-width: 100%;
}
.${exports.menuContainerClassName}-nav-dummy {
  box-sizing: border-box;
  z-index: 0;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
.${exports.menuContainerClassName}-nav > .${menu_list_1.menuClassName}-list {
  ${style_1.CssPV.f_x}
  z-index: 0;
}
.${exports.menuContainerClassName}-nav-resizer {
  box-sizing: border-box;
  height: 100%;
  width: 5px;
  cursor: col-resize;
  z-index: 1;
}
.${exports.menuContainerClassName}-content {
  ${style_1.CssPV.flex_c}
  flex: none;
  z-index: 0;
}
.${exports.menuContainerClassName}-content-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
  z-index: 0;
}
.${exports.menuContainerClassName}-mask {
  z-index: 1;
}
.${exports.menuContainerClassName}-body[data-pos="top"] {
  flex-direction: column;
}
.${exports.menuContainerClassName}-body[data-pos="bottom"] {
  flex-direction: column-reverse;
}
.${exports.menuContainerClassName}-body[data-pos="top"] > nav,
.${exports.menuContainerClassName}-body[data-pos="bottom"] > nav {
  width: 100% !important;
  overflow: visible;
  height: ${style_1.CssVar.size};
}
.${exports.menuContainerClassName}-body[data-pos="bottom"] > nav {
  align-items: flex-end;
}
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-content,
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-content {
  width: 100%;
  min-height: 0px;
  flex: 1;
}
.${exports.menuContainerClassName}-body[data-pos="left"] {
  flex-direction: row;
}
.${exports.menuContainerClassName}-body[data-pos="right"],
.${exports.menuContainerClassName}-body[data-pos="right"] > nav {
  flex-direction: row-reverse;
}
.${exports.menuContainerClassName}-body[data-pos="left"] > nav,
.${exports.menuContainerClassName}-body[data-pos="right"] > nav {
  height: 100%;
}
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-content,
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-content {
  height: 100%;
  min-width: 0px;
  flex: 1;
}
.${exports.menuContainerClassName}-body[data-mode="closeToHeader"] > nav,
.${exports.menuContainerClassName}-body[data-mode="closeToEdge"] > nav {
  position: absolute;
}
.${exports.menuContainerClassName}-body[data-mode="closeToEdge"][data-pos="left"] > nav[data-opened="false"],
.${exports.menuContainerClassName}-body[data-mode="closeToEdge"][data-pos="right"] > nav[data-opened="false"] {
  max-width: ${style_1.CssVar.size} !important;
}
.${exports.menuContainerClassName}-body[data-mode="closeToEdge"] > nav[data-opened="false"] .${exports.menuContainerClassName}-nav-resizer {
  display: none;
}
.${exports.menuContainerClassName}-body[data-mode="closeToEdge"] > nav[data-opened="false"] > .${menu_list_1.menuClassName}-list {
  overflow: hidden;
}
${design === "material" ? `
.${exports.menuContainerClassName}-header {
  box-shadow: ${style_1.CssParam.m.sdBtm};
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.menuContainerClassName}-header-menu_icon {
  border: 1px solid transparent;
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.menuContainerClassName}-header-menu_icon:hover {
  border-color: ${style_1.CssVar.bdc};
  margin-top: -${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
}
.${exports.menuContainerClassName}-header-menu_icon:hover:active {
  box-shadow: none;
  margin-top: 0px;
}
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-nav {
  box-shadow: ${style_1.CssParam.m.sdRight};
  padding-top: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-right: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-nav {
  box-shadow: ${style_1.CssParam.m.sdLeft};
  padding-top: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-left: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-nav {
  box-shadow: ${style_1.CssParam.m.sdBtm};
}
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-nav-dummy,
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-top: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-nav {
  box-shadow: ${style_1.CssParam.m.sdTop};
}
.${exports.menuContainerClassName}-body > .${exports.menuContainerClassName}-content {
  padding-top:  ${style_1.CssParam.m.sdPdd};
}
.${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-nav .${menu_list_1.menuClassName}-list[data-dirc="horizontal"] .${menu_list_1.menuClassName}-children {
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-nav-dummy {
  min-height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
}
.${exports.menuContainerClassName}-body[data-pos="left"][data-mode="closeToEdge"] > .${exports.menuContainerClassName}-nav[data-opened="false"] .${menu_list_1.menuClassName}-item,
.${exports.menuContainerClassName}-body[data-pos="right"][data-mode="closeToEdge"] > .${exports.menuContainerClassName}-nav[data-opened="false"] .${menu_list_1.menuClassName}-item {
  border: none;
}
` : ""}
${design === "neumorphism" ? `
.${exports.menuContainerClassName}-header-wrap {
  padding: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-header {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.menuContainerClassName}-header-menu_icon {
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.menuContainerClassName}-header-menu_icon:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  background: ${style_1.CssParam.n.cvxBg};
}
.${exports.menuContainerClassName}-header-menu_icon:hover:active {
  padding-top: 1px;
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.menuContainerClassName}-nav {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.menuContainerClassName}-nav .${menu_list_1.menuClassName}-list[data-dirc="horizontal"] .${menu_list_1.menuClassName}-children {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
}
.${exports.menuContainerClassName}-body:not([data-mode="visible"]) > .${exports.menuContainerClassName}-nav {
  max-height: calc(100% - ${style_1.CssParam.n.accent.sdPdd});
  max-width: calc(100% - ${style_1.CssParam.n.accent.sdPdd} * 2);
}
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="left"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-right: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="right"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-left: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="top"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-bottom: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-body[data-pos="bottom"] > .${exports.menuContainerClassName}-nav-dummy {
  margin-top: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-body {
  padding: 0px ${style_1.CssParam.n.accent.sdPdd} ${style_1.CssParam.n.accent.sdPdd} ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-body:only-child {
  padding-top: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.menuContainerClassName}-nav,
.${exports.menuContainerClassName}-nav-dummy {
  min-height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
}
` : ""}
` });
