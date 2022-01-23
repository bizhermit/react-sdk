"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,l,i){void 0===i&&(i=l),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[l]}})}:function(e,t,l,i){void 0===i&&(i=l),e[i]=t[l]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&__createBinding(t,e,l);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ListViewNumericBoxColumnStyle=exports.listViewNumericBoxColumnClassName=void 0;const number_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/number-utils")),react_1=__importStar(require("react")),react_dom_1=__importDefault(require("react-dom")),controller_1=__importDefault(require("../../hooks/controller")),input_column_1=__importStar(require("../../layouts/input-column")),style_1=__importStar(require("../../layouts/style")),listview_1=require("../listview"),numericbox_1=__importDefault(require("../numericbox"));exports.listViewNumericBoxColumnClassName="bh-lv_c-nub";const ListViewNumericBoxColumn=e=>{let t={value:null};const l=e.labelDataName??`_lbl_${e.name}`;return{...e,name:l,dataType:"number",initialize:()=>(0,listview_1.createListViewEditColumnElement)(),cellInitialize:(e,t)=>{e.element.classList.add(input_column_1.listViewInputColumnClassName,exports.listViewNumericBoxColumnClassName);const l=(0,listview_1.cloneListViewEditColumnElement)(t);l.wrapElem.appendChild(l.lblElem),e.element.appendChild(l.wrapElem),e.contentElements.push(l.lblElem)},bindedItems:t=>{t.forEach((t=>t[l]=number_utils_1.default.thousandsSeparator(t[e.name])))},_beginEdit:({target:l,editElement:i,styleCtx:r})=>{!0!==e.disabled&&react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider,{value:r},react_1.default.createElement(NumericBoxColumn,{bind:t={value:l.data[l.columnName]??""},options:e.numericBoxOptions})),i,(()=>{e.beganEdit?.(l.data[l.columnName],l)}))},_endEdit:(i,r,a)=>{const n={value:i.data[e.name],label:i.data[l]},u=t.value;let o="";r&&(i.data[e.name]=u,i.data[l]=o=number_utils_1.default.thousandsSeparator(u)),react_dom_1.default.unmountComponentAtNode(a),e.endedEdit?.({before:n,after:r?{value:u,label:o}:n},i,r)},jsxStyle:react_1.default.createElement(react_1.default.Fragment,null,input_column_1.default,exports.ListViewNumericBoxColumnStyle)}};exports.default=ListViewNumericBoxColumn;const NumericBoxColumn=({bind:e,options:t})=>{const l=(0,controller_1.default)();return(0,react_1.useEffect)((()=>{l.focus()}),[]),react_1.default.createElement(numericbox_1.default,{controller:l,name:"value",bind:e,...t,style:{height:"100%",width:"100%"},resize:!1})};exports.ListViewNumericBoxColumnStyle=react_1.default.createElement(style_1.default,{id:exports.listViewNumericBoxColumnClassName,notDepsColor:!0,notDepsDesign:!0,css:()=>"\n"});