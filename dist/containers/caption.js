"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CaptionStyle=exports.captionClassName=void 0;const react_1=__importDefault(require("react")),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils"));exports.captionClassName="bh-cap";const Caption=e=>react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:(0,classname_utils_1.className)(exports.captionClassName,classname_utils_1.default.direction(e.direction??"horizontal"),e.className),style:e.style},react_1.default.createElement("span",{className:(0,classname_utils_1.className)(`${exports.captionClassName}-lbl`,classname_utils_1.default.hAlign(e.labelAlign)),style:{width:e.labelWidth}},e.label),e.children),exports.CaptionStyle);exports.default=Caption,exports.CaptionStyle=react_1.default.createElement(style_1.default,{id:exports.captionClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.captionClassName} {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n}\n.${exports.captionClassName}.bh-v {\n  flex-direction: column;\n}\n.${exports.captionClassName}-lbl {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  overflow: hidden;\n  white-space: nowrap;\n  padding: 3px 10px 0px 5px;\n}\n.${exports.captionClassName}-lbl.bh-h-r {\n  justify-content: flex-end;\n}\n.${exports.captionClassName}-lbl.bh-h-r {\n  justify-content: center;\n}\n${"material"===e?`\n.${exports.captionClassName} {\n  border: 1px solid ${style_1.CssVar.bdc};\n  border-radius: ${style_1.CssParam.m.r};\n  padding: 1px;\n  min-height: calc(${style_1.CssVar.size} + 6px);\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.captionClassName} {\n  box-shadow: ${style_1.CssParam.n.border.cvxSd};\n  border-radius: ${style_1.CssParam.n.r};\n  padding: ${style_1.CssParam.n.ccvSdPdd};\n  min-height: calc(${style_1.CssVar.size} + (${style_1.CssParam.n.sdPdd} + ${style_1.CssParam.n.ccvSdPdd}) * 2);\n}\n.${exports.captionClassName}.ccv {\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n}\n`:""}\n`});