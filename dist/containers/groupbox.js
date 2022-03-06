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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBoxStyle = exports.groupBoxClassName = void 0;
const react_1 = __importStar(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.groupBoxClassName = "bh-grp_box";
const GroupBox = (props) => {
    const ref = (0, react_1.useRef)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, style: props.style, className: (0, classname_utils_1.className)(exports.groupBoxClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className) },
            react_1.default.createElement("div", { className: `${exports.groupBoxClassName}-caption` },
                react_1.default.createElement("div", { className: `${exports.groupBoxClassName}-border_prefix` }),
                react_1.default.createElement("div", { className: `${exports.groupBoxClassName}-label-wrap` },
                    react_1.default.createElement("div", { className: `${exports.groupBoxClassName}-label` }, props.caption)),
                react_1.default.createElement("div", { className: `${exports.groupBoxClassName}-border_suffix` })),
            react_1.default.createElement("div", { style: props.containerStyle, className: `${style_1.scrollbarClassName} ${exports.groupBoxClassName}-body`, "data-dirc": props.direction ?? "horizontal" }, props.children)),
        exports.GroupBoxStyle));
};
exports.default = GroupBox;
exports.GroupBoxStyle = react_1.default.createElement(style_1.default, { id: exports.groupBoxClassName, depsDesign: true, css: ({ design }) => `
.${exports.groupBoxClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.groupBoxClassName)}
.${exports.groupBoxClassName}-caption {
  ${style_1.CssPV.flex_r_b}
  flex: none;
  width: 100%;
  height: ${style_1.CssVar.size};
  overflow: hidden;
}
.${exports.groupBoxClassName}-border_prefix,
.${exports.groupBoxClassName}-border_suffix {
  box-sizing: border-box;
  position: relative;
  min-height: 0px;
  height: 50%;
}
.${exports.groupBoxClassName}-border_prefix {
  flex: none;
}
.${exports.groupBoxClassName}-border_suffix {
  flex: 1;
}
.${exports.groupBoxClassName}-label-wrap {
  ${style_1.CssPV.flex_r}
  flex: none;
  height: 100%;
  overflow: hidden;
}
.${exports.groupBoxClassName}-label {
  box-sizing: border-box;
  padding: 1px 5px 0px 5px;
  white-space: nowrap;
  overflow: hidden;
}
.${exports.groupBoxClassName}-body {
  ${style_1.CssPV.flex_r_t}
  ${style_1.CssPV.f_y}
}
.${exports.groupBoxClassName}-body[data-dirc="vertical"] {
  flex-flow: column nowrap;
}
${design === "material" ? `
.${exports.groupBoxClassName}-border_prefix {
  border-left: 1px solid ${style_1.CssVar.bdc};
  border-top: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r} 0px 0px 0px;
  width: 10px;
}
.${exports.groupBoxClassName}-border_suffix {
  border-top: 1px solid ${style_1.CssVar.bdc};
  border-right: 1px solid ${style_1.CssVar.bdc};
  border-radius: 0px ${style_1.CssParam.m.r} 0px 0px;
  min-width: 10px;
}
.${exports.groupBoxClassName}-body {
  border-left: 1px solid ${style_1.CssVar.bdc};
  border-bottom: 1px solid ${style_1.CssVar.bdc};
  border-right: 1px solid ${style_1.CssVar.bdc};
  border-radius: 0px 0px ${style_1.CssParam.m.r} ${style_1.CssParam.m.r};
}
` : ""}
${design === "neumorphism" ? `
.${exports.groupBoxClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.groupBoxClassName}-caption {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
  margin-bottom: ${style_1.CssParam.n.sdPdd};
  padding-left: 5px;
}
` : ""}
` });
