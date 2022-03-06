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
exports.ButtonStyle = exports.buttonClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const icon_1 = __importStar(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.buttonClassName = "bh-btn";
const Button = ((props) => {
    const ref = (0, react_1.useRef)();
    const disabled = (0, react_1.useRef)(false);
    const lock = () => {
        disabled.current = true;
        if (ref.current)
            ref.current.disabled = true;
    };
    const unlock = (preventFocus) => {
        disabled.current = props.disabled === true;
        if (ref.current) {
            ref.current.disabled = disabled.current;
            if (preventFocus !== true)
                ref.current.focus();
        }
    };
    const click = () => {
        if (disabled.current)
            return;
        lock();
        (async () => {
            const ret = props.click?.((preventFocus) => unlock(preventFocus), ref.current);
            if (ret == null)
                unlock();
        })();
    };
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            ref.current?.focus();
            return con;
        };
        con.blur = () => {
            ref.current?.blur();
            return con;
        };
        con.click = () => click();
    });
    (0, react_1.useEffect)(() => {
        unlock(true);
    }, [props.disabled]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(`${exports.buttonClassName}`, props.className), style: props.style, "data-icon": props.image != null, "data-text": props.children != null },
            react_1.default.createElement("button", { className: `${exports.buttonClassName}-body`, ref: ref, onClick: click, tabIndex: props.tabIndex, title: props.title },
                props.image == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(icon_1.default, { image: props.image }),
                string_utils_1.default.isString(props.children) ? react_1.default.createElement("span", { className: `${exports.buttonClassName}-lbl` }, props.children) : props.children ?? react_1.default.createElement(react_1.default.Fragment, null))),
        exports.ButtonStyle));
});
exports.default = Button;
exports.ButtonStyle = react_1.default.createElement(style_1.default, { id: exports.buttonClassName, depsDesign: true, css: ({ design }) => `
.${exports.buttonClassName} {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  overflow: visible;
  height: ${style_1.CssVar.size};
  min-width: ${style_1.CssVar.size};
}
.${exports.buttonClassName}-body {
  ${style_1.CssPV.flex_r_c}
  ${style_1.CssPV.fill}
  border: none;
  background: transparent;
  color: inherit;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
  user-select: none;
  font-size: inherit;
}
.${exports.buttonClassName}[data-icon="true"][data-text="false"] {
  width: ${style_1.CssVar.size};
}
.${exports.buttonClassName}-body > .${icon_1.iconClassName} {
  height: calc(${style_1.CssVar.size} * 0.9);
  width: calc(${style_1.CssVar.size} * 0.9);
}
.${exports.buttonClassName}-body:disabled {
  opacity: 0.6;
  cursor: inherit;
  pointer-events: none;
}
.${exports.buttonClassName}-lbl {
  ${style_1.CssPV.flex_r_c}
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  padding: 1px 10px 0px 10px;
}
.${icon_1.iconClassName} + .${exports.buttonClassName}-lbl {
  padding-left: 5px;
}
${design === "material" ? `
.${exports.buttonClassName} {
  padding: ${style_1.CssParam.m.sdPdd};
  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
}
.${exports.buttonClassName}-body {
  border: 1px solid ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm};
  border-radius: ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.c};
}
.${exports.buttonClassName}-body:hover {
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  margin-top: -${style_1.CssParam.m.updownMargin};
  margin-bottom: ${style_1.CssParam.m.updownMargin};
}
.${exports.buttonClassName}-body:hover:active,
.${exports.buttonClassName}-body:disabled {
  box-shadow: none;
  margin-top: ${style_1.CssParam.m.updownMargin};
  margin-bottom: -${style_1.CssParam.m.updownMargin};
}
` : ""}
${design === "neumorphism" ? `
.${exports.buttonClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
}
.${exports.buttonClassName}-body {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.buttonClassName}-body:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  z-index: 1;
}
.${exports.buttonClassName}-body:hover:active,
.${exports.buttonClassName}-body:disabled {
  padding-top: 1px;
  margin-top: 1px;
  height: calc(100% - 1px);
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.buttonClassName}-body:hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
}
.${exports.buttonClassName}-body:disabled {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
` : ""}
` });
