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
exports.CodeStyle = exports.codeClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.codeClassName = "bh-code";
const Code = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.codeClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style, "data-lang": props.language ?? "" },
            react_1.default.createElement("pre", { className: `${exports.codeClassName}-body` }, props.children))));
};
exports.default = Code;
exports.CodeStyle = react_1.default.createElement(style_1.default, { id: exports.codeClassName, css: () => `
.${exports.codeClassName} {
  box-sizing: border-box;
  display: block;
  flex: none;
}
${style_1.CssPV.fitToOuter(exports.codeClassName)}
.${exports.codeClassName}-body {
  ${style_1.CssPV.fill}
}
` });
