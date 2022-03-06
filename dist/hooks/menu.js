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
exports.PopupMenuStyle = exports.PopupMenu = exports.popupMenuClassName = void 0;
const react_1 = __importStar(require("react"));
const menu_list_1 = __importDefault(require("../controls/menu-list"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const controller_1 = __importDefault(require("./controller"));
const popup_1 = __importDefault(require("./popup"));
exports.popupMenuClassName = "bh-ppu_menu";
const PopupMenu = (props) => {
    const controller = (0, controller_1.default)();
    (0, react_1.useEffect)(() => {
        controller.focus();
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classname_utils_1.className)(`${exports.popupMenuClassName}-body`, props.className), "data-dirc": props.direction ?? "vertical", onClick: e => e.stopPropagation() },
            react_1.default.createElement(menu_list_1.default, { controller: controller, items: props.items, direction: props.direction ?? "vertical", clicked: (p, retFlag) => {
                    if ((p.childItems?.length ?? 0) > 0)
                        return;
                    if (retFlag !== false)
                        props.hide();
                } })),
        exports.PopupMenuStyle));
};
exports.PopupMenu = PopupMenu;
exports.PopupMenuStyle = react_1.default.createElement(style_1.default, { id: exports.popupMenuClassName, depsDesign: true, css: ({ design }) => `
.${exports.popupMenuClassName}-body {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.${exports.popupMenuClassName}-body[data-dirc="horizontal"] {
  height: ${style_1.CssVar.size};
  overflow: visible;
}
${design === "material" ? `
.${exports.popupMenuClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  background: ${style_1.CssVar.bg.c};
}
.${exports.popupMenuClassName}-body[data-dirc="horizontal"] {
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.updownMargin} * 2);
}
` : ""}
${design === "neumorphism" ? `
.${exports.popupMenuClassName} {
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.popupMenuClassName}-body[data-dirc="horizontal"] {
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
}
` : ""}
` });
const useMenu = (menuItems, options) => {
    const popup = (0, popup_1.default)(exports.PopupMenu, { className: exports.popupMenuClassName });
    return (0, react_1.useMemo)(() => {
        return {
            hide: popup.hide,
            show: (anchorElement, showOptions) => {
                popup.show(anchorElement, {
                    position: showOptions?.position,
                    componentProps: {
                        items: menuItems,
                        hide: popup.hide,
                        className: options?.className,
                        direction: showOptions?.direction ?? options?.direction,
                    },
                });
            },
        };
    }, []);
};
exports.default = useMenu;
