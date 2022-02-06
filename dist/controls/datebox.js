"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.DateBoxStyle=exports.dateBoxClassName=void 0;const datetime_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/datetime-utils")),react_1=__importStar(require("react")),icon_1=__importDefault(require("../graphics/icon")),controller_1=require("../hooks/controller"),popup_1=__importDefault(require("../hooks/popup")),prop_1=__importDefault(require("../hooks/prop")),value_1=__importDefault(require("../hooks/value")),input_1=__importStar(require("../layouts/input")),style_1=__importStar(require("../layouts/style")),classname_utils_1=require("../utils/classname-utils"),datepicker_1=__importDefault(require("./datepicker"));exports.dateBoxClassName="bh-dtb";const DateBox=e=>{const t=(0,react_1.useRef)(),r=(0,react_1.useRef)(),a=(0,react_1.useRef)(),n=(0,react_1.useRef)(),l=(0,popup_1.default)(datepicker_1.default),u=(0,prop_1.default)(e.mode??"ymd"),s=(0,react_1.useRef)((()=>{let t=null;return e.bind&&(t=datetime_utils_1.default.convert(e.bind[e.name])),null==t&&(t=new Date),"ymd"!==u.current&&t.setDate(1),"y"===u.current&&t.setMonth(0),{y:t?.getFullYear()??null,m:t?.getMonth()??null,d:t?.getDate()??null}})()),c=(0,value_1.default)(e,{binded:e=>y(e)}),o=()=>{if(null!=s.current.y||"y"!==u.current&&null!=s.current.m||"y"!==u.current&&"ym"!==u.current&&null!=s.current.d){const t=new Date;t.setMonth(0),t.setDate(1);const r=s.current.y??t.getFullYear();t.setFullYear(r);const a=s.current.m??t.getMonth();t.setMonth(a);const n=s.current.d??t.getDay();switch(t.setDate(n),e.dataType){case"date":const r=c.getValue(),a=datetime_utils_1.default.convert(r);if("y"===u.current){if(a.getFullYear()===t.getFullYear())return}else if("ym"===u.current){if(a.getMonth()===t.getMonth()&&a.getFullYear()===t.getFullYear())return}else if(a.getDate()===t.getDate()&&a.getMonth()===t.getMonth()&&a.getFullYear()===t.getFullYear())return;c.setValue(new Date(t));break;case"number":const n=datetime_utils_1.default.format(t,"yyyyMMdd");c.setValue(""===n?null:Number(n));break;default:c.setValue(datetime_utils_1.default.format(t,e.dataFormat??"yyyy-MM-dd"))}}else c.setValue(null)},i=()=>{""===r.current?.value?r.current.focus():""===a.current?.value?a.current.focus():""===n.current?.value||"ymd"===u.current?n.current.focus():"ym"===u.current?a.current.focus():r.current.focus()},d=(0,react_1.useCallback)((e=>{l.hide(e)}),[]),m=()=>{!0===e.disabled||l.isShowed()||l.show(t.current,{componentProps:{name:"value",bind:{value:c.getValue()},mode:u.current,clickNegative:()=>{i(),l.hide(!0)},clickPositive:e=>{y(e),o(),i(),d(!0)}},hideCallback:()=>{const e=document.activeElement;if(e===r.current||e===a.current||e===n.current)return!1}})},p=()=>{m()},_=t=>{t.target.select(),l.isShowed()||(m(),e.focus?.(c.getValue()))},f=()=>{r.current.value="","y"!==u.current&&(a.current.value=""),"ymd"===u.current&&(n.current.value=""),c.setValue(null)},y=e=>{const t=datetime_utils_1.default.convert(e);if(null==t)f();else{if(null==r.current)return;r.current.value=String(s.current.y=t.getFullYear()),"y"!==u.current&&(a.current.value=String((s.current.m=t.getMonth())+1)),"ymd"===u.current&&(n.current.value=String(s.current.d=t.getDate()))}};return(0,react_1.useEffect)((()=>{y(c.getValue())}),[e.disabled]),(0,controller_1.initController)(e.controller,(e=>{e.focus=()=>(i(),e),e.blur=()=>(t.current?.blur(),e),e.getValue=()=>c.getValue(),e.setValue=t=>(y(t),o(),e),e.getDate=()=>datetime_utils_1.default.convert(c.getValue()),e.setDate=t=>(y(t),o(),e)})),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{ref:t,style:e.style,className:(0,classname_utils_1.className)(input_1.InputClassNames.wrap,exports.dateBoxClassName,e.className),"data-disabled":!0===e.disabled,"data-required":e.required,"data-mode":u.current,onBlur:t=>{t.relatedTarget!==r.current&&t.relatedTarget!==a.current&&t.relatedTarget!==n.current&&(l.isShowed()||(d(!0),y(c.getValue()),e.blur?.(c.getValue())))}},!0===e.disabled?react_1.default.createElement("span",{className:input_1.InputClassNames.lbl,title:e.title},(t=>{const r=datetime_utils_1.default.convert(t);return"function"==typeof e.labelFormat?e.labelFormat(r):datetime_utils_1.default.format(r,e.labelFormat??("y"===u.current?"yyyy":"ym"===u.current?"yyyy/MM":"yyyy/MM/dd"))})(c.getValue())):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:`${exports.dateBoxClassName}-ipts`,title:e.title},react_1.default.createElement("input",{ref:r,className:`${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-y`,type:"text",onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?(s.current.y=""==t?null:Number(t),4===t.length&&a.current?.focus()):r.current.value=String(s.current.y??""));var t},maxLength:4,onFocus:_,onClick:p,onKeyDown:t=>{if("Tab"===t.key)(t.shiftKey||"y"===u.current)&&setTimeout((()=>d()),0),o(),y(c.getValue()),e.blur?.(c.getValue())}}),"y"!==u.current?react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("span",null,"/"),react_1.default.createElement("input",{ref:a,className:`${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-m`,type:"text",onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?(s.current.m=""==t?null:Number(t)-1,2===t.length||Number(t)>1?n.current?.focus():0===t.length&&r.current.focus()):a.current.value=String(s.current.m??""));var t},maxLength:2,onFocus:_,onClick:p,onKeyDown:t=>{if("Tab"===t.key){if("ymd"===u.current)return;t.shiftKey||setTimeout((()=>d()),0),o(),y(c.getValue()),e.blur?.(c.getValue())}}})):react_1.default.createElement(react_1.default.Fragment,null),"ymd"===u.current?react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("span",null,"/"),react_1.default.createElement("input",{ref:n,className:`${input_1.InputClassNames.ipt} ${exports.dateBoxClassName}-ipt-d`,type:"text",onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?(s.current.d=""==t?null:Number(t),0===t.length&&a.current?.focus()):n.current.value=String(s.current.d??""));var t},maxLength:2,onFocus:_,onClick:p,onKeyDown:t=>{if("Tab"===t.key){if(t.shiftKey)return;setTimeout((()=>d()),0),o(),y(c.getValue()),e.blur?.(c.getValue())}}})):react_1.default.createElement(react_1.default.Fragment,null)),!1===e.pulldownButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${!1===e.clearButton?input_1.InputClassNames.btn:input_1.InputClassNames.btn_bt} ${exports.dateBoxClassName}-pulldown`,onClick:()=>{"ymd"===u.current?n.current.focus():"ym"===u.current?a.current.focus():r.current.focus()},tabIndex:-1},react_1.default.createElement(icon_1.default,{image:"calendar"})),!1===e.clearButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${input_1.InputClassNames.btn} ${exports.dateBoxClassName}-clear`,onClick:f,tabIndex:-1},react_1.default.createElement(icon_1.default,{image:"close"})))),input_1.default,exports.DateBoxStyle)};exports.default=DateBox;const isNumericOrEmpty=e=>""===e||/^[0-9]+$/.test(e);exports.DateBoxStyle=react_1.default.createElement(style_1.default,{id:exports.dateBoxClassName,notDepsColor:!0,css:({design:e})=>`\n.${input_1.InputClassNames.wrap}.${exports.dateBoxClassName} {\n  width: unset;\n}\n.${exports.dateBoxClassName}-ipts {\n  box-sizing: border-box;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding-top: 1px;\n}\n.${exports.dateBoxClassName}-ipts > input {\n  flex: none;\n  text-align: center;\n  padding: 1px 2px 0px 2px;\n}\n.${exports.dateBoxClassName}-ipt-y {\n  width: 46px;\n}\n.${exports.dateBoxClassName}-ipt-m,\n.${exports.dateBoxClassName}-ipt-d {\n  width: 28px;\n}\n${"material"===e?`\n.${exports.dateBoxClassName}-ipts {\n  border: 1px solid ${style_1.CssVar.bdc};\n  border-radius: ${style_1.CssParam.m.r} 0px 0px ${style_1.CssParam.m.r};\n}\n.${exports.dateBoxClassName}-ipts:last-child {\n  border-radius: ${style_1.CssParam.m.r};\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.dateBoxClassName}-ipts {\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n  background: ${style_1.CssParam.n.ccvBg};\n  padding: ${style_1.CssParam.n.ccvSdPdd} 0px 0px ${style_1.CssParam.n.ccvSdPdd};\n  border-radius: ${style_1.CssParam.n.r} 0px 0px ${style_1.CssParam.n.r};\n}\n.${exports.dateBoxClassName}-ipts:last-child {\n  border-radius: ${style_1.CssParam.n.r};\n}\n`:""}\n`});