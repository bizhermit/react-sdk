"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,s,n){void 0===n&&(n=s),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,n){void 0===n&&(n=s),e[n]=t[s]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&__createBinding(t,e,s);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ButtonStyle=exports.buttonClassName=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),icon_1=__importStar(require("../graphics/icon")),controller_1=require("../hooks/controller"),style_1=__importStar(require("../layouts/style")),classname_utils_1=require("../utils/classname-utils");exports.buttonClassName="bh-btn";const Button=e=>{const t=(0,react_1.useRef)(),s=(0,react_1.useRef)(!1),n=n=>{s.current=!0===e.disabled,t.current&&(t.current.disabled=s.current,!0!==n&&t.current.focus())},a=()=>{s.current||(s.current=!0,t.current&&(t.current.disabled=!0),(async()=>{const s=e.click?.((e=>n(e)),t.current);null==s&&n()})())};return(0,controller_1.initController)(e.controller,(e=>{e.focus=()=>(t.current?.focus(),e),e.blur=()=>(t.current?.blur(),e),e.click=()=>a()})),(0,react_1.useEffect)((()=>{n(!0)}),[e.disabled]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:(0,classname_utils_1.className)(`${exports.buttonClassName}`,e.className),style:e.style,"data-icon":null!=e.image,"data-text":null!=e.children},react_1.default.createElement("button",{className:`${exports.buttonClassName}-body`,ref:t,onClick:a,tabIndex:e.tabIndex,title:e.title},null==e.image?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(icon_1.default,{image:e.image}),string_utils_1.default.isString(e.children)?react_1.default.createElement("span",{className:`${exports.buttonClassName}-lbl`},e.children):e.children??react_1.default.createElement(react_1.default.Fragment,null))),exports.ButtonStyle)};exports.default=Button,exports.ButtonStyle=react_1.default.createElement(style_1.default,{id:exports.buttonClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.buttonClassName} {\n  ${style_1.CssPV.flex_r_c}\n  flex: none;\n  overflow: visible;\n  height: ${style_1.CssVar.size};\n  min-width: ${style_1.CssVar.size};\n}\n.${exports.buttonClassName}-body {\n  ${style_1.CssPV.flex_r_c}\n  ${style_1.CssPV.fill}\n  border: none;\n  background: transparent;\n  color: inherit;\n  margin: 0px;\n  padding: 0px;\n  cursor: pointer;\n  user-select: none;\n  font-size: inherit;\n}\n.${exports.buttonClassName}[data-icon="true"][data-text="false"] {\n  width: ${style_1.CssVar.size};\n}\n.${exports.buttonClassName}-body > .${icon_1.iconClassName} {\n  height: calc(${style_1.CssVar.size} * 0.9);\n  width: calc(${style_1.CssVar.size} * 0.9);\n}\n.${exports.buttonClassName}-body:disabled {\n  opacity: 0.6;\n  cursor: inherit;\n  pointer-events: none;\n}\n.${exports.buttonClassName}-lbl {\n  ${style_1.CssPV.flex_r_c}\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  padding: 1px 10px 0px 10px;\n}\n.${icon_1.iconClassName} + .${exports.buttonClassName}-lbl {\n  padding-left: 5px;\n}\n${"material"===e?`\n.${exports.buttonClassName} {\n  padding: ${style_1.CssParam.m.sdPdd};\n  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);\n  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);\n}\n.${exports.buttonClassName}-body {\n  border: 1px solid ${style_1.CssVar.bdc};\n  box-shadow: ${style_1.CssParam.m.sdBtm};\n  border-radius: ${style_1.CssParam.m.r};\n  background: ${style_1.CssVar.bg.c};\n}\n.${exports.buttonClassName}-body:hover {\n  box-shadow: ${style_1.CssParam.m.sdBtm_f};\n  margin-top: -${style_1.CssParam.m.updownMargin};\n  margin-bottom: ${style_1.CssParam.m.updownMargin};\n}\n.${exports.buttonClassName}-body:hover:active,\n.${exports.buttonClassName}-body:disabled {\n  box-shadow: none;\n  margin-top: ${style_1.CssParam.m.updownMargin};\n  margin-bottom: -${style_1.CssParam.m.updownMargin};\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.buttonClassName} {\n  padding: ${style_1.CssParam.n.sdPdd};\n  min-width: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);\n  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);\n}\n.${exports.buttonClassName}-body {\n  box-shadow: ${style_1.CssParam.n.cvxSd};\n  background: ${style_1.CssParam.n.cvxBg};\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.buttonClassName}-body:hover {\n  box-shadow: ${style_1.CssParam.n.cvxSd_f};\n  z-index: 1;\n}\n.${exports.buttonClassName}-body:hover:active,\n.${exports.buttonClassName}-body:disabled {\n  padding-top: 1px;\n  margin-top: 1px;\n  height: calc(100% - 1px);\n  background: ${style_1.CssParam.n.ccvBg};\n}\n.${exports.buttonClassName}-body:hover:active {\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n}\n.${exports.buttonClassName}-body:disabled {\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n}\n`:""}\n`});