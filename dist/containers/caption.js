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
exports.CaptionStyle = exports.captionClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.captionClassName = "bh-cap";
const Caption = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.captionClassName, classname_utils_1.default.direction(props.direction ?? "horizontal"), props.className), style: props.style, title: props.title },
            react_1.default.createElement("span", { className: (0, classname_utils_1.className)(`${exports.captionClassName}-lbl`, classname_utils_1.default.hAlign(props.labelAlign)), style: { width: props.labelWidth } }, props.label),
            props.children),
        exports.CaptionStyle));
};
exports.default = Caption;
exports.CaptionStyle = react_1.default.createElement(style_1.default, { id: exports.captionClassName, depsDesign: true, css: ({ design }) => `
.${exports.captionClassName} {
  ${style_1.CssPV.flex_r}
  flex: none;
}
.${exports.captionClassName}.bh-v {
  flex-direction: column;
}
.${exports.captionClassName}-lbl {
  ${style_1.CssPV.flex_r}
  flex: none;
  overflow: hidden;
  white-space: nowrap;
  padding: 3px 10px 0px 5px;
}
.${exports.captionClassName}-lbl.bh-h-r {
  justify-content: flex-end;
}
.${exports.captionClassName}-lbl.bh-h-r {
  justify-content: center;
}
${design === "material" ? `
.${exports.captionClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  padding: 3px;
  min-height: calc(${style_1.CssVar.size} + 6px);
}
` : ""}
${design === "neumorphism" ? `
.${exports.captionClassName} {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  border-radius: ${style_1.CssParam.n.r};
  padding: ${style_1.CssParam.n.ccvSdPdd};
  min-height: calc(${style_1.CssVar.size} + (${style_1.CssParam.n.sdPdd} + ${style_1.CssParam.n.ccvSdPdd}) * 2);
}
.${exports.captionClassName}.ccv {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
` : ""}
` });
