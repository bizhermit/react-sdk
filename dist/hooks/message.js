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
exports.PopupMessageStyle = exports.MessageHistory = exports.PopupMessage = exports.messageHistoryClassName = exports.popupMessageClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const icon_1 = __importStar(require("../graphics/icon"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const message_utils_1 = require("../utils/message-utils");
const popup_1 = require("./popup");
exports.popupMessageClassName = "bh-ppu_msg";
exports.messageHistoryClassName = "bh-msg_his";
const PopupMessage = () => {
    const eref = (0, react_1.useRef)();
    const rref = (0, react_1.useRef)(0);
    const mm = (0, react_1.useContext)(message_utils_1.MessagesContext);
    const [groups, setGroups] = (0, react_1.useState)([]);
    const click = (0, react_1.useCallback)(() => {
        eref.current.style.display = "none";
    }, []);
    const nodes = () => {
        const nodes = [];
        for (let i = groups.length - 1; i >= 0; i--) {
            const group = groups[i];
            const cnodes = [];
            let typeClassName = "";
            switch (group.type) {
                case "err":
                    typeClassName = "bh-err";
                    break;
                case "warn":
                    typeClassName = "bh-warn";
                    break;
                default:
                    typeClassName = "bh-info";
                    break;
            }
            let ckeycount = 0;
            if (string_utils_1.default.isEmpty(group.title)) {
                for (const item of group.messages) {
                    cnodes.push(react_1.default.createElement("div", { key: ckeycount++, className: `${exports.popupMessageClassName}-item` }, item.message));
                }
            }
            else {
                cnodes.push(react_1.default.createElement("div", { key: ckeycount++, className: `${exports.popupMessageClassName}-item` }, group.title));
            }
            nodes.push(react_1.default.createElement("div", { key: i, className: (0, classname_utils_1.className)(`${exports.popupMessageClassName}-group`, typeClassName) },
                react_1.default.createElement("div", { className: `${exports.popupMessageClassName}-item-icon` },
                    react_1.default.createElement(icon_1.default, { image: group.type ?? "info" })),
                react_1.default.createElement("div", { className: `${exports.popupMessageClassName}-body` }, cnodes)));
        }
        return nodes;
    };
    (0, react_1.useEffect)(() => {
        if (groups.length > 0) {
            eref.current?.style.removeProperty("display");
            // let opacity = 1.0;
            // if (eref.current) eref.current.style.opacity = String(opacity);
            // const func = () => {
            //     if (rev !== messageManager.revistion) return;
            //     opacity -= 0.1;
            //     if (opacity < 0) {
            //         if (eref.current) eref.current.style.display = "none";
            //         return;        
            //     }
            //     if (eref.current) eref.current.style.opacity = String(opacity);
            //     setTimeout(() => {
            //         func();
            //     }, 100);
            // };
            let rate = 100;
            eref.current?.style.removeProperty("width");
            const curWidth = eref.current?.getBoundingClientRect().width || 0;
            const rev = ++rref.current;
            const func = () => {
                if (rev !== rref.current)
                    return;
                rate -= 1;
                if (rate < 0) {
                    // if (eref.current) eref.current.style.display = "none";
                    return;
                }
                if (eref.current)
                    eref.current.style.width = Math.floor(curWidth * (rate / 100)) + "px";
                setTimeout(() => func(), 5);
            };
            setTimeout(() => func(), 5000);
        }
    }, [groups]);
    (0, react_1.useEffect)(() => {
        mm.popup = (groups) => setGroups(groups ?? []);
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, className: `${exports.popupMessageClassName}`, onClick: click }, nodes()),
        exports.PopupMessageStyle,
        popup_1.PopupStyle));
};
exports.PopupMessage = PopupMessage;
const MessageHistory = () => {
    const mm = (0, react_1.useContext)(message_utils_1.MessagesContext);
    const [rev, setRevision] = (0, react_1.useState)(0);
    const [showed, setShowed] = (0, react_1.useState)(false);
    const groups = (0, react_1.useRef)([]);
    const getCounts = (0, react_1.useCallback)(() => {
        return {
            total: groups.current.length,
            info: groups.current.filter((item) => item.type === "info").length,
            warn: groups.current.filter((item) => item.type === "warn").length,
            err: groups.current.filter((item) => item.type === "err").length,
            verified: groups.current.filter((item) => item.verified !== true).length,
        };
    }, []);
    ;
    const callCallbacks = (0, react_1.useCallback)(() => {
        const counts = getCounts();
        mm.callbacks.forEach(cb => cb(counts));
    }, []);
    const clearAll = (0, react_1.useCallback)(() => {
        groups.current.splice(0, groups.current.length);
        setRevision(c => c + 1);
        callCallbacks();
    }, []);
    const clear = (0, react_1.useCallback)((group) => {
        for (let i = 0, il = groups.current.length; i < il; i++) {
            const grp = groups.current[i];
            if (grp !== group)
                continue;
            groups.current.splice(i, 1);
            break;
        }
        setRevision(c => c + 1);
        callCallbacks();
    }, []);
    const close = (0, react_1.useCallback)(() => {
        setShowed(false);
    }, []);
    const { hnodes, bnodes } = (0, react_1.useMemo)(() => {
        const bnodes = [];
        if (!showed)
            return { hnodes: react_1.default.createElement(react_1.default.Fragment, null), bnodes };
        let icnt = 0, wcnt = 0, ecnt = 0;
        for (let i = groups.current.length - 1; i >= 0; i--) {
            const group = groups.current[i];
            const nodes = [];
            let typeClassName = "";
            switch (group.type) {
                case "err":
                    ecnt++;
                    typeClassName = "bh-err";
                    break;
                case "warn":
                    wcnt++;
                    typeClassName = "bh-warn";
                    break;
                default:
                    icnt++;
                    typeClassName = "bh-info";
                    break;
            }
            let ckeycount = 0;
            for (const item of group.messages) {
                nodes.push(react_1.default.createElement("div", { key: ckeycount++, className: `${exports.messageHistoryClassName}-item-message` }, item.message));
            }
            bnodes.push(react_1.default.createElement("div", { key: i, className: (0, classname_utils_1.className)(`${exports.messageHistoryClassName}-item`, typeClassName, group.verified === true ? "bh-verified" : "") },
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-header` },
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-icon` },
                        react_1.default.createElement(icon_1.default, { image: group.type ?? "info" })),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-title` }, group.title),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-timestamp` }, mm.getTimeText(group.timestamp)),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-button`, onClick: () => { clear(group); } },
                        react_1.default.createElement(icon_1.default, { image: "delete" }))),
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-item-body` }, nodes)));
        }
        const hnodes = react_1.default.createElement(react_1.default.Fragment, null,
            icnt === 0 ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-icon` },
                    react_1.default.createElement(icon_1.default, { image: "info" })),
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-count` }, icnt)),
            wcnt === 0 ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-icon` },
                    react_1.default.createElement(icon_1.default, { image: "warn" })),
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-count` }, wcnt)),
            ecnt === 0 ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-icon` },
                    react_1.default.createElement(icon_1.default, { image: "err" })),
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-count` }, ecnt)));
        return { hnodes, bnodes };
    }, [rev, showed]);
    (0, react_1.useEffect)(() => {
        if (showed) {
            groups.current.forEach((grp) => grp.verified = true);
            callCallbacks();
        }
    }, [rev, showed]);
    (0, react_1.useEffect)(() => {
        if (showed) {
            window.addEventListener("click", close);
            return () => {
                window.removeEventListener("click", close);
            };
        }
    }, [showed]);
    (0, react_1.useEffect)(() => {
        mm.showHistory = () => setShowed(true);
        mm.closeHistory = () => close();
        mm.append = (gs) => {
            for (const group of gs) {
                groups.current.push(group);
            }
            setRevision(c => c + 1);
            callCallbacks();
        };
        mm.clear = () => clearAll();
        mm.getCounts = () => getCounts();
    }, []);
    return (showed ?
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}`, onClick: e => e.stopPropagation() },
                react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header` },
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-button`, onClick: () => setRevision(c => c + 1) },
                        react_1.default.createElement(icon_1.default, { image: "reload" })),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-content` }, hnodes),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-button`, onClick: clearAll },
                        react_1.default.createElement(icon_1.default, { image: "delete" })),
                    react_1.default.createElement("div", { className: `${exports.messageHistoryClassName}-header-button`, onClick: close },
                        react_1.default.createElement(icon_1.default, { image: "close" }))),
                react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.messageHistoryClassName}-body` }, bnodes)),
            MessageHistoryStyle) : react_1.default.createElement(react_1.default.Fragment, null));
};
exports.MessageHistory = MessageHistory;
exports.PopupMessageStyle = react_1.default.createElement(style_1.default, { id: exports.popupMessageClassName, depsDesign: true, css: ({ design }) => `
.${exports.popupMessageClassName} {
  z-index: 2100000001;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  top: 0px;
  right: 0px;
  max-height: 100%;
  max-width: 50%;
  background: transparent;
  overflow: hidden;
  user-select: none;
}
.${exports.popupMessageClassName}-group {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  max-width: 100%;
  background: ${style_1.CssVar.bg.c};
}
.${exports.popupMessageClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_x}
}
.${exports.popupMessageClassName}-item {
  ${style_1.CssPV.flex_r}
  flex: none;
  white-space: nowrap;
  overflow: hidden;
  padding: 1px 10px 0px 10px;
  height: ${style_1.CssVar.size};
}
${design === "material" ? `
.${exports.popupMessageClassName} {
  filter: drop-shadow(0px 8px 5px ${style_1.CssVar.shadow.dc});
  top: 5px;
  right: 5px;
}
.${exports.popupMessageClassName}-group {
  border: 3px double ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  min-width: 150px;
}
.${exports.popupMessageClassName}-group.bh-warn {
  background: ${style_1.CssVar.warn.bg.c};
  border-color: ${style_1.CssVar.warn.bdc};
}
.${exports.popupMessageClassName}-group.bh-err {
  background: ${style_1.CssVar.err.bg.c};
  border-color: ${style_1.CssVar.err.bdc};
}
` : ""}
${design === "neumorphism" ? `
.${exports.popupMessageClassName} {
  filter: drop-shadow(0px 8px 5px ${style_1.CssVar.shadow.dc});
  top: 5px;
  right: 5px;
}
.${exports.popupMessageClassName}-group {
  border-radius: ${style_1.CssParam.n.r};
  min-width: 150px;
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  padding: ${style_1.CssParam.n.r};
}
.${exports.popupMessageClassName}-group.bh-warn {
  background: ${style_1.CssParam.n.warn.cvxBg};
}
.${exports.popupMessageClassName}-group.bh-err {
  background: ${style_1.CssParam.n.err.cvxBg};
}
` : ""}
` });
const MessageHistoryStyle = react_1.default.createElement(style_1.default, { id: exports.messageHistoryClassName, depsDesign: true, css: ({ design }) => `
.${exports.messageHistoryClassName} {
  z-index: 2100000000;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  top: 0px;
  right: 0px;
  height: 100%;
  min-width: 400px;
  max-width: 50%;
  background: ${style_1.CssVar.bg.c};
  overflow: hidden;
}
.${exports.messageHistoryClassName}-header {
  ${style_1.CssPV.flex_r}
  flex: none;
  height: ${style_1.CssVar.size};
  width: 100%;
  overflow: hidden;
}
.${exports.messageHistoryClassName}-header-content {
  ${style_1.CssPV.flex_r}
  ${style_1.CssPV.f_x}
}
.${exports.messageHistoryClassName}-header-button,
.${exports.messageHistoryClassName}-header-icon,
.${exports.messageHistoryClassName}-item-button {
  box-sizing: border-box;
  position: relative;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  flex: none;
}
.${exports.messageHistoryClassName}-header-button,
.${exports.messageHistoryClassName}-item-button {
  cursor: pointer;
}
.${exports.messageHistoryClassName}-header-button > .${icon_1.iconClassName},
.${exports.messageHistoryClassName}-item-button > .${icon_1.iconClassName} {
  height: 100%;
  width: 100%;
}
.${exports.messageHistoryClassName}-header-icon {
  margin-left: 10px
}
.${exports.messageHistoryClassName}-header-count {
  padding: 2px 0px 0px 3px;
}
.${exports.messageHistoryClassName}-body {
  ${style_1.CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  ${style_1.CssPV.f_y}
}
.${exports.messageHistoryClassName}-item {
  ${style_1.CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  flex: none;
  max-width: 100%;
}
.${exports.messageHistoryClassName}-item-header {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
}
.${exports.messageHistoryClassName}-item-title {
  ${style_1.CssPV.flex_r}
  ${style_1.CssPV.f_x}
  padding: 1px 0px 0px 5px;
}
.${exports.messageHistoryClassName}-item-timestamp {
  box-sizing: border-box;
  font-size: 10px;
  padding: 2px 3px 0px 3px;
}
.${exports.messageHistoryClassName}-item-body {
  ${style_1.CssPV.flex_c}
  padding-left: calc(${style_1.CssVar.size} / 2);
}
.${exports.messageHistoryClassName}-item-message {
  box-sizing: border-box;
  white-space: wrap;
  max-width: 100%;
}
${design === "material" ? `
.${exports.messageHistoryClassName} {
  border-left: 1px solid ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdLeft};
}
.${exports.messageHistoryClassName}-header {
  border-bottom: 1px solid ${style_1.CssVar.bdc};
  box-shadow: ${style_1.CssParam.m.sdBtm};
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.m.sdPdd} * 2);
  padding: ${style_1.CssParam.m.sdPdd};
  margin-bottom: ${style_1.CssParam.m.sdPdd};
  background: ${style_1.CssVar.bg.c_h};
}
.${exports.messageHistoryClassName}-header-button,
.${exports.messageHistoryClassName}-item-button {
  border-radius: ${style_1.CssParam.m.r};
  border: 1px solid transparent;
}
.${exports.messageHistoryClassName}-header-button + .${exports.messageHistoryClassName}-header-button {
  margin-left: 5px;
}
.${exports.messageHistoryClassName}-header-button:hover,
.${exports.messageHistoryClassName}-item-button:hover {
  margin-top: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  box-shadow: ${style_1.CssParam.m.sdBtm_f};
  border-color: ${style_1.CssVar.bdc};
}
.${exports.messageHistoryClassName}-header-button:hover:active,
.${exports.messageHistoryClassName}-item-button:hover:active {
  margin-top: calc(${style_1.CssParam.m.updownMargin} * 0.5);
  margin-bottom: calc(${style_1.CssParam.m.updownMargin} * -0.5);
  box-shadow: none;
}
.${exports.messageHistoryClassName}-body {
  padding: 5px;
}
.${exports.messageHistoryClassName}-item {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
  padding: 5px;
}
.${exports.messageHistoryClassName}-item + .${exports.messageHistoryClassName}-item {
  margin-top: 5px;
}
.${exports.messageHistoryClassName}-item.bh-verified {
  border-style: dashed;
}
.${exports.messageHistoryClassName}-item.bh-warn {
  border-color: ${style_1.CssVar.warn.bdc};
  background: ${style_1.CssVar.warn.bg.c};
}
.${exports.messageHistoryClassName}-item.bh-err {
  border-color: ${style_1.CssVar.err.bdc};
  background: ${style_1.CssVar.err.bg.c};
}
` : ""}
${design === "neumorphism" ? `
.${exports.messageHistoryClassName} {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  padding: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.messageHistoryClassName}-header {
  box-shadow: ${style_1.CssParam.n.accent.cvxSd};
  background: ${style_1.CssParam.n.headerCvxBg};
  border-radius: ${style_1.CssParam.n.r};
  height: calc(${style_1.CssVar.size} + ${style_1.CssParam.n.sdPdd} * 2);
  padding: ${style_1.CssParam.n.sdPdd};
  margin-bottom: ${style_1.CssParam.n.accent.sdPdd};
}
.${exports.messageHistoryClassName}-header-button,
.${exports.messageHistoryClassName}-item-button {
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.messageHistoryClassName}-header-button + .${exports.messageHistoryClassName}-header-button {
  margin-left: ${style_1.CssParam.n.sdPdd};
}
.${exports.messageHistoryClassName}-header-button:hover,
.${exports.messageHistoryClassName}-item-button:hover {
  box-shadow: ${style_1.CssParam.n.cvxSd_f};
  background: ${style_1.CssParam.n.cvxBg};
}
.${exports.messageHistoryClassName}-header-button:hover:active,
.${exports.messageHistoryClassName}-item-button:hover:active {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  padding-top: 1px;
} 
.${exports.messageHistoryClassName}-item {
  box-shadow: ${style_1.CssParam.n.cvxSd};
  background: ${style_1.CssParam.n.cvxBg};
  border-radius: ${style_1.CssParam.n.r};
  padding: ${style_1.CssParam.n.sdPdd};
  margin: ${style_1.CssParam.n.sdPdd};
}
.${exports.messageHistoryClassName}-item.bh-verified {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.messageHistoryClassName}-item-header .${exports.messageHistoryClassName}-item-button {
  margin-left: ${style_1.CssParam.n.sdPdd};
}
.${exports.messageHistoryClassName}-item.bh-warn {
  background: ${style_1.CssParam.n.warn.cvxBg};
}
.${exports.messageHistoryClassName}-item.bh-warn.bh-verified {
  background: ${style_1.CssParam.n.warn.ccvBg};
}
.${exports.messageHistoryClassName}-item.bh-err {
  background: ${style_1.CssParam.n.err.cvxBg};
}
.${exports.messageHistoryClassName}-item.bh-err.bh-verified {
  background: ${style_1.CssParam.n.err.ccvBg};
}
` : ""}
` });
const useMessage = (callback) => {
    const mm = (0, react_1.useContext)(message_utils_1.MessagesContext);
    const layout = (0, style_1.useLayout)();
    const append = (0, react_1.useCallback)((messages) => {
        if (messages == null || messages.length === 0)
            return;
        const groups = [];
        let type = "", title = "";
        for (const msg of messages) {
            if (msg.type !== type || msg.title !== title) {
                type = msg.type;
                title = msg.title;
                groups.push({
                    type: msg.type,
                    title: msg.title,
                    messages: [],
                    timestamp: Date.now(),
                });
            }
            const grp = groups[groups.length - 1];
            grp.messages.push({
                type: msg.type,
                title: grp.title,
                message: msg.message,
                timestamp: grp.timestamp,
            });
        }
        mm.append(groups);
        mm.popup(groups);
    }, []);
    const error = (0, react_1.useCallback)((e) => {
        console.log(e);
        append([{
                title: "システムエラー",
                message: "システムエラーが発生しました",
                type: "err",
            }]);
    }, []);
    const clear = (0, react_1.useCallback)(() => {
        mm.clear();
    }, []);
    const showHistory = (0, react_1.useCallback)(() => {
        mm.showHistory();
    }, []);
    const closeHistory = (0, react_1.useCallback)(() => {
        mm.closeHistory();
    }, []);
    (0, react_1.useEffect)(() => {
        let elem;
        elem = document.getElementById("bhMessageHistory");
        if (elem == null) {
            elem = document.createElement("div");
            elem.id = "bhMessageHistory";
            document.body.appendChild(elem);
        }
        react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: layout },
            react_1.default.createElement(exports.MessageHistory, null)), elem);
        elem = document.getElementById("bhPopupMessage");
        if (elem == null) {
            elem = document.createElement("div");
            elem.id = "bhPopupMessage";
            document.body.appendChild(elem);
        }
        react_dom_1.default.render(react_1.default.createElement(style_1.StyleContext.Provider, { value: layout },
            react_1.default.createElement(exports.PopupMessage, null)), elem);
    }, [layout]);
    (0, react_1.useEffect)(() => {
        if (callback) {
            mm.callbacks.push(callback);
            callback(mm.getCounts());
            return () => {
                for (let i = 0, il = mm.callbacks.length; i < il; i++) {
                    if (mm.callbacks[i] !== callback)
                        continue;
                    mm.callbacks.splice(i, 1);
                    break;
                }
            };
        }
    }, [callback]);
    return { append, error, clear, showHistory, closeHistory };
};
exports.default = useMessage;
