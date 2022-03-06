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
exports.SelectBoxStyle = exports.selectBoxClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = __importStar(require("../hooks/controller"));
const popup_1 = __importDefault(require("../hooks/popup"));
const prop_1 = __importDefault(require("../hooks/prop"));
const value_1 = __importDefault(require("../hooks/value"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importDefault(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
const dom_utils_1 = require("../utils/dom-utils");
const listview_1 = __importStar(require("./listview"));
exports.selectBoxClassName = "bh-slb";
const SelectBox = (props) => {
    const eref = (0, react_1.useRef)(), iref = (0, react_1.useRef)();
    const labelDataName = (0, prop_1.default)(props.labelDataName ?? "label");
    const valueDataName = (0, prop_1.default)(props.valueDataName ?? "value");
    const popup = (0, popup_1.default)(listview_1.default, { className: `${exports.selectBoxClassName}-list` });
    const [loading, setLoading] = (0, react_1.useState)(true);
    const itemHeight = (0, react_1.useRef)((0, listview_1.listViewDefaultRowHeight)());
    const sourceItems = (0, react_1.useRef)([]);
    const bindingItems = (0, react_1.useRef)([]);
    const [filter, setFilter] = (0, react_1.useState)(null);
    const columns = (0, react_1.useMemo)(() => {
        return [{ name: labelDataName.current, fill: true, width: 10, cellTextAlign: props.textAlign ?? "left" }];
    }, []);
    const lvController = (0, controller_1.default)();
    const labelText = (0, react_1.useRef)("");
    const device = (0, dom_utils_1.useDevice)();
    const disabledInput = (0, prop_1.default)(props.inputText === true || device.touchable);
    const filterText = (0, react_1.useRef)("");
    const setFilterText = (0, react_1.useCallback)((text) => {
        if (string_utils_1.default.isEmpty(text)) {
            filterText.current = "";
            setFilter(null);
            return;
        }
        if (filterText.current === text)
            return;
        setFilter(() => (data) => String(data[labelDataName.current || ""]).indexOf(text) !== -1);
    }, []);
    const setText = (value) => {
        if (loading)
            return;
        const texts = [];
        if (Array.isArray(value)) {
            for (const val of value) {
                for (const item of sourceItems.current) {
                    if (item[labelDataName.current] !== val)
                        continue;
                    texts.push(String(item[labelDataName.current]));
                    break;
                }
            }
        }
        else {
            for (const item of sourceItems.current) {
                if (item[valueDataName.current] !== value)
                    continue;
                texts.push(String(item[labelDataName.current]));
                break;
            }
        }
        labelText.current = texts.join(",");
        if (iref.current)
            iref.current.value = labelText.current;
        return labelText.current;
    };
    const { getValue, setValue } = (0, value_1.default)(props, {
        binded: (v) => setText(v),
        changed: (v) => setText(v),
        convertChangedArgData: (v) => {
            return { value: v, data: sourceItems.current.find(data => data[valueDataName.current] === v) };
        },
        defaultValue: bindingItems.current[0]?.[valueDataName.current],
    });
    const hideList = (0, react_1.useCallback)((absolute) => {
        popup.hide(absolute);
    }, []);
    const showList = (absolute) => {
        if (props.disabled === true || loading)
            return;
        if (absolute !== true && popup.isShowed())
            return;
        const rect = eref.current.getBoundingClientRect();
        const ch = document.body.clientHeight;
        const height = (len) => Math.min(props.listMaxHeight ?? 400, itemHeight.current * len + 2, Math.max(ch - rect.bottom, rect.top) - 5);
        popup.show(eref.current, {
            componentProps: {
                controller: lvController,
                style: { height: "100%", width: "100%" },
                columns,
                value: bindingItems.current,
                options: {
                    clickedRow: (params) => {
                        setValue(params.data[valueDataName.current]);
                        iref.current.focus();
                        hideList(true);
                    },
                    filter,
                    filtered: (items) => {
                        popup.getElement().style.height = height(items.length) + "px";
                    },
                    header: false,
                    rowNumber: false,
                    rowHeignt: itemHeight.current,
                    selectMode: "row",
                    enterIsClick: true,
                },
            },
            createMountElementCallback: (elem) => {
                (0, dom_utils_1.setStyleProps)(elem, {
                    width: `${eref.current.offsetWidth}px`,
                    height: `${height(sourceItems.current.length)}px`,
                    minHeight: `${itemHeight.current}px`,
                });
            },
            showedCallback: () => {
                setTimeout(() => {
                    const val = getValue();
                    for (let i = 0, il = bindingItems.current.length; i < il; i++) {
                        if (bindingItems.current[i][valueDataName.current] !== val)
                            continue;
                        lvController?.select(i);
                        break;
                    }
                }, 0);
            },
            hideCallback: () => {
                if (document.activeElement === iref.current)
                    return false;
            },
        });
    };
    const focusInput = () => {
        setFilterText("");
        showList();
        props.focus?.(getValue());
    };
    const clickInput = () => {
        focusInput();
    };
    const keydownInput = (e) => {
        if (e.key === "Tab") {
            setTimeout(() => {
                hideList(true);
                props.blur?.(getValue());
            }, 0);
            return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (popup.isShowed()) {
                lvController.focus();
                e.preventDefault();
            }
            else {
                showList();
            }
            return;
        }
        if (e.key === "Backspace") {
            showList();
            return;
        }
        if (e.key === "Escape") {
            hideList();
            return;
        }
        if (e.key === "F2") {
            setFilterText("");
            showList();
            return;
        }
    };
    const clickButton = () => {
        if (loading)
            return;
        if (!disabledInput.current)
            focusInput();
        else
            iref.current.focus();
    };
    const mousedownResize = (0, dom_utils_1.horizontalResizeMousedown)(props);
    (0, react_1.useEffect)(() => {
        if (popup.isShowed())
            showList(true);
    }, [filter]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            iref.current?.focus();
            showList();
            return con;
        };
        con.blur = () => {
            iref.current?.blur();
            return con;
        };
        con.getValue = () => getValue();
        con.setValue = (v) => {
            setValue(v);
            return con;
        };
    });
    (0, react_1.useEffect)(() => {
        setLoading(true);
        const init = (s) => {
            sourceItems.current = s ?? [];
            if (props.appendEmptyItem === true && sourceItems.current.find((item) => item[valueDataName.current] == null) == null) {
                const emptyItem = {};
                emptyItem[valueDataName.current] = null;
                emptyItem[labelDataName.current] = "";
                sourceItems.current.unshift(emptyItem);
            }
            bindingItems.current = sourceItems.current.concat();
            setLoading(false);
            if (props.defaultItemIsFirstItem) {
                if (getValue() == null)
                    setValue(sourceItems.current[0]?.[valueDataName.current]);
            }
            setText(getValue());
        };
        if (props.source == null) {
            init([]);
        }
        else if (Array.isArray(props.source)) {
            init(props.source);
        }
        else {
            (async () => {
                try {
                    init(await props.source());
                }
                catch {
                    console.log("failed: load radiobutton source");
                    init([]);
                }
            })();
        }
    }, [props.source]);
    (0, react_1.useEffect)(() => {
        setText(getValue());
    }, [props.disabled, loading]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(input_1.InputClassNames.wrap, exports.selectBoxClassName, props.className), "data-disabled": props.disabled === true || loading, "data-required": props.required, "data-loading": loading },
            props.disabled === true ?
                react_1.default.createElement("span", { className: input_1.InputClassNames.lbl, "data-align": props.textAlign ?? "left", title: props.title }, labelText.current) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("input", { ref: iref, className: input_1.InputClassNames.ipt, type: "text", readOnly: disabledInput.current, onChange: e => setFilterText(e.currentTarget.value), onFocus: focusInput, onClick: clickInput, onKeyDown: keydownInput, "data-align": props.textAlign ?? "left", disabled: loading, title: props.title }),
                react_1.default.createElement("div", { className: input_1.InputClassNames.btn, onClick: clickButton, tabIndex: -1 },
                    react_1.default.createElement(icon_1.default, { image: "pulldown" }))),
            props.resize === false ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: input_1.InputClassNames.resize_x, onMouseDown: mousedownResize })),
        input_1.default,
        exports.SelectBoxStyle));
};
exports.default = SelectBox;
exports.SelectBoxStyle = react_1.default.createElement(style_1.default, { id: exports.selectBoxClassName, depsDesign: true, css: ({ design }) => `
.${exports.selectBoxClassName}[data-loading="true"] {
  opacity: 0.6;
  pointer-events: none;
}
.${exports.selectBoxClassName}-list .${listview_1.listViewClassName}-cell {
  cursor: pointer;
}
${design === "material" ? `
.${exports.selectBoxClassName} > .${input_1.InputClassNames.ipt} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
` : ""}
${design === "neumorphism" ? `
.${exports.selectBoxClassName} > .${input_1.InputClassNames.ipt} {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
` : ""}
` });
