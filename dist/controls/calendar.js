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
exports.CalendarStyle = exports.CalendarCellLabel = exports.calendarClassName = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const controller_1 = __importStar(require("../hooks/controller"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const button_1 = __importDefault(require("./button"));
const datebox_1 = __importDefault(require("./datebox"));
exports.calendarClassName = "bh-cal";
const weekTextsJa = ["日", "月", "火", "水", "木", "金", "土"];
const weekTextsEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Calendar = (props) => {
    const ref = (0, react_2.useRef)();
    const [year, setYear] = (0, react_1.useState)(props.year ?? new Date().getFullYear());
    const [month, setMonth] = (0, react_1.useState)(props.month ?? new Date().getMonth());
    const dbCon = (0, controller_1.default)();
    const weekTexts = (0, react_1.useMemo)(() => {
        if (props.weekTexts == null || props.weekTexts === "ja")
            return weekTextsJa;
        if (props.weekTexts === "en")
            return weekTextsEn;
        if (props.weekTexts.length !== 7)
            return weekTextsJa;
        return props.weekTexts;
    }, [props.weekTexts]);
    const weekCellNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        for (let i = 0; i < 7; i++) {
            const weekNum = (i + (props.startWeek ?? 0)) % 7;
            nodes.push(react_1.default.createElement(DateCell, { key: weekNum, weekNum: weekNum },
                react_1.default.createElement(exports.CalendarCellLabel, null, weekTexts[weekNum])));
        }
        return nodes;
    }, [weekTexts, props.startWeek]);
    const dateCellNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        let date = new Date(year, month + 1, 0);
        const dateMax = date.getDate();
        date.setDate(1);
        date.setMonth(month);
        date.setFullYear(year);
        const firstWeek = date.getDay();
        const startWeek = props.startWeek ?? 0;
        date.setDate(0);
        const bDateMax = date.getDate(), bYearNum = date.getFullYear(), bMonthNum = date.getMonth();
        let count = (firstWeek - startWeek + 7) % 7 || 7;
        if (count === 7)
            count -= 7;
        for (let i = 0, il = count; i < il; i++) {
            const bDateNum = bDateMax - count + i + 1;
            nodes.push(react_1.default.createElement(DateCell, { key: `${bYearNum}${bMonthNum}${bDateNum}`, weekNum: (startWeek + i) % 7, targetYM: false }, props.cellComponent == null ?
                react_1.default.createElement(exports.CalendarCellLabel, null, bDateNum) :
                react_1.default.createElement(props.cellComponent, { ...props.cellComponentProps, date: new Date(bYearNum, bMonthNum, bDateNum), targetYM: false })));
        }
        const today = new Date();
        for (let i = 0, il = dateMax; i < il; i++) {
            nodes.push(react_1.default.createElement(DateCell, { key: `${year}${month}${i}`, weekNum: (firstWeek + i) % 7, today: i + 1 === today.getDate() && month === today.getMonth() && year === today.getFullYear() }, props.cellComponent == null ?
                react_1.default.createElement(exports.CalendarCellLabel, null, i + 1) :
                react_1.default.createElement(props.cellComponent, { ...props.cellComponentProps, date: new Date(year, month, i + 1), targetYM: true })));
        }
        date = new Date(year, month + 1, 1);
        const fw = date.getDay(), aYearNum = date.getFullYear(), aMonthNum = date.getMonth();
        count = 7 - (nodes.length % 7);
        if (count === 7)
            count -= 7;
        for (let i = 0, il = count; i < il; i++) {
            nodes.push(react_1.default.createElement(DateCell, { key: `${aYearNum}${aMonthNum}${i}`, weekNum: (fw + i) % 7, targetYM: false }, props.cellComponent == null ?
                react_1.default.createElement(exports.CalendarCellLabel, null, i + 1) :
                react_1.default.createElement(props.cellComponent, { ...props.cellComponentProps, date: new Date(aYearNum, aMonthNum, i + 1), targetYM: false })));
        }
        return nodes;
    }, [year, month, props.startWeek, props.cellComponent, props.cellComponentProps]);
    (0, react_1.useEffect)(() => {
        const today = new Date();
        setYear(props.year ?? today.getFullYear());
        setMonth(props.month ?? today.getMonth());
    }, [props.year, props.month]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            ref.current?.querySelector("input,[tabindex]")?.focus();
            return con;
        };
        con.blur = () => {
            ref.current?.querySelector(":focus")?.blur();
            return con;
        };
        con.getDate = () => dbCon.getDate();
        con.setDate = (v) => {
            dbCon.setDate(v);
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, className: (0, classname_utils_1.className)(exports.calendarClassName, classname_utils_1.default.fitToOuter(props.fitToOuter ?? "fill"), props.className), "data-disabled": props.disabled === true },
            react_1.default.createElement("div", { className: `${exports.calendarClassName}-body` },
                react_1.default.createElement("div", { className: `${exports.calendarClassName}-ym` },
                    props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) :
                        react_1.default.createElement(button_1.default, { image: "pullleft", click: () => {
                                const date = new Date(year, month, 1);
                                date.setMonth(date.getMonth() - 1);
                                dbCon.setDate(date);
                            } }),
                    react_1.default.createElement(datebox_1.default, { controller: dbCon, dataType: "date", mode: "ym", defaultValue: new Date(year, month, 1), clearButton: false, disabled: props.disabled, changed: (b, a) => {
                            setYear(b.getFullYear());
                            setMonth(b.getMonth());
                            props.changed?.(b, a);
                        } }),
                    props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) :
                        react_1.default.createElement(button_1.default, { image: "pullright", click: () => {
                                const date = new Date(year, month, 1);
                                date.setMonth(date.getMonth() + 1);
                                dbCon.setDate(date);
                            } })),
                react_1.default.createElement("div", { className: `${exports.calendarClassName}-week` }, weekCellNodes),
                react_1.default.createElement("div", { className: `${exports.calendarClassName}-date`, "data-rows": dateCellNodes.length / 7 }, dateCellNodes))),
        exports.CalendarStyle));
};
exports.default = Calendar;
const DateCell = (props) => {
    return react_1.default.createElement("div", { className: `${exports.calendarClassName}-cell`, "data-week": props.weekNum ?? "", "data-targetym": props.targetYM !== false, "data-today": props.today === true }, props.children);
};
const CalendarCellLabel = ({ children }) => {
    return react_1.default.createElement("div", { className: `${exports.calendarClassName}-cell-lbl-wrap` },
        react_1.default.createElement("div", { className: `${exports.calendarClassName}-cell-lbl` }, children));
};
exports.CalendarCellLabel = CalendarCellLabel;
exports.CalendarStyle = react_1.default.createElement(style_1.default, { id: exports.calendarClassName, depsDesign: true, css: ({ design }) => `
.${exports.calendarClassName} {
  box-sizing: border-box;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.calendarClassName)}
.${exports.calendarClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
  overflow: hidden;
}
.${exports.calendarClassName}-ym {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  width: 100%;
}
.${exports.calendarClassName}-week {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
  height: ${style_1.CssVar.size};
  overflow: hidden;
}
.${exports.calendarClassName}-date {
  ${style_1.CssPV.flex}
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  ${style_1.CssPV.f_y}
}
.${exports.calendarClassName}-cell {
  ${style_1.CssPV.flex_c_c}
  flex: none;
  overflow: hidden;
  height: 16.666%;
  width: 14.285%;
}
.${exports.calendarClassName}-date[data-rows="5"] .${exports.calendarClassName}-cell {
  height: 20%;
}
.${exports.calendarClassName}-date[data-rows="4"] .${exports.calendarClassName}-cell {
  height: 25%;
}
.${exports.calendarClassName}-cell-lbl-wrap {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl-wrap {
  justify-content: center;
  align-items: center;
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl {
  width: 100%;
}
.${exports.calendarClassName}-cell-lbl {
  box-sizing: border-box;
  padding-top: 2px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 100%;
  max-width: 100%;
  text-align: center;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {
  height: 100%;
}
.${exports.calendarClassName}-cell[data-week="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.calendarClassName}-cell[data-week="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.calendarClassName}-cell[data-targetym="false"] .${exports.calendarClassName}-cell-lbl {
  opacity: 0.5;
}
${design === "material" ? `
.${exports.calendarClassName}-body {
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.calendarClassName}-week {
  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;
  border-bottom: 1px solid ${style_1.CssVar.bdc};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.calendarClassName}-cell {
  padding: ${style_1.CssParam.m.sdPdd};
}
.${exports.calendarClassName}-cell-lbl-wrap {
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.calendarClassName}-date .${exports.calendarClassName}-cell-lbl-wrap {
  border: 1px solid ${style_1.CssVar.bdc};
}
.${exports.calendarClassName}-date .${exports.calendarClassName}-cell:hover .${exports.calendarClassName}-cell-lbl-wrap {
  margin-top: -${style_1.CssParam.m.updownMargin};
  margin-bottom: ${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm};
}
` : ""}
${design === "neumorphism" ? `
.${exports.calendarClassName} {
  padding: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.calendarClassName}-body {
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.calendarClassName}-week {
  border-radius: ${style_1.CssParam.n.r} ${style_1.CssParam.n.r} 0px 0px;
}
.${exports.calendarClassName}-date {
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {
  background: ${style_1.CssParam.n.headerCvxBg};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl-wrap {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
.${exports.calendarClassName}-cell {
  padding: calc(${style_1.CssParam.n.sdPdd} / 2);
}
.${exports.calendarClassName}-cell-lbl-wrap {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.calendarClassName}-date .${exports.calendarClassName}-cell:hover .${exports.calendarClassName}-cell-lbl-wrap {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  margin: 10px;
}
` : ""}
` });
