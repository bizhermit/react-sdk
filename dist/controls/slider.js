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
exports.SliderStyle = exports.sliderClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.sliderClassName = "bh-sld";
const Slider = (props) => {
    const eref = (0, react_1.useRef)(), mref = (0, react_1.useRef)(), href = (0, react_1.useRef)(), bref = (0, react_1.useRef)();
    const min = (0, react_1.useRef)(props.min ?? 0);
    const max = (0, react_1.useRef)(props.max ?? 100);
    const interval = (0, react_1.useRef)(props.keydownInterval ?? 1);
    const optimizeHadbleLeft = (0, react_1.useCallback)((value) => {
        if (href.current == null)
            return;
        const v = value ?? min.current;
        href.current.textContent = String(v);
        const rate = ((v) - min.current) / (max.current - min.current);
        bref.current.style.width = Math.round(rate * 100) + "%";
        href.current.style.left = ((mref.current.clientWidth - href.current.offsetWidth) * rate) + "px";
    }, []);
    const { getValue, setValue } = (0, value_1.default)(props, {
        changed: v => optimizeHadbleLeft(v),
        binded: v => optimizeHadbleLeft(v),
    });
    const mousedown = (e) => {
        if (props.disabled === true)
            return;
        const helem = e.currentTarget;
        const maxLeft = mref.current.clientWidth - helem.offsetWidth;
        let lpos = helem.offsetLeft, pos = e.clientX;
        (0, dom_utils_1.setCursor)("col-resize");
        const move = (e) => {
            setValue(Math.round(min.current + (max.current - min.current) * (Math.min(Math.max(0, e.clientX - pos + lpos), maxLeft) / maxLeft)));
        };
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, dom_utils_1.releaseCursor)();
        };
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    };
    const keydown = (e) => {
        if (props.disabled === true)
            return;
        switch (e.key) {
            case "ArrowLeft":
                if (e.ctrlKey)
                    setValue(min.current);
                else
                    setValue(Math.max(min.current, (getValue() ?? min.current) - interval.current));
                break;
            case "ArrowRight":
                if (e.ctrlKey)
                    setValue(max.current);
                else
                    setValue(Math.min(max.current, (getValue() ?? min.current) + interval.current));
                break;
            default:
                break;
        }
    };
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            eref.current?.focus();
            return con;
        };
        con.blur = () => {
            eref.current?.blur();
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            setValue(v);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        if (props.flexibleWidth === true) {
            const ro = new ResizeObserver(() => {
                optimizeHadbleLeft(getValue() ?? min.current);
            });
            ro.observe(eref.current);
            return () => {
                if (ro)
                    ro.disconnect();
            };
        }
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.sliderClassName, props.className), "data-disabled": props.disabled === true, title: props.title, tabIndex: props.disabled === true ? -1 : props.tabIndex ?? 0, onKeyDown: keydown, onFocus: () => props.focus?.(getValue()), onBlur: () => props.blur?.(getValue()) },
            react_1.default.createElement("div", { ref: mref, className: `${exports.sliderClassName}-main` },
                react_1.default.createElement("div", { className: `${exports.sliderClassName}-bar` },
                    react_1.default.createElement("div", { ref: bref, className: `${exports.sliderClassName}-rate` })),
                react_1.default.createElement("div", { ref: href, className: `${exports.sliderClassName}-handle`, onMouseDown: mousedown }))),
        input_1.default,
        exports.SliderStyle));
};
exports.default = Slider;
exports.SliderStyle = react_1.default.createElement(style_1.default, { id: exports.sliderClassName, depsDesign: true, css: ({ design }) => `
.${exports.sliderClassName} {
  overflow: hidden;
  width: 200px;
}
.${exports.sliderClassName}-main {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: center;
  width: 100%;
  height: 100%;
}
.${exports.sliderClassName}-bar {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.${exports.sliderClassName}-rate {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  min-width: 0%;
  max-width: 100%;
}
.${exports.sliderClassName}-handle {
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding-top: 1px;
  font-size: 80%;
  overflow: visible;
}
.${exports.sliderClassName}[data-disabled="false"] .${exports.sliderClassName}-handle {
  cursor: col-resize;
}
${design === "material" ? `
.${exports.sliderClassName}-bar {
  height: 8px;
  border-radius: 5px;
  border: 1px solid ${style_1.CssVar.bdc};
}
.${exports.sliderClassName}-handle {
  border: 1px solid ${style_1.CssVar.bdc};
  height: calc(${style_1.CssVar.size} - 2px);
  width: calc(${style_1.CssVar.size} - 2px);
  background: ${style_1.CssVar.bg.c};
  border-radius: 50%;
  top: calc(50% - ${style_1.CssVar.size} / 2);
}
.${exports.sliderClassName}[data-disabled="false"] .${exports.sliderClassName}-handle:hover,
.${exports.sliderClassName}[data-disabled="false"] .${exports.sliderClassName}-handle:active {
  top: calc(50% - ${style_1.CssVar.size} / 2 - 1px);
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
}
.${exports.sliderClassName}-rate {
  background: ${style_1.CssVar.slider.bar_c};
}
` : ""}
${design === "neumorphism" ? `
.${exports.sliderClassName} {
  padding: ${style_1.CssParam.n.sdPdd};
}
.${exports.sliderClassName}-bar {
  height: ${style_1.CssVar.size};
  background: ${style_1.CssParam.n.ccvBg};
  box-shadow: ${style_1.CssParam.n.ccvSd};
  border-radius: calc((${style_1.CssVar.size} - ${style_1.CssParam.n.sdPdd} / 2) / 2);
}
.${exports.sliderClassName}-handle {
  height: calc(${style_1.CssVar.size} - ${style_1.CssParam.n.sdPdd} / 2);
  width: calc(${style_1.CssVar.size} - ${style_1.CssParam.n.sdPdd} / 2);
  top: calc(50% - (${style_1.CssVar.size} - ${style_1.CssParam.n.sdPdd} / 2) / 2);
  border-radius: 50%;
  background: ${style_1.CssParam.n.cvxBg};
  box-shadow: ${style_1.CssParam.n.cvxSd};
}
.${exports.sliderClassName}[data-disabled="true"] .${exports.sliderClassName}-handle {
  background: transparent;
  box-shadow: none;
}
.${exports.sliderClassName}-rate {
  background: linear-gradient(to bottom right, ${style_1.CssVar.slider.bar_dc}, ${style_1.CssVar.slider.bar_bc});
  margin-top: ${style_1.CssParam.n.sdPdd};
  margin-bottom: ${style_1.CssParam.n.sdPdd};
  opacity: 0.5;
}
` : ""}
` });
