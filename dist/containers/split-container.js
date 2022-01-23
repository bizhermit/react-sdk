"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0}),exports.SplitContainerStyle=exports.splitContainerClassName=void 0;const react_1=__importStar(require("react")),controller_1=require("../hooks/controller"),style_1=__importStar(require("../layouts/style")),classname_utils_1=__importStar(require("../utils/classname-utils")),dom_utils_1=require("../utils/dom-utils");exports.splitContainerClassName="bh-spl_ctr";const defaultSize="calc(50% - 2.5px)",SplitContainer=e=>{const t=(0,react_1.useRef)(),n=e.direction??"horizontal",r=!0===e.reverse,a=(0,react_1.useRef)(e.content2.size??defaultSize),s=(0,react_1.useRef)(),l=(0,react_1.useRef)(),i=(0,react_1.useRef)(),c=(0,react_1.useRef)({c1:!0,c2:!1!==e.content2.visible}),[o,u]=(0,react_1.useState)(c.current.c1),[d,p]=(0,react_1.useState)(c.current.c2),m=(0,react_1.useRef)({c1:()=>{},c2:()=>{}}),C=(0,react_1.useMemo)((()=>({call:e=>(m.current.c2(e),C),setCalled:e=>(m.current.c1=e,C),setVisible:e=>(p(c.current.c2=e.partner??c.current.c2),u(c.current.c1=(e.self??c.current.c1)||!c.current.c2),C)})),[]),_=(0,react_1.useMemo)((()=>({call:e=>(m.current.c1(e),_),setCalled:e=>(m.current.c2=e,_),setVisible:e=>(p(c.current.c2=e.self??c.current.c2),u(c.current.c1=(e.partner??c.current.c1)||!c.current.c2),_)})),[]),f=(0,react_1.useCallback)((t=>{if(!0===e.disabled)return;const s=t.currentTarget,i=s.parentElement,c="vertical"===n,o=c?t.clientY:t.clientX;let u=0,d=0,p=0,m="col-resize";c?(u=l.current.getBoundingClientRect().height,d=i.getBoundingClientRect().height-s.getBoundingClientRect().height,p=0,m="row-resize"):(u=l.current.getBoundingClientRect().width,d=i.getBoundingClientRect().width-s.getBoundingClientRect().width,p=0,m="col-resize");const C=e=>{c?l.current.style.height=a.current=Math.max(p,Math.min(d,u+(o-e.clientY)*(r?-1:1)))+"px":l.current.style.width=a.current=Math.max(p,Math.min(d,u+(o-e.clientX)*(r?-1:1)))+"px"};(0,dom_utils_1.setCursor)(m);const _=()=>{window.removeEventListener("mousemove",C),window.removeEventListener("mouseup",_),(0,dom_utils_1.releaseCursor)()};window.addEventListener("mouseup",_),window.addEventListener("mousemove",C)}),[n,r]);return(0,controller_1.initController)(e.controller,(e=>{e.callContent1=t=>(m.current.c1(t),e),e.callContent2=t=>(m.current.c2(t),e),e.setVisible=t=>(p(c.current.c2=t.content2??c.current.c2),u(c.current.c1=(t.content1??c.current.c1)||!c.current.c2),e)})),(0,react_1.useEffect)((()=>(a.current="horizontal"===n?l.current?.getBoundingClientRect().width:l.current?.getBoundingClientRect().height,()=>{a.current=e.content2.size??defaultSize,l.current&&("string"==typeof a.current?l.current.style.height=l.current.style.width=a.current:l.current.style.height=l.current.style.width=a.current+"px")})),[n]),react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{ref:t,style:e.style,className:(0,classname_utils_1.className)(exports.splitContainerClassName,classname_utils_1.default.fitToOuter(e.fitToOuter),e.className),"data-dirc":n,"data-reverse":r},react_1.default.createElement("div",{className:`${exports.splitContainerClassName}-content1`,style:{display:o?null:"none"}},react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.splitContainerClassName}-content`,style:e.content1.style},react_1.default.createElement(e.content1.component,{...e.content1.props,ma:{_fetchMask:()=>s.current},scc:C})),react_1.default.createElement("div",{ref:s,className:`${exports.splitContainerClassName}-mask`})),o&&d&&!0!==e.disabled?react_1.default.createElement("div",{className:`${exports.splitContainerClassName}-handle`,onMouseDown:f}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("div",{ref:l,className:`${exports.splitContainerClassName}-content2`,style:{display:d?null:"none",height:a.current,width:a.current}},react_1.default.createElement("div",{className:`${style_1.scrollbarClassName} ${exports.splitContainerClassName}-content`,style:e.content2.style},react_1.default.createElement(e.content2.component,{...e.content2.props,ma:{_fetchMask:()=>i.current},scc:_})),react_1.default.createElement("div",{ref:i,className:`${exports.splitContainerClassName}-mask`}))),exports.SplitContainerStyle)};exports.default=SplitContainer,exports.SplitContainerStyle=react_1.default.createElement(style_1.default,{id:exports.splitContainerClassName,notDepsColor:!0,notDepsDesign:!0,css:()=>`\n.${exports.splitContainerClassName} {\n  ${style_1.CssPV.flex_r}\n  flex: none;\n  overflow: hidden;\n}\n${style_1.CssPV.fitToOuter(exports.splitContainerClassName)}\n.${exports.splitContainerClassName}[data-dirc="vertical"] {\n  flex-direction: column;\n}\n.${exports.splitContainerClassName}[data-dirc="horizontal"][data-reverse="true"] {\n  flex-direction: row-reverse;\n}\n.${exports.splitContainerClassName}[data-dirc="vertical"][data-reverse="true"] {\n  flex-direction: column-reverse;\n}\n.${exports.splitContainerClassName}-content1,\n.${exports.splitContainerClassName}-content2 {\n  ${style_1.CssPV.flex_c}\n  flex: none;\n  overflow: hidden;\n  max-height: 100%;\n  max-width: 100%;\n}\n.${exports.splitContainerClassName}-content1 {\n  flex: 1;\n}\n.${exports.splitContainerClassName}-handle {\n  height: 5px;\n  width: 5px;\n  background: ${style_1.CssVar.bdc};\n  opacity: 0.1;\n  border-radius: 2px;\n}\n.${exports.splitContainerClassName}-handle:hover,\n.${exports.splitContainerClassName}-handle:active {\n  opacity: 0.2;\n}\n.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-content1,\n.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-content2,\n.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-handle {\n  height: 100%;\n  min-height: 100%;\n}\n.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-handle {\n  cursor: col-resize;\n}\n.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-content1,\n.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-content2,\n.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-handle {\n  width: 100%;\n  min-width: 100%;\n}\n.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-handle {\n  cursor: row-resize;\n}\n.${exports.splitContainerClassName}-content {\n  ${style_1.CssPV.flex_c}\n  ${style_1.CssPV.fill}\n  z-index: 0;\n}\n.${exports.splitContainerClassName}-mask {\n  z-index: 1;\n}\n`});