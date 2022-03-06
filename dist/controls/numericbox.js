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
exports.NumericBoxStyle = exports.numericBoxClassName = void 0;
const number_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/number-utils"));
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.numericBoxClassName = "bh-nub";
const NumericBox = (props) => {
    const ref = (0, react_1.useRef)();
    const sign = (0, prop_1.default)(props.sign ?? "");
    const float = (0, prop_1.default)(props.float ?? 0);
    const lastString = (0, react_1.useRef)("");
    const interval = (0, prop_1.default)(props.incrementInterval ?? 1);
    const formatValue = (value) => {
        if (props.thousandsSeparator === false)
            return String(value ?? "");
        return number_utils_1.default.format(value, { fpad: float.current }) ?? "";
    };
    const changeValue = (value) => {
        if (value === "") {
            lastString.current = "";
            setValue(null);
            return "";
        }
        let retStr = value, num = null;
        switch (sign.current) {
            case "only-positive":
                if (float.current > 0) {
                    if (!new RegExp(`^[+-]?([0-9]*|0)(\.[0-9]{0,${float.current}})?$`).test(value))
                        return ref.current.value = lastString.current;
                    num = Number(value);
                }
                else {
                    if (!/^[+-]?[0-9]*$/.test(value))
                        return ref.current.value = lastString.current;
                    if (/^[+-]?[0-9]*|0$/.test(value))
                        num = Number(value);
                }
                break;
            case "only-negative":
                if (float.current > 0) {
                    if (!new RegExp(`^[-]?([0-9]*|0)(\.[0-9]{0,${float.current}})?$`).test(value))
                        return ref.current.value = lastString.current;
                    num = Number(value);
                }
                else {
                    if (!/^[-]?[0-9]*$/.test(value))
                        return ref.current.value = lastString.current;
                    if (/^[-]?[0-9]*|0$/.test(value))
                        num = Number(value);
                }
                break;
            default:
                if (float.current > 0) {
                    if (!new RegExp(`^[+-]?([0-9]*|0)(\.[0-9]{0,${float.current}})?$`).test(value))
                        return ref.current.value = lastString.current;
                    num = Number(value);
                }
                else {
                    if (!/^[+-]?[0-9]*$/.test(value))
                        return ref.current.value = lastString.current;
                    if (/^[+-]?[0-9]*|0$/.test(value))
                        num = Number(value);
                }
                break;
        }
        if (num != null && !isNaN(num)) {
            let checkedNum = num;
            if (props.max != null)
                checkedNum = Math.min(checkedNum, props.max);
            if (props.min != null)
                checkedNum = Math.max(checkedNum, props.min);
            switch (sign.current) {
                case "only-positive":
                    checkedNum = Math.max(0, checkedNum);
                    break;
                case "only-negative":
                    checkedNum = Math.min(0, checkedNum);
                    break;
                default:
                    break;
            }
            setValue(checkedNum);
            retStr = String(checkedNum);
            if (num !== checkedNum)
                ref.current.value = retStr;
        }
        return lastString.current = retStr;
    };
    const incrementValue = (format) => {
        const v = changeValue(String(number_utils_1.default.add(getValue() ?? 0, interval.current)));
        if (!format || string_utils_1.default.isEmpty(v))
            ref.current.value = v;
        else
            ref.current.value = formatValue(Number(v));
    };
    const decrementValue = (format) => {
        const v = changeValue(String(number_utils_1.default.minus(getValue() ?? 0, interval.current)));
        if (!format || string_utils_1.default.isEmpty(v))
            ref.current.value = v;
        else
            ref.current.value = formatValue(Number(v));
    };
    const setInputValue = (val) => {
        if (ref.current)
            ref.current.value = val == null ? "" : formatValue(val);
    };
    const { getValue, setValue, getTitle, getStatus } = (0, value_1.default)(props, { binded: setInputValue });
    const mousedown = (0, dom_utils_1.horizontalResizeMousedown)(props);
    const focus = () => {
        props.focus?.(getValue());
        ref.current.value = lastString.current = String(number_utils_1.default.removeThousandsSeparator(ref.current.value) ?? "");
    };
    const blur = () => {
        ref.current.value = formatValue(getValue());
        props.blur?.(getValue());
    };
    const keydown = (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (props.incrementWhenKeydown !== false)
                    incrementValue();
                break;
            case "ArrowDown":
                if (props.incrementWhenKeydown !== false)
                    decrementValue();
                break;
            default:
                break;
        }
        props.keydown?.(e);
    };
    const buttonMousedown = (0, react_1.useCallback)((increment) => {
        if (increment)
            incrementValue(true);
        else
            decrementValue(true);
        let roop = true;
        const end = () => {
            roop = false;
            window.removeEventListener("mouseup", end);
        };
        window.addEventListener("mouseup", end);
        setTimeout(() => {
            const func = () => {
                setTimeout(() => {
                    if (roop) {
                        if (increment)
                            incrementValue(true);
                        else
                            decrementValue(true);
                        func();
                    }
                }, 30);
            };
            func();
        }, 500);
    }, []);
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
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.numericBoxClassName, props.className), style: props.style },
            props.disabled ?
                react_1.default.createElement("span", { className: input_1.InputClassNames.lbl, "data-align": props.textAlign ?? "right", title: props.title }, formatValue(getValue())) :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("input", { ref: ref, className: input_1.InputClassNames.ipt, type: "text", inputMode: float.current > 0 ? "decimal" : "numeric", tabIndex: props.tabIndex, title: getTitle(), placeholder: props.placeholder, max: props.max, min: props.min, onKeyDown: keydown, onFocus: focus, onBlur: blur, onChange: e => changeValue(e.currentTarget.value), "data-align": props.textAlign ?? "right", "data-status": getStatus() }),
                    react_1.default.createElement("div", { className: `${exports.numericBoxClassName}-btns` },
                        react_1.default.createElement("div", { className: `${exports.numericBoxClassName}-inc`, onMouseDown: () => buttonMousedown(true) }),
                        react_1.default.createElement("div", { className: `${exports.numericBoxClassName}-dec`, onMouseDown: () => buttonMousedown(false) }))),
            props.resize === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: input_1.InputClassNames.resize_x, onMouseDown: mousedown })),
        input_1.default,
        exports.NumericBoxStyle));
};
exports.default = NumericBox;
exports.NumericBoxStyle = react_1.default.createElement(style_1.default, { id: exports.numericBoxClassName, depsDesign: true, css: ({ design }) => `
.${exports.numericBoxClassName}-btns {
  ${style_1.CssPV.flex_c}
  flex: none;
  width: ${style_1.CssVar.size};
  height: 100%;
}
.${exports.numericBoxClassName}-inc,
.${exports.numericBoxClassName}-dec {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  flex: 1;
  cursor: pointer;
}
.${exports.numericBoxClassName}-inc::before,
.${exports.numericBoxClassName}-dec::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 40%;
  width: 50%;
  top: calc(25% + 1px);
  left: 25%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.numericBoxClassName}-inc::before {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
.${exports.numericBoxClassName}-dec::before {
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
${design === "material" ? `
.${exports.numericBoxClassName} > .${input_1.InputClassNames.ipt} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.${exports.numericBoxClassName}-inc,
.${exports.numericBoxClassName}-dec {
  border: 1px solid ${style_1.CssVar.bdc};
  background: ${style_1.CssVar.bg.c};
  border-left: none;
  z-index: 0;
}
.${exports.numericBoxClassName}-inc {
  border-top-right-radius: ${style_1.CssParam.m.r};
  margin-bottom: -1px;
}
.${exports.numericBoxClassName}-dec {
  border-bottom-right-radius: ${style_1.CssParam.m.r};
}
.${exports.numericBoxClassName}-inc:hover,
.${exports.numericBoxClassName}-dec:hover {
  margin-top: -${style_1.CssParam.m.updownMargin};
  margin-bottom: ${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  z-index: 1;
}
.${exports.numericBoxClassName}-inc:hover {
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} - 1px);
}
.${exports.numericBoxClassName}-inc:active,
.${exports.numericBoxClassName}-dec:active {
  margin-top: 0px;
  margin-bottom: 0px;
  box-shadow: none;
}
.${exports.numericBoxClassName}-inc:active {
  border-bottom: none;
}
` : ""}
${design === "neumorphism" ? `
.${exports.numericBoxClassName} > .${input_1.InputClassNames.ipt} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.${exports.numericBoxClassName}-inc,
.${exports.numericBoxClassName}-dec {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  z-index: 0;
}
.${exports.numericBoxClassName}-inc {
  border-top-right-radius: ${style_1.CssParam.n.r};
  margin-top: -1px;
}
.${exports.numericBoxClassName}-dec {
  border-bottom-right-radius: ${style_1.CssParam.n.r};
}
.${exports.numericBoxClassName}-inc:hover,
.${exports.numericBoxClassName}-dec:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  z-index: 1;
}
.${exports.numericBoxClassName}-inc:active,
.${exports.numericBoxClassName}-dec:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.numericBoxClassName}-inc:active {
  margin-top: 0px;
  margin-bottom: -1px;
}
.${exports.numericBoxClassName}-dec:active::before {
  top: calc(25% + 2px);
}
` : ""}
` });
