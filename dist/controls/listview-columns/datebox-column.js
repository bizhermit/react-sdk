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
exports.listViewDateBoxColumnClassName = void 0;
const datetime_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/datetime-utils"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const controller_1 = __importDefault(require("../../hooks/controller"));
const input_column_1 = __importStar(require("../../layouts/input-column"));
const style_1 = require("../../layouts/style");
const datebox_1 = __importDefault(require("../datebox"));
const listview_1 = require("../listview");
exports.listViewDateBoxColumnClassName = "bh-lv_c-dtb";
const ListViewDateBoxColumn = (props) => {
    const labelDataName = props.labelDataName ?? `_lbl_${props.name}`;
    const format = props.labelFormat == null ? (date) => datetime_utils_1.default.format(date, "yyyy/MM/dd")
        : (typeof props.labelFormat === "string" ? (date) => datetime_utils_1.default.format(date, props.labelFormat) : props.labelFormat);
    const convertToLabel = (value) => {
        return format(datetime_utils_1.default.convert(value));
    };
    let bind = { value: null };
    return {
        ...props,
        name: labelDataName,
        width: props.width ?? 150,
        cellTextAlign: props.cellTextAlign ?? "center",
        initialize: () => {
            return (0, listview_1.createListViewEditColumnElement)();
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(input_column_1.listViewInputColumnClassName, exports.listViewDateBoxColumnClassName);
            const elems = (0, listview_1.cloneListViewEditColumnElement)(initParams);
            elems.wrapElem.appendChild(elems.lblElem);
            cell.element.appendChild(elems.wrapElem);
            cell.contentElements.push(elems.lblElem);
        },
        rowDataInitialize: (data) => {
            data[labelDataName] = convertToLabel(data[props.name]);
        },
        _beginEdit: ({ target, editElement, styleCtx }) => {
            if (props.disabled === true)
                return;
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx },
                react_1.default.createElement(DateBoxColumn, { bind: bind = { value: target.data[props.name] ?? null }, options: props.dateBoxOptions })), editElement, () => {
                props.beganEdit?.({ value: target.data[props.name], label: target.data[labelDataName] }, target);
            });
        },
        _endEdit: (target, commit, editElement) => {
            const bvals = { value: target.data[props.name], label: target.data[labelDataName] }, aval = bind.value;
            let albl = "";
            if (commit) {
                const val = bind.value;
                target.data[props.name] = val;
                if (val == null || val === "") {
                    target.data[labelDataName] = albl = "";
                }
                else {
                    if (typeof format === "string") {
                        target.data[labelDataName] = albl = datetime_utils_1.default.format(val, format);
                    }
                    else {
                        target.data[labelDataName] = albl = format(val);
                    }
                }
            }
            react_dom_1.default.unmountComponentAtNode(editElement);
            if (props.endedEdit)
                props.endedEdit({ before: bvals, after: commit ? { value: aval, label: albl } : bvals }, target, commit);
        },
        editedRowData: props.optimizeEditedRowData ? (data) => {
            data[labelDataName] = convertToLabel(data[props.name]);
            if (props.editedRowData)
                props.editedRowData(data);
        } : props.editedRowData,
        jsxStyle: input_column_1.default,
    };
};
exports.default = ListViewDateBoxColumn;
const DateBoxColumn = ({ bind, options }) => {
    const con = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        con.focus();
    }, []);
    return react_1.default.createElement(datebox_1.default, { controller: con, name: "value", bind: bind, style: { height: "100%", width: "100%" }, pulldownButton: false, ...options });
};
