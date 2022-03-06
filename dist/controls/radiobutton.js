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
exports.RadioButtonStyle = exports.radioButtonClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
exports.radioButtonClassName = "bh-rbt";
;
const RadioButton = (props) => {
    const eref = (0, react_1.useRef)();
    const labelDataName = (0, prop_1.default)(props.labelDataName ?? "label");
    const valueDataName = (0, prop_1.default)(props.valueDataName ?? "value");
    const titleDataName = (0, prop_1.default)(props.titleDataName ?? "title");
    const source = (0, react_1.useRef)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const { value, getValue, setValue } = (0, value_1.default)(props, {
        nullValue: source.current[0]?.[valueDataName.current],
        convertChangedArgData: (v) => {
            return {
                value: v,
                data: source.current.find(item => item[valueDataName.current] === v),
            };
        },
    });
    const select = (value) => {
        if (props.disabled === true || loading)
            return;
        setValue(value);
    };
    const itemNodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        if (loading)
            return nodes;
        for (const item of source.current) {
            const itemValue = item[valueDataName.current];
            nodes.push(react_1.default.createElement("div", { key: itemValue, className: `${exports.radioButtonClassName}-item`, "data-selected": itemValue === value, onClick: () => select(itemValue), onKeyDown: (e) => { (0, dom_utils_1.pressPositiveKey)(e, () => select(itemValue), true); }, tabIndex: props.disabled === true ? null : 0, title: item[titleDataName.current] },
                react_1.default.createElement("div", { className: `${exports.radioButtonClassName}-mark`, "data-selected": itemValue === value }),
                react_1.default.createElement("div", { className: input_1.InputClassNames.lbl }, item[labelDataName.current])));
        }
        return nodes;
    }, [source.current, value, props.disabled, loading]);
    const focus = (e) => {
        if (e.relatedTarget?.parentElement === eref.current)
            return;
        props.focus?.(getValue());
    };
    const blur = (e) => {
        if (e.relatedTarget?.parentElement === eref.current)
            return;
        props.blur?.(getValue());
    };
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            eref.current.querySelector("div")?.focus();
            return con;
        };
        con.blur = () => {
            eref.current.querySelector("div")?.blur();
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            select(v);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        setLoading(true);
        const init = (s) => {
            source.current = s;
            const v = getValue();
            let useDef = true;
            for (const item of source.current) {
                const value = item[valueDataName.current];
                if (value === v) {
                    setValue(v);
                    useDef = false;
                    break;
                }
            }
            if (useDef && source.current.length > 0)
                setValue(source.current[0][valueDataName.current]);
            setLoading(false);
        };
        if (props.source == null) {
            init([]);
        }
        else if (Array.isArray(props.source)) {
            init(props.source);
        }
        else {
            const loadSource = async () => {
                try {
                    init(await props.source());
                }
                catch {
                    console.log("failed: load radiobutton source");
                    init([]);
                }
            };
            loadSource();
        }
    }, [props.source]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(exports.radioButtonClassName, props.className), "data-disabled": props.disabled === true, "data-required": props.required, "data-dirc": props.direction ?? "horizontal", "data-wrap": props.wrap === true, title: props.title, onFocus: focus, onBlur: blur }, itemNodes),
        input_1.default,
        exports.RadioButtonStyle));
};
exports.default = RadioButton;
exports.RadioButtonStyle = react_1.default.createElement(style_1.default, { id: exports.radioButtonClassName, depsDesign: true, css: ({ design }) => `
.${exports.radioButtonClassName} {
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.${exports.radioButtonClassName}[data-dirc="horizontal"] {
  flex-direction: row;
  align-items: center;
}
.${exports.radioButtonClassName}[data-dirc="vertical"] {
  flex-direction: column;
  align-items: flex-start;
}
.${exports.radioButtonClassName}[data-wrap="true"] {
  flex-wrap: wrap;
}
.${exports.radioButtonClassName}[data-wrap="false"] {
  flex-wrap: nowrap;
}
.${exports.radioButtonClassName}-item {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  padding: 2px;
  height: ${style_1.CssVar.size};
}
.${exports.radioButtonClassName}[data-disabled="false"] .${exports.radioButtonClassName}-item {
  cursor: pointer;
  user-select: none;
}
.${exports.radioButtonClassName}[data-dirc="horizontal"] .${exports.radioButtonClassName}-item:not(:last-child) {
  margin-right: 0px;
}
.${exports.radioButtonClassName}-mark {
  box-sizing: border-box;
  position: relative;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
}
.${exports.radioButtonClassName}-mark::before,
.${exports.radioButtonClassName}-mark::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
  border-radius: 50%;
}
.${exports.radioButtonClassName}-mark::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
}
.${exports.radioButtonClassName}-mark::after {
  height: 36%;
  width: 36%;
  top: 32%;
  left: 32%;
}
.${exports.radioButtonClassName}[data-disabled="true"] .${exports.radioButtonClassName}-mark::before {
  opacity: 0.6;
}
.${exports.radioButtonClassName} .${input_1.InputClassNames.lbl} {
  padding-left: 1px;
}
${design === "material" ? `
.${exports.radioButtonClassName}-mark::before {
  border: 1px solid ${style_1.CssVar.bdc};
}
.${exports.radioButtonClassName}-mark[data-selected="true"]::after {
  background: ${style_1.CssVar.bg.c_r};
}
.${exports.radioButtonClassName}[data-disabled="false"] .${exports.radioButtonClassName}-mark::before {
  background: ${style_1.CssVar.bg.dc};
}
.${exports.radioButtonClassName}[data-disabled="true"] .${exports.radioButtonClassName}-mark::before {
  opacity: 0.3;
}
` : ""}
${design === "neumorphism" ? `
.${exports.radioButtonClassName}-mark::before {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.radioButtonClassName}-mark[data-selected="true"]::after {
  box-shadow: ${style_1.CssParam.n.border.cvxSd_r};
  background: ${style_1.CssParam.n.cvxBg_r};
}
.${exports.radioButtonClassName}[data-disabled="true"] .${exports.radioButtonClassName}-mark::before {
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
}
` : ""}
` });
