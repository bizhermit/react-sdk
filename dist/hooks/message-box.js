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
exports.MessageBox = exports.messageBoxClassName = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const button_1 = __importDefault(require("../controls/button"));
const textbox_1 = __importDefault(require("../controls/textbox"));
const icon_1 = __importDefault(require("../graphics/icon"));
const style_1 = __importStar(require("../layouts/style"));
const controller_1 = __importDefault(require("./controller"));
const popup_1 = require("./popup");
exports.messageBoxClassName = "bh-msg_box";
const MessageBox = (props) => {
    const eref = (0, react_1.useRef)();
    const controller = (0, controller_1.default)();
    const keydown = (e) => {
        if (e.key === "Tab")
            e.preventDefault();
    };
    const focus = () => {
        controller.focus?.();
    };
    const click = (button) => {
        if (props.preventButtonClickEvent !== true)
            button.click?.({});
        props.click?.(button);
    };
    (0, react_1.useEffect)(() => {
        eref.current.style.removeProperty("display");
        const ch = eref.current.offsetHeight, cw = eref.current.offsetWidth;
        const rect = document.body.getBoundingClientRect();
        eref.current.style.top = String((rect.height - ch) / 2) + "px";
        eref.current.style.left = String((rect.width - cw) / 2) + "px";
        eref.current.style.removeProperty("visibility");
        focus();
    }, []);
    const buttonNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        let first = true;
        for (const btn of props.buttons) {
            if (first) {
                if (props.textbox == null) {
                    nodes.push(react_1.default.createElement(button_1.default, { key: btn.code, controller: controller, click: () => { click(btn); } }, btn.text));
                    continue;
                }
            }
            nodes.push(react_1.default.createElement(button_1.default, { key: btn.code, click: () => { click(btn); } }, btn.text));
        }
        return nodes;
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: `${popup_1.PopupClassNames.m_p} ${exports.messageBoxClassName}-mask`, tabIndex: 0, onKeyDown: keydown, onFocus: focus }),
        react_1.default.createElement("div", { ref: eref, className: `${popup_1.PopupClassNames.b} ${exports.messageBoxClassName}`, style: { visibility: "hidden", display: "none", top: 0, left: 0 } },
            props.title == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.messageBoxClassName}-header` }, props.title),
            react_1.default.createElement("div", { className: `${exports.messageBoxClassName}-body` },
                react_1.default.createElement("div", { className: `${exports.messageBoxClassName}-content` },
                    props.iconImage == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(icon_1.default, { className: `${exports.messageBoxClassName}-icon`, image: props.iconImage }),
                    react_1.default.createElement("div", { className: `${exports.messageBoxClassName}-message`, "data-type": typeof props.message }, props.message)),
                props.textbox == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(textbox_1.default, { ...props.textbox, controller: controller, name: "value", bind: props.bind, style: { width: props.textbox?.width } })),
            react_1.default.createElement("div", { className: `${exports.messageBoxClassName}-footer` }, buttonNodes)),
        react_1.default.createElement("div", { className: `${popup_1.PopupClassNames.m_s} ${exports.messageBoxClassName}-mask`, tabIndex: 0, onKeyDown: keydown, onFocus: focus }),
        popup_1.PopupStyle,
        MessageBoxStyle));
};
exports.MessageBox = MessageBox;
const MessageBoxContext = {
    layout: null,
    open: (props) => {
        return new Promise((resolve, _reject) => {
            const relem = document.createElement("div");
            document.body.appendChild(relem);
            const params = { value: props.textbox?.defaultValue ?? null };
            const click = (btn) => {
                react_dom_1.default.unmountComponentAtNode(relem);
                btn.click?.(params);
                resolve(btn.code);
            };
            react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: MessageBoxContext.layout },
                react_1.default.createElement(exports.MessageBox, { ...props, click: click, bind: params, preventButtonClickEvent: true })), relem);
        });
    },
    alert: (message) => {
        return MessageBoxContext.open({ message, buttons: [{ code: "ok", text: "OK" }] });
    },
    confirm: async (options) => {
        const title = options?.title ?? "確認";
        let message = options?.message ?? "よろしいですか？";
        switch (options?.template) {
            case "delete":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u524A\u9664\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "registration":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u767B\u9332\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "update":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u66F4\u65B0\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "modification":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u5909\u66F4\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "save":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u4FDD\u5B58\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "saveover":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u4E0A\u66F8\u304D\u4FDD\u5B58\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            case "saveas":
                message = react_1.default.createElement(react_1.default.Fragment, null,
                    options?.subject == null ? "" : `${options.subject}を`,
                    "\u5225\u540D\u3067\u4FDD\u5B58\u3057\u307E\u3059\u3002",
                    react_1.default.createElement("br", null),
                    "\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F");
                break;
            default:
                break;
        }
        const retCode = await MessageBoxContext.open({
            title, message, iconImage: options?.iconImage, buttons: [{
                    code: "ok",
                    text: "OK",
                }, {
                    code: "cancel",
                    text: "キャンセル",
                }]
        });
        return retCode === "ok";
    },
    textbox: async (options) => {
        let value = "";
        const retCode = await MessageBoxContext.open({
            message: options.message, title: options.title, textbox: {
                width: options.textboxWidth,
                defaultValue: options.defaultValue,
                options: options.textboxOptions,
            }, buttons: [{
                    code: "ok",
                    text: "OK",
                    click: (params) => { value = params.value; },
                }, {
                    code: "cancel",
                    text: "キャンセル",
                }]
        });
        if (retCode !== "ok")
            return { judge: false, value: null };
        return { judge: true, value };
    },
};
const MessageBoxStyle = react_1.default.createElement(style_1.default, { id: exports.messageBoxClassName, depsDesign: true, css: ({ design }) => `
.${exports.messageBoxClassName} {
  z-index: 2147483647;
  max-height: 80%;
  max-width: 80%;
  min-width: 200px;
  background: ${style_1.CssVar.bg.c};
}
.${exports.messageBoxClassName}-header {
  ${style_1.CssPV.flex_r}
  flex: none;
  height: ${style_1.CssVar.size};
  padding: 1px 5px 0px 5px;
}
.${exports.messageBoxClassName}-body {
  ${style_1.CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  ${style_1.CssPV.f_y}
}
.${exports.messageBoxClassName}-content {
  ${style_1.CssPV.flex_r}
  flex: none;
  min-height: ${style_1.CssVar.size};
}
.${exports.messageBoxClassName}-message[data-type="string"] {
  padding-top: 2px;
}
.${exports.messageBoxClassName}-icon {
  margin-right: 10px;
}
.${exports.messageBoxClassName}-footer {
  ${style_1.CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  flex: none;
}
.${exports.messageBoxClassName}-mask {
  z-index: 2147483646;
}
${design === "material" ? `
.${exports.messageBoxClassName} {
  border-radius: ${style_1.CssParam.m.r};
  border: 1px solid ${style_1.CssVar.bdc};
}
.${exports.messageBoxClassName}-header {
  border-bottom: 1px solid ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm};
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.messageBoxClassName}-body {
  padding: 5px 10px;
}
.${exports.messageBoxClassName}-header + .${exports.messageBoxClassName}-body {
  padding-top: calc(${style_1.CssParam.m.sdPdd} + 5px);
}
.${exports.messageBoxClassName}-footer {
  padding: 0px 5px 5px 5px;
}
` : ""}
${design === "neumorphism" ? `
.${exports.messageBoxClassName} {
  border-radius: ${style_1.CssParam.n.r};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  padding: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.messageBoxClassName}-header {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.messageBoxClassName}-body {
  padding: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.messageBoxClassName}-header + .${exports.messageBoxClassName}-body {
  padding-top: calc(${style_1.CssParam.n.accent.sdPdd} * 2);
}
` : ""}
` });
const useMessageBox = () => {
    MessageBoxContext.layout = (0, style_1.useLayout)();
    return MessageBoxContext;
};
exports.default = useMessageBox;
