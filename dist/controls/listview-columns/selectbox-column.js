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
exports.ListViewSelectBoxColumnStyle = exports.listViewSelectBoxColumnClassName = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const controller_1 = __importDefault(require("../../hooks/controller"));
const input_column_1 = __importStar(require("../../layouts/input-column"));
const style_1 = __importStar(require("../../layouts/style"));
const listview_1 = require("../listview");
const selectbox_1 = __importDefault(require("../selectbox"));
exports.listViewSelectBoxColumnClassName = "bh-lv_c-slb";
const ListViewSelectBoxColumn = (props) => {
    const labelDataName = props.labelDataName ?? `_lbl_${props.name}`;
    const sourceValueDataName = props.selectBoxOptions?.valueDataName ?? "value";
    const sourceLabelDataName = props.selectBoxOptions?.labelDataName ?? "label";
    let bind = { value: "" }, sourceItems = [], loading = true;
    if (props.source == null) {
        sourceItems = [];
        loading = false;
    }
    else if (Array.isArray(props.source)) {
        sourceItems = props.source;
        loading = false;
    }
    else {
        (async () => {
            try {
                sourceItems = await props.source();
                loading = false;
            }
            catch {
                console.log("failed: load selectbox column source");
                sourceItems = [];
            }
        })();
    }
    const map = {};
    const find = (val) => {
        if (val in map)
            return map[val];
        const sitem = sourceItems.find((sitem) => sitem[sourceValueDataName] === val);
        return map[val] = (sitem ? sitem[sourceLabelDataName] : "") ?? "";
    };
    return {
        ...props,
        name: labelDataName,
        initialize: () => {
            return (0, listview_1.createListViewEditColumnElement)();
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(input_column_1.listViewInputColumnClassName);
            const elems = (0, listview_1.cloneListViewEditColumnElement)(initParams);
            elems.wrapElem.appendChild(elems.lblElem);
            cell.element.appendChild(elems.wrapElem);
            cell.contentElements.push(elems.lblElem);
        },
        rowDataInitialize: (data) => {
            data[labelDataName] = find(data[props.name]);
        },
        _beginEdit: ({ target, editElement, endEdit, styleCtx }) => {
            if (props.disabled === true)
                return;
            if (loading) {
                endEdit(false);
                return;
            }
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx },
                react_1.default.createElement(SelectBoxColumn, { bind: bind = { value: target.data[props.name] ?? null }, source: sourceItems, options: props.selectBoxOptions })), editElement, () => {
                props.beganEdit?.({ value: target.data[props.name], label: target.data[labelDataName] }, target);
            });
        },
        _endEdit: (target, commit, editElement) => {
            const bvals = { value: target.data[props.name], label: target.data[labelDataName] }, aval = bind.value;
            let albl = "";
            if (commit) {
                target.data[props.name] = aval;
                const sitem = sourceItems.find((sitem) => sitem[sourceValueDataName] === aval);
                target.data[labelDataName] = albl = (sitem ? sitem[sourceLabelDataName] : "") ?? "";
            }
            react_dom_1.default.unmountComponentAtNode(editElement);
            props.endedEdit?.({ before: bvals, after: commit ? { value: aval, label: albl } : bvals }, target, commit);
        },
        jsxStyle: react_1.default.createElement(react_1.default.Fragment, null,
            input_column_1.default,
            exports.ListViewSelectBoxColumnStyle),
    };
};
exports.default = ListViewSelectBoxColumn;
const SelectBoxColumn = ({ bind, options, source }) => {
    const con = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        setTimeout(() => con.focus(), 0);
    }, []);
    return react_1.default.createElement(selectbox_1.default, { controller: con, name: "value", bind: bind, source: source, style: { height: "100%", width: "100%" }, ...options, resize: false });
};
exports.ListViewSelectBoxColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewSelectBoxColumnClassName, css: () => `
` });
