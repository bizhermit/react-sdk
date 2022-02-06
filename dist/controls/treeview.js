"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.TreeViewStyle=exports.treeViewClassName=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),icon_1=__importStar(require("../graphics/icon")),input_1=__importStar(require("../layouts/input")),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils")),checkbox_1=require("./checkbox");exports.treeViewClassName="bh-trv";const TreeView=e=>{const t=(0,react_1.useRef)(),a=(0,react_1.useRef)({id:e.idDataName??"id",parentId:e.parentIdDataName??"parentId",label:e.labelDataName??"label",checked:e.checkedDataName??"checked"}),s=(0,react_1.useRef)({checked:e.checkedValue??!0,unchecked:e.uncheckedValue??!1}),[r,l]=(0,react_1.useState)([]),[n,c]=(0,react_1.useState)([]),i=(0,react_1.useMemo)((()=>({clicked:(t,a)=>{!0===e.checkWhenLabelClicked&&t.toggleChecked(),e.itemClicked?.(t.data,a)}})),[e.checkBox]),o=(0,react_1.useMemo)((()=>{const t=[];return n.forEach((a=>{a.nestLevel=0,t.push(react_1.default.createElement(TreeViewItem,{key:a.id,...a,callbacks:i,disabled:!0===e.disabled}))})),t}),[n,e.disabled,e.checkBox]);return(0,react_1.useEffect)((()=>{if(null==e.items)return void l([]);const t=[],r=(t,r)=>{const l={id:r,label:t[a.current.label]??"",appearance:e.labelAppearance??"label",checkBox:!0===e.checkBox,children:[],data:t,checked:t[a.current.checked]===s.current.checked,visible:!0,toggleChecked:(r,n)=>{let c=r;if(null==r?c=(t[a.current.checked]=t[a.current.checked]===s.current.checked?s.current.unchecked:s.current.checked)===s.current.checked:t[a.current.checked]=r?s.current.checked:s.current.unchecked,l.toggleCheckedCallback?.(l.checked=c),!1===e.checkPropagation)return c;const i=()=>{if(null!=l.parent)if(c){let e=!0;for(const t of l.parent.children)if(!t.checked){e=!1;break}l.parent.checked!==e&&l.parent.toggleChecked(e,"p")}else l.parent.toggleChecked(!1,"p")},o=()=>{l.children.forEach((e=>e.toggleChecked(e.checked=c,"c")))};switch(n){case"p":i();break;case"c":o();break;default:i(),o()}return c},setToggleCheckedCallback:e=>l.toggleCheckedCallback=e,setToggleVisible:e=>l.toggleVisible=e};return l};if(e.grouping){const s={};for(const l of e.items){let n=0,c=s,i=null;for(const s of e.grouping){const o=l[s.dataName];let d=c[o];if(!d){let u=o;s.labelDataName&&(u="function"==typeof s.labelDataName?s.labelDataName(l):l[s.labelDataName]);const p={};p[a.current.label]=u,d={item:r(p,`${s.id}_${o}`),map:{}},e.groupingLabelAppearance&&(d.item.appearance=e.groupingLabelAppearance),c[o]=d,0===n?t.push(d.item):(i.children.push(d.item),d.item.parent=i)}i=d.item,c=d.map,n++}const o=r(l,l[a.current.id]??string_utils_1.default.generateUuidV4());o.nestLevel=n,null==i?t.push(o):(i.children.push(o),o.parent=i)}}else{const s={};for(const t of e.items){const e=t[a.current.id]??string_utils_1.default.generateUuidV4();s[e]=r(t,e)}Object.keys(s).forEach((e=>{const t=s[e],r=t.data[a.current.parentId];string_utils_1.default.isEmpty(r)||(t.parent=s[r],null!=t.parent&&t.parent.children.push(t))})),Object.keys(s).forEach((e=>{null==s[e].parent&&t.push(s[e])}))}l(t)}),[e.items,e.checkBox]),(0,react_1.useEffect)((()=>{const t=r;if("function"==typeof e.filter){const a=t=>{if(0===t.length)return!1;let s=!1;for(let r=t.length-1;r>=0;r--){const l=t[r];l.visible=a(l.children)||e.filter(l.data),l.toggleVisible?.(l.visible),s=s||l.visible}return s};a(t)}c(t)}),[r,e.filter]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{ref:t,style:e.style,className:(0,classname_utils_1.className)(exports.treeViewClassName,classname_utils_1.default.fitToOuter(e.fitToOuter),e.className),"data-disabled":!0===e.disabled},react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.treeViewClassName}-body`},o)),input_1.default,checkbox_1.CheckBoxStyle,exports.TreeViewStyle)};exports.default=TreeView;const TreeViewItem=e=>{const[t,a]=(0,react_1.useState)(!1),[s,r]=(0,react_1.useState)(!1),[l,n]=(0,react_1.useState)(e.visible),[c,i]=(0,react_1.useState)(e.checked),o=(0,react_1.useMemo)((()=>{const t=[];return s?(e.children.forEach((a=>{a.nestLevel=e.nestLevel+1,t.push(react_1.default.createElement(TreeViewItem,{key:a.id,...a,callbacks:e.callbacks,disabled:e.disabled}))})),t):t}),[s,e.children,e.disabled,e.checkBox]);return(0,react_1.useEffect)((()=>{t&&r(!0)}),[t]),(0,react_1.useEffect)((()=>{e.setToggleCheckedCallback((e=>{i(!0===e)})),e.setToggleVisible((e=>{n(null!=e?e:e=>!e)}))}),[e.checkBox]),react_1.default.createElement("div",{className:`${exports.treeViewClassName}-item-wrap`,"data-nest":e.nestLevel,style:{display:l?null:"none"}},react_1.default.createElement("div",{className:`${exports.treeViewClassName}-item`,style:{top:`calc(${style_1.CssVar.size} * ${e.nestLevel})`}},react_1.default.createElement("div",{className:`${exports.treeViewClassName}-toggle`},0===e.children.length?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:input_1.InputClassNames.btn_o,onClick:()=>{e.children.length>0&&a((e=>!e))}},react_1.default.createElement(icon_1.default,{image:t?"minus":"add"}))),e.checkBox?react_1.default.createElement("div",{className:`${exports.treeViewClassName}-checkbox ${checkbox_1.checkBoxClassName}-body`,"data-checked":c,"data-disabled":e.disabled,onClick:()=>{e.disabled||i(e.toggleChecked())}}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("div",{className:`${exports.treeViewClassName}-label${"anchor"===e.appearance?" bh-anchor":""}`,onClick:t=>{e.callbacks.clicked(e,t)}},react_1.default.createElement("div",{className:input_1.InputClassNames.lbl},e.label))),0===e.children.length?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${exports.treeViewClassName}-children`,style:{display:t?null:"none"}},o))};exports.TreeViewStyle=react_1.default.createElement(style_1.default,{id:exports.treeViewClassName,notDepsColor:!0,css:({design:e})=>`\n.${exports.treeViewClassName} {\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden;\n}\n${style_1.CssPV.fitToOuter(exports.treeViewClassName)}\n.${exports.treeViewClassName}-body {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.fill}\n}\n.${exports.treeViewClassName}-item-wrap {\n  ${style_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: stretch;\n  flex: none;\n  width: 100%;\n}\n.${exports.treeViewClassName}-item {\n  box-sizing: border-box;\n  position: sticky;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  top: 0px;\n  overflow: visible;\n  z-index: 1;\n  width: 100%;\n  height: ${style_1.CssVar.size};\n}\n.${exports.treeViewClassName}-item-wrap[data-nest="0"] > .${exports.treeViewClassName}-item::before {\n  display: none;\n}\n.${exports.treeViewClassName}-item-wrap[data-nest="0"] > .${exports.treeViewClassName}-item > .${exports.treeViewClassName}-toggle::before {\n  display: none;\n}\n.${exports.treeViewClassName}-toggle {\n  box-sizing: border-box;\n  position: relative;\n  padding: 3px;\n  height: ${style_1.CssVar.size};\n  width: ${style_1.CssVar.size};\n  overflow: visible;\n  z-index: 1;\n}\n.${exports.treeViewClassName}-toggle > .${input_1.InputClassNames.btn_o},\n.${exports.treeViewClassName}-toggle > .${input_1.InputClassNames.btn_o} > .${icon_1.iconClassName} {\n  height: 100% !important;\n  width: 100% !important;\n}\n.${exports.treeViewClassName}-toggle:empty::before {\n  box-sizing: border-box;\n  position: absolute;\n  content: "";\n  height: 1px;\n  width: 50%;\n  top: calc(50% - 0.5px);\n  left: 50%;\n  border-bottom: 1px dotted ${style_1.CssVar.fc};\n}\n.${exports.treeViewClassName}-checkbox {\n  background: ${style_1.CssVar.bg.c};\n}\n.${exports.treeViewClassName}-label {\n  ${style_1.CssPV.flex_r}\n  ${style_1.CssPV.f_x}\n  padding: 3px 5px 0px 5px;\n  overflow: hidden;\n  cursor: pointer;\n  background: ${style_1.CssVar.bg.c};\n  z-index: 0;\n}\n.${exports.treeViewClassName}-children {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  z-index: 0;\n  margin-left: ${style_1.CssVar.size};\n}\n.${exports.treeViewClassName}-children::before {\n  box-sizing: border-box;\n  position: absolute;\n  content: "";\n  height: calc(100% - ${style_1.CssVar.size} * 0.5);\n  width: 1px;\n  top: 0px;\n  border-right: 1px dotted ${style_1.CssVar.fc};\n  left: calc(${style_1.CssVar.size} * 0.5 - 0.5px);\n}\n${"material"===e?`\n.${exports.treeViewClassName} {\n  border: 1px solid ${style_1.CssVar.bdc};\n  border-radius: ${style_1.CssParam.m.r};\n}\n.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label {\n  background: ${style_1.CssVar.lv.b.bg.c_hr};\n}\n`:""}\n${"neumorphism"===e?`\n.${exports.treeViewClassName} {\n  padding: ${style_1.CssParam.n.ccvSdPdd};\n}\n.${exports.treeViewClassName}-body {\n  box-shadow: ${style_1.CssParam.n.ccvSd};\n  border-radius: ${style_1.CssParam.n.r};\n  padding: ${style_1.CssParam.n.sdPdd};\n}\n.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label {\n  background: ${style_1.CssVar.bg.c_a};\n  box-shadow: ${style_1.CssParam.n.border.cvxSd};\n  background: ${style_1.CssVar.lv.b.bg.c_hr};\n  border-radius: ${style_1.CssParam.n.r};\n}\n.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label:active{\n  box-shadow: ${style_1.CssParam.n.border.ccvSd};\n  padding-top: 4px;\n}\n`:""}\n`});