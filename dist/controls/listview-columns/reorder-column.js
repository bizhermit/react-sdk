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
exports.ListViewReorderColumnStyle = exports.listViewReorderColumnClassName = void 0;
const react_1 = __importDefault(require("react"));
const style_1 = __importStar(require("../../layouts/style"));
const dom_utils_1 = require("../../utils/dom-utils");
exports.listViewReorderColumnClassName = "bh-lv_c-rod";
const ListViewReorderColumn = (props) => {
    let pinchingRowElem = null, conElem = null;
    let pinchingRowIndex = -1, lastPos = 0, pos = 0, lastTop = 0;
    let mouseup = (_m) => { }, mouseSpace = (_r) => { };
    const event = (0, dom_utils_1.getDomEventManager)();
    const bodyScrollEvent = () => mouseSpace(lastTop);
    const mousemoveEvent = (e) => mouseSpace(e.clientY - pos + lastPos);
    const mouseupEvent = (e) => {
        mouseup(e.clientY - pos + lastPos);
        conElem.removeChild(pinchingRowElem);
        event.removeEvent(conElem, "scroll", bodyScrollEvent);
        conElem = null;
        (0, dom_utils_1.releaseCursor)();
        window.removeEventListener("mouseup", mouseupEvent);
        window.removeEventListener("mousemove", mousemoveEvent);
    };
    return {
        name: props.name ?? "_reorder",
        sort: false,
        resize: false,
        width: props.width ?? (props.range === "row" ? 0 : -1),
        cellTextAlign: "center",
        fixed: props.fixed,
        initialize: () => {
            const elem = document.createElement("div");
            const iconSize = props.iconSize == null ? "100%" : props.iconSize + "px";
            (0, dom_utils_1.setStyleProps)(elem, { height: iconSize, width: iconSize });
            elem.classList.add(`${exports.listViewReorderColumnClassName}-icon`);
            return { elem };
        },
        cellInitialize: (cell, initParams, lv) => {
            if (props.disabled !== true) {
                const listener = (e) => {
                    e.stopPropagation();
                    const rowElem = cell.row.element;
                    lastPos = rowElem.offsetTop;
                    pos = e.clientY;
                    (0, dom_utils_1.setCursor)("move");
                    window.addEventListener("mouseup", mouseupEvent);
                    window.addEventListener("mousemove", mousemoveEvent);
                    pinchingRowElem = (0, dom_utils_1.setStyleProps)((0, dom_utils_1.cloneElement)(rowElem, `${exports.listViewReorderColumnClassName}-pinching`), {
                        top: rowElem.offsetTop + "px",
                        left: rowElem.offsetLeft + "px",
                    });
                    if (conElem == null) {
                        conElem = lv.getBodyElement();
                        event.addEvent(conElem, "scroll", bodyScrollEvent);
                    }
                    const bodyScrollTop = lv.getBodyScrollTop();
                    conElem.appendChild(pinchingRowElem);
                    pinchingRowIndex = cell.row.index;
                    mouseup = (top) => {
                        lv.dropMoveRow(pinchingRowIndex, top - bodyScrollTop + lv.getBodyScrollTop());
                    };
                    mouseSpace = (top) => {
                        const t = (lastTop = top) - bodyScrollTop + lv.getBodyScrollTop();
                        lv.dragMovingRow(pinchingRowIndex, t);
                        pinchingRowElem.style.top = t + "px";
                    };
                };
                const targetElem = props.range === "row" ? cell.row.element : cell.element;
                targetElem.classList.add(`${exports.listViewReorderColumnClassName}-range`);
                event.addEvent(targetElem, "mousedown", listener);
            }
            cell.element.classList.add(exports.listViewReorderColumnClassName);
            cell.element.appendChild((0, dom_utils_1.cloneElement)(initParams.elem));
        },
        cellDispose: (cell) => {
            event.removeEventIterator(de => de.element === (props.range === "row" ? cell.row.element : cell.element));
        },
        dispose: () => {
            event.dispose();
        },
        jsxStyle: exports.ListViewReorderColumnStyle,
    };
};
exports.default = ListViewReorderColumn;
exports.ListViewReorderColumnStyle = react_1.default.createElement(style_1.default, { id: exports.listViewReorderColumnClassName, depsDesign: true, css: () => `
.${exports.listViewReorderColumnClassName}-range {
  cursor: move;
}
.${exports.listViewReorderColumnClassName}-icon::before,
.${exports.listViewReorderColumnClassName}-icon::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 4px;
  width: 50%;
  left: 25%;
  background: ${style_1.CssVar.fc};
  opacity: 0.7;
}
.${exports.listViewReorderColumnClassName}-icon::before {
  top: calc(50% - 6px);
}
.${exports.listViewReorderColumnClassName}-icon::after {
  bottom: calc(50% - 6px);
}
.${exports.listViewReorderColumnClassName}[data-disabled="true"] .${exports.listViewReorderColumnClassName}-icon {
  opacity: 0.6;
}
.${exports.listViewReorderColumnClassName}-pinching {
  position: absolute;
  z-index: 1000;
  filter: drop-shadow(0 2px 3px ${style_1.CssVar.shadow.dc});
}
` });
