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
exports.CheckBoxStyle = exports.checkBoxClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.checkBoxClassName = "bh-ckb";
;
const CheckBox = (props) => {
    const ref = (0, react_1.useRef)();
    const checkedValue = (0, prop_1.default)((props.checkedValue ?? true));
    const uncheckedValue = (0, prop_1.default)((props.uncheckedValue ?? false));
    const { getValue, setValue } = (0, value_1.default)(props, {});
    const isChecked = getValue() === checkedValue.current;
    const toggleCheck = () => {
        if (props.disabled === true)
            return;
        setValue(isChecked ? uncheckedValue.current : checkedValue.current);
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
        con.isChecked = () => getValue() === checkedValue.current;
        con.setChecked = (checked) => {
            setValue(checked ? checkedValue.current : uncheckedValue.current);
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            if (v === checkedValue.current)
                setValue(v);
            else
                setValue(uncheckedValue.current);
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, `${exports.checkBoxClassName}`, props.className), title: props.title, tabIndex: props.disabled === true ? null : props.tabIndex ?? 0, "data-disabled": props.disabled === true, onClick: toggleCheck, onFocus: () => { props.focus?.(getValue()); }, onBlur: () => { props.blur?.(getValue()); }, onKeyDown: (e) => { (0, dom_utils_1.pressPositiveKey)(e, () => toggleCheck(), true); } },
            react_1.default.createElement("div", { className: `${exports.checkBoxClassName}-body`, "data-disabled": props.disabled === true, "data-required": props.required, "data-checked": isChecked }),
            props.children == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: input_1.InputClassNames.lbl }, props.children)),
        input_1.default,
        exports.CheckBoxStyle));
};
exports.default = CheckBox;
exports.CheckBoxStyle = react_1.default.createElement(style_1.default, { id: exports.checkBoxClassName, depsDesign: true, css: ({ design }) => `
.${exports.checkBoxClassName} {
  width: unset;
}
.${exports.checkBoxClassName}-body {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
.${exports.checkBoxClassName}[data-disabled="false"],
.${exports.checkBoxClassName}-body[data-disabled="false"] {
  cursor: pointer;
}
.${exports.checkBoxClassName}-body::before,
.${exports.checkBoxClassName}-body::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
}
.${exports.checkBoxClassName}-body::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
}
.${exports.checkBoxClassName}-body[data-disabled="true"]::before {
  opacity: 0.6;
}
.${exports.checkBoxClassName}-body[data-checked="true"]::after {
  height: 60%;
  width: 40%;
  top: 10%;
  left: 32%;
  transform: rotate(40deg);
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.checkBoxClassName} > .${input_1.InputClassNames.lbl} {
  padding-left: 3px;
}
.${exports.checkBoxClassName}[data-disabled="false"] > .${input_1.InputClassNames.lbl} {
  user-select: none;
}
${design === "material" ? `
.${exports.checkBoxClassName}-body::before {
  border-radius: ${style_1.CssParam.m.r};
  border: 1px solid ${style_1.CssVar.bdc};
}
.${exports.checkBoxClassName}-body[data-disabled="false"]::before {
  background: ${style_1.CssVar.bg.dc};
}
` : ""}
${design === "neumorphism" ? `
.${exports.checkBoxClassName}-body::before {
  border-radius: ${style_1.CssParam.n.r};
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.checkBoxClassName}-body[data-disabled="true"]::before {
  background: transparent;
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
` : ""}
` });
