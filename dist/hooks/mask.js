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
exports.MaskContainer = exports.MaskStyle = exports.Mask = exports.maskContainerClassName = exports.maskClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
exports.maskClassName = "bh-msk";
exports.maskContainerClassName = "bh-mask_ctr";
const Mask = (props) => {
    const eref = (0, react_1.useRef)();
    const keydown = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const monitorFocus = (0, react_1.useCallback)((targetElement) => {
        if (targetElement == null)
            return;
        const targets = [];
        const ignore = eref.current?.parentElement;
        if (!ignore)
            return;
        const root = ignore.parentElement;
        root.childNodes.forEach((elem) => {
            if (elem === ignore)
                return;
            targets.push(elem);
        });
        let hit = false;
        const upstream = (elem) => {
            hit = targets.indexOf(elem) >= 0;
            if (hit || !elem.parentElement)
                return;
            upstream(elem.parentElement);
        };
        upstream(targetElement);
        if (hit)
            eref.current.focus();
    }, []);
    const blur = (e) => {
        if (e.relatedTarget != null && e.relatedTarget.className.indexOf(exports.maskClassName) >= 0)
            return;
        monitorFocus(e.relatedTarget);
    };
    (0, react_1.useEffect)(() => {
        eref.current.focus();
        const keyListener = (e) => {
            if (e.key === "Tab") {
                setTimeout(() => {
                    monitorFocus(document.activeElement);
                }, 0);
            }
        };
        window.addEventListener("keydown", keyListener);
        return () => {
            window.removeEventListener("keydown", keyListener);
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, className: exports.maskClassName, tabIndex: 0, onKeyDown: keydown, onBlur: blur, "data-image": props.image, style: { zIndex: props.zIndex } },
            react_1.default.createElement("div", { className: `${exports.maskClassName}-wall` }),
            react_1.default.createElement("div", { className: `${exports.maskClassName}-item1` }),
            react_1.default.createElement("div", { className: `${exports.maskClassName}-item2` }),
            string_utils_1.default.isEmpty(props.text) ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.maskClassName}-text` }, props.text)),
        exports.MaskStyle));
};
exports.Mask = Mask;
exports.MaskStyle = react_1.default.createElement(style_1.default, { id: exports.maskClassName, depsDesign: true, css: ({ design }) => `
.${exports.maskClassName} {
  box-sizing: border-box !important;
  position: absolute !important;
  top: 0px !important;
  left: 0px !important;
  height: 100% !important;
  width: 100% !important;
  min-height: 100% !important;
  min-width: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
  outline: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2000000000;
}
.${exports.maskClassName}-wall {
  z-index: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background: ${style_1.CssVar.mask.bg};
}
.${exports.maskClassName}-item1,
.${exports.maskClassName}-item2 {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}
.${exports.maskClassName}-item1::before,
.${exports.maskClassName}-item1::after,
.${exports.maskClassName}-item2::before,
.${exports.maskClassName}-item2::after {
  box-sizing: border-box;
  position: absolute;
  cursor: inherit;
  content: "";
}
.${exports.maskClassName}-text {
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  cursor: inherit;
  color: ${style_1.CssVar.fc};
}
.${exports.maskClassName}[data-image="spin-circle"] {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-item1 {
  height: 50px;
  width: 50px;
  filter: drop-shadow(5px 5px 3px ${style_1.CssVar.shadow.dc});
}
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-item1::before,
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-item1::after {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-item1::before {
  border: 8px solid ${style_1.CssVar.mask.img_bgc};
}
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-item1::after {
  border-width: 8px;
  border-color: ${style_1.CssVar.mask.img_fgc};
  border-top-style: double;
  border-bottom-style: double;
  border-left-style: solid;
  border-right-style: solid;
  animation: maskSpinCircle 1.2s linear 0s infinite normal;
}
.${exports.maskClassName}[data-image="spin-circle"] .${exports.maskClassName}-text {
  margin-top: 10px;
}
@keyframes maskSpinCircle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.${exports.maskClassName}[data-image="flow"] .${exports.maskClassName}-item1 {
  height: 10px;
  width: 50%;
  max-width: 80%;
  min-width: 10%;
  border-radius: 5px;
  overflow: hidden;
  background: ${style_1.CssVar.mask.img_bgc};
}
.${exports.maskClassName}[data-image="flow"] .${exports.maskClassName}-item1::before {
  height: 100%;
  width: 20%;
  animation: maskFlow 2s linear 0s infinite normal;
  border-radius: 5px;
  background-color: ${style_1.CssVar.mask.img_fgc};
}
.${exports.maskClassName}[data-image="flow"] .${exports.maskClassName}-text {
  margin-top: 10px;
}
@keyframes maskFlow {
  0% {
    left: -20%;
  }
  100% {
    left: 120%;
  }
}
${design === "neumorphism" ? `
.${exports.maskClassName}[data-image="flow"] .${exports.maskClassName}-item1 {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  opacity: 0.9;
}
.${exports.maskClassName}[data-image="flow"] .${exports.maskClassName}-item1::before {
  box-shadow: ${style_1.CssParam.n.cvxSd};
}
` : ""}
` });
const MaskContainer = (props) => {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        props.mask?.setElement(ref.current);
    }, [props.mask.setElement]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(exports.maskContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style },
            react_1.default.createElement("div", { className: (0, classname_utils_1.className)(`${exports.maskContainerClassName}-content`, props.scroll ? style_1.scrollbarClassName : "") }, props.children),
            react_1.default.createElement("div", { ref: ref, className: `${exports.maskContainerClassName}-mask`, "data-role": exports.maskClassName, "data-name": props.name ?? "_" })),
        MaskContainerStyle));
};
exports.MaskContainer = MaskContainer;
const MaskContainerStyle = react_1.default.createElement(style_1.default, { id: exports.maskContainerClassName, css: () => `
.${exports.maskContainerClassName} {
  display: block;
  box-sizing: border-box;
  position: relative;
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.maskContainerClassName)}
.${exports.maskContainerClassName}-content {
  ${style_1.CssPV.flex_c};
  ${style_1.CssPV.fill}
  z-index: 0;
}
.${exports.maskContainerClassName}-mask {
  z-index: 1;
}
` });
const useMask = (options) => {
    const effected = (0, react_1.useRef)(false);
    const eref = (0, react_1.useRef)();
    const showed = (0, react_1.useRef)(false);
    const layout = (0, style_1.useLayout)();
    const setElement = (0, react_1.useCallback)((element) => {
        eref.current = element;
    }, []);
    const close = (0, react_1.useCallback)(() => {
        if (!showed.current)
            return;
        if (eref.current == null) {
            showed.current = false;
            return;
        }
        try {
            react_dom_1.default.unmountComponentAtNode(eref.current);
            showed.current = false;
        }
        catch (e) {
            console.log(e);
        }
    }, []);
    const show = (0, react_1.useCallback)((maskProps, callback) => {
        if (!effected.current) {
            showed.current = true;
            return;
        }
        if (eref.current == null) {
            eref.current = document.createElement("div");
            document.body.appendChild(eref.current);
        }
        react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: layout },
            react_1.default.createElement(exports.Mask, { ...options?.maskProps, ...maskProps })), eref.current, () => {
            callback?.();
        });
        showed.current = true;
    }, []);
    (0, react_1.useEffect)(() => {
        if (options?.accessor) {
            eref.current = options?.accessor?._fetchMask?.() ?? eref.current;
            if (showed.current)
                show();
            return () => {
                if (showed.current) {
                    try {
                        react_dom_1.default.unmountComponentAtNode(eref.current);
                        showed.current = false;
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            };
        }
    }, [options?.accessor]);
    (0, react_1.useEffect)(() => {
        eref.current = eref.current ??
            options?.accessor?._fetchMask?.() ??
            document.querySelector(`div[data-role="${exports.maskClassName}"][data-name="${options?.name ?? "_"}"]`);
        effected.current = true;
        if (options?.showAtFirst === true || showed.current)
            show();
        if (eref.current == null) {
            return () => {
                if (eref.current) {
                    react_dom_1.default.unmountComponentAtNode(eref.current);
                    eref.current.parentElement?.removeChild(eref.current);
                    eref.current = null;
                }
            };
        }
        else {
            return () => {
                if (eref.current != null && showed.current) {
                    try {
                        react_dom_1.default.unmountComponentAtNode(eref.current);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            };
        }
    }, []);
    return { show, close, setElement };
};
exports.default = useMask;
