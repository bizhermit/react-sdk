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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradualContainerStyle = exports.gradualContainerClassName = void 0;
const react_1 = __importStar(require("react"));
const prop_1 = __importDefault(require("../hooks/prop"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.gradualContainerClassName = "bh-gdl_ctr";
const GradualContainer = (props) => {
    const [step, setStep] = (0, react_1.useState)(0);
    const [componentsProps, setComponentsProps] = (0, react_1.useState)(props.contents.map(() => null));
    const direction = (0, prop_1.default)(props.direction ?? "horizontal");
    const contentNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        for (let i = 0; i < step + 1; i++) {
            const content = props.contents[i];
            if (content == null)
                break;
            const style = { flex: content.flexRate };
            if (direction.current === "horizontal")
                style.minWidth = content.minSize;
            else
                style.minHeight = content.minSize;
            const gcc = {
                showNext: (p, abs) => {
                    setStep(Math.max(step, Math.min(props.contents.length - 1, i + 1)));
                    if (componentsProps[i + 1] !== p || abs) {
                        const newCProps = componentsProps.map(v => v);
                        newCProps[i + 1] = p;
                        setComponentsProps(newCProps);
                    }
                },
                closeNexts: () => {
                    setStep(i);
                },
                close: () => {
                    setStep(Math.max(0, i - 1));
                },
                setNextProps: (p, abs) => {
                    if (componentsProps[i + 1] !== p || abs) {
                        const newCProps = componentsProps.map(v => v);
                        newCProps[i + 1] = p;
                        setComponentsProps(newCProps);
                    }
                },
            };
            nodes.push(react_1.default.createElement(GradualContainerContent, { key: i, style: style, step: i, gcc: gcc, content: content, componentProps: componentsProps[i] }));
        }
        return nodes;
    }, [step, componentsProps, direction.current]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.gradualContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style },
            react_1.default.createElement("div", { className: `${exports.gradualContainerClassName}-contents ${style_1.scrollbarClassName} ${classname_utils_1.default.direction(direction.current)}` }, contentNodes),
            react_1.default.createElement("div", { className: `${exports.gradualContainerClassName}-mask` })),
        exports.GradualContainerStyle));
};
exports.default = GradualContainer;
const GradualContainerContent = ({ style, gcc, content, componentProps }) => {
    const mref = (0, react_1.useRef)();
    return (react_1.default.createElement("div", { key: content.key, className: `${exports.gradualContainerClassName}-content-wrap`, style: style },
        react_1.default.createElement("div", { className: `${exports.gradualContainerClassName}-content ${style_1.scrollbarClassName}` },
            react_1.default.createElement(content.component, { ...content.props, ...componentProps, gcc: gcc, ma: { _fetchMask: () => mref.current } })),
        react_1.default.createElement("div", { ref: mref, className: `${exports.gradualContainerClassName}-mask` })));
};
exports.GradualContainerStyle = react_1.default.createElement(style_1.default, { id: exports.gradualContainerClassName, css: () => `
.${exports.gradualContainerClassName} {
  box-sizing: border-box;
  position: relative;
  display: block;
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.gradualContainerClassName)}
.${exports.gradualContainerClassName}-contents {
  ${style_1.CssPV.flex}
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${style_1.CssPV.fill}
}
.${exports.gradualContainerClassName}-contents.bh-h {
  flex-direction: row;
}
.${exports.gradualContainerClassName}-contents.bh-v {
  flex-direction: column;
}
.${exports.gradualContainerClassName}-content-wrap {
  box-sizing: border-box;
  position: relative;
  display: block;
  flex: 1;
}
.${exports.gradualContainerClassName}-contents.bh-h > .${exports.gradualContainerClassName}-content-wrap {
  height: 100%;
  min-width: 0px;
}
.${exports.gradualContainerClassName}-contents.bh-v > .${exports.gradualContainerClassName}-content-wrap {
  width: 100%;
  min-height: 0px;
}
.${exports.gradualContainerClassName}-content {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
}
.${exports.gradualContainerClassName}-contents,
.${exports.gradualContainerClassName}-content {
  z-index: 0;
}
.${exports.gradualContainerClassName}-mask {
  z-index: 1;
}
` });
