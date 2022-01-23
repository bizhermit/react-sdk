"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,l,a){void 0===a&&(a=l),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[l]}})}:function(e,t,l,a){void 0===a&&(a=l),e[a]=t[l]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&__createBinding(t,e,l);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ListViewCheckBoxColumnStyle=exports.listViewCheckBoxClassName=void 0;const react_1=__importDefault(require("react")),style_1=__importStar(require("../../layouts/style")),dom_utils_1=require("../../utils/dom-utils"),checkbox_1=require("../checkbox"),listview_1=require("../listview");exports.listViewCheckBoxClassName="bh-lv_col-checkbox";const ListViewCheckBoxColumn=e=>{const t=e.checkedValue??!0,l=e.uncheckedValue??!1;let a=!1,s=null,i=null;const n=(a,s)=>{if("none"===s)return;const i=a.data[e.name],n=a.data[e.name]=i===t?l:t;if("cell"===s){a.getSelectedCells().forEach((t=>{t.columnName===e.name&&(t.data[t.columnName]=n)}))}else{a.getSelectedRows().forEach((t=>{t.data[e.name]=n}))}e.endedEdit?.({before:{value:i,checked:i===t},after:{value:a.data[e.name],checked:a.data[e.name]===t}},{columnName:e.name,data:a.data,index:a.rowNumber-1,id:a.id},!0)};return{...e,width:e.width??-1,sort:e.sort??!1,resize:e.resize??!1,cellTextAlign:e.cellTextAlign??"center",initialize:()=>{const t=document.createElement("div");return t.classList.add(`${checkbox_1.checkBoxClassName}-body`),t.setAttribute("data-disabled",String(!0===e.disabled)),{elem:t}},headerCellInitialize:(t,l)=>{t.headerCellElement.classList.add(`${exports.listViewCheckBoxClassName}-hcell`),i=(0,dom_utils_1.cloneElement)(t.headerCellLabelElement),t.headerCellLabelElement.classList.remove(`${listview_1.listViewClassName}-lbl`),t.headerCellLabelElement.classList.add(`${exports.listViewCheckBoxClassName}-header`),t.headerCellLabelElement.textContent="",t.headerCellLabelElement.appendChild(i),!0!==e.disabled&&!1!==e.batchCheck&&(t.headerCellLabelElement.appendChild(s=(0,dom_utils_1.cloneElement)(l.elem)),s.setAttribute("data-checked",String(a)),t.headerCellLabelElement.setAttribute("data-checkbox","true")),t.headerCellLabelElement=i,"string"==typeof e.headerCellLabel&&(t.headerCellLabelElement.textContent=e.headerCellLabel)},headerCellLabel:(l,n,r)=>{let c=!0;if(0===n.length)c=!1;else for(const l of n)if(l.data[e.name]!==t){c=!1;break}s?.setAttribute("data-checked",String(a=c)),"function"==typeof e.headerCellLabel&&e.headerCellLabel(i,n,r)},bindedItems:l=>{if(!1===e.batchCheck)return;let i=!0;if(0===l.length)i=!1;else for(const a of l)if(a[e.name]!==t){i=!1;break}s?.setAttribute("data-checked",String(a=i))},cellInitialize:(e,t)=>{e.element.classList.add(exports.listViewCheckBoxClassName);const l=(0,dom_utils_1.cloneElement)(t.elem);e.contentElements.push(l),e.element.appendChild(l)},cellRender:({contentElements:e,row:l,cache:a,column:s})=>{const i=l.item.data[s.name]===t;a[s.name]!==i&&e[0].setAttribute("data-checked",String(a[s.name]=i))},clickedHeaderCell:(i,n,r)=>{!0!==e.disabled&&!1!==e.batchCheck&&((a=!a)?n.forEach((e=>e.data[i]=t)):n.forEach((e=>e.data[i]=l)),s?.setAttribute("data-checked",String(a)),r())},_preventClearSelected:!0,clickedCell:(t,l)=>{if(!0!==e.disabled&&!0!==e.toggleCheckedWhenRowClicked&&!l?.ctrlKey&&!l?.shiftKey)return n(t,t.selectMode),{renderHeaderCell:!0,renderFooterCell:!0}},clickedRow:(t,l)=>{if(!0!==e.disabled&&!0===e.toggleCheckedWhenRowClicked&&!l?.ctrlKey&&!l?.shiftKey)return n(t,t.selectMode),{renderHeaderCell:!0,renderFooterCell:!0}},jsxStyle:react_1.default.createElement(react_1.default.Fragment,null,checkbox_1.CheckBoxStyle,exports.ListViewCheckBoxColumnStyle)}};exports.default=ListViewCheckBoxColumn,exports.ListViewCheckBoxColumnStyle=react_1.default.createElement(style_1.default,{id:exports.listViewCheckBoxClassName,notDepsColor:!0,notDepsDesign:!0,css:()=>`\n.${exports.listViewCheckBoxClassName} {\n  justify-content: center;\n}\n.${exports.listViewCheckBoxClassName}[data-disabled="false"] {\n  cursor: pointer;\n}\n.${exports.listViewCheckBoxClassName} > .${checkbox_1.checkBoxClassName}-body {\n  height: calc(${style_1.CssVar.size} * 0.9);\n  width: calc(${style_1.CssVar.size} * 0.9);\n}\n.${exports.listViewCheckBoxClassName}-header {\n  ${style_1.CssPV.flex_c_c}\n  flex: 1;\n}\n.${exports.listViewCheckBoxClassName}-header[data-checkbox="true"] {\n  cursor: pointer;\n}\n.${exports.listViewCheckBoxClassName}-hcell.bh-h-c > .${exports.listViewCheckBoxClassName}-header {\n  align-items: center;\n}\n.${exports.listViewCheckBoxClassName}-hcell.bh-h-r > .${exports.listViewCheckBoxClassName}-header {\n  align-items: flex-end;\n}\n`});