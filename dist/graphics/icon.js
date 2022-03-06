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
exports.IconStyle = exports.iconChildCount = exports.iconClassName = void 0;
const react_1 = __importStar(require("react"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.iconClassName = "bh-icon";
const Icon = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.iconClassName, `${exports.iconClassName}-${props.image || "none"}`, props.className), style: props.style }, (0, react_1.useMemo)(() => childNode(props.image), [props.image])),
        exports.IconStyle));
};
exports.default = Icon;
const childNode = (image) => {
    const ret = [];
    for (let i = 0, il = (0, exports.iconChildCount)(image); i < il; i++)
        ret.push(react_1.default.createElement("div", { key: i }));
    return ret;
};
const iconChildCount = (image) => {
    if (["saveas", "messages", "user", "connect", "lock", "unlock", "guard", "history"].includes(image))
        return 1;
    if (["gear", "cloud", "users", "post"].includes(image))
        return 2;
    if (["calendar", "list"].includes(image))
        return 3;
    return 0;
};
exports.iconChildCount = iconChildCount;
exports.IconStyle = react_1.default.createElement(style_1.default, { id: exports.iconClassName, css: () => `
.${exports.iconClassName} {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  flex: none;
}
.${exports.iconClassName} > div {
  box-sizing: border-box;
  cursor: inherit;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}
.${exports.iconClassName}::before,
.${exports.iconClassName}::after,
.${exports.iconClassName} > div::before,
.${exports.iconClassName} > div::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
}
.${exports.iconClassName}-favicon::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background: url("/favicon.ico");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  overflow: hidden;
}
.${exports.iconClassName}-add::before {
  height: 70%;
  width: 2px;
  top: 15%;
  left: calc(50% - 1px);
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-add::after {
  height: 2px;
  width: 70%;
  top: calc(50% - 1px);
  left: 15%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-minus::before {
  height: 2px;
  width: 70%;
  top: calc(50% - 1px);
  left: 15%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-check::before {
  width: 44%;
  height: 66%;
  top: 5%;
  left: 30%;
  transform: rotate(40deg);
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-delete::before {
  height: 76%;
  width: 76%;
  top: 12%;
  left: 12%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(5% 10%, 40% 10%, 40% 0%, 60% 0%, 60% 10%, 95% 10%, 95% 20%, 85% 20%, 85% 100%, 15% 100%, 15% 20%, 5% 20%);
}
.${exports.iconClassName}-delete::after {
  height: 45%;
  width: 24%;
  top: 35%;
  left: 38%;
  border-left: 1px solid ${style_1.CssVar.bg.c};
  border-right: 1px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-close::before,
.${exports.iconClassName}-close::after {
  height: 80%;
  width: 2px;
  top: 10%;
  left: calc(50% - 1px);
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-close::before {
  transform: rotate(45deg);
}
.${exports.iconClassName}-close::after {
  transform: rotate(135deg);
}
.${exports.iconClassName}-edit::before {
  height: 70%;
  width: 25%;
  top: 10%;
  left: 45%;
  border-radius: 2px 2px 0px 0px;
  transform: rotate(45deg);
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-edit::after {
  height: 20%;
  width: 25%;
  bottom: 10%;
  left: 10%;
  transform: rotate(45deg);
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
.${exports.iconClassName}-save::before,
.${exports.iconClassName}-saveas::before {
  height: 74%;
  width: 74%;
  top: 13%;
  left: 13%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 30% 0%, 30% 25%, 70% 25%, 70% 0%, 85% 0%, 100% 15%, 100% 100%, 80% 100%, 80% 50%, 20% 50%, 20% 90%, 85% 90%, 85% 100%, 0% 100%);
}
.${exports.iconClassName}-save::after,
.${exports.iconClassName}-saveas::after {
  height: 74%;
  width: 74%;
  top: 13%;
  left: 13%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(50% 5%, 60% 5%, 60% 20%, 50% 20%);
}
.${exports.iconClassName}-saveas > div::before {
  height: 55%;
  width: 20%;
  top: 15%;
  left: 56%;
  border-radius: 2px 2px 0px 0px;
  transform: rotate(45deg);
  background-color: ${style_1.CssVar.fc};
  border: 0.5px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-saveas > div::after {
  height: 15%;
  width: 20%;
  bottom: 25%;
  left: 30%;
  transform: rotate(45deg);
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
.${exports.iconClassName}-gear::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  background-color: transparent;
  border: 6px double ${style_1.CssVar.fc};
  border-radius: 50%;
}
.${exports.iconClassName}-gear::after {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  background-color: transparent;
  border: 3px solid ${style_1.CssVar.fc};
  border-radius: 50%;
}
.${exports.iconClassName}-gear > div::before,
.${exports.iconClassName}-gear > div::after {
  height: 80%;
  width: 16%;
  top: 10%;
  left: 42%;
  background-color: transparent;
  border-top: 4px solid ${style_1.CssVar.fc};
  border-bottom: 4px solid ${style_1.CssVar.fc};
  border-radius: 1px;
}
.${exports.iconClassName}-gear > div:nth-child(1)::after {
  transform: rotate(45deg);
}
.${exports.iconClassName}-gear > div:nth-child(2)::before {
  transform: rotate(90deg);
}
.${exports.iconClassName}-gear > div:nth-child(2)::after {
  transform: rotate(135deg);
}
.${exports.iconClassName}-arrow-up::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 70% 50%, 70% 100%, 30% 100%, 30% 50%);
}
.${exports.iconClassName}-arrow-down::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 50% 100%, 100% 50%, 70% 50%, 70% 0%, 30% 0%, 30% 50%);
}
.${exports.iconClassName}-arrow-left::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 50% 0%, 50% 30%, 100% 30%, 100% 70%, 50% 70%, 50% 100%);
}
.${exports.iconClassName}-arrow-right::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 30%, 50% 30%, 50% 0%, 100% 50%, 50% 100%, 50% 70%, 0% 70%);
}
.${exports.iconClassName}-pulldown::before {
  bottom: calc(50% - 4px);
  left: 26%;
  width: calc(60% - 3px);
  height: calc(60% - 3px);
  transform: rotate(45deg);
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-pullup::before {
  top: calc(50% - 3px);
  left: 26%;
  width: calc(60% - 3px);
  height: calc(60% - 3px);
  transform: rotate(45deg);
  border-top: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-pullleft::before {
  bottom: 26%;
  right: 15%;
  width: calc(60% - 3px);
  height: calc(60% - 3px);
  transform: rotate(45deg);
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-pullright::before {
  bottom: 26%;
  left: 15%;
  width: calc(60% - 3px);
  height: calc(60% - 3px);
  transform: rotate(45deg);
  border-top: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-info::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  background: ${style_1.CssVar.fc};
  color: ${style_1.CssVar.bg.c};
  content: "i" !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 80%;
  font-weight: bold;
  padding-top: 2px;
}
.${exports.iconClassName}-warn::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  background: ${style_1.CssVar.warn.bdc};
  color: ${style_1.CssVar.warn.bg.c};
  content: "!" !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 80%;
  font-weight: bold;
  padding-top: 7px;
}
.${exports.iconClassName}-err::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  background: ${style_1.CssVar.err.bdc};
  color: ${style_1.CssVar.err.bg.c};
  content: "!" !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 80%;
  font-weight: bold;
  padding-top: 2px;
}
.${exports.iconClassName}-reload::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  border-radius: 50%;
  border: 2px solid ${style_1.CssVar.fc};
  border-right-color: transparent;
}
.${exports.iconClassName}-reload::after {
  background-color: ${style_1.CssVar.fc};
  top: 15%;
  right: 10%;
  height: 40%;
  width: 30%;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  transform: rotate(40deg);
}
.${exports.iconClassName}-download::before {
  height: 60%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(30% 0%, 70% 0%, 70% 40%, 100% 40%, 50% 100%, 0% 40%, 30% 40%);
}
.${exports.iconClassName}-download::after {
  height: 30%;
  width: 80%;
  bottom: 15%;
  left: 10%;
  background-color: transparent;
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-upload::before {
  height: 60%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(50% 0%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%);
}
.${exports.iconClassName}-upload::after {
  height: 30%;
  width: 80%;
  bottom: 15%;
  left: 10%;
  background-color: transparent;
  border-bottom: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-cloud::before {
  bottom: 20%;
  left: 10%;
  height: 42%;
  width: 42%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-cloud::after {
  bottom: 20%;
  right: 10%;
  height: 34%;
  width: 34%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-cloud > div:nth-child(1)::before {
  top: 20%;
  left: 22%;
  height: 42%;
  width: 42%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-cloud > div:nth-child(1)::after {
  top: 30%;
  right: 17%;
  height: 30%;
  width: 30%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-cloud > div:nth-child(2)::before {
  bottom: 20%;
  left: 30%;
  height: 30%;
  width: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-messages::before {
  top: 10%;
  left: 10%;
  height: 60%;
  width: 80%;
  border: 1px solid ${style_1.CssVar.fc};
  background-color: ${style_1.CssVar.fc};
  border-radius: 3px;
  z-index: 0;
}
.${exports.iconClassName}-messages::after {
  bottom: 10%;
  left: 25%;
  height: calc(20% + 2px);
  width: 25%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  z-index: 0;
}
.${exports.iconClassName}-messages > div {
  top: 0px;
  left: 0px;
  color: ${style_1.CssVar.fc};
  z-index: 1;
  font-size: 70%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.${exports.iconClassName}-filter::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 0%, 60% 50%, 60% 90%, 40% 100%, 40% 50%);
}
.${exports.iconClassName}-search::before {
  height: 60%;
  width: 60%;
  top: 10%;
  left: 10%;
  border: 3px solid ${style_1.CssVar.fc};
  background-color: transparent;
  border-radius: 50%;
}
.${exports.iconClassName}-search::after {
  height: 4px;
  width: 40%;
  bottom: 19%;
  right: 10%;
  transform: rotate(45deg);
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-home::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 90% 50%, 90% 100%, 60% 100%, 60% 75%, 40% 75%, 40% 100%, 10% 100%, 10% 50%);
}
.${exports.iconClassName}-signin::before {
  height: 80%;
  width: 60%;
  top: 10%;
  left: 30%;
  border: 2px solid ${style_1.CssVar.fc};
  border-left-color: transparent;
}
.${exports.iconClassName}-signin::after {
  height: 50%;
  width: 60%;
  top: 25%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 30%, 50% 30%, 50% 0%, 100% 50%, 50% 100%, 50% 70%, 0% 70%);
}
.${exports.iconClassName}-signout::before {
  height: 80%;
  width: 60%;
  top: 10%;
  left: 30%;
  border: 2px solid ${style_1.CssVar.fc};
  border-left-color: transparent;
}
.${exports.iconClassName}-signout::after {
  height: 50%;
  width: 60%;
  top: 25%;
  left: 15%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 50% 0%, 50% 30%, 100% 30%, 100% 70%, 50% 70%, 50% 100%);
}
.${exports.iconClassName}-menu::before {
  height: 60%;
  width: 70%;
  top: 20%;
  left: 15%;
  border-top: 2px solid ${style_1.CssVar.fc};
  border-bottom: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-menu::after {
  height: 2px;
  width: 70%;
  top: calc(50% - 1px);
  left: 15%;
  border-top: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-nest-menu::before {
  height: 60%;
  width: 70%;
  top: 20%;
  left: 15%;
  border-top: 2px solid ${style_1.CssVar.fc};
  border-bottom: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-nest-menu::after {
  height: 2px;
  width: 50%;
  top: calc(50% - 1px);
  left: 30%;
  border-top: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-user > div {
  top: 8% !important;
  left: 8% !important;
  height: 84% !important;
  width: 84% !important;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-user > div::before {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 25%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-user > div::after {
  height: 100%;
  width: 100%;
  top: 60%;
  left: 0%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-users > div:nth-child(1) {
  top: 8% !important;
  left: 8% !important;
  height: 84% !important;
  width: 84% !important;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid ${style_1.CssVar.fc};
  z-index: 1;
}
.${exports.iconClassName}-users > div:nth-child(1)::before {
  height: 50%;
  width: 50%;
  top: 22%;
  left: 45%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
  border: 1px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-users > div:nth-child(1)::after {
  height: 100%;
  width: 100%;
  top: 70%;
  left: 20%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
  border: 1px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-users > div:nth-child(2) {
  top: 8% !important;
  left: 8% !important;
  height: 84% !important;
  width: 84% !important;
  overflow: hidden;
  border-radius: 50%;
  z-index: 0;
}
.${exports.iconClassName}-users > div:nth-child(2)::before {
  height: 50%;
  width: 50%;
  top: 7%;
  left: 15%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
  border: 1px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-users > div:nth-child(2)::after {
  height: 100%;
  width: 100%;
  top: 50%;
  left: -10%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
  border: 1px solid ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-post::before {
  height: 40%;
  width: 2px;
  top: 30%;
  left: calc(50% - 1px);
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-post::after {
  height: 30%;
  width: 60%;
  top: calc(50% - 1px);
  left: 20%;
  border-top: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-post > div::before,
.${exports.iconClassName}-post > div::after {
  height: 24%;
  width: 24%;
  border-radius: 50%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-post > div:nth-child(1)::before {
  top: 10%;
  left: 38%;
}
.${exports.iconClassName}-post > div:nth-child(1)::after {
  bottom: 10%;
  left: 38%;
}
.${exports.iconClassName}-post > div:nth-child(2)::before {
  bottom: 10%;
  left: 10%;
}
.${exports.iconClassName}-post > div:nth-child(2)::after {
  bottom: 10%;
  right: 10%;
}
.${exports.iconClassName}-connect::before,
.${exports.iconClassName}-connect::after {
  width: 35%;
  height: 35%;
  top: 35%;
  border-radius: 1px;
}
.${exports.iconClassName}-connect::before {
  left: 10%;
  transform: rotate(45deg);
  border-bottom: 3px solid ${style_1.CssVar.fc};
  border-left: 3px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-connect::after {
  right: 10%;
  transform: rotate(45deg);
  border-top: 3px solid ${style_1.CssVar.fc};
  border-right: 3px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-connect > div::before {
  height: 64%;
  width: 2px;
  top: 20%;
  left: calc(50% - 1px);
  background-color: ${style_1.CssVar.fc};
  transform: rotate(10deg);
}
.${exports.iconClassName}-lock::before {
  height: 50%;
  width: 80%;
  bottom: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.fc};
  border-radius: 2px;
}
.${exports.iconClassName}-lock::after {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: transparent;
  border-radius: 50% / 30%;
  border-top: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
  border-right: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-lock > div {
  z-index: 1;
}
.${exports.iconClassName}-lock > div::before {
  height: 16%;
  width: 16%;
  top: 50%;
  left: 42%;
  background-color: ${style_1.CssVar.bg.c};
  border-radius: 50%;
}
.${exports.iconClassName}-lock > div::after {
  height: 20%;
  width: 4%;
  top: 56%;
  left: 48%;
  background-color: ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-unlock::before {
  height: 50%;
  width: 80%;
  bottom: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.fc};
  border-radius: 2px;
}
.${exports.iconClassName}-unlock::after {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: transparent;
  border-radius: 50% / 30%;
  border-top: 2px solid ${style_1.CssVar.fc};
  border-left: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-unlock > div {
  z-index: 1;
}
.${exports.iconClassName}-unlock > div::before {
  height: 16%;
  width: 16%;
  top: 50%;
  left: 42%;
  background-color: ${style_1.CssVar.bg.c};
  border-radius: 50%;
}
.${exports.iconClassName}-unlock > div::after {
  height: 20%;
  width: 4%;
  top: 56%;
  left: 48%;
  background-color: ${style_1.CssVar.bg.c};
}
.${exports.iconClassName}-key::before {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 10%;
  background-color: transparent;
  border: 4px solid ${style_1.CssVar.fc};
  border-radius: 50%;
}
.${exports.iconClassName}-key::after {
  height: 50%;
  width: 8px;
  top: 35%;
  left: 55%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 0% 100%, 40% 100%, 40% 90%, 100% 90%, 100% 70%, 60% 70%, 60% 60%, 100% 60%, 100% 40%, 40% 40%, 40% 0%);
  transform: rotate(-45deg);
}
.${exports.iconClassName}-guard::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 10%, 50% 0%, 100% 10%, 90% 80%, 50% 100%, 10% 80%);
}
.${exports.iconClassName}-guard > div::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.bg.c};
  clip-path: polygon(50% 45%, 85% 45%, 80% 75%, 50% 90%, 50% 75%);
  opacity: 0.8;
}
.${exports.iconClassName}-guard > div::after {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${style_1.CssVar.bg.c};
  clip-path: polygon(10% 18%, 50% 10%, 50% 45%, 14% 45%);
  opacity: 0.8;
}
.${exports.iconClassName}-play::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${exports.iconClassName}-backwards::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}
.${exports.iconClassName}-stop::before {
  height: 50%;
  width: 50%;
  top: 25%;
  left: 25%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-pose::before,
.${exports.iconClassName}-pose::after {
  height: 50%;
  width: 21%;
  top: 25%;
  background-color: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-pose::before {
  left: 25%;
}
.${exports.iconClassName}-pose::after {
  right: 25%;
}
.${exports.iconClassName}-fast-forward::before,
.${exports.iconClassName}-fast-forward::after {
  height: 40%;
  width: 40%;
  top: 30%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${exports.iconClassName}-fast-forward::before {
  left: 10%;
}
.${exports.iconClassName}-fast-forward::after {
  right: 10%;
}
.${exports.iconClassName}-rewind::before,
.${exports.iconClassName}-rewind::after {
  height: 40%;
  width: 40%;
  top: 30%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}
.${exports.iconClassName}-rewind::before {
  left: 10%;
}
.${exports.iconClassName}-rewind::after {
  right: 10%;
}
.${exports.iconClassName}-calendar::before {
  height: 70%;
  width: 80%;
  top: 15%;
  left: 10%;
  border: 1px solid ${style_1.CssVar.fc};
  border-top-width: 4px;
  border-radius: 1px;
}
.${exports.iconClassName}-calendar > div:nth-child(1) {
  top: 38%;
}
.${exports.iconClassName}-calendar > div:nth-child(2) {
  top: 53%;
}
.${exports.iconClassName}-calendar > div:nth-child(3) {
  top: 68%;
}
.${exports.iconClassName}-calendar > div::before {
  width: 60%;
  height: 8%;
  left: 20%;
  background-color: ${style_1.CssVar.fc};
  clip-path: polygon(0% 100%, 0% 0%, 14.2% 0%, 14.2% 100%, 28.4% 100%, 28.4% 0%, 42.6% 0%, 42.6% 100%, 56.8% 100%, 56.8% 0%, 71% 0%, 71% 100%, 85.2% 100%, 85.2% 0%, 100% 0%, 100% 100%);
}
.${exports.iconClassName}-clock::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border: 2px solid ${style_1.CssVar.fc};
  border-radius: 50%;
}
.${exports.iconClassName}-clock::after {
  height: 35%;
  width: 30%;
  top: calc(20% + 1px);
  right: calc(20% + 1px);
  border-left: 2px solid ${style_1.CssVar.fc};
  border-bottom: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-list::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border: 1px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-list > div::before {
  height: 4px;
  width: 4px;
  left: 20%;
  background-color: ${style_1.CssVar.fc};
  border-radius: 50%;
}
.${exports.iconClassName}-list > div::after {
  height: 2px;
  width: 40%;
  left: calc(20% + 5px);
  background-color: ${style_1.CssVar.fc};
  border-radius: 1px;
}
.${exports.iconClassName}-list > div:nth-child(1)::before {
  top: 20%;
}
.${exports.iconClassName}-list > div:nth-child(1)::after {
  top: calc(20% + 1px);
}
.${exports.iconClassName}-list > div:nth-child(2)::before {
  top: 40%;
}
.${exports.iconClassName}-list > div:nth-child(2)::after {
  top: calc(40% + 1px);
}
.${exports.iconClassName}-list > div:nth-child(3)::before {
  top: 62%;
}
.${exports.iconClassName}-list > div:nth-child(3)::after {
  top: calc(62% + 1px);
}
.${exports.iconClassName}-history::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  border: 2px solid ${style_1.CssVar.fc};
  border-left-color: transparent;
}
.${exports.iconClassName}-history::after {
  background-color: ${style_1.CssVar.fc};
  top: 40%;
  left: 0%;
  height: 25%;
  width: 30%;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
.${exports.iconClassName}-history > div::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  border: 2px solid ${style_1.CssVar.fc};
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: rotate(45deg);
}
.${exports.iconClassName}-history > div::after {
  height: 30%;
  width: 25%;
  top: calc(25% + 1px);
  right: calc(25% + 1px);
  border-left: 2px solid ${style_1.CssVar.fc};
  border-bottom: 2px solid ${style_1.CssVar.fc};
}
.${exports.iconClassName}-reorder::before,
.${exports.iconClassName}-reorder::after {
  height: 2px;
  width: 70%;
  left: 15%;
  background: ${style_1.CssVar.fc};
}
.${exports.iconClassName}-reorder::before {
  top: calc(50% - 3px);
}
.${exports.iconClassName}-reorder::after {
  bottom: calc(50% - 3px);
}
` });
