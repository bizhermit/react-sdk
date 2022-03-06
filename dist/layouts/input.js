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
exports.InputClassNames = void 0;
const react_1 = __importDefault(require("react"));
const icon_1 = require("../graphics/icon");
const style_1 = __importStar(require("./style"));
exports.InputClassNames = {
    wrap: "bh-ipt-wrap",
    ipt: "bh-ipt",
    lbl: "bh-ipt_lbl",
    btn: "bh-ipt_btn",
    btn_l: "bh-ipt_btn_l",
    btn_bt: "bh-ipt_btn-bt",
    btn_o: "bh-ipt_btn_o",
    resize: "bh-ipt_resize",
    resize_x: "bh-ipt_resize_x",
    resize_y: "bh-ipt_resize_y",
};
const InputStyle = react_1.default.createElement(style_1.default, { id: "bh-ipt", depsDesign: true, css: ({ design }) => `
.${exports.InputClassNames.wrap} {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: center;
  flex: none;
  overflow: visible;
  margin: 0px;
  padding: 0px;
  height: ${style_1.CssVar.size};
  width: 150px;
  max-height: 100%;
  max-width: 100%;
}
.${exports.InputClassNames.ipt} {
  box-sizing: border-box;
  border: none;
  background: transparent;
  color: inherit;
  padding: 2px 5px 0px 5px;
  height: 100%;
  max-width: 100%;
  min-width: 0px;
  flex: 1;
  font-size: inherit;
}
.${exports.InputClassNames.lbl} {
  box-sizing: border-box;
  padding: 2px 5px 0px 5px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 100%;
  max-width: 100%;
  flex: 1;
}
.${exports.InputClassNames.btn},
.${exports.InputClassNames.btn_l},
.${exports.InputClassNames.btn_bt},
.${exports.InputClassNames.btn_o} {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  flex: none;
  cursor: pointer;
}
.${exports.InputClassNames.btn} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_l} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_bt} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_o} > .${icon_1.iconClassName} {
  height: 100%;
  width: 100%;
}
.${exports.InputClassNames.ipt}[data-align="center"],
.${exports.InputClassNames.lbl}[data-align="center"] {
  text-align: center;
}
.${exports.InputClassNames.ipt}[data-align="right"],
.${exports.InputClassNames.lbl}[data-align="right"] {
  text-align: right;
}
.${exports.InputClassNames.resize},
.${exports.InputClassNames.resize_x},
.${exports.InputClassNames.resize_y} {
  box-sizing: border-box;
  position: relative;
  flex: none;
  background: transparent;
}
.${exports.InputClassNames.resize} {
  position: absolute;
  height: 5px;
  width: 5px;
  bottom: 0px;
  right: 0px;
  cursor: nwse-resize;
}
.${exports.InputClassNames.resize_x} {
  height: 100%;
  width: 3px;
  top: 0px;
  right: 0px;
  cursor: col-resize;
}
.${exports.InputClassNames.resize_y} {
  height: 3px;
  width: 100%;
  bottom: 0px;
  left: 0px;
  cursor: row-resize;
}
${design === "material" ? `
.${exports.InputClassNames.wrap} {
  padding: 1px;
  height: calc(${style_1.CssVar.size} + 2px);
}
.${exports.InputClassNames.wrap} > .${exports.InputClassNames.ipt} {
  background: ${style_1.CssVar.bg.dc};
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.InputClassNames.btn},
.${exports.InputClassNames.btn_l},
.${exports.InputClassNames.btn_bt},
.${exports.InputClassNames.btn_o} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.c};
  z-index: 0;
}
.${exports.InputClassNames.btn} {
  border-left: none;
  width: calc(${style_1.CssVar.size} - 1px);
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.${exports.InputClassNames.btn_l} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.${exports.InputClassNames.btn_bt} {
  border-radius: 0px;
  width: calc(${style_1.CssVar.size} - 1px);
  border-left: none;
}
.${exports.InputClassNames.btn}:hover,
.${exports.InputClassNames.btn_l}:hover,
.${exports.InputClassNames.btn_bt}:hover,
.${exports.InputClassNames.btn_o}:hover {
  margin-top: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  z-index: 1;
}
.${exports.InputClassNames.btn}:hover:active,
.${exports.InputClassNames.btn_l}:hover:active,
.${exports.InputClassNames.btn_bt}:hover:active,
.${exports.InputClassNames.btn_o}:hover:active {
  margin-top: 0px;
  margin-bottom: 0px;
  box-shadow: none;
}
` : ""}
${design === "neumorphism" ? `
.${exports.InputClassNames.wrap} {
  padding: ${style_1.CssParam.n.sdPdd}; 
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
}
.${exports.InputClassNames.wrap} > .${exports.InputClassNames.ipt} {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.InputClassNames.wrap} > .${exports.InputClassNames.ipt}:read-only,
.${exports.InputClassNames.wrap} > .${exports.InputClassNames.ipt}:disabled {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
.${exports.InputClassNames.btn},
.${exports.InputClassNames.btn_l},
.${exports.InputClassNames.btn_bt},
.${exports.InputClassNames.btn_o} {
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
  z-index: 0;
}
.${exports.InputClassNames.btn} {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.${exports.InputClassNames.btn_l} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.${exports.InputClassNames.btn_bt} {
  border-radius: 0px;
}
.${exports.InputClassNames.btn} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_l} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_bt} > .${icon_1.iconClassName},
.${exports.InputClassNames.btn_o} > .${icon_1.iconClassName} {
  height: calc(${style_1.CssVar.size} - ${style_1.CssParam.n.ccvSdPdd});
  width: calc(${style_1.CssVar.size} - ${style_1.CssParam.n.ccvSdPdd});
}
.${exports.InputClassNames.btn}:hover,
.${exports.InputClassNames.btn_l}:hover,
.${exports.InputClassNames.btn_bt}:hover,
.${exports.InputClassNames.btn_o}:hover {
  z-index: 1;
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
}
.${exports.InputClassNames.btn}:hover:active,
.${exports.InputClassNames.btn_l}:hover:active,
.${exports.InputClassNames.btn_bt}:hover:active,
.${exports.InputClassNames.btn_o}:hover:active {
  z-index: 0;
  padding-top: 1px;
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
` : ""}
` });
exports.default = InputStyle;
