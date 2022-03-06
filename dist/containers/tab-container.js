"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainerStyle = exports.tabContainerClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.tabContainerClassName = "bh-tab_ctr";
const TabContainer = (props) => {
    const mref = (0, react_1.useRef)();
    const findContent = (code) => props.contents.find(content => content.code === code) ?? props.contents[0];
    const [content, setContent] = (0, react_1.useState)(findContent(props.defaultCode));
    const tcc = (0, react_1.useMemo)(() => {
        return {};
    }, []);
    const selectTab = (code) => setContent(findContent(code));
    (0, controller_1.initController)(props.controller, (con) => {
        con.selectTab = (code) => {
            selectTab(code);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        content?.selected?.();
        props.selected?.(content?.code);
    }, [content]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: props.style, className: (0, classname_utils_1.className)(exports.tabContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className) },
            react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.tabContainerClassName}-tab_list`, "data-fill": props.tabFill === true }, (0, react_1.useMemo)(() => {
                const nodes = [];
                props.contents.forEach((con) => nodes.push(react_1.default.createElement("div", { key: con.code, className: (0, classname_utils_1.className)(`${exports.tabContainerClassName}-tab`, con.code === content.code ? "bh-selected" : ""), onClick: () => selectTab(con.code) }, con.title)));
                return nodes;
            }, [props.contents, content])),
            react_1.default.createElement("div", { className: `${exports.tabContainerClassName}-content-wrap` },
                react_1.default.createElement("div", { className: `${exports.tabContainerClassName}-content`, style: content.style }, content == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(content.component, { ...content.props, ma: { _fetchMask: () => mref.current }, tcc: tcc })),
                react_1.default.createElement("div", { className: `${exports.tabContainerClassName}-mask`, ref: mref }))),
        exports.TabContainerStyle));
};
exports.default = TabContainer;
exports.TabContainerStyle = react_1.default.createElement(style_1.default, { id: exports.tabContainerClassName, depsDesign: true, css: ({ design }) => `
.${exports.tabContainerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.tabContainerClassName)}
.${exports.tabContainerClassName}-tab_list {
  ${style_1.CssPV.flex_r}
  flex: none;
  overflow-x: auto;
  overflow-x: overlay;
  overflow-y: hidden;
  width: 100%;
  height: ${style_1.CssVar.size};
  z-index: 1;
}
.${exports.tabContainerClassName}-tab_list::-webkit-scrollbar:hover {
  max-height: 6px;
}
.${exports.tabContainerClassName}-tab {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  user-select: none;
  cursor: pointer;
  padding: 2px 10px 0px 10px;
  white-space: nowrap;
  height: 100%;
}
.${exports.tabContainerClassName}-tab.bh-selected {
  cursor: inherit;
}
.${exports.tabContainerClassName}-tab_list[data-fill="true"] .${exports.tabContainerClassName}-tab {
  flex: 1;
}
.${exports.tabContainerClassName}-tab_list[data-fill="false"] .${exports.tabContainerClassName}-tab {
  flex: none;
}
.${exports.tabContainerClassName}-content-wrap {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
  z-index: 0;
}
.${exports.tabContainerClassName}-content {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
  z-index: 0;
}
.${exports.tabContainerClassName}-mask {
  z-index: 1;
}
${design === "material" ? `
.${exports.tabContainerClassName}-tab_list {
  background: ${style_1.CssVar.bg.dc};
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.updownMargin});
}
.${exports.tabContainerClassName}-tab {
  border: 1px solid transparent;
  border-top-width: 3px;
  background: transparent;
  border-radius: ${style_1.CssParam.m.r} ${style_1.CssParam.m.r} 0px 0px;
}
.${exports.tabContainerClassName}-tab:not(.bh-selected):hover {
  margin-top: calc(3px - ${style_1.CssParam.m.updownMargin});
  margin-bottom: ${style_1.CssParam.m.updownMargin};
  height: calc(100% - 3px);
  border-top-width: 1px;
  border-color: ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
}
.${exports.tabContainerClassName}-tab:not(.bh-selected):hover:active {
  margin-bottom: 0px;
  border-top-width: 3px;
  box-shadow: none;
}
.${exports.tabContainerClassName}-tab.bh-selected {
  border-top-color: ${style_1.CssVar.bg.c_a};
  background: ${style_1.CssVar.bg.c};
}
` : ""}
${design === "neumorphism" ? `
 .${exports.tabContainerClassName}-tab_list {
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
  padding: ${style_1.CssParam.n.sdPdd};  
}
 .${exports.tabContainerClassName}-tab {
  height: ${style_1.CssVar.size};
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  z-index: 1;
}
 .${exports.tabContainerClassName}-tab:first-child {
  border-top-left-radius: ${style_1.CssParam.n.r};
  border-bottom-left-radius: ${style_1.CssParam.n.r}
}
 .${exports.tabContainerClassName}-tab:last-child {
  border-top-right-radius: ${style_1.CssParam.n.r};
  border-bottom-right-radius: ${style_1.CssParam.n.r}
}
 .${exports.tabContainerClassName}-tab:not(.bh-selected):hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  background: ${style_1.CssParam.n.cvxBg};
  z-index: 2;
}
 .${exports.tabContainerClassName}-tab:hover:active,
 .${exports.tabContainerClassName}-tab.bh-selected {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  padding-top: 3px;
  margin-top: 2px;
  height: calc(100% - 1px);
  margin-bottom: 1px;
  z-index: 0;
}
 .${exports.tabContainerClassName}-tab:hover:active {
  background: ${style_1.CssParam.n.ccvBg};
}
 .${exports.tabContainerClassName}-tab.bh-selected {
  background: ${style_1.CssParam.n.accent.ccvBg};
}
` : ""}
` });
