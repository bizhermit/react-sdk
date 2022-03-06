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
exports.FileListViewStyle = exports.fileListViewClassName = void 0;
const react_1 = __importStar(require("react"));
const icon_1 = __importDefault(require("../graphics/icon"));
const controller_1 = require("../hooks/controller");
const input_1 = __importStar(require("../layouts/input"));
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = require("../utils/classname-utils");
exports.fileListViewClassName = "bh-flv";
const dragingClassName = "bh-draging";
const FileListView = (props) => {
    const eref = (0, react_1.useRef)();
    const iref = (0, react_1.useRef)();
    const name = (0, react_1.useRef)(props.name ?? "files");
    const bind = (0, react_1.useRef)({});
    const [rev, setRev] = (0, react_1.useState)(0);
    const [accordionOpened, setAccordionOpened] = (0, react_1.useState)(props.accordionOpenWhenAtFirst ?? true);
    const maxSize = (0, react_1.useRef)(props.maxSize ?? 0);
    const fileAccept = (0, react_1.useMemo)(() => {
        if (props.accept)
            return props.accept.join(",");
        return ".";
    }, [props.accept]);
    const params = (0, react_1.useRef)({ count: 0, size: 0 });
    const getValue = (0, react_1.useCallback)(() => {
        const items = bind.current[name.current];
        if (!Array.isArray(items))
            return [];
        return items;
    }, []);
    const dragLeave = (e) => {
        e.currentTarget.classList.remove(dragingClassName);
    };
    const dragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        if (!e.currentTarget.classList.contains(dragingClassName))
            e.currentTarget.classList.add(dragingClassName);
    };
    const importFileList = (files) => {
        const vals = getValue(), maxIsAdd = props.maxIsAdd === true;
        let sumSize = 0, sumAddCount = 0;
        const bvals = vals.concat();
        vals.forEach((item) => {
            if (item.delete)
                return;
            if (maxIsAdd && !item.add)
                return;
            sumSize += item.size;
            sumAddCount++;
        });
        for (let i = 0, il = files.length; i < il; i++) {
            const file = files.item(i);
            if (props.accept) {
                const ext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
                let exists = false;
                for (const a of props.accept) {
                    exists = a === ext;
                    if (exists)
                        break;
                }
                if (!exists)
                    continue;
            }
            if (props.maxCount != null) {
                if (sumAddCount + 1 > props.maxCount) {
                    props.overMaxCountCallback?.();
                    break;
                }
            }
            if (maxSize.current) {
                if (sumSize + file.size > props.maxSize) {
                    props.overMaxSizeCallback?.();
                    break;
                }
            }
            vals.push({
                file,
                name: file.name,
                size: file.size,
                path: file.path ?? "",
                download: false,
                add: true,
                delete: false,
            });
            sumSize += file.size;
            sumAddCount++;
        }
        if (iref.current)
            iref.current.value = "";
        props.changed?.(vals.concat(), bvals.concat());
        setRev(cur => cur + 1);
    };
    const dropFile = (e) => {
        e.currentTarget.classList.remove(dragingClassName);
        importFileList(e.dataTransfer.files);
    };
    const downloadItem = (0, react_1.useCallback)((item) => {
        props.downloadItem?.(item);
    }, [props.downloadItem]);
    const toggleDelete = (item) => {
        const files = getValue();
        const bfiles = files.concat();
        let changed = false;
        for (let i = 0, il = files.length; i < il; i++) {
            const file = files[i];
            if (file !== item)
                continue;
            if (file.add) {
                files.splice(i, 1);
                changed = true;
                break;
            }
            file.delete = !(file.delete ?? false);
            break;
        }
        if (changed)
            props.changed?.(files.concat(), bfiles.concat());
        setRev(cur => cur + 1);
    };
    const changeFile = (e) => {
        importFileList(e.currentTarget.files);
        e.currentTarget.value = "";
    };
    const { itmeNodes, fileSize, fileSizeOnlyAdd } = (0, react_1.useMemo)(() => {
        const nodes = [], items = getValue();
        let kc = 0, sizeSum = 0, sizeSumAdd = 0;
        const func = (item) => {
            nodes.push(react_1.default.createElement(FileItem, { key: kc++, item: item, downloadUI: props.downloadUI ?? "button", toggleDelete: toggleDelete, download: downloadItem, disabled: props.disabled === true }));
            if (!item.delete) {
                sizeSum += item.size ?? 0;
                if (item.add)
                    sizeSumAdd += item.size ?? 0;
            }
        };
        if (props.addToTop === false) {
            for (const item of items) {
                func(item);
            }
        }
        else {
            for (let i = items.length - 1; i >= 0; i--) {
                func(items[i]);
            }
        }
        params.current.count = nodes.length;
        params.current.size = sizeSum;
        return {
            itmeNodes: nodes,
            fileSize: sizeSum,
            fileSizeOnlyAdd: sizeSumAdd,
        };
    }, [rev, props.disabled, props.addToTop]);
    (0, react_1.useEffect)(() => {
        bind.current = props.bind ?? {};
        bind.current[name.current] = bind.current[name.current] ?? [];
        if (iref.current) {
            iref.current.value = "";
            setRev(cur => cur + 1);
        }
    }, [props.bind]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.focus = () => {
            eref.current?.focus();
            return con;
        };
        con.blur = () => {
            eref.current?.blur();
            return con;
        };
        con.getCount = () => params.current.count;
        con.getSize = () => params.current.size;
    });
    const showAccordionButton = props.accordionItemCount != null && itmeNodes.length > props.accordionItemCount;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, className: (0, classname_utils_1.className)(`${exports.fileListViewClassName}`, props.className), style: props.style, onDragOver: dragEnter, onDragLeave: dragLeave, onDrop: dropFile, "data-disabled": props.disabled === true },
            props.disabled === true ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("input", { ref: iref, className: `${exports.fileListViewClassName}-input`, type: "file", accept: fileAccept, tabIndex: -1, onChange: changeFile, multiple: true }),
                react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-dragdrop`, onClick: () => { iref.current.click(); } }, props.dragDropText ?? "please click or drag & drop")),
            react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-wrap`, "data-acc": showAccordionButton },
                react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-items ${style_1.scrollbarClassName}`, style: { maxHeight: props.accordionItemCount == null || accordionOpened ? null : `calc(${style_1.CssVar.file_lv.itemHeight} * ${props.accordionItemCount})` }, "data-count": props.accordionItemCount ?? "", "data-opened": accordionOpened }, itmeNodes)),
            showAccordionButton ? react_1.default.createElement("div", { className: `${input_1.InputClassNames.btn_o} ${exports.fileListViewClassName}-accordion`, onClick: () => setAccordionOpened(!accordionOpened), "data-opened": accordionOpened },
                react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-icon` },
                    react_1.default.createElement(icon_1.default, { image: accordionOpened ? "pullup" : "pulldown" }))) : react_1.default.createElement(react_1.default.Fragment, null),
            props.displaySizeSummary === "none" ? react_1.default.createElement(react_1.default.Fragment, null) :
                react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-footer` },
                    react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-sum-caption` }, props.summaryCaptionText ?? "Total: "),
                    react_1.default.createElement("div", { className: `${exports.fileListViewClassName}-sum` }, fileSizeStr(props.displaySizeSummary === "onlyAdd" ? fileSizeOnlyAdd : fileSize)))),
        input_1.default,
        exports.FileListViewStyle));
};
exports.default = FileListView;
const fileListViewItemClassName = `${exports.fileListViewClassName}-item`;
const FileItem = ({ item, toggleDelete, download, downloadUI, disabled }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: `${fileListViewItemClassName}`, "data-delete": item.delete ?? false, title: item.name },
            downloadUI === "button" ? react_1.default.createElement("div", { className: `${fileListViewItemClassName}-download-wrap` }, item.download ? react_1.default.createElement("div", { className: input_1.InputClassNames.btn_o, onClick: () => download(item) },
                react_1.default.createElement(icon_1.default, { image: "download" })) : react_1.default.createElement(react_1.default.Fragment, null)) : react_1.default.createElement(react_1.default.Fragment, null),
            react_1.default.createElement("div", { className: `${fileListViewItemClassName}-name` },
                react_1.default.createElement("div", { className: `${fileListViewItemClassName}-lbl ${fileListViewItemClassName}-file_name${downloadUI === "anchor" && item.download ? " bh-anchor" : ""}`, onClick: downloadUI === "anchor" && item.download ? () => download(item) : null }, item.name),
                item.path == null ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: `${fileListViewItemClassName}-lbl ${fileListViewItemClassName}-file_path` }, item.path)),
            react_1.default.createElement("div", { className: `${fileListViewItemClassName}-lbl ${fileListViewItemClassName}-size` }, fileSizeStr(item.size)),
            disabled ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", { className: input_1.InputClassNames.btn_o, onClick: () => toggleDelete(item) },
                react_1.default.createElement(icon_1.default, { image: item.delete ? "reload" : "delete" })))));
};
const fileSizeStr = (size) => {
    if (size == null)
        return "";
    if (size < 1024)
        return `${size} B`;
    if (size < 1048576)
        return `${Math.ceil(size * 10 / 1024) / 10} KB`;
    if (size < 1073741824)
        return `${Math.ceil(size * 100 / 1048576) / 100} MB`;
    return `${Math.ceil(size * 100 / 1073741824) / 100} GB`;
};
exports.FileListViewStyle = react_1.default.createElement(style_1.default, { id: exports.fileListViewClassName, depsDesign: true, css: ({ design }) => `
.${exports.fileListViewClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
}
.${exports.fileListViewClassName}-dragdrop {
  ${style_1.CssPV.flex_r_c}
  cursor: pointer;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  min-height: calc(${style_1.CssVar.size} * 3);
  user-select: none;
}
.${exports.fileListViewClassName}-input {
  height: 0px !important;
  width: 0px !important;
  opacity: 0px;
  visibility: hidden;
}
.${exports.fileListViewClassName}-wrap {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
  overflow: hidden;
}
.${exports.fileListViewClassName}-items {
  ${style_1.CssPV.flex_c}
  ${style_1.CssPV.f_y}
}
.${exports.fileListViewClassName}-items[data-opened="false"][data-count] {
  overflow: hidden;
}
.${exports.fileListViewClassName}-accordion {
  width: 100% !important;
}
.${exports.fileListViewClassName}-footer {
  ${style_1.CssPV.flex_r_r}
  flex: none;
  width: 100%;
}
.${exports.fileListViewClassName}-sum-caption,
.${exports.fileListViewClassName}-sum {
  ${style_1.CssPV.flex_r}
  flex: none;
  padding: 2px 5px 0px 5px;
}
.${fileListViewItemClassName} {
  ${style_1.CssPV.flex_r}
  flex: none;
  width: 100%;
  height: ${style_1.CssVar.file_lv.itemHeight};
  overflow: hidden;
}
.${fileListViewItemClassName}[data-delete="true"] {
  opacity: 0.6;
}
.${fileListViewItemClassName}-download-wrap {
  box-sizing: border-box;
  min-width: ${style_1.CssVar.size};
}
.${fileListViewItemClassName}-name {
  ${style_1.CssPV.flex_c}
  min-width: 0px;
  flex: 1;
  overflow: hidden;
}
.${fileListViewItemClassName}-lbl {
  box-sizing: border-box;
  position: relative;
  flex: none;
  padding: 2px 5px 0px 5px;
}
.${fileListViewItemClassName}-file_name,
.${fileListViewItemClassName}-file_path {
  max-width: 100%;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.${fileListViewItemClassName}-file_path {
  font-size: 10px;
}
${design === "material" ? `
.${exports.fileListViewClassName}-dragdrop {
  border: 1px dashed ${style_1.CssVar.bdc};
  border-radius: ${style_1.CssParam.m.r};
}
.${exports.fileListViewClassName}-dragdrop:hover {
  background: ${style_1.CssVar.bg.c_a};
}
.${exports.fileListViewClassName}-items {
  border-radius: ${style_1.CssParam.m.r};
}
.${fileListViewItemClassName} {
  padding: 5px;
}
` : ""};
${design === "neumorphism" ? `
.${exports.fileListViewClassName} {
  padding: ${style_1.CssParam.n.ccvSdPdd};
}
.${exports.fileListViewClassName}-dragdrop {
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
  border-top-left-radius: ${style_1.CssParam.n.r};
  border-top-right-radius: ${style_1.CssParam.n.r};
}
.${exports.fileListViewClassName}-dragdrop:hover {
  background: ${style_1.CssParam.n.accent.ccvBg};
}
.${exports.fileListViewClassName}-wrap {
  padding: ${style_1.CssParam.n.sdPdd};
  box-shadow: ${style_1.CssParam.n.ccvSd};
  background: ${style_1.CssParam.n.ccvBg};
}
.${exports.fileListViewClassName}-items[data-opened="false"] {
  overflow: visible;
  margin-bottom: ${style_1.CssParam.n.sdPdd};
}
.${exports.fileListViewClassName}-wrap[data-acc="false"] {
  border-bottom-left-radius: ${style_1.CssParam.n.r};
  border-bottom-right-radius: ${style_1.CssParam.n.r};
}
.${fileListViewItemClassName} {
  padding: ${style_1.CssParam.n.r};
  box-shadow: ${style_1.CssParam.n.border.cvxSd};
  border-radius: ${style_1.CssParam.n.r};
}
.${fileListViewItemClassName}:not(:last-child) {
  margin-bottom: ${style_1.CssParam.n.sdPdd};
}
.${fileListViewItemClassName} .${input_1.InputClassNames.btn_o} {
  margin-left: ${style_1.CssParam.n.sdPdd};
  margin-right: ${style_1.CssParam.n.sdPdd};
}
.${exports.fileListViewClassName}-accordion.${input_1.InputClassNames.btn_o} {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
` : ""}
` });
