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
exports.scrollbarClassName = exports.CssParam = exports.CssVar = exports.CssPV = exports.cssParamsSize = exports.useLayout = exports.LayoutProvider = exports.StyleContext = exports.StyleDesign = exports.styleDesignDataName = exports.styleColorDataName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const style_1 = __importDefault(require("styled-jsx/style"));
const dom_utils_1 = require("../utils/dom-utils");
exports.styleColorDataName = "data-bh-color";
exports.styleDesignDataName = "data-bh-design";
exports.StyleDesign = {
    flat: "f",
    material: "m",
    neumorphism: "n",
};
exports.StyleContext = (0, react_1.createContext)({
    color: "light",
    design: "flat",
    touchable: false,
    screenSize: "",
    setColor: () => { },
    setDesign: () => { },
});
const LayoutProvider = (props) => {
    const [color, setColor] = (0, react_1.useState)(props.color ?? ((0, dom_utils_1.isClient)() && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"));
    const [design, setDesign] = (0, react_1.useState)(props.design ?? "material");
    const [screenSize, setScreenSize] = (0, react_1.useState)("");
    const device = (0, dom_utils_1.useDevice)();
    (0, react_1.useEffect)(() => {
        if (string_utils_1.default.isEmpty(color))
            document?.documentElement?.removeAttribute(exports.styleColorDataName);
        else
            document?.documentElement?.setAttribute(exports.styleColorDataName, color);
    }, [color]);
    (0, react_1.useEffect)(() => {
        if (string_utils_1.default.isEmpty(design))
            document?.documentElement?.removeAttribute(exports.styleDesignDataName);
        else
            document?.documentElement?.setAttribute(exports.styleDesignDataName, exports.StyleDesign[design]);
    }, [design]);
    (0, react_1.useEffect)(() => {
        if (props.preventTouchLayout !== true)
            document?.documentElement.setAttribute("data-bh-touch", String(device.touchable));
    }, [device.touchable]);
    (0, react_1.useEffect)(() => {
        const listener = () => {
            setScreenSize((0, dom_utils_1.isClient)() && (window?.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) ? "s" : "");
        };
        window.addEventListener("resize", listener);
        listener();
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.StyleContext.Provider, { value: { color, design, touchable: device.touchable, screenSize, setColor, setDesign } },
            BaseStyle,
            props.children)));
};
exports.LayoutProvider = LayoutProvider;
const useLayout = () => {
    return (0, react_1.useContext)(exports.StyleContext);
};
exports.useLayout = useLayout;
const minify = (contents) => {
    if (typeof contents !== "string")
        return contents;
    return contents.replace(/(  |\n|)/g, "").replace(/: /g, ":").replace(/, /g, ",").replace(/ {/g, "{").replace(/ > /g, ">");
};
const Style = ({ id, css, depsDesign, depsColor, depsScreenSize }) => {
    const layout = (0, exports.useLayout)();
    return (0, react_1.useMemo)(() => {
        return react_1.default.createElement(style_1.default, { id: `${id}__${depsDesign ? layout.design : ""}_${depsColor ? layout.color : ""}_${depsScreenSize ? layout.screenSize : ""}`, jsx: true }, minify(css?.({ color: layout.color, design: layout.design }) ?? ""));
    }, [depsDesign ? layout.design : null, depsColor ? layout.color : null, depsScreenSize ? layout.screenSize : null]);
};
exports.default = Style;
const cssParamsSize = () => typeof document === "undefined" ? 32 : Number((getComputedStyle(document.documentElement).getPropertyValue("--bh-size") || "32px").replace("px", ""));
exports.cssParamsSize = cssParamsSize;
const cssPV_flex = `box-sizing:border-box;position:relative;display:flex;`;
const cssPV_flex_row = `${cssPV_flex}flex-flow:row nowrap;`;
const cssPV_fill = `height:100%;width:100%;flex:none;`;
const cssPV_f_y = `flex:1;width:100%;min-height:0px;`;
const cssPV_f_x = `flex:1;height:100%;min-width:0px;`;
exports.CssPV = {
    flex: cssPV_flex,
    flex_c: `${cssPV_flex}flex-flow:column nowrap;justify-content:flex-start;align-items:flex-start;`,
    flex_c_c: `${cssPV_flex}flex-flow:column nowrap;justify-content:center;align-items:center;`,
    flex_r: `${cssPV_flex_row}justify-content:flex-start;align-items:center;`,
    flex_r_c: `${cssPV_flex_row}justify-content:center;align-items:center;`,
    flex_r_r: `${cssPV_flex_row}justify-content:flex-end;align-items:center;`,
    flex_r_t: `${cssPV_flex_row}justify-content:flex-start;align-items:flex-start;`,
    flex_r_b: `${cssPV_flex_row}justify-content:flex-start;align-items:flex-end;`,
    fill: cssPV_fill,
    f_y: cssPV_f_y,
    f_x: cssPV_f_x,
    fitToOuter: (cn) => `.${cn}.bh-fto-f{${cssPV_fill}}.${cn}.bh-fto-ffx{${cssPV_f_x}}.${cn}.bh-fto-ffy{${cssPV_f_y}}.${cn}.bh-fto-fy{height:100%;}.${cn}.bh-fto-fx{width:100%}`,
};
exports.CssVar = {
    size: "var(--bh-size, 32px)",
    fs: "var(--bh-fs, 16px)",
    fc: "var(--bh-fc, #222)",
    anchor: "var(--bh-anchor, #00f)",
    bg: {
        c: "var(--bh-bg-c, #f2f2f9)",
        bc: "var(--bh-bg-bc, #fafafe)",
        dc: "var(--bh-bg-dc, #ededf6)",
        c_a: "var(--bh-bg-c-a, #e0e0ef)",
        bc_a: "var(--bh-bg-bc-a, #e8e8f0)",
        dc_a: "var(--bh-bg-dc-a, #e0e0f8)",
        c_r: "var(--bh-bg-c-r, #333)",
        bc_r: "var(--bh-bg-bc-r, #333)",
        dc_r: "var(--bh-bg-dc-r, #2b2b2b)",
        c_h: "var(--bh-bg-c-h, #eeeef4)",
        bc_h: "var(--bh-bg-bc-h, #eeeef4)",
        dc_h: "var(--bh-bg-dc-h, #e8e8f0)", // back header color
    },
    shadow: {
        c: "var(--bh-shadow-c, #999)",
        bc: "var(--bh-shadow-bc, #f8f8ff)",
        dc: "var(--bh-shadow-dc, #a0a0a0)",
        c_r: "var(--bh-shadow-c-r, #111)",
        bc_r: "var(--bh-shadow-bc-r, #444)",
        dc_r: "var(--bh-shadow-dc-r, #000)", // dark color
    },
    bdc: "var(--bh-bdc, #999)",
    sb: {
        size: "var(--bh-sb-size, 6px)",
        hvr_size: "var(--bh-sb-hvr-size, 6px)",
        bg: "var(--bh-sb-bg, transparent)",
        hvr_bg: "var(--bh-sb-hvr-bg, rgb(127, 127, 127, 0.1))",
        thumb: {
            bg: `var(--bh-sb-thumb-bg, rgb(127, 127, 127, 0.1))`,
            hvr_bg: `var(--bh-sb-thumb-hvr-bg, rgb(127, 127, 127, 0.2))`,
            act_bg: `var(--bh-sb-thumb-act-bg, rgb(127, 127, 127, 0.4))`, // active background
        }
    },
    warn: {
        bdc: "var(--bh-warn-bdc, #cc0)",
        bg: {
            c: "var(--bh-warn-bg-c, #ffd)",
            bc: "var(--bh-warn-bg-bc, #ffd)",
            dc: "var(--bh-warn-bg-dc, #eec)", // dark color
        },
    },
    err: {
        bdc: "var(--bh-err-bdc, #c88)",
        bg: {
            c: "var(--bh-err-bg-c, #fee)",
            bc: "var(--bh-err-bg-bc, #fee)",
            dc: "var(--bh-err-bg-dc, #edd)", // dark color
        },
    },
    w_sun: {
        bg: "var(--bh-week_sun-bg, #ffe2e2)",
        hvr_bg: "var(--bh-week_sun-hvr-bg, #fdd)", // hover background
    },
    w_sat: {
        bg: "var(--bh-week_sat-bg, #e2e2ff)",
        hvr_bg: "var(--bh-week_sat-hvr-bg, #ddf)", // hover background
    },
    mask: {
        bg: "var(--bh-mask-bg, rgb(127, 127, 127, 0.6))",
        img_bgc: "var(--bh-mask-img-bgc, #eee)",
        img_fgc: "var(--bh-mask-img-fgc, #35f)", // image front color
    },
    file_lv: {
        itemHeight: "var(--bh-file_lv-item-height, 56px)", // item height
    },
    lv: {
        h_f: {
            bg: {
                c: "var(--bh-lv-h_f-bg-c, #e4e4e8)", // color
            },
            bdc: "var(--bh-lv-h_f-bdc, #888)", // border color
        },
        b: {
            bg: {
                c: "var(--bh-lv-b-bg-c, #f2f2f9)",
                c_oe: "var(--bh-lv-b-bg-c_oe, #ededf4)",
                c_hr: "var(--bh-lv-b-bg-c_hr, #e8e8ec)",
                c_hc: "var(--bh-lv-b-bg-c_hc, #e4e4f8)",
                c_s: "var(--bh-lv-b-bg-c_s, #dbe0fb)", // selected
            },
            bdc: "var(--bh-lv-b-bdc, #999)",
            olc: "var(--bh-lv-b-olc, #448)", // outline color
        }
    },
    lv_gc: {
        pl: {
            c: "var(--bh-lv_gc-pl-c, #f96)",
            c_late: "var(--bh-lv_gc-pl-c_late, #f00)",
            c_prec: "var(--bh-lv_gc-pl-c_prec, #00f)", // prec color
        },
        bg: {
            today: "var(--bh-lv_gc-bg-today, #cfd)",
            bar_c: "var(--bh-lv_gc-bar-c, #ccc)",
            bar_bc: "var(--bh-lv_gc-bar_bc, #bfbfbf)",
            bar_dc: "var(--bh-lv_gc-bar_dc, #c4c4c4)",
            bar_c_a: "var(--bh-lv_gc-bar-c_a, #666)", // accent color
        },
    },
    slider: {
        bar_c: "var(--bh-slider-bar_c, #ccf)",
        bar_bc: "var(--bh-slider-bar_bc, #ddf)",
        bar_dc: "var(--bh-slider-bar_dc, #ccf)", // bar dark color
    }
};
exports.CssParam = {
    m: {
        r: "2px",
        updownMargin: "1px",
        sdBtm: `0px 2px 3px -2px ${exports.CssVar.shadow.c}`,
        sdBtm_f: `0px 2px 4px -1px ${exports.CssVar.shadow.c}`,
        sdPdd: "2px",
        sdRight: `2px 0px 3px -2px ${exports.CssVar.shadow.c}`,
        sdLeft: `-2px 0px 3px -2px ${exports.CssVar.shadow.c}`,
        sdTop: `0px -1px 3px -2px ${exports.CssVar.shadow.c}`,
    },
    n: {
        r: "5px",
        cvxBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc}, ${exports.CssVar.bg.bc})`,
        cvxBg_r: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_r}, ${exports.CssVar.bg.bc_r})`,
        cvxSd: `1px 1px 2px ${exports.CssVar.shadow.dc}, -0.5px -0.5px 2px ${exports.CssVar.shadow.bc}, 0.5px 0.5px 0.5px ${exports.CssVar.shadow.bc} inset, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc} inset`,
        cvxSd_r: `1px 1px 2px ${exports.CssVar.shadow.dc_r}, -0.5px -0.5px 2px ${exports.CssVar.shadow.bc_r}, 0.5px 0.5px 0.5px ${exports.CssVar.shadow.bc_r} inset, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc_r} inset`,
        cvxSd_f: `2px 2px 4px ${exports.CssVar.shadow.dc}, -0.5px -0.5px 2px ${exports.CssVar.shadow.bc}, 0.5px 0.5px 0.5px ${exports.CssVar.shadow.bc} inset, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc} inset`,
        ccvBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc}, ${exports.CssVar.bg.bc})`,
        ccvBg_r: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_r}, ${exports.CssVar.bg.bc_r})`,
        ccvSd: `0.5px 0.5px 1px ${exports.CssVar.shadow.bc}, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc}, 1px 1px 2px ${exports.CssVar.shadow.dc} inset, -1px -1px 2px ${exports.CssVar.shadow.bc} inset`,
        ccvSd_r: `0.5px 0.5px 1px ${exports.CssVar.shadow.bc_r}, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc_r}, 1px 1px 2px ${exports.CssVar.shadow.dc_r} inset, -1px -1px 2px ${exports.CssVar.shadow.bc_r} inset`,
        sdPdd: "4px",
        ccvSdPdd: "1px",
        headerCvxBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_h}, ${exports.CssVar.bg.bc_h})`,
        headerCcvBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_h}, ${exports.CssVar.bg.bc_h})`,
        accent: {
            sdPdd: "5px",
            cvxBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_a}, ${exports.CssVar.bg.bc_a})`,
            cvxSd: `2px 2px 4px ${exports.CssVar.shadow.dc}, -0.5px -0.5px 2px ${exports.CssVar.shadow.bc}, 0.5px 0.5px 0.5px ${exports.CssVar.shadow.bc} inset, -0.5px -0.5px 1px ${exports.CssVar.shadow.dc} inset`,
            ccvBg: `linear-gradient(to bottom right, ${exports.CssVar.bg.dc_a}, ${exports.CssVar.bg.bc_a})`,
        },
        border: {
            cvxSd: `1px 1px 2px ${exports.CssVar.shadow.bc} inset, -1px -1px 2px ${exports.CssVar.shadow.dc} inset`,
            cvxSd_r: `1px 1px 2px ${exports.CssVar.shadow.bc_r} inset, -1px -1px 2px ${exports.CssVar.shadow.dc_r} inset`,
            ccvSd: `1px 1px 1px ${exports.CssVar.shadow.dc} inset, -1px -1px 1px ${exports.CssVar.shadow.bc} inset`,
            ccvSd_r: `1px 1px 2px ${exports.CssVar.shadow.dc_r} inset, -1px -1px 2px ${exports.CssVar.shadow.bc_r} inset`,
        },
        warn: {
            cvxBg: `linear-gradient(to bottom right, ${exports.CssVar.warn.bg.dc}, ${exports.CssVar.warn.bg.bc})`,
            ccvBg: `linear-gradient(to bottom right, ${exports.CssVar.warn.bg.dc}, ${exports.CssVar.warn.bg.bc})`,
        },
        err: {
            cvxBg: `linear-gradient(to bottom right, ${exports.CssVar.err.bg.dc}, ${exports.CssVar.err.bg.bc})`,
            ccvBg: `linear-gradient(to bottom right, ${exports.CssVar.err.bg.dc}, ${exports.CssVar.err.bg.bc})`,
        },
    }
};
exports.scrollbarClassName = "bh-sb";
const BaseStyle = react_1.default.createElement(Style, { id: "bh-base", depsColor: true, depsScreenSize: true, css: ({ color }) => `
html {
  background: ${exports.CssVar.bg.c};
  color: ${exports.CssVar.fc};
}
a:not(:disabled),
.bh-anchor:not([data-disabled="true"]) {
  text-decoration: underline;
  cursor: pointer;
  color: ${exports.CssVar.anchor};
}
.${exports.scrollbarClassName} {
  overflow: auto;
  overflow: overlay;
}
.${exports.scrollbarClassName}::-webkit-scrollbar {
  border-radius: 2px;
  background: ${exports.CssVar.sb.bg};
  height: ${exports.CssVar.sb.size};
  width: ${exports.CssVar.sb.size};
}
.${exports.scrollbarClassName}::-webkit-scrollbar:hover {
  background: ${exports.CssVar.sb.hvr_bg};
  height: ${exports.CssVar.sb.hvr_size};
  width: ${exports.CssVar.sb.hvr_size};
}
.${exports.scrollbarClassName}::-webkit-scrollbar-track-piece,
.${exports.scrollbarClassName}::-webkit-scrollbar-track,
.${exports.scrollbarClassName}::-webkit-scrollbar-corner {
  background: transparent;
}
.${exports.scrollbarClassName}::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: ${exports.CssVar.sb.thumb.bg};
}
.${exports.scrollbarClassName}:hover::-webkit-scrollbar-thumb {
  background: ${exports.CssVar.sb.thumb.hvr_bg};
}
.${exports.scrollbarClassName}::-webkit-scrollbar-thumb:active {
  background: ${exports.CssVar.sb.thumb.act_bg};
}
:root[data-bh-touch="true"] {
  --bh-size: 40px;
}
${color === "dark" ? `
:root {
  --bh-fc: #eee;
  --bh-anchor: #9bf;
  --bh-bg-c: #333335;
  --bh-bg-bc: #333335;
  --bh-bg-dc: #2b2b2b;
  --bh-bg-c-a: #333340;
  --bh-bg-bc-a: #333340;
  --bh-bg-dc-a: #2b2b30;
  --bh-bg-c-r: #f2f2f9;
  --bh-bg-bc-r: #fafafe;
  --bh-bg-dc-r: #ededef;
  --bh-bg-c-h: #2e2e30;
  --bh-bg-bc-h: #303033;
  --bh-bg-dc-h: #2d2d2f;
  --bh-shadow-c: #111;
  --bh-shadow-bc: #444;
  --bh-shadow-dc: #000;
  --bh-shadow-c-r: #999;
  --bh-shadow-bc-r: #f8f8ff;
  --bh-shadow-dc-r: #a0a0a0;
  --bh-bdc: #666;
  --bh-mask-bg: rgb(15, 15, 15, 0.6);
  --bh-mask-img-bgc: #222;
  --bh-mask-img-fgc: #469;
  --bh-warn-bdc: #774;
  --bh-warn-bg-c: #3a3a28;
  --bh-warn-bg-bc: #383826;
  --bh-warn-bg-dc: #303022;
  --bh-err-bdc: #744;
  --bh-err-bg-c: #442828;
  --bh-err-bg-bc: #402424;
  --bh-err-bg-dc: #3b2020;
  --bh-lv-h_f-bg-c: #242428;
  --bh-lv-h_f-bdc: #666;
  --bh-lv-b-bg-c: #343436;
  --bh-lv-b-bg-c_oe: #38383a;
  --bh-lv-b-bg-c_hr: #2b2b33;
  --bh-lv-b-bg-c_hc: #181824;
  --bh-lv-b-bg-c_s: #181830;
  --bh-lv-b-bdc: #777;
  --bh-lv-b-olc: #eee;
  --bh-lv_gc-pl-c: #a63;
  --bh-lv_gc-pl-c_late: #d33;
  --bh-lv_gc-pl-c_prec: #55f;
  --bh-lv_gc-bg-today: #103020;
  --bh-lv_gc-bar-c: #585858;
  --bh-lv_gc-bar_bc: #5f5f5f;
  --bh-lv_gc-bar_dc: #545454;
  --bh-lv_gc-bar-c_a: #888;
  --bh-slider-bar_c: #446;
  --bh-slider-bar_bc: #446;
  --bh-slider-bar_dc: #335;
  --bh-week_sun-bg: #3f2020;
  --bh-week_sat-bg: #20203f;
  outline-color: #ddf;
}
` : ""}
` });
