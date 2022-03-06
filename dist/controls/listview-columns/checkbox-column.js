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
exports.ListViewCheckBoxColumnStyle = exports.listViewCheckBoxClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../../layouts/style"));
const dom_utils_1 = require("../../utils/dom-utils");
const checkbox_1 = require("../checkbox");
const listview_1 = require("../listview");
exports.listViewCheckBoxClassName = "bh-lv_col-checkbox";
const ListViewCheckBoxColumn = (props) => {
    const checkedValue = props.checkedValue ?? true, uncheckedValue = props.uncheckedValue ?? false;
    let batchChecked = false, batchCheckBoxElement = null, labelElement = null;
    const toggleChecked = (params, mode) => {
        if (mode === "none")
            return;
        const b = params.data[props.name];
        const aval = params.data[props.name] = b === checkedValue ? uncheckedValue : checkedValue;
        if (mode === "cell") {
            const cells = params.getSelectedCells();
            cells.forEach((item) => {
                if (item.columnName !== props.name)
                    return;
                item.data[item.columnName] = aval;
            });
        }
        else {
            const rows = params.getSelectedRows();
            rows.forEach((item) => {
                item.data[props.name] = aval;
            });
        }
        props.endedEdit?.({ before: { value: b, checked: b === checkedValue }, after: { value: params.data[props.name], checked: params.data[props.name] === checkedValue } }, { columnName: props.name, data: params.data, index: params.rowNumber - 1, id: params.id }, true);
    };
    return {
        ...props,
        width: props.width ?? -1,
        sort: props.sort ?? false,
        resize: props.resize ?? false,
        cellTextAlign: props.cellTextAlign ?? "center",
        initialize: () => {
            const elem = document.createElement("div");
            elem.classList.add(`${checkbox_1.checkBoxClassName}-body`);
            elem.setAttribute("data-disabled", String(props.disabled === true));
            return { elem };
        },
        headerCellInitialize: (column, initParams) => {
            column.headerCellElement.classList.add(`${exports.listViewCheckBoxClassName}-hcell`);
            labelElement = (0, dom_utils_1.cloneElement)(column.headerCellLabelElement);
            column.headerCellLabelElement.classList.remove(`${listview_1.listViewClassName}-lbl`);
            column.headerCellLabelElement.classList.add(`${exports.listViewCheckBoxClassName}-header`);
            column.headerCellLabelElement.textContent = "";
            column.headerCellLabelElement.appendChild(labelElement);
            if (props.disabled !== true && props.batchCheck !== false) {
                column.headerCellLabelElement.appendChild(batchCheckBoxElement = (0, dom_utils_1.cloneElement)(initParams.elem));
                batchCheckBoxElement.setAttribute("data-checked", String(batchChecked));
                column.headerCellLabelElement.setAttribute("data-checkbox", "true");
            }
            column.headerCellLabelElement = labelElement;
            if (typeof props.headerCellLabel === "string")
                column.headerCellLabelElement.textContent = props.headerCellLabel;
        },
        headerCellLabel: (_e, items, originItems) => {
            let checkedAll = true;
            if (items.length === 0) {
                checkedAll = false;
            }
            else {
                for (const item of items) {
                    if (item.data[props.name] !== checkedValue) {
                        checkedAll = false;
                        break;
                    }
                }
            }
            batchCheckBoxElement?.setAttribute("data-checked", String(batchChecked = checkedAll));
            if (typeof props.headerCellLabel === "function")
                props.headerCellLabel(labelElement, items, originItems);
        },
        bindedItems: (items) => {
            if (props.batchCheck === false)
                return;
            let checkedAll = true;
            if (items.length === 0) {
                checkedAll = false;
            }
            else {
                for (const item of items) {
                    if (item[props.name] !== checkedValue) {
                        checkedAll = false;
                        break;
                    }
                }
            }
            batchCheckBoxElement?.setAttribute("data-checked", String(batchChecked = checkedAll));
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(exports.listViewCheckBoxClassName);
            const elem = (0, dom_utils_1.cloneElement)(initParams.elem);
            cell.contentElements.push(elem);
            cell.element.appendChild(elem);
        },
        cellRender: ({ contentElements, row, cache, column }) => {
            const checked = row.item.data[column.name] === checkedValue;
            if (cache[column.name] !== checked)
                contentElements[0].setAttribute("data-checked", String(cache[column.name] = checked));
        },
        clickedHeaderCell: (colName, items, renderCells) => {
            if (props.disabled === true || props.batchCheck === false)
                return;
            if (batchChecked = !batchChecked)
                items.forEach(item => item.data[colName] = checkedValue);
            else
                items.forEach(item => item.data[colName] = uncheckedValue);
            batchCheckBoxElement?.setAttribute("data-checked", String(batchChecked));
            renderCells();
        },
        _preventClearSelected: true,
        clickedCell: (params, e) => {
            if (props.disabled === true || props.toggleCheckedWhenRowClicked === true)
                return;
            if (e?.ctrlKey || e?.shiftKey)
                return;
            toggleChecked(params, params.selectMode);
            return {
                renderHeaderCell: true,
                renderFooterCell: true,
            };
        },
        clickedRow: (params, e) => {
            if (props.disabled === true || props.toggleCheckedWhenRowClicked !== true)
                return;
            if (e?.ctrlKey || e?.shiftKey)
                return;
            toggleChecked(params, params.selectMode);
            return {
                renderHeaderCell: true,
                renderFooterCell: true,
            };
        },
        jsxStyle: react_1.default.createElement(react_1.default.Fragment, null,
            checkbox_1.CheckBoxStyle,
            exports.ListViewCheckBoxColumnStyle),
    };
};
exports.default = ListViewCheckBoxColumn;
exports.ListViewCheckBoxColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewCheckBoxClassName, css: () => `
.${exports.listViewCheckBoxClassName} {
  justify-content: center;
}
.${exports.listViewCheckBoxClassName}[data-disabled="false"] {
  cursor: pointer;
}
.${exports.listViewCheckBoxClassName} > .${checkbox_1.checkBoxClassName}-body {
  height: calc(${style_1.CssVar.size} * 0.9);
  width: calc(${style_1.CssVar.size} * 0.9);
}
.${exports.listViewCheckBoxClassName}-header {
  ${style_1.CssPV.flex_c_c}
  flex: 1;
}
.${exports.listViewCheckBoxClassName}-header[data-checkbox="true"] {
  cursor: pointer;
}
.${exports.listViewCheckBoxClassName}-hcell.bh-h-c > .${exports.listViewCheckBoxClassName}-header {
  align-items: center;
}
.${exports.listViewCheckBoxClassName}-hcell.bh-h-r > .${exports.listViewCheckBoxClassName}-header {
  align-items: flex-end;
}
` });
