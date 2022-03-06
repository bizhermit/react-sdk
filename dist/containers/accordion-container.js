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
exports.AccordionContainerStyle = exports.accordionContainerClassName = void 0;
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.accordionContainerClassName = "bh-acc_ctr";
const AccordionContainer = (props) => {
    const ref = (0, react_1.useRef)();
    const [opened, setToggle] = (0, react_1.useState)(props.defaultOpened !== false);
    const toggle = (flag) => {
        if (props.disabled === true)
            return;
        const ret = flag ?? !opened;
        setToggle(ret);
        props.toggled?.(ret);
    };
    const keydown = (e) => {
        if (e.key === "Enter" || e.key === " ")
            toggle();
    };
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            ref.current?.focus();
            return con;
        };
        con.open = () => {
            toggle(true);
            return con;
        };
        con.close = () => {
            toggle(false);
            return con;
        };
        con.toggle = (flag) => {
            toggle(flag);
            return con;
        };
    }, [props.toggled]);
    (0, react_1.useEffect)(() => {
        if (props.opened != null)
            toggle(props.opened !== false);
    }, [props.opened]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, className: (0, classname_utils_1.className)(exports.accordionContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style, "data-opened": opened },
            react_1.default.createElement("div", { className: `${exports.accordionContainerClassName}-caption`, onClick: () => toggle(), onKeyDown: keydown, tabIndex: props.disabled === true ? null : 0, "data-disabled": props.disabled === true },
                props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(icon_1.default, { image: opened ? "pullup" : "pulldown" }),
                react_1.default.createElement("div", { className: `${exports.accordionContainerClassName}-caption_label` }, props.caption)),
            opened ? react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.accordionContainerClassName}-body` }, props.children) : react_1.default.createElement(react_1.default.Fragment, null)),
        exports.AccordionContainerStyle));
};
exports.default = AccordionContainer;
exports.AccordionContainerStyle = react_1.default.createElement(style_1.default, { id: exports.accordionContainerClassName, depsDesign: true, css: ({ design }) => `
.${exports.accordionContainerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.accordionContainerClassName)}
.${exports.accordionContainerClassName}[data-opened="false"] {
  height: auto !important;
}
.${exports.accordionContainerClassName}-caption {
  ${style_1.CssPV.flex_r}
  flex: none;
  user-select: none;
  width: 100%;
  height: ${style_1.CssVar.size};
  z-index: 1;
}
.${exports.accordionContainerClassName}-caption[data-disabled="false"] {
  cursor: pointer;
}
.${exports.accordionContainerClassName}-caption_label {
  padding: 2px 10px 0px 10px;
  flex: 1;
  overflow: hidden;
}
.${exports.accordionContainerClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
  z-index: 0;
}
${design === "material" ? `
.${exports.accordionContainerClassName}-caption {
  border: 1px solid ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm};
  border-radius: ${style_1.CssParam.m.r};
  margin-top: ${style_1.CssParam.m.sdPdd};
  margin-bottom: ${style_1.CssParam.m.sdPdd};
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover {
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  margin-top: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});
  margin-bottom: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});
}
.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover:active {
  box-shadow: none;
  margin-top: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});
  margin-bottom: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});
}
.${exports.accordionContainerClassName}[data-opened="true"] .${exports.accordionContainerClassName}-caption {
  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;
}
.${exports.accordionContainerClassName}[data-opened="true"] .${exports.accordionContainerClassName}-caption::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  bottom: calc(${style_1.CssParam.m.sdPdd} * -2 - 1px);
  left: -1px;
  width: calc(100% + 2px);
  height: calc(${style_1.CssParam.m.sdPdd} * 2 + 1px);
  background: transparent;
  border-left: 1px solid ${style_1.CssVar.bdc};
  border-right: 1px solid ${style_1.CssVar.bdc};
  z-index: 0;
}
.${exports.accordionContainerClassName}-body {
  border-left: 1px solid ${style_1.CssVar.bdc};
  border-bottom: 1px solid ${style_1.CssVar.bdc};
  border-right: 1px solid ${style_1.CssVar.bdc};
  border-radius: 0px 0px ${style_1.CssParam.m.r} ${style_1.CssParam.m.r};
  z-index: 1;
}
` : ""}
${design === "neumorphism" ? `
.${exports.accordionContainerClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.accordionContainerClassName}-caption {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
  margin-bottom: ${style_1.CssParam.n.sdPdd};
}
.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
}
.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover:active {
  margin-top: 2px;
  height: calc(${style_1.CssVar.size} - 2px);
  background: ${style_1.CssParam.n.headerCcvBg};
  box-shadow: ${style_1.CssParam.n.ccvSd};
}
.${exports.accordionContainerClassName}[data-opened="false"] .${exports.accordionContainerClassName}-caption {
  margin-bottom: 0px;
}
` : ""}
` });
