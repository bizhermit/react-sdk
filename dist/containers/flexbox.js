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
exports.FlexBoxStyle = exports.FlexBoxClassNames = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.FlexBoxClassNames = {
    c: "bh-fb-c",
    r: "bh-fb-r",
    fill: "bh-fb-fill",
    ff_y: "bh-fb-ff_y",
    ff_x: "bh-fb-ff_x",
    left: "bh-fb-h_l",
    center: "bh-fb-h_c",
    right: "bh-fb-h_r",
    top: "bh-fb-v_t",
    middle: "bh-fb-v_m",
    bottom: "bh-fb-v_b",
    design: "bh-fb-design",
};
const FlexBox = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(props.row ? exports.FlexBoxClassNames.r : exports.FlexBoxClassNames.c, classname_utils_1.default.fitToOuter(props.fitToOuter), hAlignF(props.left, props.center, props.right), vAlignF(props.top, props.middle, props.bottom), props.scroll ? style_1.scrollbarClassName : "", props.design ? exports.FlexBoxClassNames.design : "", props.className), style: props.style }, props.children),
        exports.FlexBoxStyle));
};
exports.default = FlexBox;
const hAlignF = (left, center, right) => {
    if (left)
        return classname_utils_1.default.hAlign("left");
    if (center)
        return classname_utils_1.default.hAlign("center");
    if (right)
        return classname_utils_1.default.hAlign("right");
    return "";
};
const vAlignF = (top, middle, bottom) => {
    if (top)
        return classname_utils_1.default.vAlign("top");
    if (middle)
        return classname_utils_1.default.vAlign("middle");
    if (bottom)
        return classname_utils_1.default.vAlign("bottom");
    return "";
};
exports.FlexBoxStyle = react_1.default.createElement(style_1.default, { id: "bh-fb", depsDesign: true, css: ({ design }) => `
.${exports.FlexBoxClassNames.c} {
  ${style_1.CssPV.flex_c}
  flex: none;
}
${style_1.CssPV.fitToOuter(exports.FlexBoxClassNames.c)}
.${exports.FlexBoxClassNames.r} {
  ${style_1.CssPV.flex_r}
  flex: none;
}
${style_1.CssPV.fitToOuter(exports.FlexBoxClassNames.r)}
.${exports.FlexBoxClassNames.c}.bh-v-m {
  justify-content: center;
}
.${exports.FlexBoxClassNames.c}.bh-v-b {
  justify-content: flex-end;
}
.${exports.FlexBoxClassNames.c}.bh-h-c {
  align-items: center;
}
.${exports.FlexBoxClassNames.c}.bh-h-r {
  align-items: flex-end;
}
.${exports.FlexBoxClassNames.r}.bh-v-t {
  align-items: flex-start;
}
.${exports.FlexBoxClassNames.r}.bh-v-b {
  align-items: flex-end;
}
.${exports.FlexBoxClassNames.r}.bh-h-c {
  justify-content: center;
}
.${exports.FlexBoxClassNames.r}.bh-h-r {
  justify-content: flex-end;
}
${design === "material" ? `
.${exports.FlexBoxClassNames.design} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
` : ""}
${design === "neumorphism" ? `
.${exports.FlexBoxClassNames.design} {
  border-radius: ${style_1.CssParam.n.r};
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  padding: calc(${style_1.CssParam.n.sdPdd} / 2);
}
.${exports.FlexBoxClassNames.design}.cvx {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
}
` : ""}
` });
