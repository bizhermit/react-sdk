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
exports.TreeViewStyle = exports.treeViewClassName = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = __importStar(require("react"));
const icon_1 = __importStar(require("../graphics/icon"));
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const checkbox_1 = require("./checkbox");
exports.treeViewClassName = "bh-trv";
const TreeView = (props) => {
    const eref = (0, react_1.useRef)();
    const dataNames = (0, react_1.useRef)({ id: props.idDataName ?? "id", parentId: props.parentIdDataName ?? "parentId", label: props.labelDataName ?? "label", checked: props.checkedDataName ?? "checked" });
    const values = (0, react_1.useRef)({ checked: props.checkedValue ?? true, unchecked: props.uncheckedValue ?? false });
    const [originItems, setOriginItems] = (0, react_1.useState)([]);
    const [filteredItems, setFilteredItems] = (0, react_1.useState)([]);
    const callbacks = (0, react_1.useMemo)(() => {
        return {
            clicked: (itemProps, e) => {
                if (props.checkWhenLabelClicked === true)
                    itemProps.toggleChecked();
                props.itemClicked?.(itemProps.data, e);
            },
        };
    }, [props.checkBox]);
    const nodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        filteredItems.forEach((item) => {
            item.nestLevel = 0;
            nodes.push(react_1.default.createElement(TreeViewItem, { key: item.id, ...item, callbacks: callbacks, disabled: props.disabled === true }));
        });
        return nodes;
    }, [filteredItems, props.disabled, props.checkBox]);
    (0, react_1.useEffect)(() => {
        if (props.items == null) {
            setOriginItems([]);
            return;
        }
        const oItems = [];
        const generateTreeViewItemStruct = (data, id) => {
            const item = {
                id,
                label: data[dataNames.current.label] ?? "",
                appearance: props.labelAppearance ?? "label",
                checkBox: props.checkBox === true,
                children: [],
                data,
                checked: data[dataNames.current.checked] === values.current.checked,
                visible: true,
                toggleChecked: (checked, mode) => {
                    let ret = checked;
                    if (checked == null)
                        ret = (data[dataNames.current.checked] = data[dataNames.current.checked] === values.current.checked ? values.current.unchecked : values.current.checked) === values.current.checked;
                    else
                        data[dataNames.current.checked] = checked ? values.current.checked : values.current.unchecked;
                    item.toggleCheckedCallback?.(item.checked = ret);
                    if (props.checkPropagation === false)
                        return ret;
                    const pFunc = () => {
                        if (item.parent == null)
                            return;
                        if (ret) {
                            let all = true;
                            for (const citem of item.parent.children) {
                                if (citem.checked)
                                    continue;
                                all = false;
                                break;
                            }
                            if (item.parent.checked !== all)
                                item.parent.toggleChecked(all, "p");
                        }
                        else {
                            item.parent.toggleChecked(false, "p");
                        }
                    };
                    const cFunc = () => {
                        item.children.forEach(citem => citem.toggleChecked(citem.checked = ret, "c"));
                    };
                    switch (mode) {
                        case "p":
                            pFunc();
                            break;
                        case "c":
                            cFunc();
                            break;
                        default:
                            pFunc();
                            cFunc();
                            break;
                    }
                    return ret;
                },
                setToggleCheckedCallback: (func) => item.toggleCheckedCallback = func,
                setToggleVisible: (func) => item.toggleVisible = func,
            };
            return item;
        };
        if (props.grouping) {
            const nestMap = {};
            for (const data of props.items) {
                let nestLevel = 0, curMap = nestMap, curItem = null;
                for (const group of props.grouping) {
                    const keyVal = data[group.dataName];
                    let map = curMap[keyVal];
                    if (!map) {
                        let label = keyVal;
                        if (group.labelDataName)
                            label = typeof group.labelDataName === "function" ? group.labelDataName(data) : data[group.labelDataName];
                        const groupData = {};
                        groupData[dataNames.current.label] = label;
                        map = {
                            item: generateTreeViewItemStruct(groupData, `${group.id}_${keyVal}`),
                            map: {},
                        };
                        if (props.groupingLabelAppearance)
                            map.item.appearance = props.groupingLabelAppearance;
                        curMap[keyVal] = map;
                        if (nestLevel === 0) {
                            oItems.push(map.item);
                        }
                        else {
                            curItem.children.push(map.item);
                            map.item.parent = curItem;
                        }
                    }
                    curItem = map.item;
                    curMap = map.map;
                    nestLevel++;
                }
                const id = data[dataNames.current.id] ?? string_utils_1.default.generateUuidV4();
                const item = generateTreeViewItemStruct(data, id);
                item.nestLevel = nestLevel;
                if (curItem == null) {
                    oItems.push(item);
                }
                else {
                    curItem.children.push(item);
                    item.parent = curItem;
                }
            }
        }
        else {
            const idMap = {};
            for (const data of props.items) {
                const id = data[dataNames.current.id] ?? string_utils_1.default.generateUuidV4();
                idMap[id] = generateTreeViewItemStruct(data, id);
            }
            Object.keys(idMap).forEach((id) => {
                const item = idMap[id];
                const parentId = item.data[dataNames.current.parentId];
                if (string_utils_1.default.isEmpty(parentId))
                    return;
                item.parent = idMap[parentId];
                if (item.parent == null)
                    return;
                item.parent.children.push(item);
            });
            Object.keys(idMap).forEach((id) => {
                if (idMap[id].parent == null)
                    oItems.push(idMap[id]);
            });
        }
        setOriginItems(oItems);
    }, [props.items, props.checkBox]);
    (0, react_1.useEffect)(() => {
        const fItems = originItems;
        if (typeof props.filter === "function") {
            const func = (items) => {
                if (items.length === 0)
                    return false;
                let ret = false;
                for (let i = items.length - 1; i >= 0; i--) {
                    const item = items[i];
                    item.visible = func(item.children) || props.filter(item.data);
                    item.toggleVisible?.(item.visible);
                    ret = ret || item.visible;
                }
                return ret;
            };
            func(fItems);
        }
        setFilteredItems(fItems);
    }, [originItems, props.filter]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(exports.treeViewClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className), "data-disabled": props.disabled === true },
            react_1.default.createElement("div", { className: `${style_1.scrollbarClassName} ${exports.treeViewClassName}-body` }, nodes)),
        input_1.default,
        checkbox_1.CheckBoxStyle,
        exports.TreeViewStyle));
};
exports.default = TreeView;
const TreeViewItem = (props) => {
    const [opened, setOpened] = (0, react_1.useState)(false);
    const [created, setCreate] = (0, react_1.useState)(false);
    const [visible, setVisible] = (0, react_1.useState)(props.visible);
    const [isChecked, setChecked] = (0, react_1.useState)(props.checked);
    const toggleChildren = () => {
        if (props.children.length > 0)
            setOpened(c => !c);
    };
    const clickLabel = (e) => {
        props.callbacks.clicked(props, e);
    };
    const clickCheckBox = () => {
        if (props.disabled)
            return;
        setChecked(props.toggleChecked());
    };
    const nodes = (0, react_1.useMemo)(() => {
        const nodes = [];
        if (!created)
            return nodes;
        props.children.forEach((item) => {
            item.nestLevel = props.nestLevel + 1;
            nodes.push(react_1.default.createElement(TreeViewItem, { key: item.id, ...item, callbacks: props.callbacks, disabled: props.disabled }));
        });
        return nodes;
    }, [created, props.children, props.disabled, props.checkBox]);
    (0, react_1.useEffect)(() => {
        if (opened)
            setCreate(true);
    }, [opened]);
    (0, react_1.useEffect)(() => {
        props.setToggleCheckedCallback((checked) => {
            setChecked(checked === true);
        });
        props.setToggleVisible((visible) => {
            if (visible == null) {
                setVisible(c => !c);
                return;
            }
            setVisible(visible);
        });
    }, [props.checkBox]);
    return (react_1.default.createElement("div", { className: `${exports.treeViewClassName}-item-wrap`, "data-nest": props.nestLevel, style: { display: visible ? null : "none" } },
        react_1.default.createElement("div", { className: `${exports.treeViewClassName}-item`, style: { top: `calc(${style_1.CssVar.size} * ${props.nestLevel})` } },
            react_1.default.createElement("div", { className: `${exports.treeViewClassName}-toggle` }, props.children.length === 0 ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: input_1.InputClassNames.btn_o, onClick: toggleChildren },
                react_1.default.createElement(icon_1.default, { image: opened ? "minus" : "add" }))),
            props.checkBox ? react_1.default.createElement("div", { className: `${exports.treeViewClassName}-checkbox ${checkbox_1.checkBoxClassName}-body`, "data-checked": isChecked, "data-disabled": props.disabled, onClick: clickCheckBox }) : react_1.default.createElement(react_1.default.Fragment, null),
            react_1.default.createElement("div", { className: `${exports.treeViewClassName}-label${props.appearance === "anchor" ? " bh-anchor" : ""}`, onClick: clickLabel },
                react_1.default.createElement("div", { className: input_1.InputClassNames.lbl }, props.label))),
        props.children.length === 0 ? react_1.default.createElement(react_1.default.Fragment, null) :
            react_1.default.createElement("div", { className: `${exports.treeViewClassName}-children`, style: { display: opened ? null : "none" } }, nodes)));
};
exports.TreeViewStyle = react_1.default.createElement(style_1.default, { id: exports.treeViewClassName, depsDesign: true, css: ({ design }) => `
.${exports.treeViewClassName} {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.treeViewClassName)}
.${exports.treeViewClassName}-body {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.fill}
}
.${exports.treeViewClassName}-item-wrap {
  ${style_1.CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  flex: none;
  width: 100%;
}
.${exports.treeViewClassName}-item {
  box-sizing: border-box;
  position: sticky;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  top: 0px;
  overflow: visible;
  z-index: 1;
  width: 100%;
  height: ${style_1.CssVar.size};
}
.${exports.treeViewClassName}-item-wrap[data-nest="0"] > .${exports.treeViewClassName}-item::before {
  display: none;
}
.${exports.treeViewClassName}-item-wrap[data-nest="0"] > .${exports.treeViewClassName}-item > .${exports.treeViewClassName}-toggle::before {
  display: none;
}
.${exports.treeViewClassName}-toggle {
  box-sizing: border-box;
  position: relative;
  padding: 3px;
  height: ${style_1.CssVar.size};
  width: ${style_1.CssVar.size};
  overflow: visible;
  z-index: 1;
}
.${exports.treeViewClassName}-toggle > .${input_1.InputClassNames.btn_o},
.${exports.treeViewClassName}-toggle > .${input_1.InputClassNames.btn_o} > .${icon_1.iconClassName} {
  height: 100% !important;
  width: 100% !important;
}
.${exports.treeViewClassName}-toggle:empty::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 1px;
  width: 50%;
  top: calc(50% - 0.5px);
  left: 50%;
  border-bottom: 1px dotted ${style_1.CssVar.fc};
}
.${exports.treeViewClassName}-checkbox {
  background: ${style_1.CssVar.bg.c};
}
.${exports.treeViewClassName}-label {
  ${style_1.CssPV.flex_r}
  ${style_1.CssPV.f_x}
  padding: 3px 5px 0px 5px;
  overflow: hidden;
  cursor: pointer;
  background: ${style_1.CssVar.bg.c};
  z-index: 0;
}
.${exports.treeViewClassName}-children {
  ${style_1.CssPV.flex_c}
  flex: none;
  z-index: 0;
  margin-left: ${style_1.CssVar.size};
}
.${exports.treeViewClassName}-children::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: calc(100% - ${style_1.CssVar.size} * 0.5);
  width: 1px;
  top: 0px;
  border-right: 1px dotted ${style_1.CssVar.fc};
  left: calc(${style_1.CssVar.size} * 0.5 - 0.5px);
}
${design === "material" ? `
.${exports.treeViewClassName} {
  border: 1px solid ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label {
  background: ${style_1.CssVar.lv.b.bg.c_hr};
}
` : ""}
${design === "neumorphism" ? `
.${exports.treeViewClassName} {
  padding: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.treeViewClassName}-body {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  border-radius: ${style_1.CssParam.n.r};
  padding: ${style_1.CssParam.n.sdPdd};
}
.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label {
  background: ${style_1.CssVar.bg.c_a};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  background: ${style_1.CssVar.lv.b.bg.c_hr};
  border-radius: ${style_1.CssParam.n.r};
}
.${exports.treeViewClassName}-item:hover > .${exports.treeViewClassName}-label:active{
  box-shadow: ${style_1.CssParam.n.border.ccvSd};
  padding-top: 4px;
}
` : ""}
` });
