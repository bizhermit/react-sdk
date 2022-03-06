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
exports.ListViewTextBoxColumnStyle = exports.listViewTextBoxColumnClassName = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const controller_1 = __importDefault(require("../../hooks/controller"));
const input_column_1 = __importStar(require("../../layouts/input-column"));
const style_1 = __importStar(require("../../layouts/style"));
const listview_1 = require("../listview");
const textbox_1 = __importDefault(require("../textbox"));
exports.listViewTextBoxColumnClassName = "bh-lv_c-txb";
const ListViewTextBoxColumn = (props) => {
    let bind = { value: "" };
    return {
        ...props,
        initialize: () => {
            return (0, listview_1.createListViewEditColumnElement)();
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(input_column_1.listViewInputColumnClassName, exports.listViewTextBoxColumnClassName);
            const elems = (0, listview_1.cloneListViewEditColumnElement)(initParams);
            elems.wrapElem.appendChild(elems.lblElem);
            cell.element.appendChild(elems.wrapElem);
            cell.contentElements.push(elems.lblElem);
        },
        _beginEdit: ({ target, editElement, styleCtx }) => {
            if (props.disabled === true)
                return;
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx },
                react_1.default.createElement(TextBoxColumn, { bind: bind = { value: target.data[target.columnName] ?? "" }, options: props.textBoxOptions })), editElement, () => {
                props.beganEdit?.(target.data[target.columnName], target);
            });
        },
        _endEdit: (target, commit, editElement) => {
            const bval = target.data[target.columnName], aval = bind.value;
            if (commit)
                target.data[target.columnName] = aval;
            react_dom_1.default.unmountComponentAtNode(editElement);
            props.endedEdit?.({ before: bval, after: commit ? aval : bval }, target, commit);
        },
        jsxStyle: react_1.default.createElement(react_1.default.Fragment, null,
            input_column_1.default,
            exports.ListViewTextBoxColumnStyle),
    };
};
exports.default = ListViewTextBoxColumn;
const TextBoxColumn = ({ bind, options }) => {
    const con = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        con.focus();
    }, []);
    return react_1.default.createElement(textbox_1.default, { controller: con, name: "value", bind: bind, style: { height: "100%", width: "100%" }, ...options, resize: false });
};
exports.ListViewTextBoxColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewTextBoxColumnClassName, css: () => `
` });
