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
exports.FileBoxStyle = exports.fileBoxClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = __importStar(require("../hooks/controller"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importDefault(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const button_1 = __importDefault(require("./button"));
exports.fileBoxClassName = "bh-flb";
const FileBox = (props) => {
    const iref = (0, react_1.useRef)();
    const bcon = (0, controller_1.default)();
    const [text, setText] = (0, react_1.useState)("");
    const { getValue, setValue } = (0, value_1.default)(props, {
        binded: (v) => setText(v?.name ?? ""),
        changed: (v) => {
            setText(v?.name ?? "");
            iref.current.value = "";
        }
    });
    const fileAccept = (0, react_1.useMemo)(() => {
        return props.accept?.join(",") ?? ".";
    }, [props.accept]);
    const changeFile = (e) => {
        if (props.disabled === true)
            return;
        setValue(e.target.files[0]);
    };
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            bcon.focus();
            return con;
        };
        con.blur = () => {
            bcon.blur();
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            setValue(v);
            return con;
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.fileBoxClassName, props.className), "data-disabled": props.disabled === true, "data-required": props.required, title: props.title },
            props.iconImage == null ?
                react_1.default.createElement(button_1.default, { controller: bcon, disabled: props.disabled, click: () => iref.current.click(), title: props.title }, props.children ?? "ファイルを選択")
                : react_1.default.createElement(button_1.default, { controller: bcon, image: props.iconImage, disabled: props.disabled, click: () => iref.current.click(), title: props.title }, props.children ?? "ファイルを選択"),
            props.fileName === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("span", { className: input_1.InputClassNames.lbl }, text),
            react_1.default.createElement("input", { ref: iref, className: `${exports.fileBoxClassName}-ipt`, type: "file", accept: fileAccept, tabIndex: -1, onChange: changeFile })),
        input_1.default,
        exports.FileBoxStyle));
};
exports.default = FileBox;
exports.FileBoxStyle = react_1.default.createElement(style_1.default, { id: exports.fileBoxClassName, css: () => `
.${exports.fileBoxClassName} {
  width: unset;
  padding: 0px;
}
.${exports.fileBoxClassName}-ipt {
  height: 0px !important;
  width: 0px !important;
  opacity: 0;
  visibility: hidden;
  user-select: none;
}
.${exports.fileBoxClassName} > .${input_1.InputClassNames.lbl} {
  padding-top: 3px;
}
` });
