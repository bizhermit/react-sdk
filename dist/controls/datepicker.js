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
exports.DatePickerStyle = exports.datePickerClassName = void 0;
const datetime_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/datetime-utils"));
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.datePickerClassName = "bh-dtp";
const listPrefix = `.${exports.datePickerClassName}-main[data-ui="list"]`;
const calPrefix = `.${exports.datePickerClassName}-main[data-ui="calendar"]`;
const monthTextsNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const monthTextsJa = ["１月", "２月", "３月", "４月", "５月", "６月", "７月", "８月", "９月", "１０月", "１１月", "１２月"];
const monthTextsEn = ["January", "Feburary", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
const monthTextsEnS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
const weekTextsJa = ["日", "月", "火", "水", "木", "金", "土"];
const weekTextsEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DatePicker = (props) => {
    const ref = (0, react_1.useRef)(), yref = (0, react_1.useRef)(), mref = (0, react_1.useRef)(), dref = (0, react_1.useRef)();
    const mode = (0, prop_1.default)(props.mode ?? "ymd");
    const disabled = (0, prop_1.default)(props.disabled === true);
    const [uiType, setUiType] = (0, react_1.useState)(() => {
        if (mode.current === "y" || mode.current === "ym")
            return "list";
        return props.uiType ?? "calendar";
    });
    const { getValue, setValue } = (0, value_1.default)(props, {
        binded: (v) => {
            setValueImpl(v);
            optimizeSelected();
            optimizeYMDNum();
        }
    });
    const selectedDateRef = (0, react_1.useRef)((() => {
        const date = datetime_utils_1.default.removeTime(datetime_utils_1.default.copy(props.rangeFrom ?? new Date()));
        const d = datetime_utils_1.default.convert(getValue());
        if (d != null) {
            date.setDate(d.getDate());
            date.setMonth(d.getMonth());
            date.setFullYear(d.getFullYear());
        }
        if (mode.current !== "ymd")
            date.setDate(1);
        if (mode.current === "y")
            date.setMonth(0);
        return date;
    })());
    const dispDateRef = (0, react_1.useRef)((() => {
        const date = datetime_utils_1.default.getDate();
        date.setFullYear(selectedDateRef.current.getFullYear());
        date.setMonth(selectedDateRef.current.getMonth());
        date.setDate(selectedDateRef.current.getDate());
        return date;
    })());
    const [yearNum, setYearNum] = (0, react_1.useState)(() => {
        return dispDateRef.current.getFullYear();
    });
    const [monthNum, setMonthNum] = (0, react_1.useState)(() => {
        return dispDateRef.current.getMonth();
    });
    const [dateNum, setDateNum] = (0, react_1.useState)(() => {
        return dispDateRef.current.getDate();
    });
    const monthTexts = (0, react_1.useMemo)(() => {
        if (props.monthTexts == null || props.monthTexts === "num")
            return monthTextsNum;
        if (props.monthTexts === "en")
            return monthTextsEn;
        if (props.monthTexts === "en-s")
            return monthTextsEnS;
        if (props.monthTexts === "ja")
            return monthTextsJa;
        if (props.monthTexts.length !== 12)
            return monthTextsNum;
        return props.monthTexts;
    }, [props.monthTexts]);
    const weekTexts = (0, react_1.useMemo)(() => {
        if (props.weekTexts == null || props.weekTexts === "ja")
            return weekTextsJa;
        if (props.weekTexts === "en")
            return weekTextsEn;
        if (props.weekTexts.length !== 7)
            return weekTextsJa;
        return props.weekTexts;
    }, [props.weekTexts]);
    const clickPositiveButton = () => {
        switch (props.dataType) {
            case "date":
                setValue(new Date(selectedDateRef.current));
                break;
            case "number":
                const str = datetime_utils_1.default.format(selectedDateRef.current, "yyyyMMdd");
                setValue(str === "" ? null : Number(str));
                break;
            default:
                setValue(datetime_utils_1.default.format(selectedDateRef.current, props.format ?? "yyyyMMdd"));
                break;
        }
        if (props.clickPositive) {
            setTimeout(() => {
                const date = new Date(selectedDateRef.current);
                props.clickPositive(date);
            }, 0);
        }
    };
    const clickNegativeButton = () => {
        const val = getValue();
        const d = datetime_utils_1.default.convert(val) ?? datetime_utils_1.default.getDate();
        dispDateRef.current = datetime_utils_1.default.copy(d);
        optimizeSelected();
        setYearNum(dispDateRef.current.getFullYear());
        setMonthNum(dispDateRef.current.getMonth());
        setDateNum(dispDateRef.current.getDate());
        props.clickNegative?.();
    };
    const optimizeSelected = (0, react_1.useCallback)(() => {
        selectedDateRef.current = datetime_utils_1.default.copy(dispDateRef.current);
    }, []);
    const optimizeYMDNum = (0, react_1.useCallback)(() => {
        setYearNum(dispDateRef.current.getFullYear());
        setMonthNum(dispDateRef.current.getMonth());
        setDateNum(dispDateRef.current.getDate());
        props.clickCell?.(dispDateRef.current);
    }, []);
    const clickYearCell = (0, react_1.useCallback)((data, decide, button) => {
        if (disabled.current && button !== true)
            return;
        let m = data.m ?? dispDateRef.current.getMonth();
        if (m < 0)
            m = (12 + m) % 12;
        else if (m > 11)
            m = m % 12;
        dispDateRef.current.setFullYear(data.y);
        if (dispDateRef.current.getMonth() !== m)
            dispDateRef.current.setDate(0);
        if (button !== true || decide)
            optimizeSelected();
        optimizeYMDNum();
        if (decide)
            clickPositiveButton();
    }, []);
    const { yearCellNodes, yearPos } = (0, react_1.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        const startYear = props.rangeFrom?.getFullYear() ?? 1980;
        const endYear = props.rangeTo?.getFullYear() ?? 2100;
        for (let i = startYear, il = endYear; i < il; i++) {
            nodes.push(react_1.default.createElement(DatePickerCell, { key: i, click: clickYearCell, data: { y: i }, selected: i === yearNum }, i));
            if (i === yearNum)
                pos = i - startYear;
        }
        return {
            yearCellNodes: nodes,
            yearPos: pos,
        };
    }, [yearNum]);
    const clickMonthCell = (0, react_1.useCallback)((data, decide, button) => {
        if (disabled.current && button !== true)
            return;
        dispDateRef.current.setFullYear(data.y);
        dispDateRef.current.setMonth(data.m);
        let m = data.m;
        if (m < 0)
            m = (12 + m) % 12;
        else if (m > 11)
            m = m % 12;
        if (dispDateRef.current.getMonth() !== m)
            dispDateRef.current.setDate(0);
        if (button !== true || decide)
            optimizeSelected();
        optimizeYMDNum();
        if (decide)
            clickPositiveButton();
    }, []);
    const { monthCellNodes, monthPos } = (0, react_1.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        for (let i = 0, il = 12; i < il; i++) {
            nodes.push(react_1.default.createElement(DatePickerCell, { key: i, click: clickMonthCell, data: { y: yearNum, m: i }, selected: i === monthNum }, monthTexts[i]));
            if (i === monthNum)
                pos = i;
        }
        return {
            monthCellNodes: nodes,
            monthPos: pos,
        };
    }, [yearNum, monthNum]);
    const clickDateCell = (0, react_1.useCallback)((data, decide) => {
        if (disabled.current)
            return;
        dispDateRef.current = new Date(data.y, data.m, data.d);
        optimizeSelected();
        optimizeYMDNum();
        if (decide)
            clickPositiveButton();
    }, []);
    const { dateCellNodes, datePos } = (0, react_1.useMemo)(() => {
        const nodes = [];
        let pos = 0;
        let date = new Date(yearNum, monthNum + 1, 0);
        const dateMax = date.getDate();
        date.setDate(1);
        date.setMonth(monthNum);
        date.setFullYear(yearNum);
        const firstWeek = date.getDay();
        const threshold = 2;
        if (uiType === "calendar") {
            const startWeek = props.startWeek ?? 0;
            date.setDate(0);
            const bDateMax = date.getDate(), bYearNum = date.getFullYear(), bMonthNum = date.getMonth();
            let count = (firstWeek - startWeek + 7) % 7 || 7;
            if (count < threshold)
                count += 7;
            for (let i = 0, il = count; i < il; i++) {
                nodes.push(react_1.default.createElement(DatePickerCell, { key: `-${i}`, click: clickDateCell, data: { y: bYearNum, m: bMonthNum, d: bDateMax - count + i + 1 }, selected: false, weekNum: (startWeek + i) % 7, ym: "before" }, bDateMax - count + i + 1));
            }
        }
        const selectedYM = yearNum === selectedDateRef.current.getFullYear() && monthNum === selectedDateRef.current.getMonth(), d = selectedDateRef.current.getDate();
        const today = new Date();
        for (let i = 0, il = dateMax; i < il; i++) {
            const selected = d === i + 1 && selectedYM;
            nodes.push(react_1.default.createElement(DatePickerCell, { key: i, click: clickDateCell, data: { y: yearNum, m: monthNum, d: i + 1 }, selected: selected, weekNum: (firstWeek + i) % 7, today: i + 1 === today.getDate() && monthNum === today.getMonth() && yearNum === today.getFullYear() }, i + 1));
            if (i + 1 === dateNum)
                pos = i;
        }
        if (uiType === "calendar") {
            date = new Date(yearNum, monthNum + 1, 1);
            const fw = date.getDay(), aYearNum = date.getFullYear(), aMonthNum = date.getMonth();
            let count = 7 - (nodes.length % 7);
            if (count < 7 - threshold)
                count += 7;
            for (let i = 0, il = count; i < il; i++) {
                nodes.push(react_1.default.createElement(DatePickerCell, { key: `+${i}`, click: clickDateCell, data: { y: aYearNum, m: aMonthNum, d: i + 1 }, selected: false, weekNum: (fw + i) % 7, ym: "after" }, i + 1));
            }
        }
        return {
            dateCellNodes: nodes,
            datePos: pos,
        };
    }, [yearNum, monthNum, dateNum, uiType, props.startWeek]);
    const weekCellNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        for (let i = 0; i < 7; i++) {
            const weekNum = (i + (props.startWeek ?? 0)) % 7;
            nodes.push(react_1.default.createElement(DatePickerCell, { key: weekNum, click: () => { }, data: {}, selected: false, weekNum: weekNum }, weekTexts[weekNum]));
        }
        return nodes;
    }, [weekTexts, props.startWeek]);
    const setValueImpl = (val) => {
        const date = datetime_utils_1.default.removeTime(datetime_utils_1.default.convert(val), true) ?? datetime_utils_1.default.getDate();
        selectedDateRef.current = datetime_utils_1.default.copy(date);
        dispDateRef.current = datetime_utils_1.default.copy(date);
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
        con.getValue = () => getValue();
        con.setValue = (val) => {
            setValueImpl(val);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        if (mode.current !== "ymd") {
            if (uiType === "calendar")
                setUiType("list");
        }
    }, [props.mode]);
    (0, react_1.useEffect)(() => {
        if (uiType === "list") {
            const selector = `.${exports.datePickerClassName}-cell`;
            let rect = yref.current.querySelector(selector).getBoundingClientRect();
            yref.current.scrollTop = rect.height * yearPos - ((yref.current.clientHeight - rect.height) / 2);
            if (mode.current !== "y") {
                rect = mref.current.querySelector(selector).getBoundingClientRect();
                mref.current.scrollTop = rect.height * monthPos - ((mref.current.clientHeight - rect.height) / 2);
            }
            if (mode.current === "ymd") {
                rect = dref.current.querySelector(selector).getBoundingClientRect();
                dref.current.scrollTop = rect.height * datePos - ((dref.current.clientHeight - rect.height) / 2);
            }
        }
    }, [uiType]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, style: props.style, className: (0, classname_utils_1.className)(exports.datePickerClassName, props.className), "data-disabled": props.disabled === true, "data-required": props.required, "data-mode": mode.current },
            react_1.default.createElement("div", { className: `${exports.datePickerClassName}-main`, "data-ui": uiType },
                react_1.default.createElement("div", { ref: yref, className: `${style_1.scrollbarClassName} ${exports.datePickerClassName}-year` },
                    uiType === "list" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_o} ${exports.datePickerClassName}-icon-button`, onClick: () => clickYearCell({ y: yearNum - 1, m: monthNum }, false, true) },
                        react_1.default.createElement(icon_1.default, { image: "pullleft" })),
                    yearCellNodes,
                    uiType === "list" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_o} ${exports.datePickerClassName}-icon-button`, onClick: () => clickYearCell({ y: yearNum + 1, m: monthNum }, false, true) },
                        react_1.default.createElement(icon_1.default, { image: "pullright" }))),
                mode.current === "y" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { ref: mref, className: `${style_1.scrollbarClassName} ${exports.datePickerClassName}-month` },
                        uiType === "list" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_o} ${exports.datePickerClassName}-icon-button`, onClick: () => clickMonthCell({ y: yearNum, m: monthNum - 1 }, false, true) },
                            react_1.default.createElement(icon_1.default, { image: "pullleft" })),
                        monthCellNodes,
                        uiType === "list" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_o} ${exports.datePickerClassName}-icon-button`, onClick: () => clickMonthCell({ y: yearNum, m: monthNum + 1 }, false, true) },
                            react_1.default.createElement(icon_1.default, { image: "pullright" })))),
                mode.current === "ymd" ? react_1.default.createElement(react_1.default.Fragment, null,
                    uiType === "list" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.datePickerClassName}-week` }, weekCellNodes),
                    react_1.default.createElement("div", { ref: dref, className: `${style_1.scrollbarClassName} ${exports.datePickerClassName}-date` }, dateCellNodes)) : react_1.default.createElement(react_1.default.Fragment, null)),
            props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) :
                react_1.default.createElement("div", { className: `${exports.datePickerClassName}-buttons` },
                    react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_l} ${exports.datePickerClassName}-button`, onClick: clickNegativeButton, tabIndex: -1 }, props.negativeButtonLabel ?? "キャンセル"),
                    react_1.default.createElement("div", { className: `${mode.current === "ymd" ? input_1.InputClassNames.btn_bt : input_1.InputClassNames.btn} ${exports.datePickerClassName}-button`, onClick: clickPositiveButton, tabIndex: -1 }, props.positiveButtonLabel ?? "OK"),
                    mode.current === "ymd" ? react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn} ${exports.datePickerClassName}-icon-button`, onClick: () => setUiType(c => c === "list" ? "calendar" : "list") },
                        react_1.default.createElement(icon_1.default, { image: uiType === "list" ? "calendar" : "list" })) : react_1.default.createElement(react_1.default.Fragment, null))),
        input_1.default,
        exports.DatePickerStyle));
};
exports.default = DatePicker;
const DatePickerCell = (props) => {
    return (react_1.default.createElement("div", { className: `${exports.datePickerClassName}-cell`, onClick: () => props.click(props.data), onDoubleClick: () => props.click(props.data, true), "data-selected": props.selected, "data-week": props.weekNum ?? "", "data-ym": props.ym ?? "current", "data-today": props.today === true }, props.children));
};
exports.DatePickerStyle = react_1.default.createElement(style_1.default, { id: exports.datePickerClassName, depsDesign: true, css: ({ design }) => `
.${exports.datePickerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
  height: calc(${style_1.CssVar.size} * 9);
  user-select: none;
}
.${exports.datePickerClassName}[data-mode="ymd"] {
  width: calc(${style_1.CssVar.size} * 8);
}
.${exports.datePickerClassName}[data-mode="ym"] {
  width: calc(${style_1.CssVar.size} * 7);
}
.${exports.datePickerClassName}[data-mode="y"] {
  width: calc(${style_1.CssVar.size} * 6);
}
.${exports.datePickerClassName}-main {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  flex: 1;
  width: 100%;
  min-height: 0px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.${exports.datePickerClassName}-year,
.${exports.datePickerClassName}-month,
.${exports.datePickerClassName}-week,
.${exports.datePickerClassName}-date {
  box-sizing: border-box;
  position: relative;
  display: flex;
}
.${exports.datePickerClassName}-cell {
  box-sizing: border-box;
  position: relative;
  user-select: none;
  white-space: nowrap;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 2px 0px 0px 0px;
  z-index: 0;
}
.${exports.datePickerClassName}-cell:hover {
  z-index: 1;
}
${listPrefix} {
  flex-direction: row;
}
${listPrefix} > div {
  flex: 1;
  height: 100%;
  min-width: 0px;
  flex-flow: column nowrap;
}
${listPrefix} .${exports.datePickerClassName}-cell {
  height: ${style_1.CssVar.size};
  width: 100%;
  flex: none;
}
${calPrefix} {
  flex-direction: column;
}
${calPrefix} .${exports.datePickerClassName}-year,
${calPrefix} .${exports.datePickerClassName}-month,
${calPrefix} .${exports.datePickerClassName}-week {
  flex: none;
  overflow: hidden;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: ${style_1.CssVar.size};
  overflow: visible;
}
${calPrefix} .${exports.datePickerClassName}-week {
  height: calc(${style_1.CssVar.size} * 0.8);
}
${calPrefix} .${exports.datePickerClassName}-date {
  flex: 1;
  min-height: 0px;
  flex-flow: row wrap;
  overflow: visible;
  width: 100%;
}
${calPrefix} .${exports.datePickerClassName}-year .${exports.datePickerClassName}-cell,
${calPrefix} .${exports.datePickerClassName}-month .${exports.datePickerClassName}-cell {
  flex: 1;
}
${calPrefix} .${exports.datePickerClassName}-year .${exports.datePickerClassName}-cell[data-selected="false"],
${calPrefix} .${exports.datePickerClassName}-month .${exports.datePickerClassName}-cell[data-selected="false"] {
  display: none;
}
${calPrefix} .${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell {
  height: 16.666%;
  width: 14.285%;
}
${calPrefix} .${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell[data-ym="before"],
${calPrefix} .${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell[data-ym="after"] {
  opacity: 0.6;
}
.${exports.datePickerClassName}[data-disabled="false"] ${listPrefix} .${exports.datePickerClassName}-cell,
.${exports.datePickerClassName}[data-disabled="false"] .${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell {
  cursor: pointer;
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell {
  flex: 1;
  font-size: 70%;
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell[data-week="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell[data-week="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.datePickerClassName}-cell[data-today="true"] {
  text-decoration: underline;
}
.${exports.datePickerClassName}-buttons {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  width: 100%;
  overflow: visible;
}
.${exports.datePickerClassName}-button,
.${exports.datePickerClassName}-icon-button {
  ${style_1.CssPV.flex_r_c}
  cursor: pointer;
}
.${exports.datePickerClassName}-button {
  flex: 1;
  min-width: 0px;
  padding-top: 2px;
  height: ${style_1.CssVar.size};
}
.${exports.datePickerClassName}-icon-button {
  flex: none;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
${design === "material" ? `
.${exports.datePickerClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  padding: ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.c};
}
${listPrefix} > div {
  padding: ${style_1.CssParam.m.sdPdd};
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell:first-child {
  border-top-left-radius: ${style_1.CssParam.m.r};
  border-bottom-left-radius: ${style_1.CssParam.m.r};
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell:last-child {
  border-top-right-radius: ${style_1.CssParam.m.r};
  border-bottom-right-radius: ${style_1.CssParam.m.r};
}
${listPrefix} .${exports.datePickerClassName}-cell,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell {
  border-radius: ${style_1.CssParam.m.r};
  border: 1px solid transparent;
}
${listPrefix} .${exports.datePickerClassName}-cell:hover,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell:hover {
  margin-top: -${style_1.CssParam.m.updownMargin};
  margin-bottom: ${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  border-color: ${style_1.CssVar.bdc};
}
${listPrefix} .${exports.datePickerClassName}-cell:hover:active,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell:hover:active {
  margin-top: 0px; 
  margin-bottom: 0px;
  box-shadow: none;
}
${listPrefix} .${exports.datePickerClassName}-cell[data-selected="true"],
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell[data-selected="true"] {
  background: ${style_1.CssVar.bg.c_a};
  border-color: ${style_1.CssVar.bdc};
  box-shadow: none;
  margin-top: 0px;
  margin-bottom: 0px;
}
.${exports.datePickerClassName}-buttons {
  margin-top: ${style_1.CssParam.m.updownMargin};
}
` : ""}
${design === "neumorphism" ? `
.${exports.datePickerClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
${listPrefix} > div {
  padding: ${style_1.CssParam.n.sdPdd};
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell:first-child {
  border-top-left-radius: ${style_1.CssParam.n.r};
  border-bottom-left-radius: ${style_1.CssParam.n.r};
}
.${exports.datePickerClassName}-week .${exports.datePickerClassName}-cell:last-child {
  border-top-right-radius: ${style_1.CssParam.n.r};
  border-bottom-right-radius: ${style_1.CssParam.n.r};
}
${listPrefix} .${exports.datePickerClassName}-cell,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell {
  border-radius: ${style_1.CssParam.n.r};
}
${listPrefix} .${exports.datePickerClassName}-cell:hover,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
}
${listPrefix} .${exports.datePickerClassName}-cell:hover:active,
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell:hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding-top: 4px;
}
${listPrefix} .${exports.datePickerClassName}-cell[data-selected="true"],
.${exports.datePickerClassName}-date .${exports.datePickerClassName}-cell[data-selected="true"] {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.accent.ccvBg};
}
.${exports.datePickerClassName}-buttons {
  margin-top: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.datePickerClassName}-month {
  margin-top: ${style_1.CssParam.n.ccvSdPdd};
}
` : ""}
` });
