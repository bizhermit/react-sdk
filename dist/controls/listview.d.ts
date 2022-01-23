import { CSSProperties, VFC } from "react";
import { StyleContextProps } from "../layouts/style";
import { FitToOuter } from "../utils/classname-utils";
import { DomComponentClass } from "../utils/dom-utils";
export declare const listViewClassName = "bh-lv";
declare type Data = {
    [key: string]: any;
};
export declare type ListViewSelectMode = "none" | "row" | "cell";
declare type TextAlign = "left" | "center" | "right";
declare type SortOrder = "" | "asc" | "desc";
declare type ListViewColumnDataType = "string" | "number";
export declare const listViewDefaultRowHeight: () => number;
export declare type ListViewController = {
    focus: () => ListViewController;
    blur: () => ListViewController;
    getItems: () => Array<{
        [key: string]: any;
    }>;
    setItems: (items: Array<{
        [key: string]: any;
    }>) => ListViewController;
    getFilteredItems: () => Array<{
        [key: string]: any;
    }>;
    getDisplayedItems: () => Array<{
        [key: string]: any;
    }>;
    getLength: () => number;
    getFilteredLength: () => number;
    select: (rowIndex: number, columnName?: string) => ListViewController;
    clearSelect: () => ListViewController;
    getSelectedRows: () => Array<{
        id: number;
        data: {
            [key: string]: any;
        };
    }>;
    getSelectedCells: () => Array<{
        id: number;
        data: {
            [key: string]: any;
        };
        columnName: string;
    }>;
};
export declare type ListViewItemParams = {
    rowNumber: number;
    id: number;
    data: {
        [key: string]: any;
    };
    columnName: string;
    columnLabel: string;
    columnWidth: number;
    originItems: Array<{
        [key: string]: any;
    }>;
    selectMode: ListViewSelectMode;
    selected: boolean;
    getSelectedRows: () => Array<{
        id: number;
        data: {
            [key: string]: any;
        };
    }>;
    getSelectedCells: () => Array<{
        id: number;
        data: {
            [key: string]: any;
        };
        columnName: string;
    }>;
};
export declare type ListViewHeaderOrFooterCellClicked = (columnName: string, items: Array<$ListViewItem>, renderCells: () => void) => void;
declare type ListViewReturnOrder = {
    rebind?: boolean;
    renderHeaderCell?: boolean;
    renderHeaderCells?: boolean;
    renderFooterCell?: boolean;
    renderFooterCells?: boolean;
    renderCell?: boolean;
    renderCells?: boolean;
    renderRow?: boolean;
    render?: boolean;
};
export declare type ListViewCellOrRowClicked = (params: ListViewItemParams, e?: MouseEvent) => (ListViewReturnOrder | void);
export declare type ListViewColumnFunction<P> = (props: P) => ListViewColumnProps;
export declare type ListViewMultiStageRowItemProps = {
    columns: Array<ListViewColumnProps>;
    header?: boolean;
    headerHeightFlexRate?: number;
    headerClassName?: string | Array<string>;
    footer?: boolean;
    footerHeightFlexRate?: number;
    footerClassName?: string | Array<string>;
    body?: boolean;
    bodyHeightFlexRate?: number;
    bodyClassName?: string | Array<string>;
};
export declare type ListViewEditTargetProps = {
    data: {
        [key: string]: any;
    };
    columnName: string;
    index: number;
    id: number;
};
export declare type ListViewEditParams = {
    target: ListViewEditTargetProps;
    editElement: HTMLDivElement;
    endEdit: (commit?: boolean) => void;
    cell: $ListViewCell;
    styleCtx: StyleContextProps;
};
export declare type ListViewColumnProps = {
    name: string;
    label?: string;
    dataType?: ListViewColumnDataType;
    initialize?: (props: ListViewColumnProps, listView: $ListView) => {
        [key: string]: any;
    };
    dispose?: (lv: $ListView) => void;
    headerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem>, originItems: Array<{
        [key: string]: any;
    }>) => void);
    headerCellInitialize?: (column: $ListViewColumn, initializeParameters: {
        [key: string]: any;
    }) => void;
    headerCellTextAlign?: TextAlign;
    footerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem>, originItems: Array<{
        [key: string]: any;
    }>) => void);
    footerCellInitialize?: (column: $ListViewColumn, initializeParameters: {
        [key: string]: any;
    }) => void;
    footerCellTextAlign?: TextAlign;
    width?: number;
    cellInitialize?: (cell: $ListViewCell, initializeParameters: {
        [key: string]: any;
    }, lv: $ListView) => void;
    cellDispose?: (cell: $ListViewCell, lv: $ListView) => void;
    cellRender?: (cell: $ListViewCell, initializeParameters: {
        [key: string]: any;
    }) => void;
    cellTextAlign?: TextAlign;
    appearance?: "label" | "anchor";
    sort?: boolean | ((order: SortOrder) => (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number);
    resize?: boolean;
    fill?: boolean;
    fixed?: boolean;
    tabStop?: boolean;
    notScrollFocusWhenTabStop?: boolean;
    disabled?: boolean;
    clickedHeaderCell?: ListViewHeaderOrFooterCellClicked;
    clickedFooterCell?: ListViewHeaderOrFooterCellClicked;
    clickedCell?: ListViewCellOrRowClicked;
    clickedRow?: ListViewCellOrRowClicked;
    _preventClearSelected?: boolean;
    data?: {
        [key: string]: any;
    };
    bindedItems?: (originItems: Array<{
        [key: string]: any;
    }>) => void;
    _beginEdit?: (params: ListViewEditParams) => void;
    _endEdit?: (target: ListViewEditTargetProps, commit: boolean, editElement: HTMLDivElement) => ListViewReturnOrder | void;
    editedRowData?: (data: {
        [key: string]: any;
    }) => void;
    _rows?: Array<ListViewMultiStageRowItemProps>;
    jsxStyle?: JSX.Element;
};
export declare type ListViewEditColumnProps<T> = ListViewColumnProps & {
    edit?: boolean;
    beganEdit?: (value: T, target: ListViewEditTargetProps) => void;
    endedEdit?: (values: {
        before: T;
        after: T;
    }, target: ListViewEditTargetProps, commit: boolean) => void;
};
export declare type ListViewOptions = {
    header?: boolean;
    headerHeight?: number;
    footer?: boolean;
    footerHeight?: number;
    rowHeignt?: number;
    rowNumber?: boolean;
    selectMode?: ListViewSelectMode;
    multiSelect?: boolean;
    oddEven?: boolean;
    dragScroll?: boolean | "horizontal" | "vertical";
    sort?: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number;
    sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps) => void;
    externalSort?: boolean;
    filter?: (itemData: {
        [key: string]: any;
    }) => boolean;
    clickedCell?: ListViewCellOrRowClicked;
    clickedRow?: ListViewCellOrRowClicked;
    filtered?: (items: Array<$ListViewItem>) => void;
    enterIsClick?: boolean;
    scrollTimeoutInterval?: number;
};
export declare type ListViewProps = {
    className?: string;
    style?: CSSProperties;
    fitToOuter?: FitToOuter;
    controller?: ListViewController;
    value?: Array<Data>;
    columns?: Array<ListViewColumnProps>;
    options?: {
        header?: boolean;
        headerHeight?: number;
        footer?: boolean;
        footerHeight?: number;
        rowHeignt?: number;
        rowNumber?: boolean;
        selectMode?: ListViewSelectMode;
        multiSelect?: boolean;
        oddEven?: boolean;
        dragScroll?: boolean | "horizontal" | "vertical";
        sort?: (itemData1: {
            [key: string]: any;
        }, itemData2: {
            [key: string]: any;
        }) => number;
        sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps) => void;
        externalSort?: boolean;
        filter?: (itemData: {
            [key: string]: any;
        }) => boolean;
        clickedCell?: ListViewCellOrRowClicked;
        clickedRow?: ListViewCellOrRowClicked;
        filtered?: (items: Array<$ListViewItem>) => void;
        enterIsClick?: boolean;
        scrollTimeoutInterval?: number;
    };
};
declare const ListView: VFC<ListViewProps>;
export default ListView;
export declare type $ListViewMultiStageRowItem = {
    columns: Array<$ListViewColumn>;
    header: boolean;
    headerHeightFlexRate: number;
    headerClassName: Array<string>;
    footer: boolean;
    footerHeightFlexRate: number;
    footerClassName: Array<string>;
    body: boolean;
    bodyHeightFlexRate: number;
    bodyClassName: Array<string>;
};
export declare type $ListViewColumn = {
    prop?: ListViewColumnProps;
    name: string;
    label: string;
    dataType: ListViewColumnDataType;
    cells: Array<$ListViewCell>;
    width: number;
    minWidth: number;
    initializeParameters: {
        [key: string]: any;
    };
    dispose: (lv: $ListView) => void;
    headerCellElement: HTMLDivElement;
    headerCellLabelElement?: HTMLDivElement;
    headerCellRender?: (cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem>, originItems: Array<{
        [key: string]: any;
    }>) => void;
    sortElement?: HTMLDivElement;
    resizeElement?: HTMLDivElement;
    footerCellElement: HTMLDivElement;
    footerCellLabelElement?: HTMLDivElement;
    footerCellRender?: (cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem>, originItems: Array<{
        [key: string]: any;
    }>) => void;
    cellInitialize: (cell: $ListViewCell, initializeParameters: {
        [key: string]: any;
    }, lv: $ListView) => void;
    cellDispose?: (cell: $ListViewCell, lv: $ListView) => void;
    cellRender: (cell: $ListViewCell, initializeParameters: {
        [key: string]: any;
    }) => void;
    textAlign: TextAlign;
    appearance?: "label" | "anchor";
    sort: (order: SortOrder) => (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number;
    sortOrder: SortOrder;
    resize: boolean;
    fill: boolean;
    fixed: boolean;
    fixedLeft: number;
    left: number;
    tabStop: boolean;
    notScrollFocusWhenTabStop: boolean;
    render: boolean;
    disabled: boolean;
    headerCellClicked?: ListViewHeaderOrFooterCellClicked;
    footerCellClicked?: ListViewHeaderOrFooterCellClicked;
    cellClicked?: ListViewCellOrRowClicked;
    rowClicked?: ListViewCellOrRowClicked;
    preventClearSelected: boolean;
    bindedItems?: (originItems: Array<{
        [key: string]: any;
    }>) => void;
    rows?: Array<$ListViewMultiStageRowItem>;
    parent?: $ListViewColumn;
    beginEdit?: (params: ListViewEditParams) => void;
    endEdit?: (target: ListViewEditTargetProps, commit: boolean, editElement: HTMLDivElement) => ListViewReturnOrder | void;
    editedRowData: (data: {
        [key: string]: any;
    }) => void;
};
declare type $ListViewItem = {
    data: {
        [key: string]: any;
    };
    id: number;
    rowSelected: boolean;
    cellSelected: {
        [key: string]: boolean;
    };
};
declare type $ListViewRow = {
    element: HTMLDivElement;
    index: number;
    id: number;
    cells: Array<$ListViewCell>;
    item: $ListViewItem;
    cache: {
        _lv_selected: boolean;
        _lv_oddEven: 0 | 1;
    };
};
declare type $ListViewCell = {
    element: HTMLDivElement;
    contentElements: Array<HTMLElement>;
    column: $ListViewColumn;
    row: $ListViewRow;
    cache: {
        _lv_selected: boolean;
    } & {
        [key: string]: any;
    };
};
export declare class $ListView extends DomComponentClass {
    protected element: HTMLElement;
    protected styleCtx: StyleContextProps;
    protected initialized: boolean;
    protected resizeObserver: ResizeObserver;
    protected headerElement: HTMLDivElement;
    protected headerRowElement: HTMLDivElement;
    protected bodyElement: HTMLDivElement;
    protected dummyElement: HTMLDivElement;
    protected footerElement: HTMLDivElement;
    protected footerRowElement: HTMLDivElement;
    protected editElement: HTMLDivElement;
    protected editMaskElement: HTMLDivElement;
    protected columns: Array<$ListViewColumn>;
    protected renderColumns: Array<$ListViewColumn>;
    protected originItems: Array<{
        [key: string]: any;
    }>;
    protected bindingItems: Array<$ListViewItem>;
    protected filteredItems: Array<$ListViewItem>;
    protected sortedItems: Array<$ListViewItem>;
    protected rows: Array<$ListViewRow>;
    protected selectedRows: {
        [key: string]: $ListViewItem;
    };
    protected lastSelectedCell: {
        index: number;
        item: $ListViewItem;
        column: $ListViewColumn;
    };
    protected lastSelectedBaseCell: {
        index: number;
        item: $ListViewItem;
        column: $ListViewColumn;
    };
    protected lastScrolledTop: number;
    protected lastScrolledLeft: number;
    protected maxFirstIndex: number;
    protected firstIndex: number;
    protected hasFillColumn: boolean;
    protected editTarget: {
        item: $ListViewItem;
        column: $ListViewColumn;
        index: number;
    };
    protected scrollingMode: "stop" | "up" | "down";
    protected scrollingId: number;
    protected scrollingInterval: number;
    protected cloneBase: {
        div: HTMLDivElement;
        rowElem: HTMLDivElement;
        cellElem: HTMLDivElement;
        labelCellElem: HTMLDivElement;
    };
    protected rowNumberColumn: $ListViewColumn;
    protected headerVisible: boolean;
    protected headerHeight: number;
    protected footerVisible: boolean;
    protected footerHeight: number;
    protected rowHeight: number;
    protected selectMode: ListViewSelectMode;
    protected multiSelect: boolean;
    protected oddEven: boolean;
    protected dragScroll: boolean | "horizontal" | "vertical";
    protected rowNumber: boolean;
    protected sort: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number;
    protected sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps) => void;
    protected externalSort: boolean;
    protected filter: (itemData: {
        [key: string]: any;
    }) => boolean;
    protected cellClicked: ListViewCellOrRowClicked;
    protected rowClicked: ListViewCellOrRowClicked;
    protected filtered: (items: Array<$ListViewItem>) => void;
    protected enterIsClick: boolean;
    protected scrollTimeoutInterval: number;
    protected endEditEventListener: () => void;
    protected itemsCallBindedRev: number;
    protected colCallBindedRev: number;
    constructor(element: HTMLElement, props: ListViewProps, styleCtx: StyleContextProps);
    dispose(): void;
    setOptions(options?: ListViewOptions): this;
    protected optimizeElementsPosition(): void;
    setHeaderVisible(visible: boolean): this;
    setHeaderHeight(height: number): this;
    setFooterVisible(visible: boolean): this;
    setFooterHeight(height: number): this;
    setRowHeight(height: number): this;
    setRowNumber(visible: boolean): this;
    setSelectMode(selectMode: ListViewSelectMode): this;
    setMultiSelect(multiSelect: boolean): this;
    setOddEven(oddEven: boolean): this;
    setDragScroll(dragScroll: boolean | "horizontal" | "vertical"): this;
    setSort(func: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number): this;
    setSorted(func: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps) => void): this;
    setExternalSort(external: boolean): this;
    setFilter(func: (itemData: {
        [key: string]: any;
    }) => boolean): this;
    setCellClicked(func: ListViewCellOrRowClicked): this;
    setRowClicked(func: ListViewCellOrRowClicked): this;
    setFiltered(func: (items: Array<$ListViewItem>) => void): this;
    setEnterIsClick(enterIsClick: boolean): this;
    setScrollTimeoutInterval(interval: number): this;
    protected generateElements(): void;
    protected clearSelectedRows(render?: boolean): void;
    protected rangeSelectRow(item: $ListViewItem, column: $ListViewColumn, index: number): void;
    protected scrollToIndex(index: number, render?: boolean): void;
    protected scrollToColumn(column: $ListViewColumn, render?: boolean): boolean;
    protected arrowUpDown(updown: number, focusIndex: number, rangeSelect?: boolean): boolean;
    protected arrowUp(up?: number, rangeSelect?: boolean): boolean;
    protected arrowDown(down?: number, rangeSelect?: boolean): boolean;
    protected arrowLeftRightOptimize(index: number, column: $ListViewColumn, rangeSelect?: boolean): boolean;
    protected arrowLeft(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    protected arrowRight(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    render(): this;
    protected renderHeaderCells(): this;
    protected renderFooterCells(): this;
    protected renderRow(row: $ListViewRow): void;
    protected renderRowColumns(columns: Array<$ListViewColumn>, row: $ListViewRow): void;
    protected renderCell(cell: $ListViewCell): void;
    protected renderWhenScrolled(): void;
    protected renderWhenResized(): boolean;
    protected generateCell(row: $ListViewRow, col: $ListViewColumn, rowElem: HTMLDivElement): $ListViewCell;
    protected optimizeMaxFirstIndex(): void;
    protected optimizeRenderColumns(): void;
    protected optimizeRowNumberColumnWidth(): void;
    protected optimizeDummySize(): void;
    protected disposeRows(maxRowLen?: number): void;
    protected findColumn(func: (column: $ListViewColumn) => boolean): $ListViewColumn;
    protected findFirstColumn(): $ListViewColumn;
    protected findLastColumn(): $ListViewColumn;
    protected findPrevColumn(columnName: string): {
        column: $ListViewColumn;
        nextRow: boolean;
    };
    protected findNextColumn(columnName: string): {
        column: $ListViewColumn;
        nextRow: boolean;
    };
    protected disposeColumns(): void;
    protected bindColumns(columns: Array<ListViewColumnProps>): void;
    protected bindColumn(col: ListViewColumnProps, fill: boolean): $ListViewColumn;
    protected buildColumns(): void;
    protected buildColumn(column: $ListViewColumn, element: {
        header: HTMLDivElement;
        footer: HTMLDivElement;
    }): void;
    setColumns(columns: Array<ListViewColumnProps>): this;
    protected columnForEach(func: (column: $ListViewColumn) => void | boolean): void;
    protected bindItems(items: Array<{
        [key: string]: any;
    }>): void;
    executeColumnBindedItems(): void;
    protected filterItems(): void;
    protected sortItems(): void;
    setItems(items: Array<{
        [key: string]: any;
    }>): this;
    protected cellClickedImpl(item: $ListViewItem, column: $ListViewColumn, index: number, ctrlKey: boolean, shiftKey: boolean, e?: MouseEvent): void;
    protected beginEditLastSelectedCell(lastScrollTop?: number): void;
    protected beginEdit(item: $ListViewItem, column: $ListViewColumn, index: number): void;
    protected endEdit(commit: boolean): void;
    getValue(): Array<{
        [key: string]: any;
    }>;
    getFilteredValue(): Array<{
        [key: string]: any;
    }>;
    getSortedValue(): Array<{
        [key: string]: any;
    }>;
    getLength(): number;
    getFilteredLength(): number;
    select(rowIndex: number, columnName?: string): void;
    clearSelect(): void;
    getSelectedRows(): Array<{
        id: number;
        data: {
            [key: string]: any;
        };
    }>;
    getSelectedCells(): Array<{
        id: number;
        data: {
            [key: string]: any;
        };
        columnName: string;
    }>;
    focus(): this;
    getElement(): HTMLElement;
    getBodyElement(): HTMLDivElement;
    getRowHeight(): number;
    getDisplayedFirstRowIndex(): number;
    getBodyScrollTop(): number;
    clearSpaceRow(): this;
    startScrollContinue(order: "up" | "down", interval?: number, startCallback?: (interval: number) => void, endCallback?: (code: "stop" | "over" | "already") => void): void;
    stopScrollContinue(): void;
    protected scrollContinue(endCallback?: (code: "stop" | "over") => void): void;
    dragMovingRow(dragingRowIndex: number, top: number): this;
    dropMoveRow(dragingRowIndex: number, top: number): this;
    renderByOriginData(originData: {
        [key: string]: any;
    }, callEditedRowData?: boolean): this;
    setStyleContext(ctx: StyleContextProps): this;
}
export declare type ListViewEditColumnElements = {
    wrapElem: HTMLDivElement;
    lblElem: HTMLDivElement;
};
export declare const createListViewEditColumnElement: () => {
    wrapElem: HTMLDivElement;
    lblElem: HTMLDivElement;
};
export declare const cloneListViewEditColumnElement: (elems: ListViewEditColumnElements) => {
    wrapElem: HTMLDivElement;
    lblElem: HTMLDivElement;
};
export declare const ListViewStyle: JSX.Element;
