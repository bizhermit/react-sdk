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
exports.TimePickerStyle = void 0;
const time_1 = __importStar(require("@bizhermit/time"));
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const react_3 = require("react");
const controller_1 = require("../hooks/controller");
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const timePickerClassName = "bh-tmp";
const hourIsActive = (mode) => {
    return mode === "hm" || mode === "hms" || mode === "h";
};
const minuteIsActive = (mode) => {
    return mode === "hm" || mode === "hms" || mode === "ms";
};
const secondIsActive = (mode) => {
    return mode === "hms" || mode === "ms";
};
const TimePicker = (props) => {
    const ref = (0, react_1.useRef)(), href = (0, react_1.useRef)(), mref = (0, react_1.useRef)(), sref = (0, react_1.useRef)();
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
                return "second";
            default:
                return "millisecond";
        }
        ;
    })());
    // const min = useProp(Math.max(0, (props.min ?? 0) * 1000));
    // const max = useProp((props.max ?? 86400) * 1000 - 1);
    const [hourNum, setHourNum] = (0, react_1.useState)(0);
    const [minuteNum, setMinuteNum] = (0, react_1.useState)(0);
    const [secondNum, setSecondNum] = (0, react_1.useState)(0);
    const margin = (0, react_1.useRef)(2);
    const [scrollRev, setScrollRev] = (0, react_1.useState)(0);
    const { getValue, setValue } = (0, value_1.default)(props, {
        binded: (v) => {
            const time = new time_1.default(time_1.TimeUtils.convertUnitToMilliseconds(v, unit.current));
            if (hourIsActive(mode.current))
                setHourNum(time.getHours());
            if (minuteIsActive(mode.current))
                setMinuteNum(time.getMinutes());
            if (secondIsActive(mode.current))
                setSecondNum(time.getSeconds());
            setScrollRev(c => c + 1);
        },
    });
    const change = () => {
        setValue(time_1.TimeUtils.convertMillisecondsToUnit((hourNum * 3600 + minuteNum * 60 + secondNum) * 1000, unit.current));
    };
    const clickPositiveButton = () => {
        change();
        setScrollRev(c => c + 1);
        if (props.clickPositive) {
            setTimeout(() => {
                props.clickPositive(getValue());
            }, 0);
        }
    };
    const clickNegativeButton = () => {
        props.clickNegative?.();
    };
    const { hourCellNodes, hourPos } = (0, react_3.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        if (hourIsActive(mode.current)) {
            const interval = props.hourInterval ?? 1;
            for (let i = 0 - margin.current, il = 24 + margin.current; i < il; i++) {
                const selected = i === hourNum;
                const disabled = i < 0 || i >= 24;
                if (!disabled && i % interval !== 0)
                    continue;
                if (selected)
                    pos = nodes.length - margin.current;
                nodes.push(react_1.default.createElement("div", { key: i, className: `${timePickerClassName}-cell`, "data-selected": selected, "data-disabled": disabled, onClick: () => {
                        if (props.disabled)
                            return;
                        setHourNum(i);
                    }, onDoubleClick: () => {
                        if (props.disabled)
                            return;
                        setHourNum(i);
                        clickPositiveButton();
                    } }, `00${i}`.slice(-2)));
            }
        }
        return { hourCellNodes: nodes, hourPos: pos };
    }, [hourNum, minuteNum, secondNum, unit.current, mode.current, props.disabled]);
    const { minuteCellNodes, minutePos } = (0, react_3.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        if (minuteIsActive(mode.current)) {
            const interval = props.minuteInterval ?? 10;
            for (let i = 0 - margin.current, il = 60 + margin.current; i < il; i++) {
                const disabled = i < 0 || i >= 60;
                if (!disabled && i % interval !== 0)
                    continue;
                const selected = i === minuteNum;
                if (selected)
                    pos = nodes.length - margin.current;
                nodes.push(react_1.default.createElement("div", { key: i, className: `${timePickerClassName}-cell`, "data-selected": selected, "data-disabled": disabled, onClick: () => {
                        if (props.disabled)
                            return;
                        setMinuteNum(i);
                    }, onDoubleClick: () => {
                        if (props.disabled)
                            return;
                        setMinuteNum(i);
                        clickPositiveButton();
                    } }, `00${i}`.slice(-2)));
            }
        }
        return { minuteCellNodes: nodes, minutePos: pos };
    }, [hourNum, minuteNum, secondNum, unit.current, mode.current, props.disabled]);
    const { secondCellNodes, secondPos } = (0, react_3.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        if (secondIsActive(mode.current)) {
            const interval = props.secondInterval ?? 10;
            for (let i = 0 - margin.current, il = 60 + margin.current; i < il; i++) {
                const disabled = i < 0 || i >= 60;
                if (!disabled && i % interval !== 0)
                    continue;
                const selected = i === secondNum;
                if (selected)
                    pos = nodes.length - margin.current;
                nodes.push(react_1.default.createElement("div", { key: i, className: `${timePickerClassName}-cell`, "data-selected": selected, "data-disabled": disabled, onClick: () => {
                        if (props.disabled)
                            return;
                        setSecondNum(i);
                    }, onDoubleClick: () => {
                        if (props.disabled)
                            return;
                        setSecondNum(i);
                        clickPositiveButton();
                    } }, `00${i}`.slice(-2)));
            }
        }
        return { secondCellNodes: nodes, secondPos: pos };
    }, [hourNum, minuteNum, secondNum, unit.current, mode.current, props.disabled]);
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
        con.setValue = (val) => {
            setValue(val);
            return con;
        };
    });
    (0, react_2.useEffect)(() => {
        if (href.current) {
            href.current.scrollTop = href.current.children[0].offsetHeight * hourPos;
        }
    }, [scrollRev]);
    (0, react_2.useEffect)(() => {
        if (mref.current) {
            mref.current.scrollTop = mref.current.children[0].offsetHeight * minutePos;
        }
    }, [scrollRev]);
    (0, react_2.useEffect)(() => {
        if (sref.current) {
            sref.current.scrollTop = sref.current.children[0].offsetHeight * secondPos;
        }
    }, [scrollRev]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, className: (0, classname_utils_1.className)(timePickerClassName, props.className), "data-disabled": props.disabled === true, "data-required": props.required, "data-mode": mode.current },
            react_1.default.createElement("div", { className: `${timePickerClassName}-main`, style: { height: `calc(${style_1.CssVar.size} * ${margin.current * 2 + 1})` } },
                hourIsActive(mode.current) ?
                    react_1.default.createElement("div", { ref: href, className: `${timePickerClassName}-hours ${style_1.scrollbarClassName}` }, hourCellNodes) : react_1.default.createElement(react_1.default.Fragment, null),
                mode.current === "hm" || mode.current === "hms" ? react_1.default.createElement("span", null, ":") : react_1.default.createElement(react_1.default.Fragment, null),
                minuteIsActive(mode.current) ?
                    react_1.default.createElement("div", { ref: mref, className: `${timePickerClassName}-minutes ${style_1.scrollbarClassName}` }, minuteCellNodes) : react_1.default.createElement(react_1.default.Fragment, null),
                mode.current === "hms" || mode.current === "ms" ? react_1.default.createElement("span", null, ":") : react_1.default.createElement(react_1.default.Fragment, null),
                secondIsActive(mode.current) ?
                    react_1.default.createElement("div", { ref: sref, className: `${timePickerClassName}-seconds ${style_1.scrollbarClassName}` }, secondCellNodes) : react_1.default.createElement(react_1.default.Fragment, null)),
            props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) :
                react_1.default.createElement("div", { className: `${timePickerClassName}-buttons` },
                    react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_l} ${timePickerClassName}-button`, onClick: clickNegativeButton, tabIndex: -1 }, props.negativeButtonLabel ?? "キャンセル"),
                    react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn} ${timePickerClassName}-button`, onClick: clickPositiveButton, tabIndex: -1 }, props.positiveButtonLabel ?? "OK"))),
        input_1.default,
        exports.TimePickerStyle));
};
exports.default = TimePicker;
exports.TimePickerStyle = react_1.default.createElement(style_1.default, { id: timePickerClassName, depsDesign: true, css: ({ design }) => `
.${timePickerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
  height: auto;
  user-select: none;
}
.${timePickerClassName}[data-mode="hms"] {
  width: calc(${style_1.CssVar.size} * 7);
}
.${timePickerClassName}[data-mode="hm"],
.${timePickerClassName}[data-mode="ms"] {
  width: calc(${style_1.CssVar.size} * 6);
}
.${timePickerClassName}[data-mode="h"] {
  width: calc(${style_1.CssVar.size} * 4);
}
.${timePickerClassName}-main {
  ${style_1.CssPV.flex_r_c}
  overflow: visible;
  flex: none;
  width: 100%;
  min-height: 0px;
}
.${timePickerClassName}-hours,
.${timePickerClassName}-minutes,
.${timePickerClassName}-seconds {
  ${style_1.CssPV.flex_c}
  height: 100%;
  flex: 1;
}
.${timePickerClassName}-cell {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  height: ${style_1.CssVar.size};
  width: 100%;
  cursor: pointer;
}
.${timePickerClassName}-cell[data-disabled="true"] {
  pointer-events: none;
  visibility: hidden;
}
.${timePickerClassName}-buttons {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  width: 100%;
  overflow: visible;
}
.${timePickerClassName}-button,
.${timePickerClassName}-icon-button {
  ${style_1.CssPV.flex_r_c}
  cursor: pointer;
}
.${timePickerClassName}-button {
  flex: 1;
  min-width: 0px;
  padding-top: 2px;
  height: ${style_1.CssVar.size};
}
.${timePickerClassName}-icon-button {
  flex: none;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
${design === "material" ? `
.${timePickerClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  padding: ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.c};
}
.${timePickerClassName}-cell {
  border-radius: ${style_1.CssParam.m.r};
  border: 1px solid transparent;
}
.${timePickerClassName}-cell:hover {
  margin-top: -${style_1.CssParam.m.updownMargin};
  margin-bottom: ${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  border-color: ${style_1.CssVar.bdc};
}
.${timePickerClassName}-cell:hover:active {
  margin-top: 0px; 
  margin-bottom: 0px;
  box-shadow: none;
}
.${timePickerClassName}-cell[data-selected="true"] {
  background: ${style_1.CssVar.bg.c_a};
  border-color: ${style_1.CssVar.bdc};
  box-shadow: none;
  margin-top: 0px;
  margin-bottom: 0px;
}
.${timePickerClassName}-buttons {
  margin-top: ${style_1.CssParam.m.updownMargin};
}
` : ""}
${design === "neumorphism" ? `
.${timePickerClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${timePickerClassName}-hours,
.${timePickerClassName}-minutes,
.${timePickerClassName}-seconds {
  padding: 0px ${style_1.CssParam.n.sdPdd};
}
.${timePickerClassName}-cell {
  border-radius: ${style_1.CssParam.n.r};
}
.${timePickerClassName}-cell:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
}
.${timePickerClassName}-cell:hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding-top: 4px;
}
.${timePickerClassName}-cell[data-selected="true"] {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.accent.ccvBg};
}
.${timePickerClassName}-buttons {
  margin-top: ${style_1.CssParam.n.ccvSdPdd};
}
.${timePickerClassName}-month {
  margin-top: ${style_1.CssParam.n.ccvSdPdd};
}
` : ""}
` });
