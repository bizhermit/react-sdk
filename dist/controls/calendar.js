"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,a,t,l){void 0===l&&(l=t),Object.defineProperty(e,l,{enumerable:!0,get:function(){return a[t]}})}:function(e,a,t,l){void 0===l&&(l=t),e[l]=a[t]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,a){Object.defineProperty(e,"default",{enumerable:!0,value:a})}:function(e,a){e.default=a}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(a,e,t);return __setModuleDefault(a,e),a},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CalendarStyle=exports.CalendarCellLabel=exports.calendarClassName=void 0;const react_1=__importStar(require("react")),react_2=require("react"),controller_1=__importStar(require("../hooks/controller")),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils")),button_1=__importDefault(require("./button")),datebox_1=__importDefault(require("./datebox"));exports.calendarClassName="bh-cal";const weekTextsJa=["日","月","火","水","木","金","土"],weekTextsEn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Calendar=e=>{const a=(0,react_2.useRef)(),[t,l]=(0,react_1.useState)(e.year??(new Date).getFullYear()),[s,r]=(0,react_1.useState)(e.month??(new Date).getMonth()),n=(0,controller_1.default)(),o=(0,react_1.useMemo)((()=>null==e.weekTexts||"ja"===e.weekTexts?weekTextsJa:"en"===e.weekTexts?weekTextsEn:7!==e.weekTexts.length?weekTextsJa:e.weekTexts),[e.weekTexts]),c=(0,react_1.useMemo)((()=>{const a=[];for(let t=0;t<7;t++){const l=(t+(e.startWeek??0))%7;a.push(react_1.default.createElement(DateCell,{key:l,weekNum:l},react_1.default.createElement(exports.CalendarCellLabel,null,o[l])))}return a}),[o,e.startWeek]),d=(0,react_1.useMemo)((()=>{const a=[];let l=new Date(t,s+1,0);const r=l.getDate();l.setDate(1),l.setMonth(s),l.setFullYear(t);const n=l.getDay(),o=e.startWeek??0;l.setDate(0);const c=l.getDate(),d=l.getFullYear(),m=l.getMonth();let u=(n-o+7)%7||7;7===u&&(u-=7);for(let t=0,l=u;t<l;t++){const l=c-u+t+1;a.push(react_1.default.createElement(DateCell,{key:`${d}${m}${l}`,weekNum:(o+t)%7,targetYM:!1},null==e.cellComponent?react_1.default.createElement(exports.CalendarCellLabel,null,l):react_1.default.createElement(e.cellComponent,{...e.cellComponentProps,date:new Date(d,m,l),targetYM:!1})))}const p=new Date;for(let l=0,o=r;l<o;l++)a.push(react_1.default.createElement(DateCell,{key:`${t}${s}${l}`,weekNum:(n+l)%7,today:l+1===p.getDate()&&s===p.getMonth()&&t===p.getFullYear()},null==e.cellComponent?react_1.default.createElement(exports.CalendarCellLabel,null,l+1):react_1.default.createElement(e.cellComponent,{...e.cellComponentProps,date:new Date(t,s,l+1),targetYM:!0})));l=new Date(t,s+1,1);const _=l.getDay(),C=l.getFullYear(),i=l.getMonth();u=7-a.length%7,7===u&&(u-=7);for(let t=0,l=u;t<l;t++)a.push(react_1.default.createElement(DateCell,{key:`${C}${i}${t}`,weekNum:(_+t)%7,targetYM:!1},null==e.cellComponent?react_1.default.createElement(exports.CalendarCellLabel,null,t+1):react_1.default.createElement(e.cellComponent,{...e.cellComponentProps,date:new Date(C,i,t+1),targetYM:!1})));return a}),[t,s,e.startWeek,e.cellComponent,e.cellComponentProps]);return(0,react_1.useEffect)((()=>{const a=new Date;l(e.year??a.getFullYear()),r(e.month??a.getMonth())}),[e.year,e.month]),(0,controller_1.initController)(e.controller,(e=>{e.focus=()=>(a.current?.querySelector("input,[tabindex]")?.focus(),e),e.blur=()=>(a.current?.querySelector(":focus")?.blur(),e),e.getDate=()=>n.getDate(),e.setDate=a=>(n.setDate(a),e)})),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{ref:a,className:(0,classname_utils_1.className)(exports.calendarClassName,classname_utils_1.default.fitToOuter(e.fitToOuter??"fill"),e.className),"data-disabled":!0===e.disabled},react_1.default.createElement("div",{className:`${exports.calendarClassName}-body`},react_1.default.createElement("div",{className:`${exports.calendarClassName}-ym`},!0===e.disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(button_1.default,{image:"pullleft",click:()=>{const e=new Date(t,s,1);e.setMonth(e.getMonth()-1),n.setDate(e)}}),react_1.default.createElement(datebox_1.default,{controller:n,dataType:"date",mode:"ym",defaultValue:new Date(t,s,1),clearButton:!1,disabled:e.disabled,changed:(a,t)=>{l(a.getFullYear()),r(a.getMonth()),e.changed?.(a,t)}}),!0===e.disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(button_1.default,{image:"pullright",click:()=>{const e=new Date(t,s,1);e.setMonth(e.getMonth()+1),n.setDate(e)}})),react_1.default.createElement("div",{className:`${exports.calendarClassName}-week`},c),react_1.default.createElement("div",{className:`${exports.calendarClassName}-date`,"data-rows":d.length/7},d))),exports.CalendarStyle)};exports.default=Calendar;const DateCell=e=>react_1.default.createElement("div",{className:`${exports.calendarClassName}-cell`,"data-week":e.weekNum??"","data-targetym":!1!==e.targetYM,"data-today":!0===e.today},e.children),CalendarCellLabel=({children:e})=>react_1.default.createElement("div",{className:`${exports.calendarClassName}-cell-lbl-wrap`},react_1.default.createElement("div",{className:`${exports.calendarClassName}-cell-lbl`},e));exports.CalendarCellLabel=CalendarCellLabel,exports.CalendarStyle=react_1.default.createElement(style_1.default,{id:exports.calendarClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.calendarClassName} {\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.${exports.calendarClassName}-body {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.fill}\n  overflow: hidden;\n}\n.${exports.calendarClassName}-ym {\n  ${style_1.CssPV.flex_r_c}\n  flex: none;\n  width: 100%;\n}\n.${exports.calendarClassName}-week {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  width: 100%;\n  height: ${style_1.CssVar.size};\n  overflow: hidden;\n}\n.${exports.calendarClassName}-date {\n  ${style_1.CssPV.flex}\n  flex-flow: row wrap;\n  justify-content: center;\n  align-items: center;\n  ${style_1.CssPV.f_y}\n}\n.${exports.calendarClassName}-cell {\n  ${style_1.CssPV.flex_c_c}\n  flex: none;\n  overflow: hidden;\n  height: 16.666%;\n  width: 14.285%;\n}\n.${exports.calendarClassName}-date[data-rows="5"] .${exports.calendarClassName}-cell {\n  height: 20%;\n}\n.${exports.calendarClassName}-date[data-rows="4"] .${exports.calendarClassName}-cell {\n  height: 25%;\n}\n.${exports.calendarClassName}-cell-lbl-wrap {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.fill}\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl-wrap {\n  justify-content: center;\n  align-items: center;\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl {\n  width: 100%;\n}\n.${exports.calendarClassName}-cell-lbl {\n  box-sizing: border-box;\n  padding-top: 2px;\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-height: 100%;\n  max-width: 100%;\n  text-align: center;\n  height: ${style_1.CssVar.size};\n  width: ${style_1.CssVar.size};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {\n  height: 100%;\n}\n.${exports.calendarClassName}-cell[data-week="0"] {\n  background: ${style_1.CssVar.w_sun.bg};\n}\n.${exports.calendarClassName}-cell[data-week="6"] {\n  background: ${style_1.CssVar.w_sat.bg};\n}\n.${exports.calendarClassName}-cell[data-targetym="false"] .${exports.calendarClassName}-cell-lbl {\n  opacity: 0.5;\n}\n${"material"===e?`\n.${exports.calendarClassName}-body {\n  border-radius: ${style_1.CssParam.m.r};\n}\n.${exports.calendarClassName}-week {\n  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;\n  border-bottom: 1px solid ${style_1.CssVar.bdc};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {\n  background: ${style_1.CssVar.bg.c_h};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="0"] {\n  background: ${style_1.CssVar.w_sun.bg};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="6"] {\n  background: ${style_1.CssVar.w_sat.bg};\n}\n.${exports.calendarClassName}-cell {\n  padding: ${style_1.CssParam.m.sdPdd};\n}\n.${exports.calendarClassName}-cell-lbl-wrap {\n  border-radius: ${style_1.CssParam.m.r};\n}\n.${exports.calendarClassName}-date .${exports.calendarClassName}-cell-lbl-wrap {\n  border: 1px solid ${style_1.CssVar.bdc};\n}\n.${exports.calendarClassName}-date .${exports.calendarClassName}-cell:hover .${exports.calendarClassName}-cell-lbl-wrap {\n  margin-top: -${style_1.CssParam.m.updownMargin};\n  margin-bottom: ${style_1.CssParam.m.updownMargin};\n  box-shadow: ${style_1.CssParam.m.sdBtm};\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.calendarClassName} {\n  padding: ${style_1.CssParam.n.ccvSdPdd};\n}\n.${exports.calendarClassName}-body {\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.calendarClassName}-week {\n  border-radius: ${style_1.CssParam.n.r} ${style_1.CssParam.n.r} 0px 0px;\n}\n.${exports.calendarClassName}-date {\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell {\n  background: ${style_1.CssParam.n.headerCvxBg};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="0"] {\n  background: ${style_1.CssVar.w_sun.bg};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell[data-week="6"] {\n  background: ${style_1.CssVar.w_sat.bg};\n}\n.${exports.calendarClassName}-week .${exports.calendarClassName}-cell-lbl-wrap {\n  box-shadow: ${style_1.CssParam.n.border.cvxSd};\n}\n.${exports.calendarClassName}-cell {\n  padding: calc(${style_1.CssParam.n.sdPdd} / 2);\n}\n.${exports.calendarClassName}-cell-lbl-wrap {\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.calendarClassName}-date .${exports.calendarClassName}-cell:hover .${exports.calendarClassName}-cell-lbl-wrap {\n  box-shadow: ${style_1.CssParam.n.border.cvxSd};\n  margin: 10px;\n}\n`:""}\n`});