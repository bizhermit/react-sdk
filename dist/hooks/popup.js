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
exports.PopupStyle = exports.PopupClassNames = exports.popupClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const style_1 = __importStar(require("../layouts/style"));
const dom_utils_1 = require("../utils/dom-utils");
const prop_1 = __importDefault(require("./prop"));
exports.popupClassName = "bh-popup";
exports.PopupClassNames = {
    b: exports.popupClassName,
    b_t: `${exports.popupClassName}-transparent`,
    m_p: `${exports.popupClassName}-mask-suffix`,
    m_s: `${exports.popupClassName}-mask-prefix`,
};
const usePopup = (Component, options) => {
    const eref = (0, react_1.useRef)();
    const showed = (0, react_1.useRef)(false);
    const hideCallback = (0, react_1.useRef)();
    const styleCtx = (0, prop_1.default)((0, style_1.useLayout)());
    const keydownEvent = (0, react_1.useCallback)((e) => {
        if (e.key === "Escape")
            hide();
    }, []);
    const stopPropagetion = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
    }, []);
    const click = (0, react_1.useCallback)(() => {
        hide();
    }, []);
    const createPopupMountElement = () => {
        const elem = document.createElement("div");
        (0, dom_utils_1.setStyleProps)(elem, { display: "none", visibility: "hidden" });
        elem.classList.add(options?.transparent === true ? exports.PopupClassNames.b_t : exports.PopupClassNames.b);
        if (string_utils_1.default.isNotEmpty(options?.className))
            elem.classList.add(options.className);
        elem.addEventListener("click", stopPropagetion);
        document.body.appendChild(elem);
        return elem;
    };
    const hide = (0, react_1.useCallback)((absolute) => {
        if (!showed.current || eref.current == null)
            return;
        const ret = hideCallback.current?.();
        if (ret === false && absolute !== true)
            return;
        (0, dom_utils_1.setStyleProps)(eref.current, { display: "none", visibility: "hidden" });
        window.removeEventListener("click", click);
        window.removeEventListener("keydown", keydownEvent);
        react_dom_1.default.unmountComponentAtNode(eref.current);
        showed.current = false;
    }, []);
    (0, react_1.useEffect)(() => {
        return () => {
            try {
                if (eref.current == null)
                    return;
                hide(true);
                eref.current.removeEventListener("click", stopPropagetion);
                eref.current.parentElement?.removeChild(eref.current);
                eref.current = null;
            }
            catch { }
        };
    }, []);
    return (0, react_1.useMemo)(() => {
        return {
            hide,
            show: (anchorElement, showOptions) => {
                setTimeout(() => {
                    if (eref.current == null)
                        eref.current = createPopupMountElement();
                    (0, dom_utils_1.setStyleProps)(eref.current, { display: null });
                    showOptions?.createMountElementCallback?.(eref.current);
                    hideCallback.current = showOptions?.hideCallback ?? options?.hideCallback;
                    react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: styleCtx.current },
                        react_1.default.createElement(Component, { ...showOptions?.componentProps }),
                        exports.PopupStyle), eref.current, () => {
                        popup(anchorElement, eref.current, showOptions?.position);
                        (0, dom_utils_1.setStyleProps)(eref.current, { visibility: null });
                        window.addEventListener("click", click);
                        window.addEventListener("keydown", keydownEvent);
                        showed.current = true;
                        showOptions?.showedCallback?.();
                    });
                }, 0);
            },
            getElement: () => eref.current,
            isShowed: () => showed.current,
        };
    }, []);
};
exports.default = usePopup;
const popup = (anchorElement, popupElement, position) => {
    if (anchorElement == null || popupElement == null)
        return undefined;
    const rect = anchorElement.getBoundingClientRect();
    const cw = document.body.clientWidth, ch = document.body.clientHeight;
    const pw = popupElement.offsetWidth, ph = popupElement.offsetHeight;
    const maxX = Math.max(0, cw - pw), maxY = Math.max(0, ch - ph);
    switch (position?.x) {
        case "outer":
            if (cw - rect.right - 1 > pw || cw - rect.right > rect.left) {
                popupElement.style.left = `${Math.min(maxX, rect.right)}px`;
                popupElement.style.removeProperty("right");
            }
            else {
                popupElement.style.right = `${Math.min(maxX, cw - rect.left)}px`;
                popupElement.style.removeProperty("left");
            }
            break;
        case "outer-left":
            popupElement.style.right = `${Math.min(maxX, cw - rect.left)}px`;
            popupElement.style.removeProperty("left");
            break;
        case "outer-right":
            popupElement.style.left = `${Math.min(maxX, rect.right)}px`;
            popupElement.style.removeProperty("right");
            break;
        case "inner-left":
            popupElement.style.left = `${Math.min(maxX, rect.left)}px`;
            popupElement.style.removeProperty("right");
            break;
        case "inner-right":
            popupElement.style.right = `${Math.min(maxX, cw - rect.right)}px`;
            popupElement.style.removeProperty("left");
            break;
        default:
            if (cw - rect.left - 1 > pw || cw - rect.left > rect.right) {
                popupElement.style.left = `${Math.min(maxX, rect.left)}px`;
                popupElement.style.removeProperty("right");
            }
            else {
                popupElement.style.right = `${Math.min(maxX, cw - rect.right)}px`;
                popupElement.style.removeProperty("left");
            }
            break;
    }
    switch (position?.y) {
        case "inner":
            if (ch - rect.top - 1 > ph && ch - rect.bottom > ch - rect.top) {
                popupElement.style.top = `${Math.min(maxY, rect.top)}px`;
                popupElement.style.removeProperty("bottom");
            }
            else {
                popupElement.style.bottom = `${Math.min(maxY, ch - rect.bottom)}px`;
                popupElement.style.removeProperty("top");
            }
            break;
        case "inner-top":
            popupElement.style.top = `${Math.min(maxY, rect.top)}px`;
            popupElement.style.removeProperty("bottom");
            break;
        case "inner-bottom":
            popupElement.style.bottom = `${Math.min(maxY, ch - rect.bottom)}px`;
            popupElement.style.removeProperty("top");
            break;
        case "outer-top":
            popupElement.style.bottom = `${Math.min(maxY, ch - rect.top)}px`;
            popupElement.style.removeProperty("top");
            break;
        case "outer-bottom":
            popupElement.style.top = `${Math.min(maxY, rect.bottom)}px`;
            popupElement.style.removeProperty("bottom");
            break;
        default:
            if (ch - rect.bottom - 1 > ph || ch - rect.bottom > rect.top) {
                popupElement.style.top = `${Math.min(maxY, rect.bottom)}px`;
                popupElement.style.removeProperty("bottom");
            }
            else {
                popupElement.style.bottom = `${Math.min(maxY, ch - rect.top)}px`;
                popupElement.style.removeProperty("top");
            }
            break;
    }
};
exports.PopupStyle = react_1.default.createElement(style_1.default, { id: exports.popupClassName, depsDesign: true, css: ({ design }) => `
.${exports.PopupClassNames.b},
.${exports.PopupClassNames.b_t} {
  box-sizing: border-box;
  z-index: 1000000000;
  position: fixed;
}
.${exports.PopupClassNames.m_p},
.${exports.PopupClassNames.m_s} {
  box-sizing: border-box !important;
  position: absolute !important;
  top: 0px !important;
  left: 0px !important;
  height: 100% !important;
  width: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
  min-height: 100% !important;
  min-width: 100% !important;
  outline: none;
  background: ${style_1.CssVar.mask.bg};
}
.${exports.PopupClassNames.m_s} {
  opacity: 0;
}
${design === "material" ? `
.${exports.PopupClassNames.b} {
  filter: drop-shadow(0px 8px 5px ${style_1.CssVar.shadow.dc});
}
.${exports.PopupClassNames.b_t} {
  box-shadow: 0px 8px 5px ${style_1.CssVar.shadow.dc};
}
` : ""}
${design === "neumorphism" ? `
.${exports.PopupClassNames.b} {
  filter: drop-shadow(0px 8px 5px ${style_1.CssVar.shadow.dc});
}
.${exports.PopupClassNames.b_t} {
  box-shadow: 0px 8px 5px ${style_1.CssVar.shadow.dc};
}
` : ""}
` });
