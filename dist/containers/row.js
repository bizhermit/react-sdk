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
exports.RowStyle = exports.rowClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importDefault(require("../utils/classname-utils"));
exports.rowClassName = "bh-row";
const Row = ({ children, className, style, ref, right, center, fill, nowrap }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classname_utils_1.default.join(exports.rowClassName, classname_utils_1.default.hAlign(right ? "right" : (center ? "center" : "left")), classname_utils_1.default.fill(fill), classname_utils_1.default.wrap(nowrap !== true), className), ref: ref, style: style }, children),
        exports.RowStyle));
};
exports.default = Row;
exports.RowStyle = react_1.default.createElement(style_1.default, { id: exports.rowClassName, css: () => `
.${exports.rowClassName} {
  ${style_1.CssPV.flex_r}
  flex: none;
}
.${exports.rowClassName}.bh-h-r {
  justify-content: flex-end;
}
.${exports.rowClassName}.bh-h-c {
  justify-content: center;
}
.${exports.rowClassName}.bh-fill {
  width: 100%;
}
.${exports.rowClassName}.bh-wrap {
  flex-wrap: wrap;
}
.${exports.rowClassName} > .${exports.rowClassName} {
  width: auto;
  flex: 1;
}
` });
