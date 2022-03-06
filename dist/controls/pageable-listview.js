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
exports.PageableListViewStyle = exports.pageableListViewClassName = void 0;
const react_1 = __importStar(require("react"));
const controller_1 = require("../hooks/controller");
const style_1 = __importStar(require("../layouts/style"));
const classname_utils_1 = __importStar(require("../utils/classname-utils"));
const listview_1 = __importStar(require("./listview"));
const selectbox_1 = __importDefault(require("./selectbox"));
exports.pageableListViewClassName = "bh-plv";
const PageableListView = (props) => {
    const eref = (0, react_1.useRef)();
    const [originItems, setOriginItems] = (0, react_1.useState)([]);
    const [items, setItems] = (0, react_1.useState)([]);
    const pageIndexRef = (0, react_1.useRef)(0);
    const [pageIndex, setPageIndex] = (0, react_1.useState)(pageIndexRef.current);
    const recordsPerPage = (0, react_1.useRef)(props.pageOptions?.recordsPerPage ?? 10);
    const { prevPageNodes, nextPageNodes } = (0, react_1.useMemo)(() => {
        const prevPageNodes = [], nextPageNodes = [];
        const max = props.pageOptions?.overridePageStatus == null ? Math.ceil(originItems.length / recordsPerPage.current) : props.pageOptions.overridePageStatus.maxPage;
        for (let i = 0, il = Math.min(max, pageIndex); i < il; i++) {
            prevPageNodes.push(react_1.default.createElement(ListViewPageNumber, { key: i, click: () => changePageIndex(i) }, i + 1));
        }
        for (let i = pageIndex + 1; i < max; i < i++) {
            nextPageNodes.push(react_1.default.createElement(ListViewPageNumber, { key: i, click: () => changePageIndex(i) }, i + 1));
        }
        return { prevPageNodes, nextPageNodes };
    }, [pageIndex, originItems, props.pageOptions?.overridePageStatus]);
    const pageNumberSourceItems = (0, react_1.useMemo)(() => {
        const sourceItems = [];
        const max = props.pageOptions?.overridePageStatus == null ? Math.ceil(originItems.length / recordsPerPage.current) : props.pageOptions.overridePageStatus.maxPage;
        for (let i = 0; i < max; i++) {
            sourceItems.push({ value: i, label: String(i + 1) });
        }
        return sourceItems;
    }, [originItems.length, props.pageOptions?.overridePageStatus]);
    const bind = (0, react_1.useMemo)(() => {
        return { page: pageIndex };
    }, [pageIndex]);
    const changePageIndex = (index) => {
        if (props.pageOptions?.overridePageStatus == null)
            setPageIndex(pageIndexRef.current = index);
        props.pageOptions?.changedPage?.(index);
    };
    const sorted = (columnName, order, col) => {
        if (props.pageOptions?.overridePageStatus == null) {
            const items = originItems.concat();
            if (order !== "") {
                if (typeof col.sort === "function") {
                    items.sort(col.sort(order));
                }
                else if (col.sort !== false) {
                    const num = order === "asc" ? 1 : -1;
                    if (col.dataType === "number") {
                        items.sort((data1, data2) => {
                            return Number(data1[columnName]) > Number(data2[columnName]) ? num : -num;
                        });
                    }
                    else {
                        items.sort((data1, data2) => {
                            return data1[columnName] > data2[columnName] ? num : -num;
                        });
                    }
                }
            }
            const first = recordsPerPage.current * pageIndex;
            setItems(items.slice(first, first + recordsPerPage.current));
        }
        if (props.options?.sorted)
            props.options.sorted(columnName, order, col);
    };
    (0, react_1.useEffect)(() => {
        const originItems = props.value ?? [];
        if (props.pageOptions?.overridePageStatus == null) {
            const first = recordsPerPage.current * pageIndex;
            setItems(originItems.slice(first, first + recordsPerPage.current));
        }
        else {
            setItems(originItems);
        }
    }, [originItems, pageIndex]);
    (0, react_1.useEffect)(() => {
        setOriginItems(props.value ?? []);
    }, [props.value]);
    (0, react_1.useEffect)(() => {
        if (props.pageOptions?.overridePageStatus != null) {
            setPageIndex(pageIndexRef.current = props.pageOptions.overridePageStatus.pageIndex);
        }
    }, [props.pageOptions?.overridePageStatus]);
    (0, controller_1.initController)(props.controller, (con) => {
        con.getPageIndex = () => pageIndexRef.current;
        con.getPageNumber = () => pageIndexRef.current + 1;
    });
    const selectBoxWidth = Math.max((0, style_1.cssParamsSize)() * 2, String(pageNumberSourceItems.length).length * 20 + (0, style_1.cssParamsSize)());
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: eref, style: props.style, className: (0, classname_utils_1.className)(exports.pageableListViewClassName, classname_utils_1.default.fitToOuter(props.fitToOuter), props.className) },
            props.pageOptions?.pageNumberPosition === "bottom" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-control` },
                    react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-prev` }, prevPageNodes),
                    react_1.default.createElement(selectbox_1.default, { style: { width: selectBoxWidth }, name: "page", bind: bind, defaultValue: 0, source: pageNumberSourceItems, textAlign: "center", changed: (a) => { changePageIndex(Number(a?.value ?? 0)); }, resize: false }),
                    react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-next` }, nextPageNodes))),
            react_1.default.createElement(listview_1.default, { value: items, columns: props.columns, options: {
                    ...props.options,
                    externalSort: true,
                    sorted,
                } }),
            props.pageOptions?.pageNumberPosition === "top" ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-control` },
                    react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-prev` }, prevPageNodes),
                    react_1.default.createElement(selectbox_1.default, { style: { width: selectBoxWidth }, name: "page", bind: bind, defaultValue: 0, source: pageNumberSourceItems, textAlign: "center", changed: (a) => { changePageIndex(Number(a?.value ?? 0)); }, resize: false }),
                    react_1.default.createElement("div", { className: `${exports.pageableListViewClassName}-page-next` }, nextPageNodes)))),
        exports.PageableListViewStyle));
};
exports.default = PageableListView;
const ListViewPageNumber = ({ click, children }) => {
    return react_1.default.createElement("div", { className: `bh-anchor ${exports.pageableListViewClassName}-page-number`, onClick: click }, children);
};
exports.PageableListViewStyle = react_1.default.createElement(style_1.default, { id: exports.pageableListViewClassName, css: () => `
.${exports.pageableListViewClassName} {
  ${style_1.CssPV.flex_c}
  flex: none;
  overflow: hidden;
}
${style_1.CssPV.fitToOuter(exports.pageableListViewClassName)}
.${exports.pageableListViewClassName}-page-control {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  width: 100%;
}
.${exports.pageableListViewClassName}-page-prev,
.${exports.pageableListViewClassName}-page-next {
  ${style_1.CssPV.flex_r}
  flex: 1;
  overflow: hidden;
}
.${exports.pageableListViewClassName}-page-prev {
  justify-content: flex-end;
}
.${exports.pageableListViewClassName}-page-next {
  justify-content: flex-start;
}
.${exports.pageableListViewClassName}-page-number {
  ${style_1.CssPV.flex_r_c}
  flex: none;
  min-width: 30px;
  user-select: none;
  padding: 2px 3px 0px 3px;
}
.${exports.pageableListViewClassName} > .${listview_1.listViewClassName}-wrap {
  width: 100%;
  min-height: 0px;
  flex: 1;
}
` });
