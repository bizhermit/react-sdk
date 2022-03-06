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
exports.ListViewButtonColumnStyle = exports.listViewButtonColumnClassName = void 0;
const react_1 = __importDefault(require("react"));
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const icon_1 = require("../../graphics/icon");
const style_1 = __importStar(require("../../layouts/style"));
const dom_utils_1 = require("../../utils/dom-utils");
exports.listViewButtonColumnClassName = "bh-lv_c-btn";
const ListViewButtonColumn = (props) => {
    return {
        ...props,
        width: props.iconImage == null || string_utils_1.default.isNotEmpty(props.buttonLabel) ? props.width : -1,
        sort: false,
        resize: props.resize ?? false,
        cellTextAlign: props.cellTextAlign ?? "center",
        initialize: () => {
            const elem = document.createElement("div");
            elem.classList.add(`${exports.listViewButtonColumnClassName}-wrap`);
            if (props.iconImage != null) {
                const iconElem = document.createElement("div");
                iconElem.classList.add(icon_1.iconClassName, `${icon_1.iconClassName}-${props.iconImage}`, `${exports.listViewButtonColumnClassName}-icon`);
                const iconSize = props.iconSize == null ? `${(0, style_1.cssParamsSize)() * 0.8}px` : `${props.iconSize}px`;
                (0, dom_utils_1.setStyleProps)(iconElem, { height: iconSize, width: iconSize, maxHeight: style_1.CssVar.size, maxWidth: style_1.CssVar.size });
                iconElem.innerHTML = "<div></div>".repeat((0, icon_1.iconChildCount)(props.iconImage));
                elem.appendChild(iconElem);
            }
            const lblElem = document.createElement("div");
            lblElem.classList.add(`${exports.listViewButtonColumnClassName}-lbl`);
            return { elem, lblElem };
        },
        cellInitialize: (cell, initParams) => {
            cell.element.classList.add(exports.listViewButtonColumnClassName);
            const elem = (0, dom_utils_1.cloneElement)(initParams.elem);
            if (string_utils_1.default.isNotEmpty(props.buttonLabel)) {
                const lblElem = (0, dom_utils_1.cloneElement)(initParams.lblElem);
                lblElem.textContent = props.buttonLabel;
                elem.appendChild(lblElem);
            }
            cell.contentElements.push(elem);
            cell.element.appendChild(elem);
        },
        cellRender: props.valid == null || props.disabled === true ? null : (cell) => {
            const ret = props.valid(cell.row.item.data);
            cell.element.setAttribute("data-disabled", String(!(typeof ret === "boolean" ? ret : ret.valid === true)));
        },
        clickedCell: (params, e) => {
            if (props.disabled === true)
                return;
            if (props.clickedCell == null)
                return;
            if (props.valid) {
                const ret = props.valid(params.data);
                if (typeof ret === "boolean") {
                    if (ret !== true)
                        return;
                }
                else {
                    if (ret.valid !== true)
                        return;
                }
            }
            return props.clickedCell(params, e);
        },
        jsxStyle: exports.ListViewButtonColumnStyle,
    };
};
exports.default = ListViewButtonColumn;
exports.ListViewButtonColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewButtonColumnClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewButtonColumnClassName}-wrap {
  ${style_1.CssPV.flex_r_c}
  ${style_1.CssPV.fill}
}
.${exports.listViewButtonColumnClassName}-lbl {
  box-sizing: border-box;
  flex: 1;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px 5px 0px 5px;
}
.${exports.listViewButtonColumnClassName}-icon + .${exports.listViewButtonColumnClassName}-lbl {
  padding-left: 0px;
}
.${exports.listViewButtonColumnClassName}[data-disabled="false"] {
  cursor: pointer;
}
.${exports.listViewButtonColumnClassName}[data-disabled="true"] > .${exports.listViewButtonColumnClassName}-wrap {
  opacity: 0.5;
}
${design === "material" ? `
.${exports.listViewButtonColumnClassName} {
  padding: calc(${style_1.CssParam.m.updownMargin} / 2);
}
.${exports.listViewButtonColumnClassName}-wrap {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  box-shadow: ${style_1.CssParam.m.sdBtm};
}
.${exports.listViewButtonColumnClassName}[data-disabled="false"]:hover > .${exports.listViewButtonColumnClassName}-wrap {
  margin-top: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
}
.${exports.listViewButtonColumnClassName}[data-disabled="false"]:hover:active > .${exports.listViewButtonColumnClassName}-wrap {
  margin-top: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  box-shadow: none;
}
` : ""}
${design === "neumorphism" ? `
.${exports.listViewButtonColumnClassName} {
  padding: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.listViewButtonColumnClassName}-wrap {
  padding: 0px ${style_1.CssParam.n.ccvSdPdd};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.listViewButtonColumnClassName}[data-disabled="false"]:hover > .${exports.listViewButtonColumnClassName}-wrap {
  box-shadow: ${style_1.CssParam.n.cvxSd};
}
.${exports.listViewButtonColumnClassName}[data-disabled="false"]:hover:active > .${exports.listViewButtonColumnClassName}-wrap {
  padding-top: 2px;
  box-shadow: ${style_1.CssParam.n.ccvSd};
}
` : ""}
` });
