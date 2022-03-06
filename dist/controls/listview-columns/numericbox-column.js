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
exports.listViewNumericBoxColumnClassName = void 0;
const number_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/number-utils"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const controller_1 = __importDefault(require("../../hooks/controller"));
const input_column_1 = __importStar(require("../../layouts/input-column"));
const style_1 = require("../../layouts/style");
const listview_1 = require("../listview");
const numericbox_1 = __importDefault(require("../numericbox"));
exports.listViewNumericBoxColumnClassName = "bh-lv_c-nub";
const ListViewNumericBoxColumn = (props) => {
    let bind = { value: null };
    const labelDataName = props.labelDataName ?? `_lbl_${props.name}`;
    return {
        ...props,
        name: labelDataName,
        dataType: "number",
        initialize: () => {
            return (0, listview_1.createListViewEditColumnElement)();
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(input_column_1.listViewInputColumnClassName, exports.listViewNumericBoxColumnClassName);
            const elems = (0, listview_1.cloneListViewEditColumnElement)(initParams);
            elems.wrapElem.appendChild(elems.lblElem);
            cell.element.appendChild(elems.wrapElem);
            cell.contentElements.push(elems.lblElem);
        },
        rowDataInitialize: (data) => {
            data[labelDataName] = number_utils_1.default.format(data[props.name]);
        },
        _beginEdit: ({ target, editElement, styleCtx }) => {
            if (props.disabled === true)
                return;
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx },
                react_1.default.createElement(NumericBoxColumn, { bind: bind = { value: target.data[props.name] ?? "" }, options: props.numericBoxOptions })), editElement, () => {
                props.beganEdit?.(target.data[target.columnName], target);
            });
        },
        _endEdit: (target, commit, editElement) => {
            const bval = { value: target.data[props.name], label: target.data[labelDataName] }, aval = bind.value;
            let albl = "";
            if (commit) {
                target.data[props.name] = aval;
                target.data[labelDataName] = albl = number_utils_1.default.format(aval);
            }
            react_dom_1.default.unmountComponentAtNode(editElement);
            props.endedEdit?.({ before: bval, after: commit ? { value: aval, label: albl } : bval }, target, commit);
        },
        jsxStyle: input_column_1.default,
    };
};
exports.default = ListViewNumericBoxColumn;
const NumericBoxColumn = ({ bind, options }) => {
    const con = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        con.focus();
    }, []);
    return react_1.default.createElement(numericbox_1.default, { controller: con, name: "value", bind: bind, ...options, style: { height: "100%", width: "100%" }, resize: false });
};
