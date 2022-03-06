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
exports.generateFunctionKeyActions = exports.FnKeyContainerStyle = exports.useFunctionKey = exports.FunctionKeyContainer = exports.functionKeyContainerClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const button_1 = __importStar(require("../controls/button"));
const icon_1 = __importDefault(require("../graphics/icon"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const FunctionKeyContext = (0, react_1.createContext)({
    setFnKeyActions: () => "",
    removeFnKeyActions: () => { },
});
exports.functionKeyContainerClassName = "bh-fnk_ctr";
const FunctionKeyContainer = (props) => {
    const eref = (0, react_1.useRef)();
    const keyActions = (0, react_1.useRef)(props.defaultActions == null ? [] : [{ id: string_utils_1.default.generateUuidV4(), actions: props.defaultActions }]);
    const [rev, setRev] = (0, react_1.useState)(0);
    const setFnKeyActions = (actions) => {
        const id = string_utils_1.default.generateUuidV4();
        keyActions.current.push({ id, actions });
        setRev(c => c + 1);
        return id;
    };
    const removeFnKeyActions = (id) => {
        for (let i = 0, il = keyActions.current.length; i < il; i++) {
            if (keyActions.current[i].id !== id)
                continue;
            keyActions.current.splice(i, 1);
            break;
        }
        setRev(c => c + 1);
    };
    const { buttonNodes, buttonControllers } = (0, react_1.useMemo)(() => {
        const nodes = [], cons = [];
        const idx = keyActions.current.length - 1;
        for (let i = 0; i < 12; i++) {
            let fnAct = null;
            for (let j = idx; j >= 0; j--) {
                fnAct = keyActions.current[j]?.actions?.[i];
                if (fnAct == null)
                    continue;
                break;
            }
            const con = {};
            nodes.push(react_1.default.createElement(button_1.default, { controller: con, key: i, className: `${exports.functionKeyContainerClassName}-btn`, disabled: fnAct?.disabled === true || fnAct?.click == null, title: fnAct?.title, click: async (unlock) => {
                    if (props.disabled === true)
                        unlock();
                    else if (fnAct)
                        fnAct?.click(unlock);
                    else
                        unlock();
                } },
                react_1.default.createElement("div", { className: `${exports.functionKeyContainerClassName}-lbl-wrap` },
                    react_1.default.createElement("div", { className: `${exports.functionKeyContainerClassName}-lbl-key` }, `F${i + 1}`),
                    react_1.default.createElement("div", { className: `${exports.functionKeyContainerClassName}-lbl` },
                        react_1.default.createElement(FunctionButtonLabel, { image: fnAct?.image }, fnAct?.label ?? "")))));
            cons.push(con);
        }
        return {
            buttonNodes: nodes,
            buttonControllers: cons,
        };
    }, [rev]);
    const keydownClick = (e, index) => {
        buttonControllers[index]?.click();
        e.stopPropagation();
        e.preventDefault();
    };
    const keydown = (e) => {
        switch (e.key) {
            case "F1":
                keydownClick(e, 0);
                break;
            case "F2":
                keydownClick(e, 1);
                break;
            case "F3":
                keydownClick(e, 2);
                break;
            case "F4":
                keydownClick(e, 3);
                break;
            case "F5":
                keydownClick(e, 4);
                break;
            case "F6":
                keydownClick(e, 5);
                break;
            case "F7":
                keydownClick(e, 6);
                break;
            case "F8":
                keydownClick(e, 7);
                break;
            case "F9":
                keydownClick(e, 8);
                break;
            case "F10":
                keydownClick(e, 8);
                break;
            case "F11":
                keydownClick(e, 10);
                break;
            case "F12":
                keydownClick(e, 11);
                break;
        }
    };
    (0, react_1.useEffect)(() => {
        if (eref.current.querySelector("*:focus") == null)
            eref.current.focus();
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FunctionKeyContext.Provider, { value: { setFnKeyActions, removeFnKeyActions } },
            react_1.default.createElement("div", { ref: eref, className: (0, classname_utils_1.className)(exports.functionKeyContainerClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), style: props.style, onKeyDown: keydown, tabIndex: -1 },
                react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.functionKeyContainerClassName}-content`, style: props.contentStyle }, props.children),
                props.buttonVisible === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${exports.functionKeyContainerClassName}-buttons` }, buttonNodes))),
        exports.FnKeyContainerStyle));
};
exports.FunctionKeyContainer = FunctionKeyContainer;
const FunctionButtonLabel = ({ image, children }) => {
    return image == null ? react_1.default.createElement(react_1.default.Fragment, null, children) : react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(icon_1.default, { image: image, className: `${exports.functionKeyContainerClassName}-btn-icon` }),
        children);
};
const useFunctionKey = (actions, deps) => {
    const ctx = (0, react_1.useContext)(FunctionKeyContext);
    (0, react_1.useEffect)(() => {
        const id = ctx.setFnKeyActions(actions);
        return () => {
            ctx.removeFnKeyActions(id);
        };
    }, deps ?? []);
};
exports.useFunctionKey = useFunctionKey;
exports.default = exports.useFunctionKey;
exports.FnKeyContainerStyle = react_1.default.createElement(style_1.default, { id: exports.functionKeyContainerClassName, css: () => `
.${exports.functionKeyContainerClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  outline: none;
}
${style_1.CssPV.fitToOuter(exports.functionKeyContainerClassName)}
.${exports.functionKeyContainerClassName}-content {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
}
.${exports.functionKeyContainerClassName}-buttons {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
  overflow: hidden;
}
.${button_1.buttonClassName}.${exports.functionKeyContainerClassName}-btn {
  flex: 1;
  flex-flow: column nowrap;
  justify-content: center;
  height: calc(${style_1.CssVar.size} * 2);
}
.${exports.functionKeyContainerClassName}-lbl-wrap {
  ${style_1.CssPV.flex_c_c}
  flex: none;
  padding: 5px 0px;
  align-items: center;
  height: 100%;
  overflow: hidden;
}
.${exports.functionKeyContainerClassName}-lbl-key {
  box-sizing: border-box;
  max-width: 100%;
  min-height: 0px;
  flex: none;
  padding-top: 2px;
}
.${exports.functionKeyContainerClassName}-lbl {
  ${style_1.CssPV.flex_r}
  flex: none;
  max-width: 100%;
  overflow: hidden;
  height: ${style_1.CssVar.size};
}
.${exports.functionKeyContainerClassName}-btn-icon {
  height: calc(${style_1.CssVar.size} * 0.8);
  width: calc(${style_1.CssVar.size} * 0.8);
  margin-right: 3px;
}
` });
const generateFunctionKeyActions = (func) => {
    const acts = [];
    for (let i = 0; i < 12; i++)
        acts.push(null);
    if (func == null)
        return acts;
    const con = {
        set: (key, props) => {
            acts[Number(key.replace("F", "")) - 1] = props;
            return con;
        },
    };
    func(con);
    return acts;
};
exports.generateFunctionKeyActions = generateFunctionKeyActions;
