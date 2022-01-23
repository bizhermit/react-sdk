"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,n){void 0===n&&(n=a),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,n){void 0===n&&(n=a),e[n]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0}),exports.TabContainerStyle=exports.tabContainerClassName=void 0;const react_1=__importStar(require("react")),controller_1=require("../hooks/controller"),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils"));exports.tabContainerClassName="bh-tab_ctr";const TabContainer=e=>{const t=(0,react_1.useRef)(),a=t=>e.contents.find((e=>e.code===t))??e.contents[0],[n,s]=(0,react_1.useState)(a(e.defaultCode)),r=(0,react_1.useMemo)((()=>({})),[]),o=e=>s(a(e));return(0,controller_1.initController)(e.controller,(e=>{e.selectTab=t=>(o(t),e)})),(0,react_1.useEffect)((()=>{n?.selected?.(),e.selected?.(n?.code)}),[n]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{style:e.style,className:(0,classname_utils_1.className)(exports.tabContainerClassName,classname_utils_1.default.fitToOuter(e.fitToOuter),e.className)},react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.tabContainerClassName}-tab_list`,"data-fill":!0===e.tabFill},(0,react_1.useMemo)((()=>{const t=[];return e.contents.forEach((e=>t.push(react_1.default.createElement("div",{key:e.code,className:(0,classname_utils_1.className)(`${exports.tabContainerClassName}-tab`,e.code===n.code?"bh-selected":""),onClick:()=>o(e.code)},e.title)))),t}),[e.contents,n])),react_1.default.createElement("div",{className:`${exports.tabContainerClassName}-content-wrap`},react_1.default.createElement("div",{className:`${exports.tabContainerClassName}-content`,style:n.style},null==n?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(n.component,{...n.props,ma:{_fetchMask:()=>t.current},tcc:r})),react_1.default.createElement("div",{className:`${exports.tabContainerClassName}-mask`,ref:t}))),exports.TabContainerStyle)};exports.default=TabContainer,exports.TabContainerStyle=react_1.default.createElement(style_1.default,{id:exports.tabContainerClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.tabContainerClassName} {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  overflow: hidden;\n}\n${style_1.CssPV.fitToOuter(exports.tabContainerClassName)}\n.${exports.tabContainerClassName}-tab_list {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  overflow-x: auto;\n  overflow-x: overlay;\n  overflow-y: hidden;\n  width: 100%;\n  height: ${style_1.CssVar.size};\n  z-index: 1;\n}\n.${exports.tabContainerClassName}-tab_list::-webkit-scrollbar:hover {\n  max-height: 6px;\n}\n.${exports.tabContainerClassName}-tab {\n  ${style_1.CssPV.flex_r_c}\n  flex: none;\n  user-select: none;\n  cursor: pointer;\n  padding: 2px 10px 0px 10px;\n  white-space: nowrap;\n  height: 100%;\n}\n.${exports.tabContainerClassName}-tab.bh-selected {\n  cursor: inherit;\n}\n.${exports.tabContainerClassName}-tab_list[data-fill="true"] .${exports.tabContainerClassName}-tab {\n  flex: 1;\n}\n.${exports.tabContainerClassName}-tab_list[data-fill="false"] .${exports.tabContainerClassName}-tab {\n  flex: none;\n}\n.${exports.tabContainerClassName}-content-wrap {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.f_y}\n  z-index: 0;\n}\n.${exports.tabContainerClassName}-content {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.fill}\n  z-index: 0;\n}\n.${exports.tabContainerClassName}-mask {\n  z-index: 1;\n}\n${"material"===e?`\n.${exports.tabContainerClassName}-tab_list {\n  background: ${style_1.CssVar.bg.dc};\n  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.updownMargin});\n}\n.${exports.tabContainerClassName}-tab {\n  border: 1px solid transparent;\n  border-top-width: 3px;\n  background: transparent;\n  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;\n}\n.${exports.tabContainerClassName}-tab:not(.bh-selected):hover {\n  margin-top: calc(3px - ${style_1.CssParam.m.updownMargin});\n  margin-bottom: ${style_1.CssParam.m.updownMargin};\n  height: calc(100% - 3px);\n  border-top-width: 1px;\n  border-color: ${style_1.CssVar.bdc};\n  box-shadow: ${style_1.CssParam.m.sdBtm_f};\n}\n.${exports.tabContainerClassName}-tab:not(.bh-selected):hover:active {\n  margin-bottom: 0px;\n  border-top-width: 3px;\n  box-shadow: none;\n}\n.${exports.tabContainerClassName}-tab.bh-selected {\n  border-top-color: ${style_1.CssVar.bg.c_a};\n  background: ${style_1.CssVar.bg.c};\n}\n`:""}\n${"neumorphism"===e?`\n .${exports.tabContainerClassName}-tab_list {\n  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);\n  padding: ${style_1.CssParam.n.sdPdd};  \n}\n .${exports.tabContainerClassName}-tab {\n  height: ${style_1.CssVar.size};\n  box-shadow: ${style_1.CssParam.n.cvxSd};\n  background: ${style_1.CssParam.n.cvxBg};\n  z-index: 1;\n}\n .${exports.tabContainerClassName}-tab:first-child {\n  border-top-left-radius: ${style_1.CssParam.n.r};\n  border-bottom-left-radius: ${style_1.CssParam.n.r}\n}\n .${exports.tabContainerClassName}-tab:last-child {\n  border-top-right-radius: ${style_1.CssParam.n.r};\n  border-bottom-right-radius: ${style_1.CssParam.n.r}\n}\n .${exports.tabContainerClassName}-tab:not(.bh-selected):hover {\n  box-shadow: ${style_1.CssParam.n.cvxSd_f};\n  background: ${style_1.CssParam.n.cvxBg};\n  z-index: 2;\n}\n .${exports.tabContainerClassName}-tab:hover:active,\n .${exports.tabContainerClassName}-tab.bh-selected {\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n  padding-top: 3px;\n  margin-top: 2px;\n  height: calc(100% - 1px);\n  margin-bottom: 1px;\n  z-index: 0;\n}\n .${exports.tabContainerClassName}-tab:hover:active {\n  background: ${style_1.CssParam.n.ccvBg};\n}\n .${exports.tabContainerClassName}-tab.bh-selected {\n  background: ${style_1.CssParam.n.accent.ccvBg};\n}\n`:""}\n`});