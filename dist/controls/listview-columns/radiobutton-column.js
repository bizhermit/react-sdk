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
exports.ListViewRadioButtonColumnStyle = exports.listViewRadioButtonColumnClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../../layouts/style"));
const dom_utils_1 = require("../../utils/dom-utils");
const radiobutton_1 = require("../radiobutton");
exports.listViewRadioButtonColumnClassName = "bh-lv_c-rdb";
const ListViewRadioButtonColumn = (props) => {
    const selectedValue = props.selectedValue ?? true, unselectedValue = props.unselectedValue ?? false;
    const select = (params) => {
        let b = null;
        for (const item of params.originItems) {
            if (item[props.name] === selectedValue)
                b = item;
            item[props.name] = unselectedValue;
        }
        params.data[props.name] = selectedValue;
        props.endedEdit?.({ before: b, after: params.data }, { columnName: params.columnName, data: params.data, index: params.rowNumber - 1, id: params.id }, true);
    };
    return {
        ...props,
        width: props.width ?? -1,
        sort: false,
        resize: props.resize ?? false,
        cellTextAlign: props.cellTextAlign ?? "center",
        initialize: () => {
            const elem = document.createElement("div");
            elem.classList.add(`${radiobutton_1.radioButtonClassName}-mark`);
            return { elem };
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(exports.listViewRadioButtonColumnClassName);
            const elem = (0, dom_utils_1.cloneElement)(initParams.elem);
            cell.contentElements.push(elem);
            cell.element.appendChild(elem);
        },
        cellRender: ({ contentElements, row, cache, column }) => {
            const selected = row.item.data[column.name] === selectedValue;
            if (cache[column.name] !== selected) {
                contentElements[0].setAttribute("data-selected", String(cache[column.name] = selected));
            }
        },
        clickedCell: (params) => {
            if (props.disabled === true || props.selectWhenRowClicked === true)
                return;
            select(params);
            return {
                renderHeaderCell: true,
                renderFooterCell: true,
            };
        },
        clickedRow: (params) => {
            if (props.disabled === true || props.selectWhenRowClicked !== true)
                return;
            select(params);
            return {
                renderHeaderCell: true,
                renderFooterCell: true,
            };
        },
        bindedItems: (items) => {
            let hasSelected = false;
            items.forEach(item => {
                if (hasSelected) {
                    item[props.name] = unselectedValue;
                    return;
                }
                if (item[props.name] === selectedValue)
                    hasSelected = true;
            });
            if (!hasSelected && items.length > 0)
                items[0][props.name] = selectedValue;
        },
        jsxStyle: react_1.default.createElement(react_1.default.Fragment, null,
            radiobutton_1.RadioButtonStyle,
            exports.ListViewRadioButtonColumnStyle),
    };
};
exports.default = ListViewRadioButtonColumn;
exports.ListViewRadioButtonColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewRadioButtonColumnClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewRadioButtonColumnClassName}[data-disabled="false"] {
  cursor: pointer;
}
.${exports.listViewRadioButtonColumnClassName}[data-disabled="true"] > .${radiobutton_1.radioButtonClassName}-mark::before {
  opacity: 0.6;
}
${design === "neumorphism" ? `
.${exports.listViewRadioButtonColumnClassName}[data-disabled="true"] > .${radiobutton_1.radioButtonClassName}-mark::before {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
` : ""}
` });
