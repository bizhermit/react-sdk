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
exports.TimeBoxStyle = exports.timeBoxClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const time_1 = __importStar(require("@bizhermit/time"));
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
const timepicker_1 = __importDefault(require("./timepicker"));
exports.timeBoxClassName = "bh-tmb";
const hourIsActive = (mode) => {
    return mode === "hm" || mode === "hms" || mode === "h";
};
const minuteIsActive = (mode) => {
    return mode === "hm" || mode === "hms" || mode === "ms";
};
const secondIsActive = (mode) => {
    return mode === "hms" || mode === "ms";
};
const TimeBox = (props) => {
    const eref = (0, react_1.useRef)(), href = (0, react_1.useRef)(), mref = (0, react_1.useRef)(), sref = (0, react_1.useRef)();
    const popup = (0, popup_1.default)(timepicker_1.default);
    const mode = (0, prop_1.default)(props.mode ?? "hm");
    const unit = (0, react_1.useRef)((() => {
        if (props.unit)
            return props.unit;
        switch (mode.current) {
            case "h":
                return "hour";
            case "hm":
                return "minute";
            case "hms":
            case "ms":
                return "second";
            default:
                return "millisecond";
        }
        ;
    })());
    const min = (0, prop_1.default)(Math.max(0, ( /*props.min ??*/0) * 1000));
    const max = (0, prop_1.default)(( /*props.max ??*/86400) * 1000 - 1);
    const device = (0, dom_utils_1.useDevice)();
    const disabledInputs = (0, prop_1.default)(props.disabledInputs === true || device.touchable);
    const interval = (0, react_1.useMemo)(() => {
        let s = props.secondInterval ?? 10;
        let m = props.minuteInterval ?? 10;
        let h = props.hourInterval ?? 1;
        if (secondIsActive(mode.current))
            m = 1;
        if (minuteIsActive(mode.current))
            h = 1;
        let incH = props.hourIncrementInterval ?? 1;
        if (incH % h !== 0)
            incH = h;
        let incM = props.minuteIncrementInterval ?? 10;
        if (incM % m !== 0)
            incM = m;
        let incS = props.secondIncrementInterval ?? 10;
        if (incS % s !== 0)
            incS = incS;
        return { h, m, s, incH, incM, incS };
    }, [mode.current, props.hourInterval, props.minuteInterval, props.secondInterval, props.hourIncrementInterval, props.minuteIncrementInterval, props.secondIncrementInterval]);
    const value = (0, value_1.default)(props, { binded: (v) => setInputValue(v) });
    const valueNum = (0, react_1.useRef)((() => {
        const val = value.getValue();
        if (val == null)
            return [undefined, undefined, undefined];
        const time = new time_1.default(val);
        return [hourIsActive(mode.current) ? time.getHours() : 0, minuteIsActive(mode.current) ? time.getMinutes() : 0, secondIsActive(mode.current) ? time.getSeconds() : 0];
    })());
    const hideClock = (0, react_1.useCallback)((absolute) => {
        popup.hide(absolute);
    }, []);
    const showClock = () => {
        if (props.disabled === true || popup.isShowed())
            return;
        popup.show(eref.current, {
            componentProps: {
                name: "value",
                bind: { value: value.getValue() },
                mode: mode.current,
                hourInterval: interval.h,
                minuteInterval: interval.m,
                secondInterval: interval.s,
                // max: max.current,
                // min: min.current,
                unit: unit.current,
                clickNegative: () => {
                    focus();
                    popup.hide(true);
                },
                clickPositive: (time) => {
                    setInputValue(time);
                    change();
                    hideClock(true);
                },
            },
            hideCallback: () => {
                const aelem = document.activeElement;
                if (aelem === href.current || aelem === mref.current || aelem === sref.current)
                    return false;
            }
        });
    };
    const setInputValue = (val, preventConvert) => {
        if (val == null) {
            clickClear();
        }
        else {
            const time = new time_1.default(preventConvert ? val : time_1.TimeUtils.convertUnitToMilliseconds(val, unit.current));
            let doChange = false;
            if (href.current) {
                let h = time.getHours();
                if (h % interval.h !== 0) {
                    h = Math.round(h / interval.h) * interval.h;
                    doChange = true;
                }
                href.current.value = String(valueNum.current[0] = h);
            }
            if (mref.current) {
                if (hourIsActive(mode.current)) {
                    let m = time.getMinutes();
                    if (m % interval.m !== 0) {
                        m = Math.round(m / interval.m) * interval.m;
                        if (m >= 60) {
                            m = Math.floor(59 / interval.m) * interval.m;
                        }
                        doChange = true;
                    }
                    mref.current.value = ("00" + String(valueNum.current[1] = m)).slice(-2);
                }
                else {
                    let m = time.getMinutes(true);
                    if (m % interval.m !== 0) {
                        m = Math.round(m / interval.m) * interval.m;
                        doChange = true;
                    }
                    mref.current.value = String(valueNum.current[1] = m);
                }
            }
            if (sref.current) {
                let s = time.getSeconds();
                if (s % interval.s !== 0) {
                    s = Math.round(s / interval.s) * interval.s;
                    if (s >= 60) {
                        s = Math.floor(59 / interval.s) * interval.s;
                    }
                    doChange = true;
                }
                sref.current.value = ("00" + String(valueNum.current[2] = s)).slice(-2);
            }
            if (doChange)
                change();
        }
    };
    const change = () => {
        if (hourIsActive(mode.current)) {
            if (valueNum.current[0] == null) {
                value.setValue(undefined);
                return;
            }
        }
        if (minuteIsActive(mode.current)) {
            if (valueNum.current[1] == null) {
                value.setValue(undefined);
                return;
            }
        }
        if (secondIsActive(mode.current)) {
            if (valueNum.current[2] == null) {
                value.setValue(undefined);
                return;
            }
        }
        value.setValue(time_1.TimeUtils.convertMillisecondsToUnit(new time_1.default(`${valueNum.current[0]}:${valueNum.current[1]}:${valueNum.current[2]}`).getTime(), unit.current));
    };
    const changeH = (val) => {
        if (!isNumericOrEmpty(val)) {
            href.current.value = String(valueNum[0] ?? "");
            return;
        }
        valueNum.current[0] = val == "" ? undefined : Number(val);
        if (val.length === 2)
            mref.current?.focus();
    };
    const changeM = (val) => {
        if (!isNumericOrEmpty(val)) {
            mref.current.value = String(valueNum[1] ?? "");
            return;
        }
        valueNum.current[1] = val == "" ? undefined : Number(val);
        if (val.length === 2)
            sref.current?.focus();
        else if (val.length === 0)
            href.current?.focus();
    };
    const changeS = (val) => {
        if (!isNumericOrEmpty(val)) {
            href.current.value = String(valueNum[2] ?? "");
            return;
        }
        valueNum.current[2] = val == "" ? undefined : Number(val);
        if (val.length === 0)
            mref.current?.focus();
    };
    const focusInput = (e) => {
        if (!disabledInputs.current)
            e.target.select();
        if (popup.isShowed())
            return;
        showClock();
        props.focus?.(value.getValue());
    };
    const blur = (e) => {
        if (e.relatedTarget === href.current || e.relatedTarget === mref.current || e.relatedTarget === sref.current)
            return;
        change();
        setInputValue(value.getValue());
        if (popup.isShowed())
            return;
        hideClock(true);
        props.blur?.(value.getValue());
    };
    const clickInput = () => {
        showClock();
    };
    const clickButton = () => {
        let elem = undefined;
        switch (unit.current) {
            case "hour":
                elem = href.current;
                break;
            case "minute":
                elem = mref.current;
                break;
            case "second":
                elem = sref.current;
                break;
        }
        (elem ?? eref.current.querySelector("input"))?.focus();
    };
    const clickClear = () => {
        valueNum.current = [undefined, undefined, undefined];
        if (href.current)
            href.current.value = "";
        if (mref.current)
            mref.current.value = "";
        if (sref.current)
            sref.current.value = "";
        value.setValue(undefined);
    };
    const optimizeValueNum = () => {
        setInputValue(Math.min(max.current, Math.max(min.current, (valueNum.current[0] ?? 0) * 3600 + (valueNum.current[1] ?? 0) * 60 + (valueNum.current[2] ?? 0)) * 1000), true);
    };
    const incrementHour = () => {
        valueNum.current[0] = valueNum.current[0] == null ? 0 : (valueNum.current[0] + interval.incH);
        optimizeValueNum();
    };
    const decrementHour = () => {
        valueNum.current[0] = valueNum.current[0] == null ? 0 : (valueNum.current[0] - interval.incH);
        optimizeValueNum();
    };
    const keydownHourInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (mode.current !== "h" && !e.shiftKey)
                    return;
                setTimeout(() => {
                    hideClock(true);
                }, 0);
                change();
                setInputValue(value.getValue());
                props.blur?.(value.getValue());
                break;
            case "Enter":
                setTimeout(() => hideClock(true), 0);
                change();
                setInputValue(value.getValue());
                break;
            case "Escape":
                setTimeout(() => hideClock(true), 0);
                setInputValue(value.getValue());
                break;
            case "ArrowUp":
                if (props.incrementWhenKeydown !== false)
                    incrementHour();
                break;
            case "ArrowDown":
                if (props.incrementWhenKeydown !== false)
                    decrementHour();
                break;
            default:
                break;
        }
    };
    const incrementMinute = () => {
        valueNum.current[1] = valueNum.current[1] == null ? 0 : (valueNum.current[1] + interval.incM);
        optimizeValueNum();
    };
    const decrementMinute = () => {
        valueNum.current[1] = valueNum.current[1] == null ? 0 : (valueNum.current[1] - interval.incM);
        optimizeValueNum();
    };
    const keydownMinuteInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (mode.current === "hms")
                    return;
                if (mode.current === "hm" && e.shiftKey)
                    return;
                if (mode.current === "ms" && !e.shiftKey)
                    return;
                setTimeout(() => {
                    hideClock(true);
                }, 0);
                change();
                setInputValue(value.getValue());
                props.blur?.(value.getValue());
                break;
            case "Enter":
                setTimeout(() => hideClock(true), 0);
                change();
                setInputValue(value.getValue());
                break;
            case "Escape":
                setTimeout(() => hideClock(true), 0);
                setInputValue(value.getValue());
                break;
            case "ArrowUp":
                if (props.incrementWhenKeydown !== false)
                    incrementMinute();
                break;
            case "ArrowDown":
                if (props.incrementWhenKeydown !== false)
                    decrementMinute();
                break;
            default:
                break;
        }
    };
    const incrementSecond = () => {
        valueNum.current[2] = valueNum.current[2] == null ? 0 : (valueNum.current[2] + interval.incS);
        optimizeValueNum();
    };
    const decrementSecond = () => {
        valueNum.current[2] = valueNum.current[2] == null ? 0 : (valueNum.current[2] - interval.incS);
        optimizeValueNum();
    };
    const keydownSecondInput = (e) => {
        switch (e.key) {
            case "Tab":
                if (e.shiftKey)
                    return;
                setTimeout(() => {
                    hideClock(true);
                }, 0);
                change();
                setInputValue(value.getValue());
                props.blur?.(value.getValue());
                break;
            case "Enter":
                setTimeout(() => hideClock(true), 0);
                change();
                setInputValue(value.getValue());
                break;
            case "Escape":
                setTimeout(() => hideClock(true), 0);
                setInputValue(value.getValue());
                break;
            case "ArrowUp":
                if (props.incrementWhenKeydown !== false)
                    incrementSecond();
                break;
            case "ArrowDown":
                if (props.incrementWhenKeydown !== false)
                    decrementSecond();
                break;
            default:
                break;
        }
    };
    const labelFormat = (val) => {
        if (val == null)
            return undefined;
        const time = new time_1.default(val);
        if (typeof props.labelFormat === "function")
            return props.labelFormat(time);
        let pattern = props.labelFormat;
        if (string_utils_1.default.isEmpty(pattern)) {
            switch (mode.current) {
                case "h":
                    pattern = "hh";
                    break;
                case "hm":
                    pattern = "hh:mm";
                    break;
                case "ms":
                    pattern = "mm:ss";
                    break;
                case "hms":
                    pattern = "hh:mm:ss";
                    break;
                default:
                    break;
            }
        }
        return time.format(pattern);
    };
    (0, react_1.useEffect)(() => {
        setInputValue(value.getValue());
    }, [props.disabled]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            eref.current?.querySelector("input")?.focus();
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
        con.getTime = () => {
            const val = value.getValue();
            if (val == null)
                return undefined;
            return new time_1.default(time_1.TimeUtils.convertUnitToMilliseconds(val, unit.current));
        };
        con.setValue = (time) => {
            setInputValue(time_1.TimeUtils.convertMillisecondsToUnit(time.getTime(), unit.current));
            change();
            return con;
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.timeBoxClassName, props.className), "data-mode": mode.current, "data-disabled": props.disabled === true, "data-required": props.required, onBlur: blur }, props.disabled === true ?
            react_1.default.createElement("span", { className: input_1.InputClassNames.lbl, title: props.title }, labelFormat(value.getValue())) : react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: `${exports.timeBoxClassName}-ipts`, title: props.title },
                hourIsActive(mode.current) ?
                    react_1.default.createElement("input", { ref: href, type: "text", className: `${input_1.InputClassNames.ipt} ${exports.timeBoxClassName}-ipt-h`, maxLength: 2, readOnly: disabledInputs.current, onClick: clickInput, onFocus: focusInput, onChange: e => changeH(e.currentTarget.value), onKeyDown: keydownHourInput, placeholder: "h" }) : react_1.default.createElement(react_1.default.Fragment, null),
                mode.current === "hm" || mode.current === "hms" ? react_1.default.createElement("span", null, ":") : react_1.default.createElement(react_1.default.Fragment, null),
                minuteIsActive(mode.current) ?
                    react_1.default.createElement("input", { ref: mref, type: "text", className: `${input_1.InputClassNames.ipt} ${exports.timeBoxClassName}-ipt-m`, maxLength: 2, readOnly: disabledInputs.current, onClick: clickInput, onFocus: focusInput, onChange: e => changeM(e.currentTarget.value), onKeyDown: keydownMinuteInput, placeholder: "m" }) : react_1.default.createElement(react_1.default.Fragment, null),
                mode.current === "hms" || mode.current === "ms" ? react_1.default.createElement("span", null, ":") : react_1.default.createElement(react_1.default.Fragment, null),
                secondIsActive(mode.current) ?
                    react_1.default.createElement("input", { ref: sref, type: "text", className: `${input_1.InputClassNames.ipt} ${exports.timeBoxClassName}-ipt-s`, maxLength: 2, readOnly: disabledInputs.current, onClick: clickInput, onFocus: focusInput, onChange: e => changeS(e.currentTarget.value), onKeyDown: keydownSecondInput, placeholder: "s" }) : react_1.default.createElement(react_1.default.Fragment, null)),
            props.pulldownButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${props.clearButton === false ? input_1.InputClassNames.btn : input_1.InputClassNames.btn_bt} ${exports.timeBoxClassName}-pulldown`, onClick: clickButton, tabIndex: -1 },
                react_1.default.createElement(icon_1.default, { image: "clock" })),
            props.clearButton === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn} ${exports.timeBoxClassName}-clear`, onClick: clickClear, tabIndex: -1 },
                react_1.default.createElement(icon_1.default, { image: "close" })))),
        input_1.default,
        exports.TimeBoxStyle));
};
exports.default = TimeBox;
const isNumericOrEmpty = (value) => {
    if (string_utils_1.default.isEmpty(value))
        return true;
    return /^[0-9]+$/.test(value);
};
exports.TimeBoxStyle = react_1.default.createElement(style_1.default, { id: exports.timeBoxClassName, depsDesign: true, css: ({ design }) => `
.${input_1.InputClassNames.wrap}.${exports.timeBoxClassName} {
  width: unset;
}
.${exports.timeBoxClassName}-ipts {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 1px;
}
.${exports.timeBoxClassName}-ipt-h,
.${exports.timeBoxClassName}-ipt-m,
.${exports.timeBoxClassName}-ipt-s {
  flex: none;
  text-align: center;
  padding: 1px 2px 0px 2px;
  width: 28px;
}
.${exports.timeBoxClassName}[data-mode="ms"] .${exports.timeBoxClassName}-ipt-m {
  width: 36px;
}
${design === "material" ? `
.${exports.timeBoxClassName}-ipts {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r} 0px 0px ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.dc};
}
.${exports.timeBoxClassName}-ipts:last-child {
  border-radius: ${style_1.CssParam.m.r};
}
` : ""}
${design === "neumorphism" ? `
.${exports.timeBoxClassName}-ipts {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding: ${style_1.CssParam.n.ccvSdPdd} 0px 0px ${style_1.CssParam.n.ccvSdPdd};
  border-radius: ${style_1.CssParam.n.r} 0px 0px ${style_1.CssParam.n.r};
}
.${exports.timeBoxClassName}-ipts:last-child {
  border-radius: ${style_1.CssParam.n.r};
}
` : ""}
` });
