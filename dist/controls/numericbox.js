"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.NumericBoxStyle=exports.numericBoxClassName=void 0;const number_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/number-utils")),string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),controller_1=require("../hooks/controller"),prop_1=__importDefault(require("../hooks/prop")),value_1=__importDefault(require("../hooks/value")),input_1=__importStar(require("../layouts/input")),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importDefault(require("../utils/classname-utils")),dom_utils_1=require("../utils/dom-utils");exports.numericBoxClassName="bh-nub";const NumericBox=e=>{const t=(0,react_1.useRef)(),r=(0,prop_1.default)(e.sign??""),n=(0,prop_1.default)(e.float??0),a=(0,react_1.useRef)(""),s=(0,prop_1.default)(e.incrementInterval??1),u=e=>number_utils_1.default.thousandsSeparator(e),o=s=>{if(""===s)return a.current="",d(null),"";let u=s,o=null;switch(r.current){case"only-positive":if(n.current>0){if(!new RegExp(`^[+-]?([0-9]*|0)(.[0-9]{0,${n.current}})?$`).test(s))return t.current.value=a.current;o=Number(s)}else{if(!/^[+-]?[0-9]*$/.test(s))return t.current.value=a.current;/^[+-]?[0-9]*|0$/.test(s)&&(o=Number(s))}break;case"only-negative":if(n.current>0){if(!new RegExp(`^[-]?([0-9]*|0)(.[0-9]{0,${n.current}})?$`).test(s))return t.current.value=a.current;o=Number(s)}else{if(!/^[-]?[0-9]*$/.test(s))return t.current.value=a.current;/^[-]?[0-9]*|0$/.test(s)&&(o=Number(s))}break;default:if(n.current>0){if(!new RegExp(`^[+-]?([0-9]*|0)(.[0-9]{0,${n.current}})?$`).test(s))return t.current.value=a.current;o=Number(s)}else{if(!/^[+-]?[0-9]*$/.test(s))return t.current.value=a.current;/^[+-]?[0-9]*|0$/.test(s)&&(o=Number(s))}}if(null!=o&&!isNaN(o)){let n=o;switch(null!=e.max&&(n=Math.min(n,e.max)),null!=e.min&&(n=Math.max(n,e.min)),r.current){case"only-positive":n=Math.max(0,n);break;case"only-negative":n=Math.min(0,n)}d(n),u=String(n),o!==n&&(t.current.value=u)}return a.current=u},i=e=>{const r=o(String(number_utils_1.default.add(m()??0,s.current)));!e||string_utils_1.default.isNullOrEmpty(r)?t.current.value=r:t.current.value=u(Number(r))},l=e=>{const r=o(String(number_utils_1.default.minus(m()??0,s.current)));!e||string_utils_1.default.isNullOrEmpty(r)?t.current.value=r:t.current.value=u(Number(r))},c=e=>{t.current&&(t.current.value=null==e?"":u(e))},{getValue:m,setValue:d,getTitle:p,getStatus:x}=(0,value_1.default)(e,{binded:c}),_=(0,dom_utils_1.horizontalResizeMousedown)(e),f=(0,react_1.useCallback)((e=>{e?i(!0):l(!0);let t=!0;const r=()=>{t=!1,window.removeEventListener("mouseup",r)};window.addEventListener("mouseup",r),setTimeout((()=>{const r=()=>{setTimeout((()=>{t&&(e?i(!0):l(!0),r())}),30)};r()}),500)}),[]);return(0,react_1.useEffect)((()=>{c(m())}),[e.disabled]),(0,controller_1.initController)(e.controller,(e=>{e.focus=()=>(t.current?.focus(),e),e.blur=()=>(t.current?.blur(),e),e.getValue=()=>m(),e.setValue=t=>(d(t),e)})),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:classname_utils_1.default.join(input_1.InputClassNames.wrap,exports.numericBoxClassName,e.className),style:e.style},e.disabled?react_1.default.createElement("span",{className:input_1.InputClassNames.lbl,"data-align":e.textAlign??"right",title:e.title},u(m())):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("input",{ref:t,className:input_1.InputClassNames.ipt,type:"text",inputMode:n.current>0?"decimal":"numeric",tabIndex:e.tabIndex,title:p(),placeholder:e.placeholder,max:e.max,min:e.min,onKeyDown:t=>{switch(t.key){case"ArrowUp":!1!==e.incrementWhenKeydown&&i();break;case"ArrowDown":!1!==e.incrementWhenKeydown&&l()}e.keydown?.(t)},onFocus:()=>{e.focus?.(m()),t.current.value=a.current=String(number_utils_1.default.removeThousandsSeparator(t.current.value,null)??"")},onBlur:()=>{t.current.value=u(m()),e.blur?.(m())},onChange:e=>o(e.currentTarget.value),"data-align":e.textAlign??"right","data-status":x()}),react_1.default.createElement("div",{className:`${exports.numericBoxClassName}-btns`},react_1.default.createElement("div",{className:`${exports.numericBoxClassName}-inc`,onMouseDown:()=>f(!0)}),react_1.default.createElement("div",{className:`${exports.numericBoxClassName}-dec`,onMouseDown:()=>f(!1)}))),!1===e.resize?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:input_1.InputClassNames.resize_x,onMouseDown:_})),input_1.default,exports.NumericBoxStyle)};exports.default=NumericBox,exports.NumericBoxStyle=react_1.default.createElement(style_1.default,{id:exports.numericBoxClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.numericBoxClassName}-btns {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  width: ${style_1.CssVar.size};\n  height: 100%;\n}\n.${exports.numericBoxClassName}-inc,\n.${exports.numericBoxClassName}-dec {\n  box-sizing: border-box;\n  position: relative;\n  width: 100%;\n  flex: 1;\n  cursor: pointer;\n}\n.${exports.numericBoxClassName}-inc::before,\n.${exports.numericBoxClassName}-dec::before {\n  box-sizing: border-box;\n  position: absolute;\n  content: "";\n  height: 40%;\n  width: 50%;\n  top: calc(25% + 1px);\n  left: 25%;\n  background-color: ${style_1.CssVar.fc};\n}\n.${exports.numericBoxClassName}-inc::before {\n  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);\n}\n.${exports.numericBoxClassName}-dec::before {\n  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);\n}\n${"material"===e?`\n.${exports.numericBoxClassName} > .${input_1.InputClassNames.ipt} {\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px;\n}\n.${exports.numericBoxClassName}-inc,\n.${exports.numericBoxClassName}-dec {\n  border: 1px solid ${style_1.CssVar.bdc};\n  background: ${style_1.CssVar.bg.c};\n  border-left: none;\n  z-index: 0;\n}\n.${exports.numericBoxClassName}-inc {\n  border-top-right-radius: ${style_1.CssParam.m.r};\n  margin-bottom: -1px;\n}\n.${exports.numericBoxClassName}-dec {\n  border-bottom-right-radius: ${style_1.CssParam.m.r};\n}\n.${exports.numericBoxClassName}-inc:hover,\n.${exports.numericBoxClassName}-dec:hover {\n  margin-top: -${style_1.CssParam.m.updownMargin};\n  margin-bottom: ${style_1.CssParam.m.updownMargin};\n  box-shadow: ${style_1.CssParam.m.sdBtm_f};\n  z-index: 1;\n}\n.${exports.numericBoxClassName}-inc:hover {\n  margin-bottom: calc(${style_1.CssParam.m.updownMargin} - 1px);\n}\n.${exports.numericBoxClassName}-inc:active,\n.${exports.numericBoxClassName}-dec:active {\n  margin-top: 0px;\n  margin-bottom: 0px;\n  box-shadow: none;\n}\n.${exports.numericBoxClassName}-inc:active {\n  border-bottom: none;\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.numericBoxClassName} > .${input_1.InputClassNames.ipt} {\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px;\n}\n.${exports.numericBoxClassName}-inc,\n.${exports.numericBoxClassName}-dec {\n  box-shadow: ${style_1.CssParam.n.cvxSd};\n  background: ${style_1.CssParam.n.cvxBg};\n  z-index: 0;\n}\n.${exports.numericBoxClassName}-inc {\n  border-top-right-radius: ${style_1.CssParam.n.r};\n  margin-top: -1px;\n}\n.${exports.numericBoxClassName}-dec {\n  border-bottom-right-radius: ${style_1.CssParam.n.r};\n}\n.${exports.numericBoxClassName}-inc:hover,\n.${exports.numericBoxClassName}-dec:hover {\n  box-shadow: ${style_1.CssParam.n.cvxSd_f};\n  z-index: 1;\n}\n.${exports.numericBoxClassName}-inc:active,\n.${exports.numericBoxClassName}-dec:active {\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n  background: ${style_1.CssParam.n.ccvBg};\n}\n.${exports.numericBoxClassName}-inc:active {\n  margin-top: 0px;\n  margin-bottom: -1px;\n}\n.${exports.numericBoxClassName}-dec:active::before {\n  top: calc(25% + 2px);\n}\n`:""}\n`});