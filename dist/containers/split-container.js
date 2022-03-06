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
exports.SplitContainerStyle = exports.splitContainerClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const dom_utils_1 = require("../utils/dom-utils");
exports.splitContainerClassName = "bh-spl_ctr";
const defaultSize = "calc(50% - 2.5px)";
const SplitContainer = (props) => {
    const ref = (0, react_1.useRef)();
    const direction = props.direction ?? "horizontal";
    const reverse = props.reverse === true;
    const c2Size = (0, react_1.useRef)(props.content2.size ?? defaultSize);
    (0, react_1.useMemo)(() => {
        c2Size.current = props.content2.size ?? defaultSize;
    }, [direction]);
    const c1mref = (0, react_1.useRef)();
    const c2ref = (0, react_1.useRef)();
    const c2mref = (0, react_1.useRef)();
    const visible = (0, react_1.useRef)({ c1: true, c2: props.content2.visible !== false });
    const [c1Visible, setC1Visible] = (0, react_1.useState)(visible.current.c1);
    const [c2Visible, setC2Visible] = (0, react_1.useState)(visible.current.c2);
    const called = (0, react_1.useRef)({ c1: () => { }, c2: () => { } });
    const c1Con = (0, react_1.useMemo)(() => {
        return {
            call: (params) => {
                called.current.c2(params);
                return c1Con;
            },
            setCalled: (func) => {
                called.current.c1 = func;
                return c1Con;
            },
            setVisible: (v) => {
                setC2Visible(visible.current.c2 = v.partner ?? visible.current.c2);
                setC1Visible(visible.current.c1 = (v.self ?? visible.current.c1) || !visible.current.c2);
                return c1Con;
            },
        };
    }, []);
    const c2Con = (0, react_1.useMemo)(() => {
        return {
            call: (params) => {
                called.current.c1(params);
                return c2Con;
            },
            setCalled: (func) => {
                called.current.c2 = func;
                return c2Con;
            },
            setVisible: (v) => {
                setC2Visible(visible.current.c2 = v.self ?? visible.current.c2);
                setC1Visible(visible.current.c1 = (v.partner ?? visible.current.c1) || !visible.current.c2);
                return c2Con;
            },
        };
    }, []);
    const mousedownHandle = (0, react_1.useCallback)((e) => {
        if (props.disabled === true)
            return;
        const helem = e.currentTarget, celem = helem.parentElement;
        const isVertical = direction === "vertical", pos = isVertical ? e.clientY : e.clientX;
        let lastSize = 0, maxSize = 0, minSize = 0, cursor = "col-resize";
        if (isVertical) {
            lastSize = c2ref.current.getBoundingClientRect().height;
            maxSize = celem.getBoundingClientRect().height - helem.getBoundingClientRect().height;
            minSize = 0;
            cursor = "row-resize";
        }
        else {
            lastSize = c2ref.current.getBoundingClientRect().width;
            maxSize = celem.getBoundingClientRect().width - helem.getBoundingClientRect().width;
            minSize = 0;
            cursor = "col-resize";
        }
        const move = (e) => {
            if (isVertical)
                c2ref.current.style.height = (c2Size.current = Math.max(minSize, Math.min(maxSize, lastSize + (pos - e.clientY) * (reverse ? -1 : 1)))) + "px";
            else
                c2ref.current.style.width = (c2Size.current = Math.max(minSize, Math.min(maxSize, lastSize + (pos - e.clientX) * (reverse ? -1 : 1)))) + "px";
        };
        (0, dom_utils_1.setCursor)(cursor);
        const end = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", end);
            (0, dom_utils_1.releaseCursor)();
        };
        window.addEventListener("mouseup", end);
        window.addEventListener("mousemove", move);
    }, [direction, reverse]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.callContent1 = (params) => {
            called.current.c1(params);
            return con;
        };
        con.callContent2 = (params) => {
            called.current.c2(params);
            return con;
        };
        con.setVisible = (v) => {
            setC2Visible(visible.current.c2 = v.content2 ?? visible.current.c2);
            setC1Visible(visible.current.c1 = (v.content1 ?? visible.current.c1) || !visible.current.c2);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        if (c2Visible) {
            if (direction === "horizontal")
                c2Size.current = c2ref.current?.getBoundingClientRect().width;
            else
                c2Size.current = c2ref.current?.getBoundingClientRect().height;
        }
    }, [direction]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, style: props.style, className: (0, classname_utils_1.className)(exports.splitContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), "data-dirc": direction, "data-reverse": reverse },
            react_1.default.createElement("div", { className: `${exports.splitContainerClassName}-content1`, style: { display: c1Visible ? null : "none" } },
                react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.splitContainerClassName}-content`, style: props.content1.style },
                    react_1.default.createElement(props.content1.component, { ...props.content1.props, ma: { _fetchMask: () => c1mref.current }, scc: c1Con })),
                react_1.default.createElement("div", { ref: c1mref, className: `${exports.splitContainerClassName}-mask` })),
            c1Visible && c2Visible && props.disabled !== true ? react_1.default.createElement("div", { className: `${exports.splitContainerClassName}-handle`, onMouseDown: mousedownHandle }) : react_1.default.createElement(react_1.default.Fragment, null),
            react_1.default.createElement("div", { ref: c2ref, className: `${exports.splitContainerClassName}-content2`, style: { display: c2Visible ? null : "none", height: c2Size.current, width: c2Size.current }, "data-fill": !c1Visible },
                react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.splitContainerClassName}-content`, style: props.content2.style },
                    react_1.default.createElement(props.content2.component, { ...props.content2.props, ma: { _fetchMask: () => c2mref.current }, scc: c2Con })),
                react_1.default.createElement("div", { ref: c2mref, className: `${exports.splitContainerClassName}-mask` }))),
        exports.SplitContainerStyle));
};
exports.default = SplitContainer;
exports.SplitContainerStyle = react_1.default.createElement(style_1.default, { id: exports.splitContainerClassName, css: () => `
.${exports.splitContainerClassName} {
  ${style_1.CssPV.flex_r}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.splitContainerClassName)}
.${exports.splitContainerClassName}[data-dirc="vertical"] {
  flex-direction: column;
}
.${exports.splitContainerClassName}[data-dirc="horizontal"][data-reverse="true"] {
  flex-direction: row-reverse;
}
.${exports.splitContainerClassName}[data-dirc="vertical"][data-reverse="true"] {
  flex-direction: column-reverse;
}
.${exports.splitContainerClassName}-content1,
.${exports.splitContainerClassName}-content2 {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
}
.${exports.splitContainerClassName}-content1,
.${exports.splitContainerClassName}-content2[data-fill="true"] {
  flex: 1;
}
.${exports.splitContainerClassName}-handle {
  height: 5px;
  width: 5px;
  background: ${style_1.CssVar.bdc};
  opacity: 0.1;
  border-radius: 2px;
}
.${exports.splitContainerClassName}-handle:hover,
.${exports.splitContainerClassName}-handle:active {
  opacity: 0.2;
}
.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-content1,
.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-content2,
.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-handle {
  height: 100%;
  min-height: 100%;
}
.${exports.splitContainerClassName}[data-dirc="horizontal"] > .${exports.splitContainerClassName}-handle {
  cursor: col-resize;
}
.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-content1,
.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-content2,
.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-handle {
  width: 100%;
  min-width: 100%;
}
.${exports.splitContainerClassName}[data-dirc="vertical"] > .${exports.splitContainerClassName}-handle {
  cursor: row-resize;
}
.${exports.splitContainerClassName}-content {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
  z-index: 0;
}
.${exports.splitContainerClassName}-mask {
  z-index: 1;
}
` });
