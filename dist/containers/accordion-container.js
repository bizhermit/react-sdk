"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,a,n,s){void 0===s&&(s=n),Object.defineProperty(e,s,{enumerable:!0,get:function(){return a[n]}})}:function(e,a,n,s){void 0===s&&(s=n),e[s]=a[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,a){Object.defineProperty(e,"default",{enumerable:!0,value:a})}:function(e,a){e.default=a}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(a,e,n);return __setModuleDefault(a,e),a},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AccordionContainerStyle=exports.accordionContainerClassName=void 0;const react_1=__importStar(require("react")),icon_1=__importDefault(require("../graphics/icon")),controller_1=require("../hooks/controller"),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils"));exports.accordionContainerClassName="bh-acc_ctr";const AccordionContainer=e=>{const a=(0,react_1.useRef)(),[n,s]=(0,react_1.useState)(!1!==e.opened),t=a=>{if(!0===e.disabled)return;const t=a??!n;s(t),e.toggled?.(t)};return(0,controller_1.initController)(e.controller,(e=>{e.focus=()=>(a.current?.focus(),e),e.open=()=>(t(!0),e),e.close=()=>(t(!1),e),e.toggle=a=>(t(a),e)}),[e.toggled]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{ref:a,className:(0,classname_utils_1.className)(exports.accordionContainerClassName,classname_utils_1.default.fitToOuter(e.fitToOuter),e.className),style:e.style,"data-opened":n},react_1.default.createElement("div",{className:`${exports.accordionContainerClassName}-caption`,onClick:()=>t(),onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||t()},tabIndex:!0===e.disabled?null:0,"data-disabled":!0===e.disabled},!0===e.disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(icon_1.default,{image:n?"pullup":"pulldown"}),react_1.default.createElement("div",{className:`${exports.accordionContainerClassName}-caption_label`},e.caption)),n?react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.accordionContainerClassName}-body`},e.children):react_1.default.createElement(react_1.default.Fragment,null)),exports.AccordionContainerStyle)};exports.default=AccordionContainer,exports.AccordionContainerStyle=react_1.default.createElement(style_1.default,{id:exports.accordionContainerClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.accordionContainerClassName} {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  overflow: hidden;\n}\n${style_1.CssPV.fitToOuter(exports.accordionContainerClassName)}\n.${exports.accordionContainerClassName}[data-opened="false"] {\n  height: auto !important;\n}\n.${exports.accordionContainerClassName}-caption {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  user-select: none;\n  width: 100%;\n  height: ${style_1.CssVar.size};\n  z-index: 1;\n}\n.${exports.accordionContainerClassName}-caption[data-disabled="false"] {\n  cursor: pointer;\n}\n.${exports.accordionContainerClassName}-caption_label {\n  padding: 2px 10px 0px 10px;\n  flex: 1;\n  overflow: hidden;\n}\n.${exports.accordionContainerClassName}-body {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.f_y}\n  z-index: 0;\n}\n${"material"===e?`\n.${exports.accordionContainerClassName}-caption {\n  border: 1px solid ${style_1.CssVar.bdc};\n  box-shadow: ${style_1.CssParam.m.sdBtm};\n  border-radius: ${style_1.CssParam.m.r};\n  margin-top: ${style_1.CssParam.m.sdPdd};\n  margin-bottom: ${style_1.CssParam.m.sdPdd};\n  background: ${style_1.CssVar.bg.c_h};\n}\n.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover {\n  box-shadow: ${style_1.CssParam.m.sdBtm_f};\n  margin-top: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});\n  margin-bottom: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});\n}\n.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover:active {\n  box-shadow: none;\n  margin-top: calc(${style_1.CssParam.m.sdPdd} + ${style_1.CssParam.m.updownMargin});\n  margin-bottom: calc(${style_1.CssParam.m.sdPdd} - ${style_1.CssParam.m.updownMargin});\n}\n.${exports.accordionContainerClassName}[data-opened="true"] .${exports.accordionContainerClassName}-caption {\n  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;\n}\n.${exports.accordionContainerClassName}[data-opened="true"] .${exports.accordionContainerClassName}-caption::before {\n  box-sizing: border-box;\n  position: absolute;\n  content: "";\n  bottom: calc(${style_1.CssParam.m.sdPdd} * -2 - 1px);\n  left: -1px;\n  width: calc(100% + 2px);\n  height: calc(${style_1.CssParam.m.sdPdd} * 2 + 1px);\n  background: transparent;\n  border-left: 1px solid ${style_1.CssVar.bdc};\n  border-right: 1px solid ${style_1.CssVar.bdc};\n  z-index: 0;\n}\n.${exports.accordionContainerClassName}-body {\n  border-left: 1px solid ${style_1.CssVar.bdc};\n  border-bottom: 1px solid ${style_1.CssVar.bdc};\n  border-right: 1px solid ${style_1.CssVar.bdc};\n  border-radius: 0px 0px ${style_1.CssParam.m.r} ${style_1.CssParam.m.r};\n  z-index: 1;\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.accordionContainerClassName} {\n  padding: ${style_1.CssParam.n.sdPdd};\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n  background: ${style_1.CssParam.n.ccvBg};\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.accordionContainerClassName}-caption {\n  box-shadow: ${style_1.CssParam.n.cvxSd};\n  background: ${style_1.CssParam.n.headerCvxBg};\n  border-radius: ${style_1.CssParam.n.r};\n  margin-bottom: ${style_1.CssParam.n.sdPdd};\n}\n.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover {\n  box-shadow: ${style_1.CssParam.n.cvxSd_f};\n}\n.${exports.accordionContainerClassName}-caption[data-disabled="false"]:hover:active {\n  margin-top: 2px;\n  height: calc(${style_1.CssVar.size} - 2px);\n  background: ${style_1.CssParam.n.headerCcvBg};\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n}\n.${exports.accordionContainerClassName}[data-opened="false"] .${exports.accordionContainerClassName}-caption {\n  margin-bottom: 0px;\n}\n`:""}\n`});