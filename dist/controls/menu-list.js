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
exports.MenuStyle = exports.menuClassName = void 0;
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.menuClassName = "bh-menu";
const MenuList = (props) => {
    const eref = (0, react_1.useRef)();
    const generateChildMenuItem = (items, nestLevel, selected) => {
        if (items == null)
            return undefined;
        const nodes = [];
        let keyCount = 0, hasSelected = false;
        for (const item of items) {
            if (item == null)
                continue;
            const ret = generateChildMenuItem(item.childItems, nestLevel + 1, selected);
            const hasChild = (ret?.nodes?.length ?? 0) > 0;
            let isSelected = selected?.(item) === true;
            hasSelected = hasSelected || isSelected;
            nodes.push(react_1.default.createElement(MenuItem, { key: keyCount++, props: item, addProps: {
                    nestLevel: nestLevel,
                    selected: isSelected,
                    hasChild,
                    childNodes: ret?.nodes,
                    showChildren: ret?.hasSelected === true && props.openChildren !== false,
                    clicked: props.clicked,
                    width: props.width
                } }));
        }
        return { nodes, hasSelected };
    };
    const nodes = (0, react_1.useMemo)(() => {
        return generateChildMenuItem(props.items, 0, props.selected).nodes;
    }, [props.items]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            eref.current?.querySelector("div[tabindex]")?.focus();
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(`${exports.menuClassName}-list ${style_1.scrollbarClassName}`, props.className), "data-dirc": props.direction ?? "vertical", "data-reverse": props.reverse === true }, nodes),
        exports.MenuStyle));
};
exports.default = MenuList;
const MenuItem = ({ props, addProps }) => {
    const [showedChild, setToggleChild] = (0, react_1.useState)(addProps.showChildren || (props.childItems != null && addProps.selected));
    const clickImpl = (currentTarget) => {
        if (addProps.hasChild) {
            const ret = props.clicked?.(props);
            if (ret !== false) {
                const elem = currentTarget.nextElementSibling;
                if (elem) {
                    const disp = elem.style.display;
                    if (disp === "none") {
                        elem?.style.removeProperty("display");
                        setToggleChild(true);
                    }
                    else {
                        elem.style.display = "none";
                        setToggleChild(false);
                    }
                }
            }
            addProps.clicked?.(props, ret);
            return;
        }
        const ret = props.clicked?.(props);
        addProps.clicked?.(props, ret);
    };
    const click = (e) => {
        clickImpl(e.currentTarget);
    };
    const keydown = (e) => {
        if (e.key === "Enter" || e.key === " ")
            clickImpl(e.currentTarget);
    };
    return (props.label == null ? react_1.default.createElement("div", { className: `${exports.menuClassName}-hr` }) :
        react_1.default.createElement("div", { className: `${exports.menuClassName}-item-wrap`, "data-nest": addProps.nestLevel },
            react_1.default.createElement("div", { className: (0, classname_utils_1.className)(`${exports.menuClassName}-item`, addProps.selected ? " bh-selected" : ""), "data-opened": showedChild, "data-click": props.clicked != null || props.childItems != null, onClick: click, onKeyDown: keydown, style: { width: addProps.width }, tabIndex: 0 },
                props.iconImage == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.menuClassName}-item-icon` },
                    react_1.default.createElement(icon_1.default, { image: props.iconImage })),
                react_1.default.createElement("div", { className: `${exports.menuClassName}-item-label` }, props.label),
                addProps.hasChild ? react_1.default.createElement("div", { className: `${exports.menuClassName}-item-icon` }, addProps.hasChild ? react_1.default.createElement(icon_1.default, { image: showedChild ? "pullup" : "pulldown" }) : react_1.default.createElement(react_1.default.Fragment, null)) : react_1.default.createElement(react_1.default.Fragment, null)),
            addProps.hasChild ? react_1.default.createElement("div", { className: `${exports.menuClassName}-children ${style_1.scrollbarClassName}`, style: { display: showedChild ? null : "none" } }, addProps.childNodes) : react_1.default.createElement(react_1.default.Fragment, null)));
};
exports.MenuStyle = react_1.default.createElement(style_1.default, { id: exports.menuClassName, depsDesign: true, css: ({ design }) => `
.${exports.menuClassName}-list,
.${exports.menuClassName}-item-wrap,
.${exports.menuClassName}-children {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
}
.${exports.menuClassName}-list {
  ${style_1.CssPV.fill}
}
.${exports.menuClassName}-list[data-dirc="horizontal"] {
  flex-flow: row nowrap;
  max-height: 100%;
  overflow: visible;
}
.${exports.menuClassName}-hr {
  box-sizing: border-box;
  padding: 0px;
  border: none;
  height: 1px;
  width: 100%;
  border-top: 1px solid ${style_1.CssVar.bdc};
}
.${exports.menuClassName}-list[data-dirc="horizontal"] > .${exports.menuClassName}-hr {
  width: 1px;
  height: 100%;
  border-top: none;
  border-left: 1px solid ${style_1.CssVar.bdc};
}
.${exports.menuClassName}-list[data-dirc="horizontal"] > .${exports.menuClassName}-item-wrap {
  flex: 1;
}
.${exports.menuClassName}-list[data-dirc="horizontal"] > .${exports.menuClassName}-item-wrap > .${exports.menuClassName}-children {
  background: ${style_1.CssVar.bg.c};
  max-height: 500%;
}
.${exports.menuClassName}-list[data-reverse="true"] .bh-menu-item-wrap {
  flex-direction: column-reverse;
}
.${exports.menuClassName}-item {
  ${style_1.CssPV.flex_r}
  flex: none;
  height: ${style_1.CssVar.size};
  overflow: hidden;
  user-select: none;
  z-index: 1;
}
.${exports.menuClassName}-item[data-click="true"] {
  cursor: pointer;
}
.${exports.menuClassName}-item-icon {
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  flex: none;
}
.${exports.menuClassName}-item-label {
  box-sizing: border-box;
  position: relative;
  flex: 1;
  padding: 2px 10px 0px 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.${exports.menuClassName}-item-label + .${exports.menuClassName}-item-icon {
  margin-right: 2px;
}
.${exports.menuClassName}-list[data-dirc="horizontal"] .${exports.menuClassName}-item-label {
  text-align: center;
}
.${exports.menuClassName}-children {
  z-index: 0;
}
${design === "material" ? `
.${exports.menuClassName}-item {
  border-radius: ${style_1.CssParam.m.r};
  margin: ${style_1.CssParam.m.sdPdd};
  border: 1px solid transparent;
}
.${exports.menuClassName}-item:not([data-click="false"]):hover {
  border-color: ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  margin-top: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});
  margin-bottom: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});
  background: ${style_1.CssVar.bg.c};
}
.${exports.menuClassName}-item:not([data-click="false"]):hover:active {
  box-shadow: none;
  margin-top: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});
  margin-bottom: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});
}
.${exports.menuClassName}-item.bh-selected {
  background: ${style_1.CssVar.bg.c_a} !important;
  margin: ${style_1.CssParam.m.sdPdd} !important;
  border-color: transparent !important;
  box-shadow: none !important;
  cursor: unset !important;  
}
.${exports.menuClassName}-item[data-opened="true"] > .${exports.menuClassName}-item-label::before,
.${exports.menuClassName}-item[data-click="false"] > .${exports.menuClassName}-item-label::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 0px;
  width: 100%;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid ${style_1.CssVar.bdc};
}
.${exports.menuClassName}-list[data-dirc="horizontal"] > .${exports.menuClassName}-item-wrap > .${exports.menuClassName}-children {
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  border-radius: 0px 0px ${style_1.CssParam.m.r} ${style_1.CssParam.m.r};
  margin-bottom: ${style_1.CssParam.m.sdPdd};
}
.${exports.menuClassName}-list[data-dirc="horizontal"][data-reverse="true"] > .${exports.menuClassName}-item-wrap > .${exports.menuClassName}-children {
  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;
  margin-bottom: 0px;
  margin-top: ${style_1.CssParam.m.sdPdd};
  box-shadow: ${style_1.CssParam.m.sdTop};
}
` : ""}
${design === "neumorphism" ? `
.${exports.menuClassName}-item {
  border-radius: ${style_1.CssParam.n.r};
  margin: ${style_1.CssParam.n.sdPdd};
}
.${exports.menuClassName}-item:not([data-click="false"]):hover {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
}
.${exports.menuClassName}-item:not([data-click="false"]):hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.menuClassName}-item:not([data-click="false"]):hover:active,
.${exports.menuClassName}-item.bh-selected {
  padding-top: 1.5px;
}
.${exports.menuClassName}-item.bh-selected[data-click] {
  background: ${style_1.CssParam.n.accent.cvxBg} !important;
  box-shadow: ${style_1.CssParam.n.ccvSd} !important;
  cursor: unset !important;
}
.${exports.menuClassName}-item[data-opened="true"],
.${exports.menuClassName}-item[data-click="false"] {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
}
.${exports.menuClassName}-list[data-dirc="horizontal"] > .${exports.menuClassName}-item-wrap > .${exports.menuClassName}-children {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: 0px 0px ${style_1.CssParam.n.r} ${style_1.CssParam.n.r};
  margin-bottom: ${style_1.CssParam.n.sdPdd};
}
.${exports.menuClassName}-list[data-dirc="horizontal"][data-reverse="true"] > .${exports.menuClassName}-item-wrap > .${exports.menuClassName}-children {
  border-radius: ${style_1.CssParam.n.r} ${style_1.CssParam.n.r} 0px 0px;
  margin-bottom: 0px;
  margin-top: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
` : ""}
` });
