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
exports.TextAreaStyle = exports.textAreaClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importDefault(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.textAreaClassName = "bh-txa";
const TextArea = (props) => {
    const ref = (0, react_1.useRef)();
    const setInputValue = (val) => {
        if (ref.current)
            ref.current.value = val ?? "";
    };
    const { getValue, setValue, getTitle, getStatus } = (0, value_1.default)(props, { binded: setInputValue });
    const mousedown = (0, react_1.useCallback)((e) => {
        if (props.resize === false)
            return;
        const elem = e.target.parentElement;
        const rect = elem.getBoundingClientRect();
        let lHeight = rect.height, lWidth = rect.width, posX = e.clientX, posY = e.clientY;
        const move = (e) => {
            if (props.resize == null || props.resize === true || props.resize === "horizontal")
                elem.style.width = (e.clientX - posX + lWidth) + "px";
            if (props.resize == null || props.resize === true || props.resize === "vertical")
                elem.style.height = (e.clientY - posY + lHeight) + "px";
        };
        (0, dom_utils_1.setCursor)(getComputedStyle(e.currentTarget).cursor);
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, dom_utils_1.releaseCursor)();
            if (props.resized) {
                const crect = elem.getBoundingClientRect();
                props.resized({ height: crect.height, width: crect.width });
            }
        };
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    }, [props.resize, props.resized]);
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
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.textAreaClassName, props.className), style: props.style, "data-resize": props.resize },
            react_1.default.createElement("textarea", { ref: ref, className: `${input_1.InputClassNames.ipt}`, tabIndex: props.tabIndex, placeholder: props.placeholder, maxLength: props.maxLength, onFocus: () => props.focus?.(getValue()), onBlur: () => props.blur?.(getValue()), onChange: e => setValue(e.target.value), title: getTitle(), "data-status": getStatus(), disabled: props.disabled === true }),
            props.resize === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: props.resize === "horizontal" ? input_1.InputClassNames.resize_x : (props.resize === "vertical" ? input_1.InputClassNames.resize_y : input_1.InputClassNames.resize), onMouseDown: mousedown })),
        input_1.default,
        exports.TextAreaStyle));
};
exports.default = TextArea;
exports.TextAreaStyle = react_1.default.createElement(style_1.default, { id: exports.textAreaClassName, depsDesign: true, css: ({ design }) => `
.${exports.textAreaClassName} {
  align-items: stretch;
  height: 200px;
  width: 360px;
}
.${exports.textAreaClassName} > .${input_1.InputClassNames.ipt} {
  resize: none;
  padding: 5px;
  min-width: 100%;
}
.${exports.textAreaClassName}[data-resize="vertical"] {
  flex-flow: column;
}
${design === "material" ? `
.${exports.textAreaClassName} > .${input_1.InputClassNames.ipt}:disabled {
  border-color: transparent;
}
` : ""}
` });
