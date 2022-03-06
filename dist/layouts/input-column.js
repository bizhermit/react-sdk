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
exports.listViewInputColumnClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("./style"));
exports.listViewInputColumnClassName = "bh-lv_c-ipt";
const ListViewInputColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewInputColumnClassName, depsDesign: true, css: ({ design }) => `
.${exports.listViewInputColumnClassName}-wrap {
  ${style_1.CssPV.flex_r}
  ${style_1.CssPV.fill}
}
${design === "material" ? `
.${exports.listViewInputColumnClassName} {
  padding: 1.5px 1px 1.5px 1.5px;
}
.${exports.listViewInputColumnClassName}-wrap {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.listViewInputColumnClassName}[data-disabled="true"] .${exports.listViewInputColumnClassName}-wrap {
  border-color: transparent;
}
` : ""}
${design === "neumorphism" ? `
.${exports.listViewInputColumnClassName} {
  padding: 1.5px 1px 1.5px 1.5px;
}
.${exports.listViewInputColumnClassName}-wrap {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.listViewInputColumnClassName}[data-disabled="true"] .${exports.listViewInputColumnClassName}-wrap {
  box-shadow: none;
}
` : ""}
` });
exports.default = ListViewInputColumnStyle;
