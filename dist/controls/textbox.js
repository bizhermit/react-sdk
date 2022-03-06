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
exports.textBoxClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importDefault(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.textBoxClassName = "bh-txb";
const TextBox = (props) => {
    const ref = (0, react_1.useRef)();
    const setInputValue = (val) => {
        if (ref.current)
            ref.current.value = val ?? "";
    };
    const { getValue, setValue, getTitle, getStatus } = (0, value_1.default)(props, { binded: setInputValue });
    const mousedown = (0, dom_utils_1.horizontalResizeMousedown)(props);
    (0, react_1.useEffect)(() => {
        setInputValue(getValue());
    }, [props.disabled]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            ref.current?.focus();
            return con;
        };
        con.blur = () => {
            ref.current?.blur();
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            setValue(v);
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.textBoxClassName, props.className), style: props.style },
            props.disabled ?
                react_1.default.createElement("span", { className: `${input_1.InputClassNames.lbl}`, title: props.title, "data-align": props.textAlign ?? "left" }, getValue()) :
                react_1.default.createElement("input", { ref: ref, className: `${input_1.InputClassNames.ipt}`, type: props.type ?? "text", tabIndex: props.tabIndex, title: getTitle(), onChange: e => setValue(e.target.value), maxLength: props.maxLength, placeholder: props.placeholder, onKeyDown: props.keydown, onFocus: () => props.focus?.(getValue()), onBlur: () => props.blur?.(getValue()), "data-align": props.textAlign ?? "left", "data-status": getStatus() }),
            props.resize === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.resize_x}`, onMouseDown: mousedown })),
        input_1.default,
        TextBoxStyle));
};
exports.default = TextBox;
const TextBoxStyle = react_1.default.createElement(style_1.default, { id: exports.textBoxClassName, css: () => `
` });
