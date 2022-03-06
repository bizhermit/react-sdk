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
exports.ListViewSliderColumnStyle = exports.listViewSliderColumnClassName = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const controller_1 = __importDefault(require("../../hooks/controller"));
const input_column_1 = require("../../layouts/input-column");
const style_1 = __importStar(require("../../layouts/style"));
const classname_utils_1 = __importDefault(require("../../utils/classname-utils"));
const dom_utils_1 = require("../../utils/dom-utils");
const listview_1 = require("../listview");
const slider_1 = __importDefault(require("../slider"));
exports.listViewSliderColumnClassName = "bh-lv_c-sld";
const ListViewSliderColumn = (props) => {
    const labelDataName = props.labelDataName ?? (props.format == null ? props.name : `_lbl_${props.name}`);
    let bind = { value: null };
    return {
        ...props,
        name: labelDataName,
        dataType: "number",
        initialize: () => {
            const lblElem = document.createElement("div");
            lblElem.classList.add(`${listview_1.listViewClassName}-lbl`);
            const barElem = document.createElement("div");
            barElem.classList.add(`${exports.listViewSliderColumnClassName}-bar`, classname_utils_1.default.hAlign(props.progressAlign));
            return { lblElem, barElem };
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(input_column_1.listViewInputColumnClassName, exports.listViewSliderColumnClassName);
            const barElem = (0, dom_utils_1.cloneElement)(initParams.barElem);
            cell.contentElements.push(barElem);
            cell.element.appendChild(barElem);
            const lblElem = (0, dom_utils_1.cloneElement)(initParams.lblElem);
            cell.element.appendChild(lblElem);
            cell.contentElements.push(lblElem);
        },
        rowDataInitialize: (props.labelDisplay === false || props.format == null) ? null : (data) => {
            data[labelDataName] = props.format(data[props.name]);
        },
        cellRender: ({ cache, row, contentElements }) => {
            if (cache.val !== row.item.data[props.name]) {
                const val = row.item.data[props.name];
                if (props.labelDisplay !== false)
                    contentElements[1].textContent = row.item.data[labelDataName];
                props.progressbarRender?.(val, contentElements[0]);
                contentElements[0].style.width = `${Math.min(100, Math.max(0, cache.val = val))}%`;
            }
        },
        _beginEdit: ({ target, editElement, styleCtx }) => {
            if (props.disabled === true)
                return;
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx },
                react_1.default.createElement(SliderColumn, { bind: bind = { value: target.data[props.name] }, options: props.sliderOptions })), editElement, () => {
                props.beganEdit?.(target.data[props.name], target);
            });
        },
        _endEdit: (target, commit, editElement) => {
            const bval = target.data[props.name], aval = bind.value;
            if (commit) {
                target.data[props.name] = aval;
                target.data[labelDataName] = props.format ? props.format(aval) : aval;
            }
            react_dom_1.default.unmountComponentAtNode(editElement);
            props.endedEdit?.({ before: bval, after: commit ? aval : bval }, target, commit);
        },
        jsxStyle: exports.ListViewSliderColumnStyle,
    };
};
exports.default = ListViewSliderColumn;
const SliderColumn = ({ bind, options }) => {
    const con = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        con.focus();
    }, []);
    return react_1.default.createElement(slider_1.default, { controller: con, name: "value", bind: bind, style: { height: "100%", width: "100%" }, ...options });
};
exports.ListViewSliderColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewSliderColumnClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewSliderColumnClassName}-bar {
  box-sizing: border-box;
  position: absolute;
  height: 60%;
  top: 20%;
  max-width: 100%;
  z-index: -1;
}
.${exports.listViewSliderColumnClassName}-bar.bh-h-l {
  left: 0px;
}
.${exports.listViewSliderColumnClassName}-bar.bh-h-r {
  right: 0px;
}
${design === "material" ? `
.${exports.listViewSliderColumnClassName}-bar {
  background: ${style_1.CssVar.slider.bar_c};
}
` : ""}
${design === "neumorphism" ? `
.${exports.listViewSliderColumnClassName}-bar {
  background: linear-gradient(to bottom right, ${style_1.CssVar.slider.bar_dc}, ${style_1.CssVar.slider.bar_bc});
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
` : ""}
` });
