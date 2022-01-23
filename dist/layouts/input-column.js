"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,s,n){void 0===n&&(n=s),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,n){void 0===n&&(n=s),e[n]=t[s]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&__createBinding(t,e,s);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.listViewInputColumnClassName=void 0;const react_1=__importDefault(require("react")),style_1=__importStar(require("./style"));exports.listViewInputColumnClassName="bh-lv_c-ipt";const ListViewInputColumnStyle=react_1.default.createElement(style_1.default,{id:exports.listViewInputColumnClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.listViewInputColumnClassName}-wrap {\n  ${style_1.CssPV.flex_r}\n  ${style_1.CssPV.fill}\n}\n${"material"===e?`\n.${exports.listViewInputColumnClassName} {\n  padding: 1.5px 1px 1.5px 1.5px;\n}\n.${exports.listViewInputColumnClassName}-wrap {\n  border: 1px solid ${style_1.CssVar.bdc};\n  border-radius: ${style_1.CssParam.m.r};\n}\n.${exports.listViewInputColumnClassName}[data-disabled="true"] .${exports.listViewInputColumnClassName}-wrap {\n  border-color: transparent;\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.listViewInputColumnClassName} {\n  padding: 1.5px 1px 1.5px 1.5px;\n}\n.${exports.listViewInputColumnClassName}-wrap {\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.listViewInputColumnClassName}[data-disabled="true"] .${exports.listViewInputColumnClassName}-wrap {\n  box-shadow: none;\n}\n`:""}\n`});exports.default=ListViewInputColumnStyle;