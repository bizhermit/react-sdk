"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelStyle = exports.labelClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importDefault(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.labelClassName = "bh-lbl";
const Label = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: (0, classname_utils_1.className)(exports.labelClassName, props.className, props.bold ? `${exports.labelClassName}-bold` : "", props.padding ? `${exports.labelClassName}-pdd` : ""), style: props.style }, props.children),
        exports.LabelStyle));
};
exports.default = Label;
exports.LabelStyle = react_1.default.createElement(style_1.default, { id: exports.labelClassName, css: () => `
.${exports.labelClassName} {
  box-sizing: border-box;
  flex: none;
  padding-top: 2px;
  color: inherit;
}
.${exports.labelClassName}-bold {
  font-weight: bold;
}
.${exports.labelClassName}-pdd {
  padding-left: 5px;
  padding-right: 5px;
}
` });
