"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateFunctionKeyActions=exports.FnKeyContainerStyle=exports.useFunctionKey=exports.FunctionKeyContainer=exports.functionKeyContainerClassName=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),button_1=__importStar(require("../controls/button")),icon_1=__importDefault(require("../graphics/icon")),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils")),FunctionKeyContext=(0,react_1.createContext)({setFnKeyActions:()=>"",removeFnKeyActions:()=>{}});exports.functionKeyContainerClassName="bh-fnk_ctr";const FunctionKeyContainer=e=>{const t=(0,react_1.useRef)(),n=(0,react_1.useRef)(null==e.defaultActions?[]:[{id:string_utils_1.default.generateUuidV4(),actions:e.defaultActions}]),[a,s]=(0,react_1.useState)(0),{buttonNodes:r,buttonControllers:o}=(0,react_1.useMemo)((()=>{const t=[],a=[],s=n.current.length-1;for(let r=0;r<12;r++){let o=null;for(let e=s;e>=0&&(o=n.current[e]?.actions?.[r],null==o);e--);const l={};t.push(react_1.default.createElement(button_1.default,{controller:l,key:r,className:`${exports.functionKeyContainerClassName}-btn`,disabled:!0===o?.disabled||null==o?.click,title:o?.title,click:async t=>{!0===e.disabled?t():o?o?.click(t):t()}},react_1.default.createElement("div",{className:`${exports.functionKeyContainerClassName}-lbl-wrap`},react_1.default.createElement("div",{className:`${exports.functionKeyContainerClassName}-lbl-key`},`F${r+1}`),react_1.default.createElement("div",{className:`${exports.functionKeyContainerClassName}-lbl`},react_1.default.createElement(FunctionButtonLabel,{image:o?.image},o?.label??""))))),a.push(l)}return{buttonNodes:t,buttonControllers:a}}),[a]),l=(e,t)=>{o[t]?.click(),e.stopPropagation(),e.preventDefault()};return(0,react_1.useEffect)((()=>{null==t.current.querySelector("*:focus")&&t.current.focus()}),[]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(FunctionKeyContext.Provider,{value:{setFnKeyActions:e=>{const t=string_utils_1.default.generateUuidV4();return n.current.push({id:t,actions:e}),s((e=>e+1)),t},removeFnKeyActions:e=>{for(let t=0,a=n.current.length;t<a;t++)if(n.current[t].id===e){n.current.splice(t,1);break}s((e=>e+1))}}},react_1.default.createElement("div",{ref:t,className:(0,classname_utils_1.className)(exports.functionKeyContainerClassName,classname_utils_1.default.fitToOuter(e.fitToOuter),e.className),style:e.style,onKeyDown:e=>{switch(e.key){case"F1":l(e,0);break;case"F2":l(e,1);break;case"F3":l(e,2);break;case"F4":l(e,3);break;case"F5":l(e,4);break;case"F6":l(e,5);break;case"F7":l(e,6);break;case"F8":l(e,7);break;case"F9":case"F10":l(e,8);break;case"F11":l(e,10);break;case"F12":l(e,11)}},tabIndex:-1},react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.functionKeyContainerClassName}-content`,style:e.contentStyle},e.children),!1===e.buttonVisible?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${exports.functionKeyContainerClassName}-buttons`},r))),exports.FnKeyContainerStyle)};exports.FunctionKeyContainer=FunctionKeyContainer;const FunctionButtonLabel=({image:e,children:t})=>null==e?react_1.default.createElement(react_1.default.Fragment,null,t):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(icon_1.default,{image:e,className:`${exports.functionKeyContainerClassName}-btn-icon`}),t),useFunctionKey=(e,t)=>{const n=(0,react_1.useContext)(FunctionKeyContext);(0,react_1.useEffect)((()=>{const t=n.setFnKeyActions(e);return()=>{n.removeFnKeyActions(t)}}),t??[])};exports.useFunctionKey=useFunctionKey,exports.default=exports.useFunctionKey,exports.FnKeyContainerStyle=react_1.default.createElement(style_1.default,{id:exports.functionKeyContainerClassName,notDepsColor:!0,notDepsDesign:!0,css:()=>`\n.${exports.functionKeyContainerClassName} {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  outline: none;\n}\n${style_1.CssPV.fitToOuter(exports.functionKeyContainerClassName)}\n.${exports.functionKeyContainerClassName}-content {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.f_y}\n}\n.${exports.functionKeyContainerClassName}-buttons {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  width: 100%;\n  overflow: hidden;\n}\n.${button_1.buttonClassName}.${exports.functionKeyContainerClassName}-btn {\n  flex: 1;\n  flex-flow: column nowrap;\n  justify-content: center;\n  height: calc(${style_1.CssVar.size} * 2);\n}\n.${exports.functionKeyContainerClassName}-lbl-wrap {\n  ${style_1.CssPV.flex_c_c}\n  flex: none;\n  padding: 5px 0px;\n  align-items: center;\n  height: 100%;\n  overflow: hidden;\n}\n.${exports.functionKeyContainerClassName}-lbl-key {\n  box-sizing: border-box;\n  max-width: 100%;\n  min-height: 0px;\n  flex: none;\n  padding-top: 2px;\n}\n.${exports.functionKeyContainerClassName}-lbl {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  max-width: 100%;\n  overflow: hidden;\n  height: ${style_1.CssVar.size};\n}\n.${exports.functionKeyContainerClassName}-btn-icon {\n  height: calc(${style_1.CssVar.size} * 0.8);\n  width: calc(${style_1.CssVar.size} * 0.8);\n  margin-right: 3px;\n}\n`});const generateFunctionKeyActions=e=>{const t=[];for(let e=0;e<12;e++)t.push(null);if(null==e)return t;const n={set:(e,a)=>(t[Number(e.replace("F",""))-1]=a,n)};return e(n),t};exports.generateFunctionKeyActions=generateFunctionKeyActions;