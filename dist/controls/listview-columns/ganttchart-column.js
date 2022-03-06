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
exports.ListViewGanttChartColumnStyle = exports.listViewGanttChartColumnClassName = void 0;
const react_1 = __importDefault(require("react"));
const datetime_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/datetime-utils"));
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const style_1 = __importStar(require("../../layouts/style"));
const listview_1 = require("../listview");
const dom_utils_1 = require("../../utils/dom-utils");
exports.listViewGanttChartColumnClassName = "bh-lv_c-gtc";
const ListViewGanttChartColumn = (props) => {
    const dcWidth = props.dateCellWidth ?? 30;
    const unit = props.unit ?? "day";
    const showProgressLine = props.progressLine !== false;
    const termFrom = datetime_utils_1.default.removeTime(datetime_utils_1.default.copy(props.term.from)), termTo = datetime_utils_1.default.removeTime(datetime_utils_1.default.copy(props.term.to));
    let barTitleFormat = props.barTitleFormat, disabled = props.disabled === true;
    switch (unit) {
        case "month":
            disabled = true;
            termFrom.setDate(1);
            if (barTitleFormat == null)
                barTitleFormat = (p) => `${datetime_utils_1.default.format(p.from, "yyyy/MM/dd")} <-> ${datetime_utils_1.default.format(p.to, "yyyy/MM/dd")}`;
            break;
        case "week":
            disabled = true;
            if (barTitleFormat == null)
                barTitleFormat = (p) => `${datetime_utils_1.default.format(p.from, "yyyy/MM/dd")} <-> ${datetime_utils_1.default.format(p.to, "yyyy/MM/dd")}`;
            break;
        default:
            if (barTitleFormat == null)
                barTitleFormat = (p) => `${datetime_utils_1.default.format(p.from, "yyyy/MM/dd")} <-> ${datetime_utils_1.default.format(p.to, "yyyy/MM/dd")} (${p.length})`;
            break;
    }
    const cellArr = [];
    const date = datetime_utils_1.default.copy(termFrom), toNum = termTo.getTime();
    const today = datetime_utils_1.default.getDate();
    const todayLeft = calcBarLeft(termFrom, today, unit) + 1;
    let hasToday = today.getTime() < date.getTime();
    while (date.getTime() <= toNum) {
        let isToday = false;
        switch (unit) {
            case "month":
                isToday = !hasToday && true;
                break;
            case "week":
                isToday = !hasToday && (hasToday = date.getTime() >= today.getTime());
                break;
            default:
                isToday = !hasToday && (hasToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear());
                break;
        }
        cellArr.push({
            y: date.getFullYear(),
            m: date.getMonth(),
            d: date.getDate(),
            w: date.getDay(),
            today: isToday,
        });
        switch (unit) {
            case "month":
                date.setDate(1);
                date.setMonth(date.getMonth() + 1);
                break;
            case "week":
                date.setDate(date.getDate() + 7);
                break;
            default:
                date.setDate(date.getDate() + 1);
                break;
        }
    }
    const convertValueToData = (data, dn, id) => {
        const fval = data[dn.fromDataName], tval = data[dn.toDataName];
        const fdate = datetime_utils_1.default.convert(fval);
        const tdate = datetime_utils_1.default.convert(tval);
        datetime_utils_1.default.removeTime(fdate);
        datetime_utils_1.default.removeTime(tdate);
        const length = calcBarLength(fdate, tdate, unit, termFrom);
        let diff = null;
        if (showProgressLine && dn.rateDataName != null && tdate != null) {
            const rval = data[dn.rateDataName];
            const rate = typeof rval === "number" ? Math.min(100, Math.max(0, rval)) : 0;
            if (fdate.getTime() <= today.getTime()) {
                if (rate === 100 && tdate.getTime() <= today.getTime()) {
                    diff = null;
                }
                else {
                    const cdate = new Date(fdate);
                    cdate.setDate(cdate.getDate() + Math.floor(length * rate / 100));
                    diff = calcBarLeft(today, cdate, unit) - 1;
                }
            }
            else {
                if (rate === 0) {
                    diff = null;
                }
                else {
                    const cdate = new Date(fdate);
                    const hoge = Math.floor(length * rate / 100);
                    cdate.setDate(cdate.getDate() + hoge);
                    diff = calcBarLeft(today, cdate, unit) - 1;
                }
            }
        }
        let title = "";
        if (fdate)
            title = barTitleFormat({ from: fdate, to: tdate, length });
        return {
            id: id ?? string_utils_1.default.generateUuidV4(),
            from: fdate,
            to: tdate,
            length,
            left: calcBarLeft(termFrom, fdate, unit),
            barLabel: dn.barLabelDataName == null ? "" : (data[dn.barLabelDataName] ?? ""),
            diff,
            title,
        };
    };
    const convertDateToData = (date) => {
        if (date == null)
            return undefined;
        switch (props.dataType) {
            case "number":
                return Number(datetime_utils_1.default.format(date, "yyyyMMdd"));
            case "date":
                return date;
            default:
                return datetime_utils_1.default.format(date, props.dateFormat);
        }
    };
    const event = (0, dom_utils_1.getDomEventManager)();
    let activeBars = {};
    const clearActiveBars = () => { activeBars = {}; };
    let dragMode = "", lastPos = 0, draged = false, listview = null;
    const mousemoveEvent = (e) => {
        const num = Math.round((e.clientX - lastPos) / dcWidth);
        if (num !== 0)
            draged = true;
        if (dragMode === "r") {
            Object.keys(activeBars).forEach((id) => {
                const ab = activeBars[id];
                if (ab.barElem == null)
                    return;
                (0, dom_utils_1.setStyleProps)(ab.barElem, { width: `${Math.max(1, ab.data.length + num) * dcWidth}px` });
            });
            return;
        }
        if (dragMode === "l") {
            Object.keys(activeBars).forEach((id) => {
                const ab = activeBars[id];
                if (ab.barElem == null)
                    return;
                const left = ab.data.left + num;
                (0, dom_utils_1.setStyleProps)(ab.barElem, { left: `${left * dcWidth}px`, width: `${Math.max(1, ab.data.length - (left - ab.data.left)) * dcWidth}px` });
            });
            return;
        }
        if (dragMode === "m") {
            Object.keys(activeBars).forEach((id) => {
                const ab = activeBars[id];
                if (ab.barElem == null)
                    return;
                (0, dom_utils_1.setStyleProps)(ab.barElem, { left: `${(ab.data.left + num) * dcWidth}px` });
            });
            return;
        }
    };
    const mouseupEvent = (e) => {
        changeCommit(Math.round((e.clientX - lastPos) / dcWidth));
    };
    const changeCommit = (num) => {
        if (num !== 0) {
            Object.keys(activeBars).forEach((id) => {
                const ab = activeBars[id];
                switch (dragMode) {
                    case "r":
                        ab.data.length = Math.max(1, ab.data.length + num);
                        break;
                    case "l":
                        const left = ab.data.left + num;
                        ab.data.length = Math.max(1, ab.data.length - (left - ab.data.left));
                        ab.data.left = left;
                        break;
                    case "m":
                        ab.data.left += num;
                        break;
                    default:
                        break;
                }
                const f = new Date(termFrom);
                f.setDate(f.getDate() + ab.data.left);
                const t = new Date(f);
                t.setDate(t.getDate() + ab.data.length - 1);
                ab.originData[ab.dataName.fromDataName] = convertDateToData(f);
                ab.originData[ab.dataName.toDataName] = convertDateToData(t);
            });
            Object.keys(activeBars).forEach((id) => {
                listview?.renderByOriginData(activeBars[id].originData, true);
            });
        }
        (0, dom_utils_1.releaseCursor)();
        window.removeEventListener("mouseup", mouseupEvent);
        window.removeEventListener("mousemove", mousemoveEvent);
        dragMode = "";
    };
    const deleteBar = () => {
        Object.keys(activeBars).forEach((id) => {
            const ab = activeBars[id];
            ab.originData[ab.dataName.fromDataName] = null;
            ab.originData[ab.dataName.toDataName] = null;
        });
        Object.keys(activeBars).forEach((id) => {
            listview?.renderByOriginData(activeBars[id].originData, true);
        });
    };
    return {
        name: props.name ?? "_lvcol_gc",
        disabled,
        resize: false,
        sort: false,
        width: cellArr.length * dcWidth,
        notScrollFocusWhenTabStop: true,
        initialize: (_col, lv) => {
            listview = lv;
            const div = document.createElement("div");
            const mcElem = (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-month-wrap`);
            const mElem = (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-month`);
            const dcElem = (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-date-wrap`);
            const dElem = (0, dom_utils_1.cloneElement)(div, (elem) => {
                (0, dom_utils_1.setStyleProps)(elem, { width: `${dcWidth}px` });
                elem.classList.add(`${exports.listViewGanttChartColumnClassName}-date`);
                elem.setAttribute("data-name", "datecell");
            });
            const rElem = (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-row`);
            const hrElem = (0, dom_utils_1.cloneElement)(rElem);
            let ly = -1, lm = -1;
            let dcelem = null, hdcelem = null, melem = null, cellCount = 0;
            for (const date of cellArr) {
                if (ly !== date.y || lm !== date.m) {
                    if (melem)
                        melem.style.width = `${cellCount * dcWidth}px`;
                    const mcelem = (0, dom_utils_1.cloneElement)(mcElem);
                    mcelem.appendChild((0, dom_utils_1.cloneElement)(mElem, (elem) => {
                        (melem = elem).textContent = unit === "month" ? `${date.y}` : `${date.y}/${date.m + 1}`;
                    }));
                    hdcelem = (0, dom_utils_1.cloneElement)(dcElem);
                    mcelem.appendChild(hdcelem);
                    hrElem.appendChild(mcelem);
                    dcelem = (0, dom_utils_1.cloneElement)(dcElem, (elem) => {
                        elem.style.height = "100%";
                    });
                    rElem.appendChild(dcelem);
                    ly = date.y;
                    lm = date.m;
                    cellCount = 0;
                }
                (0, dom_utils_1.cloneElement)(dElem, (elem) => {
                    cellCount++;
                    elem.setAttribute("data-y", String(date.y));
                    elem.setAttribute("data-m", String(date.m));
                    elem.setAttribute("data-d", String(date.d));
                    if (unit === "day")
                        elem.setAttribute("data-w", String(date.w));
                    elem.setAttribute("data-today", String(date.today));
                    dcelem.appendChild(elem);
                    hdcelem.appendChild((0, dom_utils_1.cloneElement)(elem, (elem) => {
                        elem.textContent = unit === "month" ? `${date.m + 1}月` : String(date.d);
                        hdcelem.appendChild(elem);
                    }));
                });
            }
            melem.style.width = `${cellCount * dcWidth}px`;
            return {
                headerRowElem: hrElem,
                rowElem: rElem,
                barElement: (0, dom_utils_1.cloneElement)(div, (elem) => {
                    (0, dom_utils_1.setStyleProps)(elem, { display: "none", visibility: "hidden" });
                    elem.classList.add(`${exports.listViewGanttChartColumnClassName}-bar-wrap`);
                    elem.setAttribute("data-name", "bar");
                    elem.appendChild((0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-bar`));
                }),
                barLabelElement: (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-bar-label`),
                barDragElement: (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-bar-drag`),
                differenceElement: (0, dom_utils_1.cloneElement)(div, `${exports.listViewGanttChartColumnClassName}-diff`),
            };
        },
        cellDispose: (cell) => {
            event.removeEventIterator((de) => de.element === cell.element || cell.contentElements.find(elem => elem === de.element) != null);
        },
        bindedItems: (items) => {
            clearActiveBars();
            for (const item of items) {
                for (const dn of props.dataNames) {
                    item[dn.dataName] = {
                        ...convertValueToData(item, dn),
                    };
                }
            }
        },
        headerCellInitialize: (column, initParams) => {
            column.headerCellElement.classList.add(`${exports.listViewGanttChartColumnClassName}-header`);
            column.headerCellElement.setAttribute("data-progressline", String(showProgressLine));
            column.headerCellLabelElement.classList.remove(`${listview_1.listViewClassName}-lbl`);
            column.headerCellLabelElement.classList.add(`${exports.listViewGanttChartColumnClassName}-wrap`);
            column.headerCellLabelElement.appendChild(initParams.headerRowElem);
        },
        cellInitialize: (cell, initParams) => {
            const elem = cell.element;
            elem.classList.add(exports.listViewGanttChartColumnClassName);
            elem.setAttribute("data-progressline", String(showProgressLine));
            const dblclick = (e) => {
                const dcelem = e.target;
                const name = dcelem.getAttribute("data-name");
                if (name !== "datecell")
                    return;
                const key = dcelem.getAttribute("data-key");
                const dn = props.dataNames[Number(key)];
                const data = cell.row.item?.data;
                if (data == null)
                    return;
                const d = data[dn.dataName];
                if (d.from == null) {
                    const f = datetime_utils_1.default.convert(`${dcelem.getAttribute("data-y")}-${Number(dcelem.getAttribute("data-m")) + 1}-${dcelem.getAttribute("data-d")}`);
                    data[dn.fromDataName] = convertDateToData(f);
                    data[dn.toDataName] = convertDateToData(new Date(f));
                    listview.renderByOriginData(data, true);
                }
            };
            event.addEvent(elem, "dblclick", dblclick);
            for (let i = 0, il = props.dataNames.length; i < il; i++) {
                const dn = props.dataNames[i], key = String(i);
                const relem = (0, dom_utils_1.cloneElement)(initParams.rowElem, (elem) => {
                    elem.querySelectorAll("div[data-name='datecell']").forEach((e) => {
                        e.setAttribute("data-key", key);
                    });
                    elem.setAttribute("data-disabled", String(props.disabled === true || dn.disabled === true));
                });
                const belem = (0, dom_utils_1.cloneElement)(initParams.barElement, (elem) => {
                    cell.contentElements.push(elem);
                    elem.setAttribute("data-key", key);
                    if (dn.barClassName)
                        elem.classList.add(dn.barClassName);
                    if (!disabled && dn.disabled !== true) {
                        elem.tabIndex = 0;
                        const commonListener = (e) => {
                            e.stopPropagation();
                            window.addEventListener("mouseup", mouseupEvent);
                            window.addEventListener("mousemove", mousemoveEvent);
                            Object.keys(activeBars).forEach((key) => {
                                const ab = activeBars[key];
                                for (const c of cell.column.cells) {
                                    if (c.row.item == null)
                                        continue;
                                    if (c.row.item.data[ab.dataName.dataName].id !== key)
                                        continue;
                                    ab.barElem = c.contentElements[ab.index * 5];
                                    break;
                                }
                            });
                            lastPos = e.clientX;
                        };
                        const moveListener = (e) => {
                            if (activeBars[cell.row.item.data[dn.dataName].id] == null)
                                return;
                            commonListener(e);
                            (0, dom_utils_1.setCursor)("move");
                            dragMode = "m";
                        };
                        event.addEvent(elem, "mousedown", moveListener);
                        elem.appendChild((0, dom_utils_1.cloneElement)(initParams.barDragElement, (celem) => {
                            celem.classList.add(`${exports.listViewGanttChartColumnClassName}-bar-drag-left`);
                            const listener = (e) => {
                                commonListener(e);
                                (0, dom_utils_1.setCursor)("col-resize");
                                dragMode = "l";
                            };
                            event.addEvent(celem, "mousedown", listener);
                            cell.contentElements.push(celem);
                        }));
                        elem.appendChild((0, dom_utils_1.cloneElement)(initParams.barDragElement, (celem) => {
                            celem.classList.add(`${exports.listViewGanttChartColumnClassName}-bar-drag-right`);
                            const listener = (e) => {
                                commonListener(e);
                                (0, dom_utils_1.setCursor)("col-resize");
                                dragMode = "r";
                            };
                            event.addEvent(celem, "mousedown", listener);
                            cell.contentElements.push(celem);
                        }));
                        const keydown = (e) => {
                            if (disabled || dn.disabled === true)
                                return;
                            switch (e.key) {
                                case "Escape":
                                    listview?.focus();
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case "ArrowLeft":
                                    if (e.ctrlKey)
                                        dragMode = "r";
                                    else
                                        dragMode = "m";
                                    changeCommit(-1);
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case "ArrowRight":
                                    if (e.ctrlKey)
                                        dragMode = "r";
                                    else
                                        dragMode = "m";
                                    changeCommit(1);
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case "Delete":
                                    deleteBar();
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case "Tab":
                                    clearActiveBars();
                                    listview?.focus();
                                    break;
                                default:
                                    break;
                            }
                        };
                        event.addEvent(elem, "keydown", keydown);
                    }
                    else {
                        cell.contentElements.push(null);
                        cell.contentElements.push(null);
                    }
                });
                const blelem = (0, dom_utils_1.cloneElement)(initParams.barLabelElement, (elem) => {
                    cell.contentElements.push(elem);
                });
                if (showProgressLine) {
                    (0, dom_utils_1.cloneElement)(initParams.differenceElement, (elem) => {
                        (0, dom_utils_1.setStyleProps)(elem, { display: "none", visibility: "hidden" });
                        relem.appendChild(elem);
                        cell.contentElements.push(elem);
                    });
                }
                else {
                    cell.contentElements.push(null);
                }
                belem.appendChild(blelem);
                relem.appendChild(belem);
                elem.appendChild(relem);
            }
        },
        cellRender: (cell) => {
            const data = cell.row.item.data;
            for (let i = 0, il = props.dataNames.length; i < il; i++) {
                const dn = props.dataNames[i].dataName;
                const d = data[dn];
                const belem = cell.contentElements[i * 5];
                const v = d.left != null, a = activeBars[d.id] != null;
                if (cell.cache[dn] == null)
                    cell.cache[dn] = {};
                if (cell.cache[dn].visible !== v) {
                    if (cell.cache[dn].visible = v) {
                        belem.style.removeProperty("display");
                        belem.style.removeProperty("visibility");
                    }
                    else {
                        belem.style.display = "none";
                        belem.style.visibility = "hidden";
                    }
                }
                let notSameTitle = false;
                if (cell.cache[dn].left !== d.left) {
                    belem.style.left = `${(cell.cache[dn].left = d.left) * dcWidth}px`;
                    notSameTitle = true;
                }
                if (cell.cache[dn].length !== d.length) {
                    belem.style.width = `${(cell.cache[dn].length = d.length) * dcWidth}px`;
                    notSameTitle = true;
                }
                if (notSameTitle)
                    belem.title = d.title;
                if (cell.cache[dn].active !== a)
                    belem.setAttribute("data-active", String(cell.cache[dn].active = a));
                if (cell.cache[dn].label !== d.barLabel)
                    cell.contentElements[i * 5 + 3].textContent = cell.cache[dn].label = d.barLabel;
                if (showProgressLine) {
                    const plelem = cell.contentElements[i * 5 + 4];
                    if (cell.cache[dn].diff !== d.diff) {
                        plelem.setAttribute("data-latedate", String(cell.cache[dn].diff = d.diff));
                        if (d.diff == null) {
                            plelem.style.display = "none";
                            plelem.style.visibility = "hidden";
                        }
                        else {
                            plelem.style.removeProperty("display");
                            plelem.style.removeProperty("visibility");
                            plelem.style.width = `${Math.abs(d.diff) * dcWidth}px`;
                            plelem.style.left = d.diff > 0 ? `${todayLeft * dcWidth}px` : `${(todayLeft + d.diff) * dcWidth}px`;
                        }
                        const l = d.diff < 0;
                        if (cell.cache[dn].late !== l)
                            plelem.setAttribute("data-late", String(cell.cache[dn].late = l));
                    }
                }
            }
        },
        clickedCell: (params, e) => {
            const elem = e.target;
            const name = elem.getAttribute("data-name");
            if (string_utils_1.default.isEmpty(name))
                return;
            const key = elem.getAttribute("data-key");
            const dn = props.dataNames[Number(key)];
            const data = params.data[dn.dataName];
            if (name === "datecell") {
                draged = false;
                clearActiveBars();
            }
            else if (name === "bar") {
                let item = activeBars[data.id];
                if (draged) {
                    draged = false;
                    if (!e.ctrlKey && item == null)
                        clearActiveBars();
                }
                else {
                    if (!e.ctrlKey)
                        clearActiveBars();
                }
                if (disabled || dn.disabled === true) {
                    clearActiveBars();
                    return;
                }
                if (e.ctrlKey && item != null) {
                    delete activeBars[data.id];
                    return;
                }
                if (item == null) {
                    activeBars[data.id] = {
                        index: Number(key),
                        data,
                        barElem: null,
                        originData: params.data,
                        dataName: dn,
                    };
                    setTimeout(() => elem.focus(), 0);
                    return;
                }
            }
        },
        clickedRow: (params) => {
            if (params.columnName === props.name)
                return;
            clearActiveBars();
        },
        editedRowData: (data) => {
            for (const dn of props.dataNames) {
                const d = data[dn.dataName];
                const ret = convertValueToData(data, dn, d.id);
                d.from = ret.from;
                d.to = ret.to;
                d.left = ret.left;
                d.length = ret.length;
                d.barLabel = ret.barLabel;
                d.diff = ret.diff;
                d.title = ret.title;
            }
        },
        _beginEdit: ({ endEdit, cell }) => {
            endEdit(false);
            const elem = cell.contentElements.find(elem => elem.getAttribute("data-name") === "bar");
            if (elem == null)
                return;
        },
        dispose: () => {
            event.dispose();
        },
        jsxStyle: exports.ListViewGanttChartColumnStyle,
    };
};
exports.default = ListViewGanttChartColumn;
const calcBarLength = (from, to, unit, termFrom) => {
    if (from == null)
        return undefined;
    if (to == null)
        return 1;
    switch (unit) {
        case "month":
            return (to.getFullYear() * 12 + to.getMonth()) - (from.getFullYear() * 12 + from.getMonth()) + 1;
        case "week":
            if (to.getTime() - from.getTime() < 0)
                return undefined;
            return Math.floor((to.getTime() - termFrom.getTime()) / (86400000 * 7)) - Math.floor((from.getTime() - termFrom.getTime()) / (86400000 * 7)) + 1;
        default:
            const dm = to.getTime() - from.getTime();
            if (dm < 0)
                return undefined;
            return dm / 86400000 + 1;
    }
};
const calcBarLeft = (termFrom, barFrom, unit) => {
    if (termFrom == null || barFrom == null)
        return undefined;
    switch (unit) {
        case "month":
            return (barFrom.getFullYear() * 12 + barFrom.getMonth()) - (termFrom.getFullYear() * 12 + termFrom.getMonth());
        case "week":
            return Math.floor((barFrom.getTime() - termFrom.getTime()) / 604800000);
        default:
            return (barFrom.getTime() - termFrom.getTime()) / 86400000;
    }
};
exports.ListViewGanttChartColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewGanttChartColumnClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewGanttChartColumnClassName} {
  flex-direction: column !important;
}
.${exports.listViewGanttChartColumnClassName}-wrap {
  ${style_1.CssPV.flex_c}
  flex: none;
  height: 100%;
}
.${exports.listViewGanttChartColumnClassName}-row {
  ${style_1.CssPV.flex_r}
  flex: 1;
  min-height: 0px;
  overflow: hidden;
  z-index: 0;
}
.${exports.listViewGanttChartColumnClassName}-month-wrap {
  ${style_1.CssPV.flex_c}
  flex: none;
  height: 100%;
  overflow: hidden;
}
.${exports.listViewGanttChartColumnClassName}-month {
  ${style_1.CssPV.flex_r}
  flex: 1;
  min-height: 0px;
  overflow: hidden;
  padding: 2px 5px 0px 5px;
}
.${exports.listViewGanttChartColumnClassName}-date-wrap {
  ${style_1.CssPV.flex_r}
  flex: 1;
}
.${exports.listViewGanttChartColumnClassName}-date {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  height: 100%;
  padding-top: 2px;
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  top: 0px;
  min-height: 100%;
  height: 100%;
  overflow: visible;
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] {
  cursor: move;
}
.${exports.listViewGanttChartColumnClassName}-bar {
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  height: ${style_1.CssVar.size};
  max-height: 100%;
  width: 100%;
  user-select: none;
  pointer-events: none;
  background: ${style_1.CssVar.lv_gc.bg.bar_c};
}
.${exports.listViewGanttChartColumnClassName}-bar-label {
  box-sizing: border-box;
  position: relative;
  pointer-events: none;
  user-select: none;
  z-index: 2;
  display: block;
  overflow: visible;
  white-space: nowrap;
  padding: 2px 5px 0px 5px;
}
.${exports.listViewGanttChartColumnClassName}-bar-drag {
  box-sizing: border-box;
  position: absolute;
  height: ${style_1.CssVar.size};
  max-height: 100%;
  min-width: 5px;
  z-index: 3;
  width: 9px;
  background: transparent;
  display: block;
  cursor: col-resize;
}
.${exports.listViewGanttChartColumnClassName}-bar-drag-left {
  left: 0px;
}
.${exports.listViewGanttChartColumnClassName}-bar-drag-right {
  right: 0px;
}
.${exports.listViewGanttChartColumnClassName}-diff {
  box-sizing: border-box;
  position: absolute;
  min-height: 1px;
  bottom: 0px;
  height: 6px;
  z-index: 3;
}
${design === "material" ? `
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.${exports.listViewGanttChartColumnClassName} {
  border-right: none;
}
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.${exports.listViewGanttChartColumnClassName}:hover {
  background: ${style_1.CssVar.lv.b.bg.c_hr} !important;
}
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.bh-selected {
  outline: none !important;
}
.${exports.listViewGanttChartColumnClassName}-month {
  border-bottom: 1px solid ${style_1.CssVar.lv.h_f.bdc};
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${listview_1.listViewClassName}-header .${exports.listViewGanttChartColumnClassName}-date {
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${listview_1.listViewClassName}-body .${exports.listViewGanttChartColumnClassName}-date {
  border-right: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${listview_1.listViewClassName}-body .${exports.listViewGanttChartColumnClassName}-date:hover {
  background: ${style_1.CssVar.lv.b.bg.c_s};
}
.${exports.listViewGanttChartColumnClassName}-date[data-w="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.listViewGanttChartColumnClassName}-date[data-w="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.listViewGanttChartColumnClassName}-date[data-today="true"] {
  background: ${style_1.CssVar.lv_gc.bg.today};
}
.${exports.listViewGanttChartColumnClassName}-bar {
  height: 80%;
  margin: 0px 6px;
  width: calc(100% - 13px);
  opacity: 0.8;
}
.${exports.listViewGanttChartColumnClassName}-row[data-disabled="false"] .${exports.listViewGanttChartColumnClassName}-bar {
  box-shadow: ${style_1.CssParam.m.sdBtm};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap:hover .${exports.listViewGanttChartColumnClassName}-bar,
.${exports.listViewGanttChartColumnClassName}-bar-wrap:active .${exports.listViewGanttChartColumnClassName}-bar {
  opacity: unset;
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"]:active .${exports.listViewGanttChartColumnClassName}-bar {
  margin-top: -${style_1.CssParam.m.updownMargin};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
}
.${exports.listViewGanttChartColumnClassName}-bar-label {
  margin-left: 6px;
}
.${exports.listViewGanttChartColumnClassName}-bar::before,
.${exports.listViewGanttChartColumnClassName}-bar::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 100%;
  width: 7px;
  top: 0px;
  user-select: none;
  background: ${style_1.CssVar.lv_gc.bg.bar_c};
}
.${exports.listViewGanttChartColumnClassName}-bar::before {
  left: -6px;
  clip-path: polygon(0% 50%, 80% 0%, 100% 0%, 100% 100%, 80% 100%);
}
.${exports.listViewGanttChartColumnClassName}-bar::after {
  right: -6px;
  clip-path: polygon(0% 0%, 20% 0%, 100% 50%, 20% 100%, 0% 100%);
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar {
  border-top: 1px solid ${style_1.CssVar.lv_gc.bg.bar_c_a};
  border-bottom: 1px solid ${style_1.CssVar.lv_gc.bg.bar_c_a};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar::before,
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar::after {
  background: ${style_1.CssVar.lv_gc.bg.bar_c_a};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar-label {
  left: 100%;
  margin-left: 0px;
}
.${exports.listViewGanttChartColumnClassName}-header[data-progressline="true"] .${exports.listViewGanttChartColumnClassName}-date[data-today="true"]::before,
.${exports.listViewGanttChartColumnClassName}[data-progressline="true"] .${exports.listViewGanttChartColumnClassName}-date[data-today="true"]::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: ${style_1.CssVar.lv_gc.pl.c};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="true"] {
  border-top: 4px solid transparent;
  border-left: 3px solid ${style_1.CssVar.lv_gc.pl.c_late};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c_late};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="true"][data-latedate="-1"] {
  border-left: 3px solid ${style_1.CssVar.lv_gc.pl.c};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="false"] {
  border-top: 4px solid transparent;
  border-right: 3px solid ${style_1.CssVar.lv_gc.pl.c_prec};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c_prec};
}
` : ""}
${design === "neumorphism" ? `
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.${exports.listViewGanttChartColumnClassName} {
  border-right: none;
}
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.${exports.listViewGanttChartColumnClassName}:hover {
  background: ${style_1.CssVar.lv.b.bg.c_hr} !important;
}
.${listview_1.listViewClassName}-body .${listview_1.listViewClassName}-cell.bh-selected {
  outline: none !important;
}
.${exports.listViewGanttChartColumnClassName}-month {
  border-bottom: 1px solid ${style_1.CssVar.lv.h_f.bdc};
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${listview_1.listViewClassName}-header .${exports.listViewGanttChartColumnClassName}-date {
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${listview_1.listViewClassName}-body .${exports.listViewGanttChartColumnClassName}-date {
  border-right: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${listview_1.listViewClassName}-body .${exports.listViewGanttChartColumnClassName}-date:hover {
  background: ${style_1.CssVar.lv.b.bg.c_s};
}
.${exports.listViewGanttChartColumnClassName}-date[data-w="0"] {
  background: ${style_1.CssVar.w_sun.bg};
}
.${exports.listViewGanttChartColumnClassName}-date[data-w="6"] {
  background: ${style_1.CssVar.w_sat.bg};
}
.${exports.listViewGanttChartColumnClassName}-date[data-today="true"] {
  background: ${style_1.CssVar.lv_gc.bg.today};
}
.${exports.listViewGanttChartColumnClassName}-bar {
  height: 80%;
  opacity: 0.8;
  width: calc(100% - 1px);
  background: linear-gradient(to bottom right, ${style_1.CssVar.lv_gc.bg.bar_dc}, ${style_1.CssVar.lv_gc.bg.bar_bc});
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.listViewGanttChartColumnClassName}-row[data-disabled="false"] .${exports.listViewGanttChartColumnClassName}-bar {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap:hover .${exports.listViewGanttChartColumnClassName}-bar,
.${exports.listViewGanttChartColumnClassName}-bar-wrap:active .${exports.listViewGanttChartColumnClassName}-bar {
  opacity: unset;
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar {
  box-shadow: ${style_1.CssParam.n.cvxSd};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"]:active .${exports.listViewGanttChartColumnClassName}-bar {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar-label {
  left: 100%;
}
.${exports.listViewGanttChartColumnClassName}-bar-wrap[data-active="true"] .${exports.listViewGanttChartColumnClassName}-bar-drag {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssVar.lv_gc.bg.bar_c_a};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.listViewGanttChartColumnClassName}-header[data-progressline="true"] .${exports.listViewGanttChartColumnClassName}-date[data-today="true"]::before,
.${exports.listViewGanttChartColumnClassName}[data-progressline="true"] .${exports.listViewGanttChartColumnClassName}-date[data-today="true"]::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: ${style_1.CssVar.lv_gc.pl.c};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="true"] {
  border-top: 4px solid transparent;
  border-left: 3px solid ${style_1.CssVar.lv_gc.pl.c_late};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c_late};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="true"][data-latedate="-1"] {
  border-left: 3px solid ${style_1.CssVar.lv_gc.pl.c};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c};
}
.${exports.listViewGanttChartColumnClassName}-diff[data-late="false"] {
  border-top: 4px solid transparent;
  border-right: 3px solid ${style_1.CssVar.lv_gc.pl.c_prec};
  border-bottom: 3px solid ${style_1.CssVar.lv_gc.pl.c_prec};
}
` : ""}
` });
