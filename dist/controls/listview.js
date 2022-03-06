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
exports.ListViewStyle = exports.cloneListViewEditColumnElement = exports.createListViewEditColumnElement = exports.$ListView = exports.listViewDefaultRowHeight = exports.listViewClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const input_1 = require("../layouts/input");
const input_column_1 = require("../layouts/input-column");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const dom_utils_1 = require("../utils/dom-utils");
exports.listViewClassName = "bh-lv";
const initializedDataName = "_lv_init";
const listViewDefaultRowHeight = () => (0, style_1.cssParamsSize)() + 4;
exports.listViewDefaultRowHeight = listViewDefaultRowHeight;
const ListView = (props) => {
    const ref = (0, react_1.useRef)();
    const lv = (0, react_1.useRef)();
    const initRef = (0, react_1.useRef)(false);
    const layout = (0, style_1.useLayout)();
    (0, react_1.useEffect)(() => {
        lv.current = new $ListView(ref.current, props, layout);
        initRef.current = true;
        return () => {
            lv.current?.dispose();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (initRef.current)
            lv.current?.setItems(props.value);
    }, [props.value]);
    (0, react_1.useEffect)(() => {
        if (initRef.current)
            lv.current?.setColumns(props.columns);
    }, [props.columns]);
    (0, react_1.useEffect)(() => {
        if (initRef.current)
            lv.current?.setOptions(props.options);
    }, [props.options]);
    (0, react_1.useEffect)(() => {
        if (initRef.current)
            lv.current.setStyleContext(layout);
    }, [layout]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            ref.current?.focus();
            return con;
        };
        con.getItems = () => lv.current.getValue();
        con.setItems = (value) => {
            lv.current.setItems(value);
            return con;
        };
        con.getFilteredItems = () => lv.current.getFilteredValue();
        con.getDisplayedItems = () => lv.current.getSortedValue();
        con.getLength = () => lv.current.getLength();
        con.getFilteredLength = () => lv.current.getFilteredLength();
        con.select = (rowIndex, columnName) => {
            lv.current.select(rowIndex, columnName);
            return con;
        };
        con.clearSelect = () => {
            lv.current.clearSelect();
            return con;
        };
        con.getSelectedRows = () => lv.current.getSelectedRows();
        con.getSelectedCells = () => lv.current.getSelectedCells();
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(`${exports.listViewClassName}-wrap`, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style }, (0, react_1.useMemo)(() => react_1.default.createElement("div", { ref: ref }), [])),
        exports.ListViewStyle,
        (0, react_1.useMemo)(() => {
            const styles = [];
            const func = (columns) => {
                if (columns == null)
                    return;
                columns.forEach(column => {
                    if (column.jsxStyle)
                        styles.push(react_1.default.createElement(react_1.default.Fragment, { key: column.name ?? string_utils_1.default.generateUuidV4() }, column.jsxStyle));
                    column._rows?.forEach(colrow => func(colrow.columns));
                });
            };
            func(props.columns);
            return styles;
        }, [props.columns])));
};
exports.default = ListView;
class $ListView extends dom_utils_1.DomComponentClass {
    element;
    styleCtx;
    initialized;
    resizeObserver;
    headerElement;
    headerRowElement;
    bodyElement;
    dummyElement;
    footerElement;
    footerRowElement;
    editElement;
    editMaskElement;
    columns;
    renderColumns;
    originItems;
    bindingItems;
    filteredItems;
    sortedItems;
    rows;
    selectedRows;
    lastSelectedCell;
    lastSelectedBaseCell;
    lastScrolledTop;
    lastScrolledLeft;
    maxFirstIndex;
    firstIndex;
    lastChangedX;
    hasFillColumn;
    editTarget;
    scrollingMode;
    scrollingId;
    scrollingInterval;
    cloneBase;
    rowNumberColumn;
    headerVisible;
    headerHeight;
    footerVisible;
    footerHeight;
    rowHeight;
    selectMode;
    multiSelect;
    oddEven;
    dragScroll;
    rowNumber;
    sort;
    sorted;
    externalSort;
    filter;
    cellClicked;
    rowClicked;
    filtered;
    enterIsClick;
    scrollTimeoutInterval;
    endEditEventListener;
    itemsCallBindedRev = 0;
    colCallBindedRev = 0;
    constructor(element, props, styleCtx) {
        super();
        this.element = element;
        this.styleCtx = styleCtx;
        this.initialized = false;
        this.itemsCallBindedRev = 0;
        this.colCallBindedRev = 0;
        if (element == null) {
            throw new Error("ListView: not found root element.");
        }
        this.columns = [];
        this.renderColumns = [];
        this.sortedItems = [];
        this.rows = [];
        this.selectedRows = {};
        this.lastSelectedCell = null;
        this.lastSelectedBaseCell = null;
        this.editTarget = null;
        this.lastScrolledTop = -1;
        this.lastScrolledLeft = -1;
        this.firstIndex = -1;
        this.scrollingMode = "stop";
        this.scrollingId = 0;
        this.scrollingInterval = 0;
        this.scrollTimeoutInterval = 5;
        this.endEditEventListener = null;
        this.generateElements();
        this.rowNumberColumn = {
            name: "_rnum",
            label: "row number",
            dataType: "number",
            width: 40,
            minWidth: 40,
            cells: [],
            headerCellElement: (0, dom_utils_1.cloneElement)(this.cloneBase.cellElem),
            footerCellElement: (0, dom_utils_1.cloneElement)(this.cloneBase.cellElem),
            initializeParameters: null,
            dispose: null,
            cellInitialize: (cell) => {
                const elem = (0, dom_utils_1.cloneElement)(this.cloneBase.labelCellElem);
                cell.contentElements.push(elem);
                cell.element.appendChild(elem);
            },
            cellRender: (cell) => {
                if (cell.cache.index !== cell.row.index) {
                    cell.contentElements[0].textContent = String(cell.row.index + 1);
                    cell.cache.index = cell.row.index;
                }
            },
            textAlign: "center",
            sort: null,
            sortOrder: "",
            fill: false,
            fixed: true,
            fixedLeft: 0,
            left: 0,
            resize: false,
            tabStop: false,
            notScrollFocusWhenTabStop: false,
            preventClearSelected: false,
            disabled: false,
            render: true,
            editedRowData: null,
        };
        this.setOptions(props.options);
        this.initialized = true;
        this.optimizeElementsPosition();
        this.bindColumns(props.columns);
        this.bindItems(props.value);
        this.optimizeDummySize();
        this.render();
    }
    dispose() {
        this.disposeColumns();
        this.disposeRows();
        if (this.resizeObserver)
            this.resizeObserver.disconnect();
        super.dispose();
    }
    setOptions(options = {}) {
        this.setHeaderVisible(options.header);
        this.setHeaderHeight(options.headerHeight);
        this.setFooterVisible(options.footer);
        this.setFooterHeight(options.footerHeight);
        this.setRowHeight(options.rowHeignt);
        this.setRowNumber(options.rowNumber);
        this.setSelectMode(options.selectMode);
        this.setMultiSelect(options.multiSelect);
        this.setOddEven(options.oddEven);
        this.setDragScroll(options.dragScroll);
        this.setSort(options.sort);
        this.setSorted(options.sorted);
        this.setExternalSort(options.externalSort);
        this.setFilter(options.filter);
        this.setCellClicked(options.clickedCell);
        this.setRowClicked(options.clickedRow);
        this.setFiltered(options.filtered);
        this.setEnterIsClick(options.enterIsClick);
        this.setScrollTimeoutInterval(options.scrollTimeoutInterval);
        return this;
    }
    optimizeElementsPosition() {
        if (!this.initialized)
            return;
        let bMargin = 0;
        if (this.headerVisible) {
            bMargin += this.headerHeight;
            (0, dom_utils_1.setStyleProps)(this.bodyElement, { top: this.headerHeight + "px" });
        }
        else {
            (0, dom_utils_1.setStyleProps)(this.bodyElement, { top: "0px" });
        }
        if (this.footerVisible)
            bMargin += this.footerHeight;
        (0, dom_utils_1.setStyleProps)(this.bodyElement, { height: bMargin === 0 ? "100%" : `calc(100% - ${bMargin}px)` });
        this.renderWhenResized();
    }
    setHeaderVisible(visible) {
        const init = visible !== false;
        if (init === this.headerVisible)
            return this;
        this.headerVisible = init;
        (0, dom_utils_1.setStyleProps)(this.headerElement, { display: this.headerVisible ? null : "none" });
        this.optimizeElementsPosition();
        return this;
    }
    setHeaderHeight(height) {
        const init = height || (0, exports.listViewDefaultRowHeight)();
        if (init === this.headerHeight)
            return this;
        this.headerHeight = init;
        (0, dom_utils_1.setStyleProps)(this.headerElement, { height: this.headerHeight + "px" });
        this.optimizeElementsPosition();
        return this;
    }
    setFooterVisible(visible) {
        const init = visible === true;
        if (init === this.footerVisible)
            return this;
        this.footerVisible = init;
        (0, dom_utils_1.setStyleProps)(this.footerElement, { display: this.footerVisible ? null : "none" });
        this.optimizeElementsPosition();
        return this;
    }
    setFooterHeight(height) {
        const init = height || (0, exports.listViewDefaultRowHeight)();
        if (init === this.footerHeight)
            return this;
        this.footerHeight = init;
        (0, dom_utils_1.setStyleProps)(this.footerElement, { height: this.footerHeight + "px", top: `calc(100% - ${this.footerHeight}px)` });
        this.optimizeElementsPosition();
        return this;
    }
    setRowHeight(height) {
        const init = height || (0, exports.listViewDefaultRowHeight)();
        if (init === this.rowHeight)
            return this;
        this.rowHeight = init;
        const prop = { height: `${this.rowHeight}px` };
        (0, dom_utils_1.setStyleProps)(this.cloneBase.rowElem, prop);
        for (const row of this.rows) {
            (0, dom_utils_1.setStyleProps)(row.element, prop);
        }
        return this;
    }
    setRowNumber(visible) {
        const init = visible !== false;
        if (init === this.rowNumber)
            return this;
        this.rowNumber = init;
        if (!this.initialized)
            return this;
        this.buildColumns();
        return this;
    }
    setSelectMode(selectMode) {
        const init = selectMode || "cell";
        if (init === this.selectMode)
            return this;
        this.selectMode = init;
        this.bodyElement.classList.remove("bh-select-row", "bh-select-cell");
        switch (this.selectMode) {
            case "none":
                break;
            case "row":
                this.bodyElement.classList.add("bh-select-row");
                break;
            case "cell":
            default:
                this.bodyElement.classList.add("bh-select-cell");
                break;
        }
        return this;
    }
    setMultiSelect(multiSelect) {
        const init = multiSelect === true;
        if (init === this.multiSelect)
            return this;
        this.multiSelect = init;
        this.clearSelectedRows();
        return this;
    }
    setOddEven(oddEven) {
        const init = oddEven !== false;
        if (init === this.oddEven)
            return this;
        this.oddEven = init;
        if (this.initialized)
            this.renderWhenScrolled();
        return this;
    }
    setDragScroll(dragScroll) {
        const init = dragScroll ?? true;
        if (init === this.dragScroll)
            return this;
        this.dragScroll = init;
        return this;
    }
    setSort(func) {
        const same = this.sort === func;
        this.sort = func;
        if (this.initialized && !same) {
            this.sortItems();
            this.optimizeMaxFirstIndex();
            this.render();
        }
        return this;
    }
    setSorted(func) {
        this.sorted = func;
        return this;
    }
    setExternalSort(external) {
        this.externalSort = external === true;
        return this;
    }
    setFilter(func) {
        const same = this.filter === func;
        this.filter = func;
        if (this.initialized && !same) {
            this.filterItems();
            this.optimizeMaxFirstIndex();
            this.render();
        }
        return this;
    }
    setCellClicked(func) {
        this.cellClicked = func;
        return this;
    }
    setRowClicked(func) {
        this.rowClicked = func;
        return this;
    }
    setFiltered(func) {
        this.filtered = func;
        return this;
    }
    setEnterIsClick(enterIsClick) {
        const init = enterIsClick === true;
        if (init === this.enterIsClick)
            return this;
        this.enterIsClick = enterIsClick;
        return this;
    }
    setScrollTimeoutInterval(interval) {
        this.scrollTimeoutInterval = Math.max(0, interval ?? 5);
        return this;
    }
    generateElements() {
        this.element.classList.add(exports.listViewClassName, style_1.scrollbarClassName);
        this.element.tabIndex = -1;
        this.element.textContent = "";
        // clone base
        const div = document.createElement("div");
        this.cloneBase = {
            div,
            rowElem: (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-row`),
            cellElem: (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-cell`),
            labelCellElem: (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-lbl`),
        };
        // header
        this.headerElement = (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-header`);
        this.headerElement.appendChild(this.headerRowElement = (0, dom_utils_1.cloneElement)(this.cloneBase.rowElem));
        // footer
        this.footerElement = (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-footer`);
        this.footerElement.appendChild(this.footerRowElement = (0, dom_utils_1.cloneElement)(this.cloneBase.rowElem));
        this.element.appendChild(this.dummyElement = (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-body-dummy`));
        this.element.appendChild(this.headerElement);
        this.element.appendChild(this.bodyElement = (0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-body`));
        this.element.appendChild(this.footerElement);
        this.element.appendChild(this.editMaskElement = (0, dom_utils_1.setStyleProps)((0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-mask`), { display: "none" }));
        this.element.appendChild(this.editElement = (0, dom_utils_1.setStyleProps)((0, dom_utils_1.cloneElement)(div, `${exports.listViewClassName}-edit`), { visibility: "hidden", display: "none" }));
        let et = null;
        this.addEvent(this.element, "scroll", () => {
            if (et)
                return;
            et = setTimeout(() => {
                this.endEdit(false);
                this.renderWhenScrolled();
                et = null;
            }, this.scrollTimeoutInterval);
        }, { passive: true });
        this.addEvent(this.element, "keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.arrowUp(e.ctrlKey ? 10 : 1, this.multiSelect && e.shiftKey);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    this.arrowDown(e.ctrlKey ? 10 : 1, this.multiSelect && e.shiftKey);
                    e.preventDefault();
                    break;
                case "ArrowLeft":
                    this.arrowLeft(e.ctrlKey, this.multiSelect && e.shiftKey);
                    e.preventDefault();
                    break;
                case "ArrowRight":
                    this.arrowRight(e.ctrlKey, this.multiSelect && e.shiftKey);
                    e.preventDefault();
                    break;
                case "Enter":
                    this.endEdit(true);
                    if (this.enterIsClick) {
                        if (this.lastSelectedCell && this.selectMode !== "none")
                            this.cellClickedImpl(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index, e.ctrlKey, e.shiftKey);
                    }
                    else {
                        let lst = this.element.scrollTop;
                        if (e.shiftKey)
                            this.arrowUp();
                        else
                            this.arrowDown();
                        this.beginEditLastSelectedCell(lst);
                    }
                    e.preventDefault();
                    break;
                case "Tab":
                    this.endEdit(true);
                    let lst = this.element.scrollTop;
                    if (e.shiftKey)
                        this.arrowLeft();
                    else
                        this.arrowRight();
                    this.beginEditLastSelectedCell(lst);
                    e.preventDefault();
                    break;
                case " ":
                    if (this.lastSelectedCell && this.selectMode !== "none")
                        this.cellClickedImpl(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index, e.ctrlKey, e.shiftKey);
                    e.preventDefault();
                    break;
                case "F2":
                    e.preventDefault();
                    this.beginEditLastSelectedCell();
                    break;
                case "Escape":
                    this.endEdit(false);
                    break;
                default:
                    break;
            }
        }, false);
        this.addEvent(this.bodyElement, "mousedown", (e) => {
            if (this.dragScroll == false)
                return;
            const lastPosX = this.bodyElement.scrollLeft, lastPosY = this.element.scrollTop, posX = e.clientX, posY = e.clientY;
            let et = null, active = true;
            const move = (e) => {
                if (et)
                    return;
                et = setTimeout(() => {
                    if (this.dragScroll !== "vertical") {
                        const sl = posX - e.clientX + lastPosX;
                        this.headerElement.scrollLeft = sl;
                        this.footerElement.scrollLeft = sl;
                        this.element.scrollLeft = sl;
                    }
                    if (this.dragScroll !== "horizontal") {
                        this.element.scrollTop = posY - e.clientY + lastPosY;
                    }
                    et = null;
                }, this.scrollTimeoutInterval);
            };
            document.onselectstart = () => false;
            setTimeout(() => {
                if (active) {
                    // setCursor("move");
                }
            }, 200);
            const end = () => {
                this.removeEvent(window, "mousemove", move);
                this.removeEvent(window, "mouseup", end);
                active = false;
                // releaseCursor();
                this.lastScrolledLeft = this.element.scrollLeft;
                this.lastScrolledTop = this.element.scrollTop;
            };
            this.addEvent(window, "mouseup", end, { passive: true });
            this.addEvent(window, "mousemove", move, { passive: true });
        });
        this.resizeObserver = new ResizeObserver(() => {
            this.renderWhenResized();
            this.optimizeDummySize();
        });
        this.resizeObserver.observe(this.element);
        this.addEvent(this.editMaskElement, "click", () => {
            this.endEdit(true);
        });
        this.addEvent(this.editElement, "mousedown", (e) => {
            e.stopPropagation();
        });
        this.addEvent(this.editElement, "keydown", (e) => {
            if (e.key === "Tab")
                return;
            if (e.key === "Enter")
                return;
            if (e.key === "Escape")
                return;
            e.stopPropagation();
        });
    }
    clearSelectedRows(render) {
        Object.keys(this.selectedRows).forEach((key) => {
            const item = this.selectedRows[key];
            item.rowSelected = false;
            item.cellSelected = {};
            delete this.selectedRows[key];
        });
        for (const row of this.rows) {
            row.cache._lv_selected = null;
            for (const cell of row.cells) {
                cell.cache._lv_selected = null;
            }
        }
        if (render)
            this.renderWhenScrolled();
    }
    rangeSelectRow(item, column, index) {
        if (item == null || this.lastSelectedBaseCell == null)
            return;
        item.cellSelected[column.name] = true;
        if (this.lastSelectedBaseCell.index === index) {
            this.selectedRows[item.id] = item;
        }
        else if (this.lastSelectedBaseCell.index > index) {
            for (let i = index; i <= this.lastSelectedBaseCell.index; i++) {
                const rItem = this.sortedItems[i];
                rItem.rowSelected = true;
                this.selectedRows[rItem.id] = rItem;
            }
        }
        else {
            for (let i = this.lastSelectedBaseCell.index; i <= index; i++) {
                const rItem = this.sortedItems[i];
                rItem.rowSelected = true;
                this.selectedRows[rItem.id] = rItem;
            }
        }
        let endColName = null;
        const rCols = [];
        this.columnForEach((c) => {
            if (endColName == null) {
                if (c.name === this.lastSelectedBaseCell.column.name)
                    endColName = column.name;
                else if (c.name === column.name)
                    endColName = this.lastSelectedBaseCell.column.name;
            }
            if (endColName != null) {
                rCols.push(c.name);
                if (endColName === c.name)
                    return false;
            }
        });
        Object.keys(this.selectedRows).forEach((id) => {
            rCols.forEach((name) => this.selectedRows[id].cellSelected[name] = true);
        });
    }
    ;
    scrollToIndex(index, render) {
        const bst = this.bodyElement.scrollTop;
        if (index < this.firstIndex || (index - this.firstIndex) * this.rowHeight < bst) {
            this.element.scrollTop = index * this.rowHeight;
            return;
        }
        if (this.bodyElement.clientHeight + bst < (index - this.firstIndex + 1) * this.rowHeight) {
            this.element.scrollTop = (index + 1) * this.rowHeight - this.bodyElement.clientHeight;
            return;
        }
        if (render !== false)
            this.renderWhenScrolled();
    }
    ;
    scrollToColumn(column, render, renderAbsolute) {
        if (column == null)
            return false;
        if (column.notScrollFocusWhenTabStop) {
            if (render !== false)
                this.renderWhenScrolled(renderAbsolute);
            return false;
        }
        let colLeft = 0, colRight = 0, fixedLeft = 0;
        const func = (col) => {
            if (col.parent == null) {
                colLeft = col.left;
                fixedLeft = col.fixedLeft;
            }
            else {
                func(col.parent);
                const cell = col.cells[0];
                if (cell == null)
                    return;
                colLeft += cell.element.offsetLeft;
            }
        };
        func(column);
        colRight = colLeft + column.width;
        const cw = this.element.clientWidth;
        let sl = this.lastScrolledLeft;
        if (colLeft - fixedLeft < this.lastScrolledLeft)
            sl = colLeft - fixedLeft;
        if (colRight > this.lastScrolledLeft + cw)
            sl = colRight - cw;
        if (sl !== this.lastScrolledLeft) {
            this.headerElement.scrollLeft = sl;
            this.footerElement.scrollLeft = sl;
            this.element.scrollLeft = sl;
            if (this.element.scrollLeft == sl && render !== true)
                return true;
        }
        if (render !== false)
            this.renderWhenScrolled(renderAbsolute);
        return false;
    }
    arrowUpDown(updown, focusIndex, rangeSelect) {
        if (this.selectMode === "none")
            return false;
        const index = Math.max(0, Math.min((this.lastSelectedCell == null ? focusIndex : this.lastSelectedCell.index) + updown, this.sortedItems.length - 1));
        const item = this.sortedItems[index];
        if (item == null || this.lastSelectedCell?.index === index)
            return false;
        this.clearSelectedRows();
        const column = this.lastSelectedCell?.column || this.findColumn((col) => col.tabStop);
        if (this.selectMode === "row") {
            item.rowSelected = true;
        }
        else {
            if (this.columns.length === 0)
                return false;
            if (column == null)
                return false;
            item.cellSelected[column.name] = true;
        }
        this.selectedRows[item.id] = item;
        this.lastSelectedCell = { index, item, column };
        if (rangeSelect === true)
            this.rangeSelectRow(item, column, index);
        else
            this.lastSelectedBaseCell = { index, item, column };
        this.scrollToIndex(index);
        return true;
    }
    arrowUp(up, rangeSelect) {
        return this.arrowUpDown(-1 * (up ? up : 1), Math.max(0, this.firstIndex), rangeSelect);
    }
    arrowDown(down, rangeSelect) {
        return this.arrowUpDown(down ? down : 1, Math.min(this.sortedItems.length, this.firstIndex) - 1, rangeSelect);
    }
    arrowLeftRightOptimize(index, column, rangeSelect) {
        if (column == null)
            return false;
        const item = this.sortedItems[Math.max(0, Math.min(this.sortedItems.length - 1, index))];
        if (item == null)
            return false;
        this.clearSelectedRows();
        item.cellSelected[column.name] = true;
        this.selectedRows[item.id] = item;
        this.lastSelectedCell = { index, item, column };
        if (rangeSelect === true)
            this.rangeSelectRow(item, column, index);
        else
            this.lastSelectedBaseCell = { index, item, column };
        this.scrollToIndex(index, false);
        return this.scrollToColumn(column, true, true);
    }
    arrowLeft(ctrlKey, rangeSelect) {
        if (this.selectMode !== "cell" || this.columns.length === 0)
            return false;
        let index = this.lastSelectedCell == null ? this.firstIndex : this.lastSelectedCell.index;
        let column = this.lastSelectedCell?.column;
        if (ctrlKey || column == null) {
            column = this.findFirstColumn();
        }
        else {
            const ret = this.findPrevColumn(column.name);
            column = ret.column;
            if (ret.nextRow) {
                const movedIndex = Math.max(0, index - 1);
                if (movedIndex === index)
                    return false;
                index = movedIndex;
            }
        }
        return this.arrowLeftRightOptimize(index, column, rangeSelect);
    }
    arrowRight(ctrlKey, rangeSelect) {
        if (this.selectMode !== "cell" || this.columns.length === 0) {
            return false;
        }
        let index = this.lastSelectedCell == null ? this.firstIndex : this.lastSelectedCell.index;
        let column = this.lastSelectedCell?.column;
        if (ctrlKey) {
            column = this.findLastColumn();
        }
        else {
            if (column == null) {
                column = this.findFirstColumn();
            }
            else {
                const ret = this.findNextColumn(column.name);
                column = ret.column;
                if (ret.nextRow) {
                    const movedIndex = Math.min(index + 1, this.sortedItems.length - 1);
                    if (movedIndex === index)
                        return false;
                    index = movedIndex;
                }
            }
        }
        return this.arrowLeftRightOptimize(index, column, rangeSelect);
    }
    render() {
        this.renderWhenResized();
        this.renderHeaderCells();
        this.renderFooterCells();
        return this;
    }
    renderHeaderCells() {
        if (!this.headerVisible)
            return this;
        const func = (columns) => {
            if (columns == null)
                return;
            for (const column of columns) {
                if (column.headerCellRender)
                    column.headerCellRender(column.headerCellLabelElement, this.sortedItems, this.originItems);
                if (column.rows) {
                    for (const colrow of column.rows) {
                        func(colrow.columns);
                    }
                }
            }
        };
        func(this.columns);
        return this;
    }
    renderFooterCells() {
        if (!this.footerVisible)
            return this;
        const func = (columns) => {
            if (columns == null)
                return;
            for (const column of columns) {
                if (column.footerCellRender)
                    column.footerCellRender(column.footerCellLabelElement, this.sortedItems, this.originItems);
                if (column.rows) {
                    for (const colrow of column.rows) {
                        func(colrow.columns);
                    }
                }
            }
        };
        func(this.columns);
        return this;
    }
    renderRow(row, allColumn = false) {
        const item = row.item;
        if (item == null) {
            row.element.style.visibility = "hidden";
            return;
        }
        if (row.element.style.getPropertyValue("visibility"))
            row.element.style.removeProperty("visibility");
        if (!row.item.data[initializedDataName]) {
            row.item.data[initializedDataName] = true;
            this.columns.forEach(column => {
                column.rowDataInitialize?.(row.item.data);
            });
        }
        if (row.cache._lv_selected !== item.rowSelected) {
            if (row.cache._lv_selected = item.rowSelected)
                row.element.classList.add("bh-selected");
            else
                row.element.classList.remove("bh-selected");
        }
        if (this.oddEven) {
            const oddEven = row.index % 2;
            if (row.cache._lv_oddEven !== oddEven) {
                row.element.setAttribute("data-oddeven", (row.cache._lv_oddEven = oddEven) === 0 ? "odd" : "even");
            }
        }
        this.renderRowColumns(allColumn ? this.columns : this.renderColumns, row);
    }
    renderRowColumns(columns, row) {
        columns.forEach(column => {
            this.renderCell(column.cells[row.id]);
            column.rows?.forEach(colrow => {
                this.renderRowColumns(colrow.columns, row);
            });
        });
    }
    renderCell(cell) {
        if (cell.cache._lv_selected !== (cell.row.item.cellSelected[cell.column.name] || false)) {
            if (cell.cache._lv_selected = cell.row.item.cellSelected[cell.column.name] === true)
                cell.element.classList.add("bh-selected");
            else
                cell.element.classList.remove("bh-selected");
        }
        cell.column.cellRender(cell, cell.column.initializeParameters);
    }
    renderWhenScrolled(absolute) {
        const changedX = this.optimizeRenderColumns();
        const st = this.element.scrollTop;
        const index = Math.min(this.maxFirstIndex, Math.floor(st / this.rowHeight));
        if (this.lastScrolledTop !== st) {
            this.bodyElement.scrollTop = st - this.rowHeight * index;
            this.lastScrolledTop = st;
        }
        if (absolute !== true) {
            if (this.firstIndex === index && changedX && changedX === this.lastChangedX)
                return;
        }
        for (let i = 0, il = this.rows.length; i < il; i++) {
            const row = this.rows[i];
            row.item = this.sortedItems[row.index = index + i];
            this.renderRow(row, changedX);
        }
        this.firstIndex = index;
        this.lastChangedX = changedX;
    }
    ;
    renderWhenResized() {
        const maxRowLen = Math.min(Math.max(0, Math.ceil(this.bodyElement.clientHeight / this.rowHeight || 0)) + 1, Math.max(1, this.sortedItems.length));
        if (this.rows.length !== maxRowLen) {
            for (let i = 0; i < maxRowLen; i++) {
                let row = this.rows[i];
                if (row == null) {
                    row = {
                        item: null,
                        index: -1,
                        id: i,
                        cache: {
                            _lv_selected: false,
                            _lv_oddEven: null,
                        },
                        cells: [],
                        element: (0, dom_utils_1.cloneElement)(this.cloneBase.rowElem),
                    };
                    (0, dom_utils_1.setStyleProps)(row.element, { visibility: "hidden" });
                    if (this.hasFillColumn)
                        (0, dom_utils_1.setStyleProps)(row.element, { minWidth: "100%" });
                    for (const col of this.columns) {
                        this.generateCell(row, col, row.element);
                    }
                    this.bodyElement.appendChild(row.element);
                    this.rows.push(row);
                }
            }
            ;
            this.disposeRows(maxRowLen);
        }
        this.lastScrolledLeft = -1;
        this.optimizeMaxFirstIndex();
        this.renderWhenScrolled();
        return true;
    }
    generateCell(row, col, rowElem) {
        const cell = {
            column: col,
            row: row,
            element: (0, dom_utils_1.cloneElement)(this.cloneBase.cellElem),
            contentElements: [],
            cache: {
                _lv_selected: false,
                _lv_initialized: false,
            },
        };
        if (col.rows) {
            cell.element.classList.add(`${exports.listViewClassName}-cell-m_s`);
            for (const colrow of col.rows) {
                const colrowElem = (0, dom_utils_1.setStyleProps)((0, dom_utils_1.cloneElement)(this.cloneBase.rowElem), {
                    flex: colrow.bodyHeightFlexRate,
                    width: "100%",
                    minHeight: "0px",
                });
                colrow.bodyClassName.forEach((cn) => colrowElem.classList.add(cn));
                for (const rowcol of colrow.columns) {
                    const ccell = this.generateCell(row, rowcol, colrowElem);
                    if (rowcol.fill)
                        ccell.element.classList.add("bh-fill");
                }
                if (colrow.body)
                    cell.element.appendChild(colrowElem);
            }
        }
        cell.element.setAttribute("data-name", col.name);
        if (col.fill)
            cell.element.classList.add("bh-fill");
        (0, dom_utils_1.setStyleProps)(cell.element, { width: `${col.width}px` });
        if (col.fixed) {
            cell.element.classList.add("bh-fixed");
            cell.element.style.left = col.fixedLeft + "px";
        }
        cell.element.classList.add(classname_utils_1.default.hAlign(col.textAlign ?? "left"));
        if (col.appearance === "anchor")
            cell.element.classList.add("bh-anchor");
        rowElem.appendChild(cell.element);
        col.cells.push(cell);
        row.cells.push(cell);
        cell.element.setAttribute("data-disabled", String(col.disabled === true));
        col.cellInitialize(cell, col.initializeParameters, this);
        this.addEvent(cell.element, "click", (e) => { this.cellClickedImpl(cell.row.item, cell.column, row.index, e.ctrlKey, e.shiftKey, e); });
        return cell;
    }
    optimizeMaxFirstIndex() {
        this.maxFirstIndex = Math.max(0, this.sortedItems.length - this.rows.length);
    }
    optimizeRenderColumns() {
        let sl = this.element.scrollLeft;
        if (this.lastScrolledLeft !== sl) {
            this.headerElement.scrollLeft = sl;
            this.footerElement.scrollLeft = sl;
            this.bodyElement.scrollLeft = sl;
            const cw = this.bodyElement.clientWidth;
            const sr = cw + sl + 10;
            this.lastScrolledLeft = sl;
            sl -= 10;
            this.renderColumns = [];
            this.columns.forEach((col) => {
                if (col.fixed) {
                    if (col.render = col.left < sr)
                        this.renderColumns.push(col);
                }
                else {
                    if (col.render = sl < col.left + col.width && col.left < sr)
                        this.renderColumns.push(col);
                }
            });
            return true;
        }
        return false;
    }
    optimizeRowNumberColumnWidth() {
        const width = Math.max(40, String(this.sortedItems.length).length * 10 + 12);
        if (width === this.rowNumberColumn.width)
            return;
        this.rowNumberColumn.width = this.rowNumberColumn.minWidth = width;
        this.rowNumberColumn.cells.forEach(cell => {
            cell.column.headerCellElement.style.width = cell.column.footerCellElement.style.width = cell.element.style.width = width + "px";
        });
        this.optimizeDummySize();
    }
    optimizeDummySize() {
        const elem = this.rows[0]?.element;
        if (elem == null)
            return;
        const rect = elem.getBoundingClientRect();
        (0, dom_utils_1.setStyleProps)(this.dummyElement, { width: (rect.width + this.dummyElement.offsetLeft) + "px" });
        const cols = [];
        this.columns.forEach(column => {
            if (column.fixed) {
                const e = column.cells[0].element;
                (0, dom_utils_1.setStyleProps)(e, { position: "relative" });
                e.style.removeProperty("left");
            }
        });
        this.columns.forEach(column => {
            const cellElem = column.cells[0].element;
            cols.push({ left: Math.round(cellElem.getBoundingClientRect().left - rect.left + this.lastScrolledLeft), column });
        });
        let fixedLeft = 0;
        let minLeft = cols[0].left || 0;
        cols.sort((item1, item2) => item1.left - item2.left).forEach((item) => {
            item.column.left = item.left - minLeft;
            item.column.fixedLeft = fixedLeft;
            if (item.column.fixed) {
                (0, dom_utils_1.setStyleProps)(item.column.cells[0].element, { position: "sticky" });
                const prop = { left: fixedLeft + "px" };
                (0, dom_utils_1.setStyleProps)(item.column.headerCellElement, prop);
                (0, dom_utils_1.setStyleProps)(item.column.footerCellElement, prop);
                for (const cell of item.column.cells) {
                    (0, dom_utils_1.setStyleProps)(cell.element, prop);
                }
                fixedLeft += item.column.width;
            }
        });
    }
    disposeRows(maxRowLen) {
        const len = maxRowLen || 0;
        for (let i = this.rows.length - 1; i >= len; i--) {
            const row = this.rows[i];
            for (const cell of row.cells) {
                this.removeEvent(cell.element);
                if (cell.column.cellDispose) {
                    cell.column.cellDispose(cell, this);
                }
                cell.column.cells.pop();
            }
            this.removeEvent(row.element);
            this.bodyElement.removeChild(row.element);
            this.rows.pop();
        }
    }
    findColumn(func) {
        let ret = null;
        const search = (columns) => {
            for (const column of columns) {
                if (func(column))
                    ret = column;
                if (ret != null)
                    return;
                if (column.rows) {
                    for (const colrow of column.rows) {
                        search(colrow.columns);
                    }
                }
                if (ret != null)
                    return;
            }
        };
        search(this.columns);
        return ret;
    }
    findFirstColumn() {
        let retColumn = null;
        const func = (columns) => {
            if (columns == null)
                return;
            for (let i = 0, il = columns.length; i < il; i++) {
                const col = columns[i];
                if (col.tabStop) {
                    retColumn = col;
                    return;
                }
                if (col.rows) {
                    for (const colrow of col.rows) {
                        func(colrow.columns);
                    }
                }
                if (retColumn)
                    return;
            }
        };
        func(this.columns);
        return retColumn;
    }
    findLastColumn() {
        let retColumn = null;
        const func = (columns) => {
            if (columns == null)
                return;
            for (let i = columns.length - 1; i >= 0; i--) {
                const col = columns[i];
                if (col.rows) {
                    for (const colrow of col.rows) {
                        func(colrow.columns);
                    }
                }
                if (retColumn)
                    return;
                if (col.tabStop) {
                    retColumn = col;
                    return;
                }
            }
        };
        func(this.columns);
        return retColumn;
    }
    findPrevColumn(columnName) {
        let retColumn = null, nextRow = false;
        if (this.columns.length === 0)
            return { column: retColumn, nextRow };
        const colName = columnName ?? this.findLastColumn()?.name;
        let found = false;
        const func = (columns) => {
            if (columns == null)
                return;
            for (let i = columns.length - 1; i >= 0; i--) {
                const col = columns[i];
                if (col.rows) {
                    for (let j = col.rows.length - 1; j >= 0; j--) {
                        const colrow = col.rows[j];
                        func(colrow.columns);
                        if (retColumn)
                            return;
                    }
                }
                if (col.name === colName) {
                    found = true;
                    continue;
                }
                if (!found || !col.tabStop)
                    continue;
                retColumn = col;
                return;
            }
        };
        func(this.columns);
        if (nextRow = !retColumn)
            func(this.columns);
        return { column: retColumn, nextRow };
    }
    findNextColumn(columnName) {
        let retColumn = null, nextRow = false;
        if (this.columns.length === 0)
            return { column: retColumn, nextRow };
        const colName = columnName ?? this.findFirstColumn()?.name;
        let found = false;
        const func = (columns) => {
            if (columns == null)
                return;
            for (let i = 0, il = columns.length; i < il; i++) {
                const col = columns[i];
                if (col.name === colName) {
                    found = true;
                    if (col.rows) {
                        for (const colrow of col.rows) {
                            func(colrow.columns);
                            if (retColumn)
                                return;
                        }
                    }
                    continue;
                }
                if (!found || !col.tabStop) {
                    if (col.rows) {
                        for (const colrow of col.rows) {
                            func(colrow.columns);
                            if (retColumn)
                                return;
                        }
                    }
                    continue;
                }
                retColumn = col;
                return;
            }
        };
        func(this.columns);
        if (nextRow = !retColumn)
            func(this.columns);
        return { column: retColumn, nextRow };
    }
    disposeColumns() {
        const impl = (columns) => {
            for (let i = columns.length - 1; i >= 0; i--) {
                const column = columns[i];
                if (column.rows) {
                    for (const colrow of column.rows) {
                        impl(colrow.columns);
                    }
                }
                this.removeEvent(column.headerCellElement);
                this.removeEvent(column.footerCellElement);
                this.removeEvent(column.resizeElement);
                if (column.cellDispose) {
                    for (const cell of column.cells) {
                        column.cellDispose(cell, this);
                    }
                }
                column.dispose?.(this);
                columns.pop();
            }
        };
        impl(this.columns);
        this.headerRowElement.textContent = "";
        this.footerRowElement.textContent = "";
    }
    bindColumns(columns) {
        this.disposeColumns();
        this.disposeRows();
        if (columns == null) {
            this.buildColumns();
            return;
        }
        let hasFill = false;
        for (const col of columns) {
            const fill = hasFill === false && col.fill === true;
            if (fill)
                hasFill = true;
            this.columns.push(this.bindColumn(col, fill));
        }
        this.buildColumns();
    }
    bindColumn(col, fill) {
        let width = col.width ?? 100;
        if (width < 0)
            width = this.rowHeight;
        const dataType = col.dataType || "string";
        let rows = null;
        if (col._rows) {
            rows = [];
            for (const row of col._rows) {
                const cols = [];
                let hasFill = false;
                for (let i = 0, il = row.columns.length; i < il; i++) {
                    const rowcol = row.columns[i];
                    let fill = hasFill === false && rowcol.fill === true;
                    if (fill)
                        hasFill = true;
                    else if (i === il - 1 && !hasFill)
                        hasFill = fill = true;
                    const rowcolumn = this.bindColumn(rowcol, fill);
                    if (fill) {
                        rowcolumn.headerCellElement.style.flex = "1";
                        rowcolumn.footerCellElement.style.flex = "1";
                    }
                    if (row.body === false) {
                        if (rowcol.sort == null)
                            rowcolumn.sort = null;
                        rowcolumn.tabStop = false;
                    }
                    cols.push(rowcolumn);
                }
                rows.push({
                    columns: cols,
                    header: row.header !== false,
                    headerHeightFlexRate: row.headerHeightFlexRate ?? 1,
                    headerClassName: row.headerClassName == null ? [] : (typeof row.headerClassName === "string" ? [row.headerClassName] : row.headerClassName),
                    footer: row.footer !== false,
                    footerHeightFlexRate: row.footerHeightFlexRate ?? 1,
                    footerClassName: row.footerClassName == null ? [] : (typeof row.footerClassName === "string" ? [row.footerClassName] : row.footerClassName),
                    body: row.body !== false,
                    bodyHeightFlexRate: row.bodyHeightFlexRate ?? 1,
                    bodyClassName: row.bodyClassName == null ? [] : (typeof row.bodyClassName === "string" ? [row.bodyClassName] : row.bodyClassName),
                });
            }
        }
        const column = {
            prop: col,
            name: col.name,
            label: col.label || col.name,
            dataType,
            width,
            minWidth: width,
            cells: [],
            headerCellElement: (0, dom_utils_1.cloneElement)(this.cloneBase.cellElem),
            footerCellElement: (0, dom_utils_1.cloneElement)(this.cloneBase.cellElem),
            initializeParameters: col.initialize == null ? null : col.initialize(col, this),
            dispose: col.dispose,
            cellInitialize: col._rows == null ? (col.cellInitialize == null ? (cell) => {
                const labelElem = (0, dom_utils_1.cloneElement)(this.cloneBase.labelCellElem);
                cell.contentElements.push(labelElem);
                cell.element.appendChild(labelElem);
            } : col.cellInitialize) : (col.cellInitialize == null ? () => { } : col.cellInitialize),
            cellDispose: col.cellDispose,
            cellRender: col.cellRender == null ? ({ contentElements, row, cache }) => {
                if (cache.val !== row.item.data[column.name]) {
                    contentElements[0].textContent = cache.val = row.item.data[column.name];
                }
            } : col.cellRender,
            textAlign: col.cellTextAlign || (dataType === "number" ? "right" : "left"),
            appearance: col.appearance || "label",
            sort: typeof col.sort === "function" ? col.sort : (col.sort === false || col._rows != null ? null : (order) => {
                if (order === "") {
                    return () => 0;
                }
                const num = order === "asc" ? 1 : -1;
                return (itemData1, itemData2) => {
                    if (column.dataType === "number") {
                        return Number(itemData1.data[column.name]) > Number(itemData2.data[column.name]) ? -num : num;
                    }
                    return itemData1.data[column.name] > itemData2.data[column.name] ? num : -num;
                };
            }),
            sortOrder: "",
            resize: col.resize !== false && !fill && col._rows == null,
            fill,
            fixed: col.fixed === true,
            fixedLeft: 0,
            left: 0,
            tabStop: col.tabStop !== false && col._rows == null,
            notScrollFocusWhenTabStop: col.notScrollFocusWhenTabStop === true,
            disabled: col.disabled === true,
            render: true,
            headerCellClicked: col.clickedHeaderCell,
            footerCellClicked: col.clickedFooterCell,
            cellClicked: col.clickedCell,
            rowClicked: col.clickedRow,
            preventClearSelected: col._preventClearSelected === true,
            bindedItems: col.bindedItems,
            rowDataInitialize: col.rowDataInitialize,
            rows,
            beginEdit: col._beginEdit,
            endEdit: col._endEdit,
            editedRowData: col.editedRowData,
        };
        column.rows?.forEach(colrow => {
            colrow.columns?.forEach(rowcol => {
                rowcol.parent = column;
            });
        });
        return column;
    }
    buildColumns() {
        if (this.rowNumber) {
            if (this.findColumn((col) => col.name === this.rowNumberColumn.name) == null) {
                this.columns.unshift(this.rowNumberColumn);
                this.optimizeRowNumberColumnWidth();
            }
        }
        else {
            for (let i = 0, il = this.columns.length; i < il; i++) {
                if (this.columns[i].name !== this.rowNumberColumn.name)
                    continue;
                this.columns.splice(i, 1);
                break;
            }
        }
        let hasFill = false;
        for (const column of this.columns) {
            hasFill = hasFill || column.fill;
            this.buildColumn(column, { header: this.headerRowElement, footer: this.footerRowElement });
        }
        this.hasFillColumn = hasFill;
        if (this.hasFillColumn) {
            const prop = { minWidth: "100%" };
            (0, dom_utils_1.setStyleProps)(this.headerRowElement, prop);
            (0, dom_utils_1.setStyleProps)(this.footerRowElement, prop);
            this.rows.forEach(row => {
                (0, dom_utils_1.setStyleProps)(row.element, prop);
            });
        }
        else {
            this.headerRowElement.style.removeProperty("min-width");
            this.footerRowElement.style.removeProperty("min-width");
            this.rows.forEach(row => {
                row.element.style.removeProperty("min-width");
            });
        }
        this.renderColumns = [];
        this.renderWhenResized();
        this.lastScrolledLeft = -1;
        this.optimizeRenderColumns();
        this.optimizeDummySize();
    }
    buildColumn(column, element) {
        if (column.rows) {
            column.headerCellElement.classList.add(`${exports.listViewClassName}-cell-m_s`);
            column.footerCellElement.classList.add(`${exports.listViewClassName}-cell-m_s`);
            for (const row of column.rows) {
                let width = 0;
                const hrowElem = (0, dom_utils_1.cloneElement)(this.cloneBase.rowElem, { flex: row.headerHeightFlexRate });
                row.headerClassName.forEach((cn) => hrowElem.classList.add(cn));
                const frowElem = (0, dom_utils_1.cloneElement)(this.cloneBase.rowElem, { flex: row.footerHeightFlexRate });
                row.footerClassName.forEach((cn) => frowElem.classList.add(cn));
                for (const col of row.columns) {
                    col.resize = false;
                    this.buildColumn(col, { header: hrowElem, footer: frowElem });
                    width += col.width;
                }
                if (row.header)
                    column.headerCellElement.appendChild(hrowElem);
                if (row.footer)
                    column.footerCellElement.appendChild(frowElem);
                column.width = Math.max(0, width, column.width);
            }
        }
        else {
            column.headerCellLabelElement = (0, dom_utils_1.cloneElement)(this.cloneBase.div, `${exports.listViewClassName}-lbl`);
            column.headerCellElement.appendChild(column.headerCellLabelElement);
            if (column.prop?.headerCellLabel) {
                if (typeof column.prop.headerCellLabel === "string")
                    column.headerCellLabelElement.textContent = column.prop.headerCellLabel;
                else
                    column.headerCellRender = column.prop.headerCellLabel;
            }
            column.headerCellElement.classList.add(classname_utils_1.default.hAlign(column.prop?.headerCellTextAlign ?? "center"));
            column.footerCellLabelElement = (0, dom_utils_1.cloneElement)(this.cloneBase.div, `${exports.listViewClassName}-lbl`);
            column.footerCellElement.appendChild(column.footerCellLabelElement);
            if (column.prop?.footerCellLabel) {
                if (typeof column.prop.footerCellLabel === "string")
                    column.footerCellLabelElement.textContent = column.prop.footerCellLabel;
                else
                    column.footerCellRender = column.prop.footerCellLabel;
            }
            column.footerCellElement.classList.add(classname_utils_1.default.hAlign(column.prop?.footerCellTextAlign ?? "center"));
        }
        column.headerCellElement.setAttribute("data-name", column.name);
        (0, dom_utils_1.setStyleProps)(column.headerCellElement, { width: column.width + "px" });
        column.footerCellElement.setAttribute("data-name", column.name);
        (0, dom_utils_1.setStyleProps)(column.footerCellElement, { width: column.width + "px" });
        if (column.fill) {
            column.headerCellElement.classList.add("bh-fill");
            column.footerCellElement.classList.add("bh-fill");
        }
        if (column.fixed) {
            column.headerCellElement.classList.add("bh-fixed");
            column.footerCellElement.classList.add("bh-fixed");
        }
        element.header.appendChild(column.headerCellElement);
        element.footer.appendChild(column.footerCellElement);
        column.prop?.headerCellInitialize?.(column, column.initializeParameters);
        column.prop?.footerCellInitialize?.(column, column.initializeParameters);
        if (column.sort != null) {
            column.sortElement = (0, dom_utils_1.cloneElement)(this.cloneBase.div);
            column.sortElement.classList.add(`${exports.listViewClassName}-sort-icon`);
            column.headerCellElement.appendChild(column.sortElement);
            this.addEvent(column.headerCellElement, "click", () => {
                const curSortOrder = column.sortOrder;
                const removeOrder = (columns) => {
                    for (const col of columns) {
                        col.sortOrder = "";
                        col.sortElement?.classList.remove("bh-asc", "bh-desc");
                        if (col.rows) {
                            for (const colrow of col.rows) {
                                removeOrder(colrow.columns);
                            }
                        }
                    }
                };
                removeOrder(this.columns);
                switch (curSortOrder) {
                    case "asc":
                        column.sortOrder = "desc";
                        column.sortElement.classList.add(`bh-${column.sortOrder}`);
                        break;
                    case "desc":
                        column.sortOrder = "";
                        break;
                    default:
                        column.sortOrder = "asc";
                        column.sortElement.classList.add(`bh-${column.sortOrder}`);
                        break;
                }
                this.sortItems();
                this.renderWhenScrolled();
                if (this.sorted)
                    this.sorted(column.name, column.sortOrder, column.prop);
            });
        }
        if (column.resize !== false) {
            column.resizeElement = (0, dom_utils_1.cloneElement)(this.cloneBase.div, `${exports.listViewClassName}-resizer`);
            column.headerCellElement.appendChild(column.resizeElement);
            this.addEvent(column.resizeElement, "mousedown", (e) => {
                this.endEdit(true);
                e.stopPropagation();
                const lastPos = e.currentTarget.offsetLeft, pos = e.clientX;
                const move = (e) => {
                    column.width = e.clientX - pos + lastPos;
                    (0, dom_utils_1.setStyleProps)(column.headerCellElement, { width: column.width + "px" });
                };
                (0, dom_utils_1.setCursor)("col-resize");
                const end = () => {
                    this.removeEvent(window, "mousemove", move);
                    this.removeEvent(window, "mouseup", end);
                    for (const cell of column.cells) {
                        (0, dom_utils_1.setStyleProps)(cell.element, { width: column.width + "px" });
                    }
                    (0, dom_utils_1.setStyleProps)(column.footerCellElement, { width: column.width + "px" });
                    (0, dom_utils_1.releaseCursor)();
                    this.optimizeDummySize();
                };
                this.addEvent(window, "mouseup", end, { passive: true });
                this.addEvent(window, "mousemove", move, { passive: true });
            });
        }
        const renderCells = () => {
            for (const cell of column.cells) {
                if (cell.row.item == null)
                    continue;
                this.renderCell(cell);
            }
            this.renderHeaderCells();
            this.renderFooterCells();
        };
        if (column.headerCellClicked) {
            this.addEvent(column.headerCellElement, "click", () => {
                column.headerCellClicked(column.name, this.sortedItems, renderCells);
            });
        }
        if (column.footerCellClicked) {
            this.addEvent(column.footerCellElement, "click", () => {
                column.footerCellClicked(column.name, this.sortedItems, renderCells);
            });
        }
    }
    setColumns(columns) {
        this.bindColumns(columns);
        return this;
    }
    columnForEach(func) {
        const impl = (columns) => {
            let ret = true;
            for (const column of columns) {
                ret = func(column) !== false && ret;
                if (!ret)
                    break;
                if (column.rows) {
                    for (const colrow of column.rows) {
                        ret = impl(colrow.columns) !== false && ret;
                        if (!ret)
                            break;
                    }
                }
                if (!ret)
                    break;
            }
            return ret;
        };
        impl(this.columns);
    }
    bindItems(items) {
        this.originItems = [];
        this.bindingItems = [];
        this.filteredItems = [];
        this.selectedRows = {};
        this.lastSelectedCell = null;
        this.lastSelectedBaseCell = null;
        if (items == null)
            return;
        this.originItems = items;
        for (let i = 0, il = this.originItems.length; i < il; i++) {
            this.bindingItems.push({
                data: this.originItems[i],
                id: i,
                rowSelected: false,
                cellSelected: {},
            });
        }
        this.executeColumnBindedItems();
        this.colCallBindedRev = ++this.itemsCallBindedRev;
        this.filterItems();
    }
    executeColumnBindedItems() {
        const callColumns = (columns) => {
            columns.forEach(col => {
                col.rows?.forEach(colrow => {
                    callColumns(colrow.columns);
                });
                col.bindedItems?.(this.originItems);
            });
        };
        callColumns(this.columns);
    }
    filterItems() {
        this.clearSelectedRows();
        if (this.filter == null)
            this.filteredItems = this.bindingItems.concat();
        else
            this.filteredItems = this.bindingItems.filter((item) => this.filter(item.data));
        if (this.filtered)
            this.filtered(this.filteredItems);
        this.sortItems();
    }
    sortItems() {
        this.sortedItems = this.filteredItems.concat();
        if (!this.externalSort) {
            if (this.sort != null)
                this.sortedItems.sort(this.sort);
            const sortCol = this.findColumn((col) => col.sortOrder !== "");
            if (sortCol != null)
                this.sortedItems.sort(sortCol.sort(sortCol.sortOrder));
        }
        (0, dom_utils_1.setStyleProps)(this.dummyElement, { height: (this.sortedItems.length * this.rowHeight + (this.headerVisible ? this.headerHeight : 0) + (this.footerVisible ? this.footerHeight : 0) + this.dummyElement.offsetTop) + "px" });
        this.optimizeRowNumberColumnWidth();
        this.lastScrolledLeft = -1;
        this.optimizeRenderColumns();
        this.scrollingMode = "stop";
    }
    setItems(items) {
        this.bindItems(items);
        this.firstIndex = -1;
        this.bodyElement.scrollTop = 0;
        this.maxFirstIndex = Math.max(0, this.sortedItems.length - this.rows.length);
        this.optimizeDummySize();
        this.lastScrolledLeft = -1;
        this.render();
        return this;
    }
    cellClickedImpl(item, column, index, ctrlKey, shiftKey, e) {
        if (column.rows != null)
            return;
        if (this.selectMode === "cell" && !column.tabStop)
            return;
        const lst = this.element.scrollTop;
        this.scrollToColumn(column);
        this.scrollToIndex(index);
        const impl = () => {
            let selected = true, edit = false;
            if (ctrlKey && this.multiSelect) {
                if (this.selectMode === "row") {
                    item.cellSelected = {};
                    if (item.rowSelected === true) {
                        selected = item.rowSelected = false;
                        delete this.selectedRows[item.id];
                    }
                    else {
                        selected = item.rowSelected = item.cellSelected[column.name] = true;
                        this.selectedRows[item.id] = item;
                    }
                }
                else {
                    if (item.cellSelected[column.name] === true) {
                        delete item.cellSelected[column.name];
                        if (Object.keys(item.cellSelected).length === 0) {
                            delete this.selectedRows[item.id];
                            item.rowSelected = false;
                        }
                        selected = false;
                    }
                    else {
                        selected = item.rowSelected = item.cellSelected[column.name] = true;
                        this.selectedRows[item.id] = item;
                    }
                }
            }
            else if (shiftKey && this.multiSelect && this.lastSelectedBaseCell != null) {
                this.clearSelectedRows();
                selected = item.cellSelected[column.name] = true;
                this.rangeSelectRow(item, column, index);
            }
            else {
                if (item.cellSelected[column.name] === true)
                    edit = true;
                if (this.multiSelect) {
                    if (column.preventClearSelected) {
                        if (this.selectedRows[item.id] == null) {
                            this.clearSelectedRows();
                        }
                    }
                    else {
                        this.clearSelectedRows();
                    }
                }
                else {
                    this.clearSelectedRows();
                }
                selected = item.rowSelected = item.cellSelected[column.name] = true;
                this.selectedRows[item.id] = item;
            }
            this.lastSelectedCell = { index, item, column };
            if (!shiftKey || this.lastSelectedBaseCell == null)
                this.lastSelectedBaseCell = { index, item, column };
            const params = {
                data: item.data,
                id: item.id,
                rowNumber: index + 1,
                columnName: column?.name,
                columnLabel: column?.label,
                columnWidth: column?.width,
                originItems: this.originItems,
                selectMode: this.selectMode,
                selected,
                getSelectedRows: () => this.getSelectedRows(),
                getSelectedCells: () => this.getSelectedCells(),
            };
            let rebind = false, rhc = false, rhcs = false, rfc = false, rfcs = false, rc = false, rcs = false, rr = false, r = false;
            const setRet = (ret) => {
                if (ret == null)
                    return;
                const retF = ret;
                rebind = rebind || retF.rebind === true;
                rhc = rhc || retF.renderHeaderCell === true;
                rhcs = rhcs || retF.renderHeaderCells === true;
                rfc = rfc || retF.renderFooterCell === true;
                rfcs = rfcs || retF.renderFooterCells === true;
                rc = rc || retF.renderCell === true;
                rcs = rcs || retF.renderCells === true;
                rr = rr || retF.renderRow === true;
                r = r || retF.render === true;
            };
            if (this.cellClicked)
                setRet(this.cellClicked(params, e));
            if (column?.cellClicked)
                setRet(column.cellClicked(params, e));
            if (this.rowClicked)
                setRet(this.rowClicked(params, e));
            for (const col of this.columns) {
                if (col.rowClicked)
                    setRet(col.rowClicked(params, e));
            }
            if (rebind) {
                this.bindItems(this.originItems);
            }
            else if (r) {
                this.render();
            }
            else {
                if (rhcs)
                    this.renderHeaderCells();
                else if (rhc && column.headerCellRender)
                    column.headerCellRender(column.headerCellLabelElement, this.sortedItems, this.originItems);
                if (rfcs)
                    this.renderFooterCells();
                else if (rfc && column.footerCellRender)
                    column.footerCellRender(column.footerCellLabelElement, this.sortedItems, this.originItems);
                if (rr)
                    this.renderRow(this.rows[index - this.firstIndex]);
                if (rcs) {
                    for (const c of column.cells) {
                        this.renderCell(c);
                    }
                }
                if (!rr && !rcs && rc)
                    this.renderCell(column.cells[index - this.firstIndex]);
            }
            this.renderWhenScrolled();
            if (edit && !column.disabled)
                this.beginEdit(item, column, index);
        };
        if (lst === this.element.scrollTop) {
            impl();
        }
        else {
            const listener = () => {
                if (this.element.scrollTop === this.lastScrolledTop) {
                    impl();
                    return;
                }
                setTimeout(() => listener(), 10);
            };
            listener();
        }
    }
    beginEditLastSelectedCell(lastScrollTop) {
        if (this.lastSelectedCell.column == null)
            return;
        let lst = lastScrollTop;
        if (lst == null) {
            lst = this.element.scrollTop;
            this.scrollToColumn(this.lastSelectedCell.column);
            this.scrollToIndex(this.lastSelectedCell.index);
        }
        if (lst === this.element.scrollTop) {
            this.beginEdit(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index);
        }
        else {
            const listener = () => {
                if (this.element.scrollTop === this.lastScrolledTop) {
                    this.beginEdit(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index);
                    return;
                }
                setTimeout(() => listener(), 10);
            };
            listener();
        }
    }
    beginEdit(item, column, index) {
        if (!column.beginEdit || column.disabled === true) {
            this.endEdit(false);
            return;
        }
        const row = this.rows[index - this.firstIndex];
        if (row == null)
            return;
        const cell = row.cells.find((cell) => cell.column.name === column.name);
        if (cell == null)
            return;
        const rect = cell.element.getBoundingClientRect();
        this.editElement.style.removeProperty("display");
        (0, dom_utils_1.setStyleProps)(this.editElement, {
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            height: `${rect.height - (cell.element.offsetHeight - cell.element.clientHeight)}px`,
            width: `${rect.width - (cell.element.offsetWidth - cell.element.clientWidth)}px`,
            visibility: "visible",
        });
        this.editTarget = { item, column, index };
        let end = false;
        const argEndEdit = (commit) => {
            end = true;
            setTimeout(() => {
                this.endEdit(commit);
            }, 0);
        };
        column.beginEdit({
            target: { data: item.data, columnName: column.name, index, id: item.id },
            editElement: this.editElement,
            endEdit: argEndEdit,
            cell,
            styleCtx: this.styleCtx,
        });
        this.endEditEventListener = () => { this.endEdit(true); };
        this.addEvent(this.element, "mousedown", this.endEditEventListener);
        if (end)
            this.endEdit(false);
        else
            this.editElement.focus();
    }
    endEdit(commit) {
        if (this.endEditEventListener) {
            this.removeEvent(this.element, "mousedown", this.endEditEventListener);
            this.endEditEventListener = null;
        }
        if (this.editTarget == null)
            return;
        if (this.editTarget.column?.endEdit) {
            const ret = this.editTarget.column.endEdit({ data: this.editTarget.item.data, columnName: this.editTarget.column.name, index: this.editTarget.index, id: this.editTarget.item.id }, commit, this.editElement);
            if (commit !== false) {
                if (ret == null) {
                    this.renderCell(this.editTarget.column.cells[this.editTarget.index - this.firstIndex]);
                }
                for (const col of this.columns) {
                    if (col === this.editTarget.column)
                        continue;
                    if (col.editedRowData) {
                        col.editedRowData(this.editTarget.item.data);
                        this.renderCell(col.cells[this.editTarget.index - this.firstIndex]);
                    }
                }
                this.renderHeaderCells();
                this.renderFooterCells();
            }
        }
        this.editMaskElement.style.display = "none";
        this.editElement.style.display = "none";
        this.editTarget = null;
        this.element.focus();
    }
    getValue() {
        return this.originItems;
    }
    getFilteredValue() {
        return [...this.filteredItems];
    }
    getSortedValue() {
        return [...this.sortedItems];
    }
    getLength() {
        return this.originItems.length;
    }
    getFilteredLength() {
        return this.filteredItems.length;
    }
    select(rowIndex, columnName) {
        if (this.selectMode === "none" || rowIndex == null)
            return;
        const item = this.sortedItems[rowIndex];
        if (item == null)
            return;
        this.clearSelectedRows();
        let column = null;
        if (this.selectMode === "row") {
            item.rowSelected = true;
            this.selectedRows[item.id] = item;
        }
        else {
            column = this.findColumn((col) => col.name === columnName) ?? this.columns[0];
            item.cellSelected[column.name] = true;
            this.selectedRows[item.id] = item;
        }
        this.lastSelectedCell = { index: rowIndex, item, column };
        this.lastSelectedBaseCell = { index: rowIndex, item, column };
        this.scrollToIndex(rowIndex, false);
        if (column)
            this.scrollToColumn(column, false);
        this.renderWhenScrolled();
    }
    clearSelect() {
        this.clearSelectedRows(true);
    }
    getSelectedRows() {
        const rets = [];
        Object.keys(this.selectedRows).forEach((id) => {
            const item = this.selectedRows[id];
            rets.push({
                id: item.id,
                data: item.data,
            });
        });
        return rets;
    }
    getSelectedCells() {
        const rets = [];
        Object.keys(this.selectedRows).forEach((id) => {
            const item = this.selectedRows[id];
            Object.keys(item.cellSelected).forEach((columnName) => {
                rets.push({
                    id: item.id,
                    data: item.data,
                    columnName,
                });
            });
        });
        return rets;
    }
    focus() {
        this.element.focus();
        return this;
    }
    getElement() {
        return this.element;
    }
    getBodyElement() {
        return this.bodyElement;
    }
    getRowHeight() {
        return this.rowHeight;
    }
    getDisplayedFirstRowIndex() {
        return this.firstIndex;
    }
    getBodyScrollTop() {
        return this.bodyElement.scrollTop;
    }
    clearSpaceRow() {
        for (const row of this.rows) {
            row.element.style.removeProperty("margin-top");
            row.element.style.removeProperty("margin-bottom");
            row.element.style.removeProperty("display");
            row.element.style.removeProperty("opacity");
        }
        return this;
    }
    startScrollContinue(order, interval, startCallback, endCallback) {
        if (this.scrollingMode === order) {
            if (endCallback)
                endCallback("already");
            return;
        }
        this.stopScrollContinue();
        setTimeout(() => {
            this.scrollingMode = order;
            this.scrollingInterval = interval ?? 100;
            this.scrollingId++;
            this.scrollContinue(endCallback);
            if (startCallback)
                startCallback(this.scrollingInterval);
        }, this.scrollingInterval + 1);
    }
    stopScrollContinue() {
        this.scrollingMode = "stop";
    }
    scrollContinue(endCallback) {
        const triger = this.scrollingId;
        setTimeout(() => {
            if (triger !== this.scrollingId || this.scrollingMode === "stop") {
                if (endCallback)
                    endCallback("stop");
                return;
            }
            const st = this.element.scrollTop;
            if (this.scrollingMode === "up")
                this.element.scrollTop = this.element.scrollTop - this.rowHeight;
            else
                this.element.scrollTop = this.element.scrollTop + this.rowHeight;
            if (st === this.element.scrollTop) {
                if (endCallback)
                    endCallback("over");
                return;
            }
            this.scrollContinue(endCallback);
        }, this.scrollingInterval);
    }
    dragMovingRow(dragingRowIndex, top) {
        if (top < this.bodyElement.scrollTop)
            this.startScrollContinue("up");
        else if (top > this.bodyElement.clientHeight - this.rowHeight + this.bodyElement.scrollTop)
            this.startScrollContinue("down");
        else
            this.stopScrollContinue();
        let rindex = Math.round(top / this.rowHeight);
        const isUpper = rindex < 0 ? true : top - rindex * this.rowHeight < 0;
        rindex += this.firstIndex;
        const dragingRow = this.rows[dragingRowIndex - this.firstIndex];
        this.clearSpaceRow();
        if (dragingRow) {
            if (rindex === dragingRowIndex) {
                (0, dom_utils_1.setStyleProps)(dragingRow.element, { opacity: 0.5 });
                return;
            }
            (0, dom_utils_1.setStyleProps)(dragingRow.element, { display: "none" });
        }
        let rid = rindex - this.firstIndex;
        if (rid <= 0) {
            const row = this.rows[0];
            row.element.style.marginTop = this.rowHeight + "px";
            return;
        }
        if (rid >= this.rows.length - 1) {
            const row = this.rows[this.rows.length - 1];
            row.element.style.marginBottom = this.rowHeight + "px";
            return;
        }
        if (dragingRow && rindex > dragingRowIndex)
            rid += 1;
        if (!isUpper)
            rid -= 1;
        const row = this.rows[rid];
        if (row == null)
            return this;
        if (isUpper) {
            row.element.style.removeProperty("margin-bottom");
            row.element.style.marginTop = this.rowHeight + "px";
        }
        else {
            row.element.style.removeProperty("margin-top");
            row.element.style.marginBottom = this.rowHeight + "px";
        }
        return this;
    }
    dropMoveRow(dragingRowIndex, top) {
        this.clearSpaceRow();
        this.stopScrollContinue();
        let ridx = Math.round(top / this.rowHeight) + this.firstIndex;
        let sup = false;
        if (sup = dragingRowIndex < this.firstIndex)
            ridx -= 1;
        let srcIdx = Math.min(Math.max(0, dragingRowIndex), this.sortedItems.length - 1), dstIdx = Math.min(Math.max(0, ridx), this.sortedItems.length - 1);
        if (srcIdx === dstIdx)
            return this;
        const isLower = (top % this.rowHeight) < (this.rowHeight / 2), moveToBottom = srcIdx < dstIdx;
        if (moveToBottom) {
            if (isLower)
                dstIdx += 1;
        }
        else {
            if (!isLower)
                dstIdx -= 1;
        }
        const srcItem = this.sortedItems[srcIdx].data;
        const dstItem = this.sortedItems[dstIdx].data;
        const oSrcIdx = Math.min(Math.max(0, this.originItems.findIndex(item => item === srcItem)), this.originItems.length - 1);
        let oDstIdx = this.originItems.findIndex(item => item === dstItem);
        if (moveToBottom) {
            if (isLower)
                oDstIdx -= 1;
        }
        else {
            if (!isLower)
                oDstIdx += 1;
        }
        oDstIdx = Math.min(Math.max(0, oDstIdx), this.originItems.length - 1);
        this.originItems.splice(oSrcIdx, 1);
        this.originItems.splice(oDstIdx, 0, srcItem);
        if (dstIdx === this.sortedItems.length - 1)
            this.element.scrollTop = this.element.scrollTop + this.rowHeight;
        else if (sup)
            this.element.scrollTop = this.element.scrollTop - this.rowHeight;
        this.bindItems(this.originItems);
        this.renderWhenScrolled();
        return this;
    }
    renderByOriginData(originData, callEditedRowData) {
        if (callEditedRowData === true) {
            if (originData == null)
                return this;
            const search = (columns) => {
                for (const column of columns) {
                    if (column.editedRowData)
                        column.editedRowData(originData);
                    if (column.rows) {
                        for (const colrow of column.rows) {
                            search(colrow.columns);
                        }
                    }
                }
            };
            search(this.columns);
        }
        const row = this.rows.find((r) => r.item.data === originData);
        if (row != null)
            this.renderRow(row);
        return this;
    }
    setStyleContext(ctx) {
        this.styleCtx = ctx;
        return this;
    }
}
exports.$ListView = $ListView;
;
const cnIptPrefix = input_column_1.listViewInputColumnClassName;
const createListViewEditColumnElement = () => {
    const wrapElem = document.createElement("div");
    wrapElem.classList.add(`${cnIptPrefix}-wrap`);
    const lblElem = document.createElement("div");
    lblElem.classList.add(`${exports.listViewClassName}-lbl`);
    return { wrapElem, lblElem };
};
exports.createListViewEditColumnElement = createListViewEditColumnElement;
const cloneListViewEditColumnElement = (elems) => {
    return {
        wrapElem: (0, dom_utils_1.cloneElement)(elems.wrapElem),
        lblElem: (0, dom_utils_1.cloneElement)(elems.lblElem),
    };
};
exports.cloneListViewEditColumnElement = cloneListViewEditColumnElement;
exports.ListViewStyle = react_1.default.createElement(style_1.default, { id: exports.listViewClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewClassName}-wrap {
  box-sizing: border-box;
  position: relative;
}
${style_1.CssPV.fitToOuter(`${exports.listViewClassName}-wrap`)}
.${exports.listViewClassName} {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
  outline: none;
}
.${exports.listViewClassName}-row {
  ${style_1.CssPV.flex_r}
  flex: none;
}
.${exports.listViewClassName}-cell {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: ${style_1.CssVar.lv.b.bg.c};
}
.${exports.listViewClassName}-cell.bh-fixed {
  position: sticky;
  z-index: 1;
}
.${exports.listViewClassName}-cell.bh-fill {
  flex: 1;
}
.${exports.listViewClassName}-lbl {
  box-sizing: border-box;
  position: relative;
  display: block;
  max-height: 100%;
  max-width: 100%;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 5px 0px 5px;
}
.${exports.listViewClassName}-cell.bh-h-l .${exports.listViewClassName}-lbl {
  text-align: left;
}
.${exports.listViewClassName}-cell.bh-h-c .${exports.listViewClassName}-lbl {
  text-align: center;
}
.${exports.listViewClassName}-cell.bh-h-r .${exports.listViewClassName}-lbl {
  text-align: right;
}
.${exports.listViewClassName}-body-dummy {
  box-sizing: border-box;
  position: absolute;
  z-index: 0;
  top: 0px;
  left: 0px;
  background-color: transparent;
  visibility: hidden;
  flex: none;
}
.${exports.listViewClassName}-header,
.${exports.listViewClassName}-footer {
  box-sizing: border-box;
  position: sticky;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  z-index: 2;
  left: 0px;
  overflow: hidden;
  width: 100%;
}
.${exports.listViewClassName}-header {
  top: 0px;
}
.${exports.listViewClassName}-header > .${exports.listViewClassName}-row,
.${exports.listViewClassName}-footer > .${exports.listViewClassName}-row {
  height: 100%;
}
.${exports.listViewClassName}-header .${exports.listViewClassName}-cell,
.${exports.listViewClassName}-footer .${exports.listViewClassName}-cell {
  user-select: none;
}
.${exports.listViewClassName}-body {
  box-sizing: border-box;
  position: sticky;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
  left: 0px;
  overflow: hidden;
  width: 100%;
  cursor: cell;
}
.${exports.listViewClassName}-edit {
  box-sizing: border-box;
  flex: none;
  position: fixed;
  z-index: 999;
  background: ${style_1.CssVar.lv.b.bg.c};
}
.${exports.listViewClassName}-mask {
  box-sizing: border-box;
  flex: none;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 998;
  background-color: transparent;
}
.${exports.listViewClassName}-resizer {
  box-sizing: border-box;
  flex: none;
  height: 100%;
  width: 3px;
  position:relative;
  right: 0px;
  top: 0px;
  cursor: col-resize;
}
.${exports.listViewClassName}-cell-m_s {
  flex-flow: column nowrap;
}
.${exports.listViewClassName}-cell-m_s > .${exports.listViewClassName}-row {
  width: 100%;
  min-height: 0px;
}
.${exports.listViewClassName}-sort-icon {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 15px;
}
.${exports.listViewClassName}-sort-icon::before {
  position: absolute;
  content: "";
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% + 2px);
  left: calc(50% - 5px);
  border-top: 4px solid ${style_1.CssVar.bdc};
}
.${exports.listViewClassName}-sort-icon::after {
  position: absolute;
  content: "";
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 10px);
  left: calc(50% - 5px);
  border-bottom: 4px solid ${style_1.CssVar.bdc};
}
.${exports.listViewClassName}-sort-icon.bh-asc::before {
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 9px);
  left: calc(50% - 5px);
  border-bottom: 8px solid ${style_1.CssVar.bdc};
}
.${exports.listViewClassName}-sort-icon.bh-desc::before {
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 4px);
  left: calc(50% - 5px);
  border-top: 8px solid ${style_1.CssVar.bdc};
}
.${exports.listViewClassName}-sort-icon.bh-asc::after,
.${exports.listViewClassName}-sort-icon.bh-desc::after {
  display: none;
}
${design === "material" ? `
.${exports.listViewClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.listViewClassName}-header,
.${exports.listViewClassName}-footer {
  background: ${style_1.CssVar.lv.h_f.bg.c};
}
.${exports.listViewClassName}-header {
  border-bottom: 1px solid ${style_1.CssVar.lv.h_f.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm};
}
.${exports.listViewClassName}-footer {
  box-shadow: ${style_1.CssParam.m.sdTop};
  border-top: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${exports.listViewClassName}-header .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:not(:last-child),
.${exports.listViewClassName}-footer .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:not(:last-child) {
  border-bottom: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${exports.listViewClassName}-header .${exports.listViewClassName}-cell,
.${exports.listViewClassName}-footer .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.h_f.bg.c};
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row {
  border-bottom: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell {
  border-right: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row[data-oddeven="even"] .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_oe};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:last-child {
  border-bottom: none;
}
.${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-cell:last-child {
  border-right: none;
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row:hover .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_hr};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell:hover {
  background: ${style_1.CssVar.lv.b.bg.c_hc} !important;
}
.${exports.listViewClassName}-body.bh-select-cell .${exports.listViewClassName}-cell.bh-selected,
.${exports.listViewClassName}-body.bh-select-row .${exports.listViewClassName}-row.bh-selected .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_s} !important;
}
.${exports.listViewClassName}-body.bh-select-row .${exports.listViewClassName}-row.bh-selected,
.${exports.listViewClassName}-body.bh-select-cell .${exports.listViewClassName}-cell.bh-selected {
  outline: 1px solid ${style_1.CssVar.lv.b.olc};
  outline-offset: -1px;
}
.${exports.listViewClassName}-resizer,
.${exports.listViewClassName}-cell:active + .${exports.listViewClassName}-cell .${exports.listViewClassName}-resizer {
  visibility: hidden;
}
.${exports.listViewClassName}-cell:hover .${exports.listViewClassName}-resizer,
.${exports.listViewClassName}-resizer:active {
  border-left: 1px dotted ${style_1.CssVar.lv.h_f.bdc};
  visibility: visible;
}
` : ""}
${design === "neumorphism" ? `
.${exports.listViewClassName}-wrap {
  padding: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.listViewClassName} {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  border-radius: ${style_1.CssParam.n.r};
  padding: ${style_1.CssParam.n.sdPdd};
}
.${exports.listViewClassName}-header,
.${exports.listViewClassName}-footer {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  border-radius: ${style_1.CssParam.n.r};
  background: ${style_1.CssVar.lv.h_f.bg.c};
}
.${exports.listViewClassName}-header .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:not(:last-child),
.${exports.listViewClassName}-footer .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:not(:last-child) {
  border-bottom: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${exports.listViewClassName}-header .${exports.listViewClassName}-cell,
.${exports.listViewClassName}-footer .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.h_f.bg.c};
  border-right: 1px solid ${style_1.CssVar.lv.h_f.bdc};
}
.${exports.listViewClassName}-body-dummy {
  top: ${style_1.CssParam.n.sdPdd};
  left: ${style_1.CssParam.n.sdPdd};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row {
  border-bottom: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell {
  border-right: 1px solid ${style_1.CssVar.lv.b.bdc};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row[data-oddeven="even"] .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_oe};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-row:last-child {
  border-bottom: none;
}
.${exports.listViewClassName}-cell-m_s .${exports.listViewClassName}-cell:last-child {
  border-right: none;
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-row:hover .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_hr};
}
.${exports.listViewClassName}-body .${exports.listViewClassName}-cell:hover {
  background: ${style_1.CssVar.lv.b.bg.c_hc} !important;
}
.${exports.listViewClassName}-body.bh-select-cell .${exports.listViewClassName}-cell.bh-selected,
.${exports.listViewClassName}-body.bh-select-row .${exports.listViewClassName}-row.bh-selected .${exports.listViewClassName}-cell {
  background: ${style_1.CssVar.lv.b.bg.c_s} !important;
}
.${exports.listViewClassName}-body.bh-select-row .${exports.listViewClassName}-row.bh-selected,
.${exports.listViewClassName}-body.bh-select-cell .${exports.listViewClassName}-cell.bh-selected {
  outline: 1px solid ${style_1.CssVar.lv.b.olc};
  outline-offset: -1px;
}
.${exports.listViewClassName}-resizer,
.${exports.listViewClassName}-cell:active + .${exports.listViewClassName}-cell .${exports.listViewClassName}-resizer {
  visibility: hidden;
}
.${exports.listViewClassName}-cell:hover .${exports.listViewClassName}-resizer,
.${exports.listViewClassName}-resizer:active {
  border-left: 1px dotted ${style_1.CssVar.lv.h_f.bdc};
  visibility: visible;
}
.${exports.listViewClassName}-edit > .${input_1.InputClassNames.wrap} {
  padding: 0px;
}
` : ""}
` });
