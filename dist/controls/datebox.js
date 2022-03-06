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
exports.DateBoxStyle = exports.dateBoxClassName = void 0;
const datetime_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/datetime-utils"));
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const popup_1 = __importDefault(require("../hooks/popup"));
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
const datepicker_1 = __importDefault(require("./datepicker"));
exports.dateBoxClassName = "bh-dtb";
const DateBox = (props) => {
    const eref = (0, react_1.useRef)(), yref = (0, react_1.useRef)(), mref = (0, react_1.useRef)(), dref = (0, react_1.useRef)();
    const popup = (0, popup_1.default)(datepicker_1.default);
    const mode = (0, prop_1.default)(props.mode ?? "ymd");
    const device = (0, dom_utils_1.useDevice)();
    const disabledInputs = (0, prop_1.default)(props.disabledInputs === true || device.touchable);
    const valueNum = (0, react_1.useRef)((() => {
        const date = (props.bind ? datetime_utils_1.default.removeTime(datetime_utils_1.default.convert(props.bind[props.name]), true) : null) ?? datetime_utils_1.default.getDate();
        switch (mode.current) {
            case "y":
                date.setDate(1);
                date.setMonth(0);
                break;
            case "ym":
                date.setDate(1);
                break;
            default:
                break;
        }
        return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
    })());
    const value = (0, value_1.default)(props, { binded: (v) => setInputValue(v) });
    const change = () => {
        if (valueNum.current.y == null && (mode.current === "y" || valueNum.current.m == null) && (mode.current === "y" || mode.current === "ym" || valueNum.current.d == null)) {
            value.setValue(undefined);
        }
        else {
            const dispDate = new Date(valueNum.current.y ?? datetime_utils_1.default.getDate().getFullYear(), valueNum.current.m ?? 0, valueNum.current.d ?? 1);
            const valueDate = datetime_utils_1.default.convert(value.getValue());
            if (mode.current === "y") {
                if (valueDate.getFullYear() === dispDate.getFullYear())
                    return;
            }
            else if (mode.current === "ym") {
                if (valueDate.getMonth() === dispDate.getMonth() && valueDate.getFullYear() === dispDate.getFullYear())
                    return;
            }
            else {
                if (datetime_utils_1.default.equalDate(valueDate, dispDate))
                    return;
            }
            switch (props.dataType) {
                case "date":
                    value.setValue(datetime_utils_1.default.copy(dispDate));
                    break;
                case "number":
                    value.setValue(dispDate.getTime());
                    break;
                default:
                    value.setValue(datetime_utils_1.default.format(dispDate));
                    break;
            }
        }
    };
    const changeY = (val) => {
        if (!isNumericOrEmpty(val)) {
            yref.current.value = String(valueNum.current.y ?? "");
            return;
        }
        valueNum.current.y = val == "" ? undefined : Number(val);
        if (val.length === 4)
            mref.current?.focus();
    };
    const changeM = (val) => {
        if (!isNumericOrEmpty(val)) {
            mref.current.value = String(valueNum.current.m ?? "");
            return;
        }
        valueNum.current.m = val == "" ? undefined : Number(val) - 1;
        if (val.length === 2 || Number(val) > 1)
            dref.current?.focus();
        else if (val.length === 0)
            yref.current.focus();
    };
    const changeD = (val) => {
        if (!isNumericOrEmpty(val)) {
            dref.current.value = String(valueNum.current.d ?? "");
            return;
        }
        valueNum.current.d = val == "" ? undefined : Number(val);
        if (val.length === 0)
            mref.current?.focus();
    };
    const focus = () => {
        if (yref.current?.value === "")
            yref.current.focus();
        else if (mref.current?.value === "")
            mref.current.focus();
        else if (dref.current?.value === "")
            dref.current.focus();
        else if (mode.current === "ymd")
            dref.current.focus();
        else if (mode.current === "ym")
            mref.current.focus();
        else
            yref.current.focus();
    };
    const hideCalendar = (0, react_1.useCallback)((absolute) => {
        popup.hide(absolute);
    }, []);
    const showCalendar = () => {
        if (props.disabled === true || popup.isShowed())
            return;
        popup.show(eref.current, {
            componentProps: {
                name: "value",
                bind: { value: value.getValue() },
                mode: mode.current,
                dataType: props.dataType,
                clickNegative: () => {
                    focus();
                    popup.hide(true);
                },
                clickPositive: (date) => {
                    setInputValue(date);
                    change();
                    hideCalendar(true);
                },
            },
            hideCallback: () => {
                const aelem = document.activeElement;
                if (aelem === yref.current || aelem === mref.current || aelem === dref.current)
                    return false;
            },
        });
    };
    const clickInput = () => {
        showCalendar();
    };
    const focusInput = (e) => {
        if (!disabledInputs.current)
            e.target.select();
        if (popup.isShowed())
            return;
        showCalendar();
        props.focus?.(value.getValue());
    };
    const blur = (e) => {
        if (e.relatedTarget === yref.current || e.relatedTarget === mref.current || e.relatedTarget === dref.current)
            return;
        change();
        setInputValue(value.getValue());
        if (popup.isShowed())
            return;
        hideCalendar(true);
        props.blur?.(value.getValue());
    };
    const clickButton = () => {
        if (mode.current === "ymd")
            dref.current.focus();
        else if (mode.current === "ym")
            mref.current.focus();
        else
            yref.current.focus();
    };
    const clickClear = () => {
        yref.current.value = "";
        if (mode.current !== "y")
            mref.current.value = "";
        if (mode.current === "ymd")
            dref.current.value = "";
        valueNum.current.y = valueNum.current.m = valueNum.current.d = undefined;
        value.setValue(undefined);
    };
    const changeUpdown = () => {
        if (valueNum.current.y == null)
            valueNum.current.y = new Date().getFullYear();
        if (valueNum.current.m == null) {
            if (mode.current === "y")
                valueNum.current.m = 0;
            else
                valueNum.current.m = new Date().getMonth();
        }
        if (valueNum.current.d == null) {
            if (mode.current === "ymd")
                valueNum.current.d = new Date().getDate();
            else
                valueNum.current.d = 1;
        }
        setInputValue(new Date(valueNum.current.y, valueNum.current.m, valueNum.current.d));
    };
    const escape = (commit) => {
        setTimeout(() => hideCalendar(true), 0);
        if (commit)
            change();
        setInputValue(value.getValue());
    };
    const keydownYearInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (e.shiftKey || mode.current === "y") {
                    escape(true);
                    props.blur?.(value.getValue());
                }
                break;
            case "Enter":
                escape(true);
                break;
            case "Escape":
                escape();
                break;
            case "ArrowUp":
                if (valueNum.current.y != null)
                    valueNum.current.y++;
                changeUpdown();
                break;
            case "ArrowDown":
                if (valueNum.current.y != null)
                    valueNum.current.y--;
                changeUpdown();
                break;
            default:
                break;
        }
    };
    const keydownMonthInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (mode.current === "ymd")
                    return;
                if (!e.shiftKey) {
                    escape(true);
                    props.blur?.(value.getValue());
                }
                break;
            case "Enter":
                escape(true);
                break;
            case "Escape":
                escape();
                break;
            case "ArrowUp":
                if (valueNum.current.m != null)
                    valueNum.current.m++;
                changeUpdown();
                break;
            case "ArrowDown":
                if (valueNum.current.m != null)
                    valueNum.current.m--;
                changeUpdown();
                break;
            default:
                break;
        }
    };
    const keydownDateInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (e.shiftKey)
                    return;
                escape(true);
                props.blur?.(value.getValue());
                break;
            case "Enter":
                escape(true);
                break;
            case "Escape":
                escape();
                break;
            case "ArrowUp":
                if (valueNum.current.d != null)
                    valueNum.current.d++;
                changeUpdown();
                break;
            case "ArrowDown":
                if (valueNum.current.d != null)
                    valueNum.current.d--;
                changeUpdown();
                break;
            default:
                break;
        }
    };
    const setInputValue = (val) => {
        const date = datetime_utils_1.default.convert(val);
        if (date == null) {
            clickClear();
        }
        else {
            if (yref.current == null)
                return;
            yref.current.value = String(valueNum.current.y = date.getFullYear());
            if (mode.current !== "y")
                mref.current.value = String((valueNum.current.m = date.getMonth()) + 1);
            if (mode.current === "ymd")
                dref.current.value = String(valueNum.current.d = date.getDate());
        }
    };
    const labelFormat = (val) => {
        const date = datetime_utils_1.default.convert(val);
        if (typeof props.labelFormat === "function")
            return props.labelFormat(date);
        return datetime_utils_1.default.format(date, props.labelFormat ?? (mode.current === "y" ? "yyyy" : mode.current === "ym" ? "yyyy/MM" : "yyyy/MM/dd"));
    };
    (0, react_1.useEffect)(() => {
        setInputValue(value.getValue());
    }, [props.disabled]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            focus();
            return con;
        };
        con.blur = () => {
            eref.current?.blur();
            return con;
        };
        con.getValue = () => value.getValue();
        con.setValue = (v) => {
            setInputValue(v);
            change();
            return con;
        };
        con.getDate = () => {
            return datetime_utils_1.default.convert(value.getValue());
        };
        con.setDate = (date) => {
            setInputValue(date);
            change();
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.dateBoxClassName, props.className), "data-disabled": props.disabled === true, "data-required": props.required, "data-mode": mode.current, onBlur: blur }, props.disabled === true ?
            react_1.default.createElement("span", { className: input_1.InputClassNames.lbl, title: props.title }, labelFormat(value.getValue())) : react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: `${exports.dateBoxClassName}-ipts`, title: props.title },
                react_1.default.createElement("input", { ref: yref, className: `${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-y`, type: "text", readOnly: disabledInputs.current, onChange: e => changeY(e.currentTarget.value), maxLength: 4, onFocus: focusInput, onClick: clickInput, onKeyDown: keydownYearInput }),
                mode.current !== "y" ? react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("span", null, "/"),
                    react_1.default.createElement("input", { ref: mref, className: `${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-m`, type: "text", readOnly: disabledInputs.current, onChange: e => changeM(e.currentTarget.value), maxLength: 2, onFocus: focusInput, onClick: clickInput, onKeyDown: keydownMonthInput })) : react_1.default.createElement(react_1.default.Fragment, null),
                mode.current === "ymd" ? react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("span", null, "/"),
                    react_1.default.createElement("input", { ref: dref, className: `${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-d`, type: "text", readOnly: disabledInputs.current, onChange: e => changeD(e.currentTarget.value), maxLength: 2, onFocus: focusInput, onClick: clickInput, onKeyDown: keydownDateInput })) : react_1.default.createElement(react_1.default.Fragment, null)),
            props.pulldownButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${props.clearButton === false ? input_1.InputClassNames.btn : input_1.InputClassNames.btn_bt} ${exports.dateBoxClassName}-pulldown`, onClick: clickButton, tabIndex: -1 },
                react_1.default.createElement(icon_1.default, { image: "calendar" })),
            props.clearButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn} ${exports.dateBoxClassName}-clear`, onClick: clickClear, tabIndex: -1 },
                react_1.default.createElement(icon_1.default, { image: "close" })))),
        input_1.default,
        exports.DateBoxStyle));
};
exports.default = DateBox;
const isNumericOrEmpty = (value) => {
    if (string_utils_1.default.isEmpty(value))
        return true;
    return /^[0-9]+$/.test(value);
};
exports.DateBoxStyle = react_1.default.createElement(style_1.default, { id: exports.dateBoxClassName, depsDesign: true, css: ({ design }) => `
.${input_1.InputClassNames.wrap}.${exports.dateBoxClassName} {
  width: unset;
}
.${exports.dateBoxClassName}-ipts {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 1px;
}
.${exports.dateBoxClassName}-ipt-y,
.${exports.dateBoxClassName}-ipt-m,
.${exports.dateBoxClassName}-ipt-d {
  flex: none;
  text-align: center;
  padding: 1px 2px 0px 2px;
}
.${exports.dateBoxClassName}-ipt-y {
  width: 46px;
}
.${exports.dateBoxClassName}-ipt-m,
.${exports.dateBoxClassName}-ipt-d {
  width: 28px;
}
${design === "material" ? `
.${exports.dateBoxClassName}-ipts {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r} 0px 0px ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.dc};
}
.${exports.dateBoxClassName}-ipts:last-child {
  border-radius: ${style_1.CssParam.m.r};
}
` : ""}
${design === "neumorphism" ? `
.${exports.dateBoxClassName}-ipts {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding: ${style_1.CssParam.n.ccvSdPdd} 0px 0px ${style_1.CssParam.n.ccvSdPdd};
  border-radius: ${style_1.CssParam.n.r} 0px 0px ${style_1.CssParam.n.r};
}
.${exports.dateBoxClassName}-ipts:last-child {
  border-radius: ${style_1.CssParam.n.r};
}
` : ""}
` });
