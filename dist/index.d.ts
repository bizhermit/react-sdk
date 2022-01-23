/// <reference types="react" />
declare module "@bizhermit/react-sdk/dist/hooks/controller" {
    export const initController: <P>(controller: P, func?: (controller: P) => void, dependencyList?: Array<any>) => void;
    const useController: <P = {}>() => P;
    export default useController;
}
declare module "@bizhermit/react-sdk/dist/utils/dom-utils" {
    import { CSSProperties } from "react";
    export const isClient: () => boolean;
    export type DomEventProps = {
        element: HTMLElement | Window;
        type: keyof HTMLElementEventMap;
        listener: EventListenerOrEventListenerObject;
    };
    export const cloneElement: <T extends HTMLElement>(element: T, option?: string | string[] | CSSProperties | ((element: T) => void)) => T;
    export const setStyleProps: <T extends HTMLElement>(element: T, props: CSSProperties) => T;
    export const setCursor: (cursor: string) => () => void;
    export const releaseCursor: () => void;
    export class DomComponentClass {
        protected events: Array<DomEventProps>;
        constructor();
        dispose(): void;
        addEvent<T extends HTMLElement | Window>(element: T, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): T;
        removeEvent<T extends HTMLElement | Window>(element: T, type?: keyof HTMLElementEventMap, listener?: EventListenerOrEventListenerObject): T;
        removeEventIterator(func: (props: DomEventProps) => boolean | void): this;
    }
    export const getDomEventManager: () => DomComponentClass;
    export const horizontalResizeMousedown: (props: {
        resize?: boolean;
        resized?: (width: number) => void;
    }, reverse?: boolean) => (e: React.MouseEvent) => void;
    export const pressPositiveKey: (e: React.KeyboardEvent, func: (e: React.KeyboardEvent) => void, stopEvent?: boolean) => void;
}
declare module "@bizhermit/react-sdk/dist/layouts/style" {
    import React, { FC, VFC } from "react";
    export const styleColorDataName = "data-bh-color";
    export type StyleColor = "light" | "dark";
    export const styleDesignDataName = "data-bh-design";
    export const StyleDesign: {
        flat: string;
        material: string;
        neumorphism: string;
    };
    export type StyleContextProps = {
        color: StyleColor;
        design: keyof typeof StyleDesign;
        setColor: (color?: StyleColor) => void;
        setDesign: (design?: keyof typeof StyleDesign) => void;
    };
    export const StyleContext: React.Context<StyleContextProps>;
    export const LayoutProvider: FC<{
        color?: StyleColor;
        design?: keyof typeof StyleDesign;
    }>;
    export const useLayout: () => StyleContextProps;
    export type StyledJsxProps = {
        id: string;
        css: (params: {
            color: StyleColor;
            design: keyof typeof StyleDesign;
        }) => string;
        notDepsDesign?: boolean;
        notDepsColor?: boolean;
    };
    const Style: VFC<StyledJsxProps>;
    export default Style;
    export const cssParamsSize: () => number;
    export const CssPV: {
        flex: string;
        flex_c: string;
        flex_c_c: string;
        flex_r: string;
        flex_r_c: string;
        flex_r_r: string;
        flex_r_t: string;
        flex_r_b: string;
        fill: string;
        f_y: string;
        f_x: string;
        fitToOuter: (cn: string) => string;
    };
    export const CssVar: {
        size: string;
        fs: string;
        fc: string;
        anchor: string;
        bg: {
            c: string;
            bc: string;
            dc: string;
            c_a: string;
            bc_a: string;
            dc_a: string;
            c_r: string;
            bc_r: string;
            dc_r: string;
            c_h: string;
            bc_h: string;
            dc_h: string;
        };
        shadow: {
            c: string;
            bc: string;
            dc: string;
            c_r: string;
            bc_r: string;
            dc_r: string;
        };
        bdc: string;
        sb: {
            size: string;
            hvr_size: string;
            bg: string;
            hvr_bg: string;
            thumb: {
                bg: string;
                hvr_bg: string;
                act_bg: string;
            };
        };
        warn: {
            bdc: string;
            bg: {
                c: string;
                bc: string;
                dc: string;
            };
        };
        err: {
            bdc: string;
            bg: {
                c: string;
                bc: string;
                dc: string;
            };
        };
        w_sun: {
            bg: string;
            hvr_bg: string;
        };
        w_sat: {
            bg: string;
            hvr_bg: string;
        };
        mask: {
            bg: string;
            img_bgc: string;
            img_fgc: string;
        };
        file_lv: {
            itemHeight: string;
        };
        lv: {
            h_f: {
                bg: {
                    c: string;
                };
                bdc: string;
            };
            b: {
                bg: {
                    c: string;
                    c_oe: string;
                    c_hr: string;
                    c_hc: string;
                    c_s: string;
                };
                bdc: string;
                olc: string;
            };
        };
        lv_gc: {
            pl: {
                c: string;
                c_late: string;
                c_prec: string;
            };
            bg: {
                today: string;
                bar_c: string;
                bar_bc: string;
                bar_dc: string;
                bar_c_a: string;
            };
        };
        slider: {
            bar_c: string;
            bar_bc: string;
            bar_dc: string;
        };
    };
    export const CssParam: {
        m: {
            r: string;
            updownMargin: string;
            sdBtm: string;
            sdBtm_f: string;
            sdPdd: string;
            sdRight: string;
            sdLeft: string;
            sdTop: string;
        };
        n: {
            r: string;
            cvxBg: string;
            cvxBg_r: string;
            cvxSd: string;
            cvxSd_r: string;
            cvxSd_f: string;
            ccvBg: string;
            ccvBg_r: string;
            ccvSd: string;
            ccvSd_r: string;
            sdPdd: string;
            ccvSdPdd: string;
            headerCvxBg: string;
            headerCcvBg: string;
            accent: {
                sdPdd: string;
                cvxBg: string;
                cvxSd: string;
                ccvBg: string;
            };
            border: {
                cvxSd: string;
                cvxSd_r: string;
                ccvSd: string;
                ccvSd_r: string;
            };
            warn: {
                cvxBg: string;
                ccvBg: string;
            };
            err: {
                cvxBg: string;
                ccvBg: string;
            };
        };
    };
    export type StyleVFC = VFC<{
        color: StyleColor;
        design: keyof typeof StyleDesign;
    }>;
    export const scrollbarClassName = "bh-sb";
}
declare module "@bizhermit/react-sdk/dist/utils/classname-utils" {
    export type HorizontalAlign = "left" | "center" | "right";
    export type VerticalAlign = "top" | "middle" | "bottom";
    export type Direction = "horizontal" | "vertical";
    export type FitToOuter = "fill" | "ffx" | "ffy";
    const ClassNameUtils: {
        join: (...names: Array<string>) => string;
        hAlign: (val?: HorizontalAlign) => "bh-h-c" | "bh-h-r" | "bh-h-l";
        vAlign: (val?: VerticalAlign) => "bh-v-m" | "bh-v-b" | "bh-v-t";
        direction: (val?: Direction) => "bh-v" | "bh-h";
        fill: (fill?: boolean) => "" | "bh-fill";
        reverse: (reverse?: boolean) => "" | "bh-reverse";
        wrap: (wrap?: boolean) => "bh-wrap" | "bh-nowrap";
        fitToOuter: (val?: FitToOuter) => "" | "bh-fto-fill" | "bh-fto-fx" | "bh-fto-fy";
    };
    export default ClassNameUtils;
    export const className: (...names: Array<string>) => string;
}
declare module "@bizhermit/react-sdk/dist/graphics/icon" {
    import { CSSProperties, VFC } from "react";
    export const iconClassName = "bh-icon";
    export type IconImage = "" | "favicon" | "add" | "minus" | "check" | "delete" | "close" | "edit" | "save" | "saveas" | "gear" | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "pulldown" | "pullup" | "pullleft" | "pullright" | "info" | "warn" | "err" | "reload" | "download" | "upload" | "cloud" | "messages" | "filter" | "search" | "home" | "signin" | "signout" | "menu" | "nest-menu" | "user" | "users" | "post" | "connect" | "lock" | "unlock" | "key" | "guard" | "play" | "backwards" | "stop" | "pose" | "fast-forward" | "rewind" | "calendar" | "clock" | "list" | "history" | "reorder";
    export type IconProps = {
        style?: CSSProperties;
        className?: string;
        image?: IconImage;
    };
    const Icon: VFC<IconProps>;
    export default Icon;
    export const iconChildCount: (image: IconImage) => 1 | 0 | 2 | 3;
    export const IconStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/layouts/input" {
    export const InputClassNames: {
        wrap: string;
        ipt: string;
        lbl: string;
        btn: string;
        btn_l: string;
        btn_bt: string;
        btn_o: string;
        resize: string;
        resize_x: string;
        resize_y: string;
    };
    const InputStyle: JSX.Element;
    export default InputStyle;
}
declare module "@bizhermit/react-sdk/dist/layouts/input-column" {
    export const listViewInputColumnClassName = "bh-lv_c-ipt";
    const ListViewInputColumnStyle: JSX.Element;
    export default ListViewInputColumnStyle;
}
declare module "@bizhermit/react-sdk/dist/controls/listview" {
    import { CSSProperties, VFC } from "react";
    import { StyleContextProps } from "@bizhermit/react-sdk/dist/layouts/style";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { DomComponentClass } from "@bizhermit/react-sdk/dist/utils/dom-utils";
    export const listViewClassName = "bh-lv";
    type Data = {
        [key: string]: any;
    };
    export type ListViewSelectMode = "none" | "row" | "cell";
    type TextAlign = "left" | "center" | "right";
    type SortOrder = "" | "asc" | "desc";
    type ListViewColumnDataType = "string" | "number";
    export const listViewDefaultRowHeight: () => number;
    export type ListViewController = {
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
    export type ListViewItemParams = {
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
    export type ListViewHeaderOrFooterCellClicked = (columnName: string, items: Array<$ListViewItem>, renderCells: () => void) => void;
    type ListViewReturnOrder = {
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
    export type ListViewCellOrRowClicked = (params: ListViewItemParams, e?: MouseEvent) => (ListViewReturnOrder | void);
    export type ListViewColumnFunction<P> = (props: P) => ListViewColumnProps;
    export type ListViewMultiStageRowItemProps = {
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
    export type ListViewEditTargetProps = {
        data: {
            [key: string]: any;
        };
        columnName: string;
        index: number;
        id: number;
    };
    export type ListViewEditParams = {
        target: ListViewEditTargetProps;
        editElement: HTMLDivElement;
        endEdit: (commit?: boolean) => void;
        cell: $ListViewCell;
        styleCtx: StyleContextProps;
    };
    export type ListViewColumnProps = {
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
    export type ListViewEditColumnProps<T> = ListViewColumnProps & {
        edit?: boolean;
        beganEdit?: (value: T, target: ListViewEditTargetProps) => void;
        endedEdit?: (values: {
            before: T;
            after: T;
        }, target: ListViewEditTargetProps, commit: boolean) => void;
    };
    export type ListViewOptions = {
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
    export type ListViewProps = {
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
    const ListView: VFC<ListViewProps>;
    export default ListView;
    export type $ListViewMultiStageRowItem = {
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
    export type $ListViewColumn = {
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
    type $ListViewItem = {
        data: {
            [key: string]: any;
        };
        id: number;
        rowSelected: boolean;
        cellSelected: {
            [key: string]: boolean;
        };
    };
    type $ListViewRow = {
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
    type $ListViewCell = {
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
    export class $ListView extends DomComponentClass {
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
    export type ListViewEditColumnElements = {
        wrapElem: HTMLDivElement;
        lblElem: HTMLDivElement;
    };
    export const createListViewEditColumnElement: () => {
        wrapElem: HTMLDivElement;
        lblElem: HTMLDivElement;
    };
    export const cloneListViewEditColumnElement: (elems: ListViewEditColumnElements) => {
        wrapElem: HTMLDivElement;
        lblElem: HTMLDivElement;
    };
    export const ListViewStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/group-column" {
    import { ListViewColumnFunction, ListViewColumnProps, ListViewHeaderOrFooterCellClicked } from "@bizhermit/react-sdk/dist/controls/listview";
    export type ListViewGroupColumnProps = {
        groupName?: string;
        name?: string;
        headerCellLabel?: string;
        headerCellTextAlign?: "left" | "center" | "right";
        clickedHeaderCell?: ListViewHeaderOrFooterCellClicked;
        fixed?: boolean;
        fill?: boolean;
        columns: Array<ListViewColumnProps>;
    };
    const ListViewGroupColumn: ListViewColumnFunction<ListViewGroupColumnProps>;
    export default ListViewGroupColumn;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/multistage-column" {
    import { ListViewColumnFunction, ListViewMultiStageRowItemProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export type ListViewMultiStageColumnProps = {
        name?: string;
        fixed?: boolean;
        fill?: boolean;
        rows: Array<ListViewMultiStageRowItemProps>;
    };
    const ListViewMultiStageColumn: ListViewColumnFunction<ListViewMultiStageColumnProps>;
    export default ListViewMultiStageColumn;
}
declare module "@bizhermit/react-sdk/dist/hooks/prop" {
    const useProp: <T>(value: T) => import("react").MutableRefObject<T>;
    export default useProp;
}
declare module "@bizhermit/react-sdk/dist/hooks/timer" {
    type Props = {
        callback?: () => (boolean | void);
        interval?: number;
    };
    const useTimer: (initProps?: Props) => {
        start: (props?: Props) => void;
        stop: () => void;
    };
    export default useTimer;
}
declare module "@bizhermit/react-sdk/dist/utils/component-utils" {
    import { CSSProperties, FC, VFC } from "react";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    export type MaskAccessor = {
        _fetchMask?: () => HTMLDivElement;
    };
    export type AccessorFC<P = {}> = FC<P & {
        ma: MaskAccessor;
    }>;
    export type AccessorVFC<P = {}> = VFC<P & {
        ma: MaskAccessor;
    }>;
    export type ContainerProps = {
        style?: CSSProperties;
        className?: string;
        fitToOuter?: FitToOuter;
    };
    export type ControlProps<T extends {
        [key: string]: any;
    } = {}> = {
        className?: string;
        style?: CSSProperties;
        disabled?: boolean;
        title?: string;
        controller?: T | {
            [key: string]: any;
        };
    };
}
declare module "@bizhermit/react-sdk/dist/hooks/value" {
    import { ControlProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export type InputControlProps<T = {}, U = string, V = U> = ControlProps<T> & ValueProps<U, V> & {
        required?: boolean;
        tabIndex?: number;
    };
    type UseValueOptions<T, U = T> = {
        nullValue?: T | null;
        binded?: (value: T) => void;
        changed?: (value: T) => void;
        convertChangedArgData?: (value: T) => U;
        defaultValue?: T;
    };
    export type ValueProps<T, U = T> = {
        name?: string;
        bind?: {
            [key: string]: any;
        };
        defaultValue?: T;
        title?: string;
        validation?: InputValidation<T>;
        changed?: (after: U, before: U) => void;
    };
    export type InputValidationResult = {
        status?: "warn" | "err" | "";
        title?: string;
        commit?: boolean;
    };
    export type InputValidation<T> = (value: T) => (void | string | InputValidationResult);
    const useValue: <T, U = T>(props: ValueProps<T, U>, options?: UseValueOptions<T, U>) => {
        value: T;
        getValue: () => T;
        setValue: (val: T) => T;
        title: string;
        getTitle: () => string;
        status: string;
        getStatus: () => string;
    };
    export default useValue;
    export const joinTitle: (baseTitle?: string, ...addTitles: Array<string>) => string;
}
declare module "@bizhermit/react-sdk/dist/utils/message-utils" {
    export type MessageType = "info" | "warn" | "err";
    export type MessageItem = {
        title?: string;
        type?: MessageType;
        message: string;
        target?: string;
        timestamp?: number;
    };
    export type MessageGroup = {
        title?: string;
        type?: MessageType;
        messages: Array<MessageItem>;
        verified?: boolean;
        popuped?: boolean;
        timestamp?: number;
    };
    type MessageCounts = {
        total: number;
        info: number;
        warn: number;
        err: number;
        verified: number;
    };
    export type MessageCallback = (counts: MessageCounts) => void;
    export type MessagesManager = {
        messages: Array<MessageGroup>;
        callbacks: Array<MessageCallback>;
        append: (messages: Array<MessageGroup>) => void;
        clear: () => void;
        popup: (messages: Array<MessageGroup>) => void;
        showHistory: () => void;
        closeHistory: () => void;
        getTimeText: (timestamp: number) => string;
        getCounts: () => MessageCounts;
    };
    export const MessagesContext: import("react").Context<MessagesManager>;
}
declare module "@bizhermit/react-sdk/dist/charts/chart" {
    import { CSSProperties, VFC } from "react";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    export type ChartDataProps = {
        type: "bar" | "line";
        values: Array<number>;
    };
    export type ChartOptions = {};
    export type ChartProps = {
        className?: string;
        style?: CSSProperties;
        fitToOuter?: FitToOuter;
        labels: Array<string | {
            label: string;
        }>;
        data: Array<ChartDataProps>;
        options?: ChartOptions;
    };
    const Chart: VFC<ChartProps>;
    export default Chart;
    export const ChartStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/accordion-container" {
    import { CSSProperties, FC } from "react";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const accordionContainerClassName = "bh-acc_ctr";
    export type AccordionContainerController = {
        focus: () => AccordionContainerController;
        blur: () => AccordionContainerController;
        open: () => AccordionContainerController;
        close: () => AccordionContainerController;
        toggle: (opened?: boolean) => AccordionContainerController;
    };
    export type AccordionContainerProps = ContainerProps & {
        controller?: AccordionContainerController;
        caption: string;
        opened?: boolean;
        toggled?: (opened: boolean) => void | Promise<void>;
        containerStyles?: CSSProperties;
        disabled?: boolean;
    };
    const AccordionContainer: FC<AccordionContainerProps>;
    export default AccordionContainer;
    export const AccordionContainerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/caption" {
    import { FC } from "react";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const captionClassName = "bh-cap";
    export type CaptionProps = ContainerProps & {
        label: string;
        labelWidth?: number;
        labelAlign?: "left" | "center" | "right";
        direction?: Direction;
    };
    const Caption: FC<CaptionProps>;
    export default Caption;
    export const CaptionStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/flexbox" {
    import { FC } from "react";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const FlexBoxClassNames: {
        c: string;
        r: string;
        fill: string;
        ff_y: string;
        ff_x: string;
        left: string;
        center: string;
        right: string;
        top: string;
        middle: string;
        bottom: string;
        design: string;
    };
    type FlexBoxProps = ContainerProps & {
        column?: boolean;
        row?: boolean;
        left?: boolean;
        center?: boolean;
        right?: boolean;
        top?: boolean;
        middle?: boolean;
        bottom?: boolean;
        fitToOuter?: FitToOuter;
        scroll?: boolean;
        design?: boolean;
    };
    const FlexBox: FC<FlexBoxProps>;
    export default FlexBox;
    export const FlexBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/gradual-container" {
    import { VFC } from "react";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { AccessorVFC, ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const gradualContainerClassName = "bh-gdl_ctr";
    export type GradualContentControlelr = {
        showNext: (props: {
            [key: string]: any;
        }, absolute?: boolean) => void;
        closeNexts: () => void;
        close: () => void;
        setNextProps: (props: {
            [key: string]: any;
        }, absolute?: boolean) => void;
    };
    export type GradualContentFC<P = {}> = AccessorVFC<P & {
        gcc: GradualContentControlelr;
    }>;
    export type GradualContent<P = {}> = {
        key: string;
        component: GradualContentFC<P>;
        props?: P;
        flexRate?: number;
        minSize?: number;
    };
    export type GradualContainerProps = ContainerProps & {
        contents: Array<GradualContent>;
        direction?: Direction;
    };
    const GradualContainer: VFC<GradualContainerProps>;
    export default GradualContainer;
    export const GradualContainerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/groupbox" {
    import { CSSProperties, FC } from "react";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const groupBoxClassName = "bh-grp_box";
    export type GroupBoxProps = ContainerProps & {
        direction?: Direction;
        caption: string;
        containerStyle?: CSSProperties;
    };
    const GroupBox: FC<GroupBoxProps>;
    export default GroupBox;
    export const GroupBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/menu-list" {
    import { CSSProperties, FC } from "react";
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ControlProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const menuClassName = "bh-menu";
    export type MenuListController = {
        focus: () => MenuListController;
    };
    export type MenuListProps = ControlProps<MenuListController> & {
        items: Array<MenuItemProps>;
        direction?: Direction;
        selected?: (props: MenuItemProps) => boolean;
        style?: CSSProperties;
        reverse?: boolean;
        openChildren?: boolean;
        width?: number;
        clicked?: (props: MenuItemProps, retFlag?: boolean | void) => void;
    };
    const MenuList: FC<MenuListProps>;
    export default MenuList;
    export type MenuItemProps = {
        label?: string | JSX.Element;
        iconImage?: IconImage;
        childItems?: Array<MenuItemProps>;
        clicked?: (props: MenuItemProps) => boolean | void;
    };
    export const MenuStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/hooks/mask" {
    import { VFC } from "react";
    import { MaskAccessor } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const maskClassName = "bh-msk";
    export type MaskImage = "none" | "spin-circle" | "flow";
    export type MaskProps = {
        image?: MaskImage;
        text?: string;
        zIndex?: number;
    };
    export const Mask: VFC<MaskProps>;
    export const MaskStyle: JSX.Element;
    const useMask: (options?: {
        accessor?: MaskAccessor;
        name?: string;
        showAtFirst?: boolean;
        maskProps?: MaskProps;
    }) => {
        show: (maskProps?: MaskProps, callback?: () => void) => void;
        close: () => void;
    };
    export default useMask;
}
declare module "@bizhermit/react-sdk/dist/containers/menu-container" {
    import { FC } from "react";
    import { MenuItemProps } from "@bizhermit/react-sdk/dist/controls/menu-list";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const menuContainerClassName = "bh-menu_ctr";
    export type NavMenuPosition = "top" | "right" | "bottom" | "left";
    export type NavMenuHideMode = "visible" | "closeToHeader" | "closeToEdge";
    export type MenuContainerProps = ContainerProps & {
        header?: {
            jsx: JSX.Element;
            height?: number;
        };
        menu?: {
            items: Array<MenuItemProps>;
            position?: NavMenuPosition;
            mode?: NavMenuHideMode;
            width?: number;
            judgeSelected?: (prop: MenuItemProps) => boolean;
            resize?: boolean;
        };
        maskName?: string;
    };
    const MenuContainer: FC<MenuContainerProps>;
    export default MenuContainer;
    export const MenuContainerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/row" {
    import { FC, MutableRefObject } from "react";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const rowClassName = "bh-row";
    export type RowProps = ContainerProps & {
        ref?: MutableRefObject<HTMLDivElement>;
        right?: boolean;
        center?: boolean;
        fill?: boolean;
    };
    const Row: FC<RowProps>;
    export default Row;
    export const RowStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/split-container" {
    import { CSSProperties, VFC } from "react";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { AccessorVFC, ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const splitContainerClassName = "bh-spl_ctr";
    export type SplitContainerController = {
        callContent1: (params?: {
            [key: string]: any;
        }) => SplitContainerController;
        callContent2: (params?: {
            [key: string]: any;
        }) => SplitContainerController;
        setVisible: (visible: {
            content1: boolean;
            content2: boolean;
        }) => SplitContainerController;
    };
    type SplitContentController = {
        call: (params?: {
            [key: string]: any;
        }) => SplitContentController;
        setCalled: (func: (params: {
            [key: string]: any;
        }) => void) => SplitContentController;
        setVisible: (visible: {
            self?: boolean;
            partner?: boolean;
        }) => SplitContentController;
    };
    export type SplitContentFC<P = {}> = AccessorVFC<P & {
        scc: SplitContentController;
    }>;
    export type SplitContent<P = {}> = {
        component: SplitContentFC<P>;
        props?: P;
        style?: CSSProperties;
    };
    export type SplitContainerProps = ContainerProps & {
        controller?: SplitContainerController;
        direction?: Direction;
        reverse?: boolean;
        content1: SplitContent;
        content2: SplitContent & {
            visible?: boolean;
            size?: number | string;
        };
        disabled?: boolean;
    };
    const SplitContainer: VFC<SplitContainerProps>;
    export default SplitContainer;
    export const SplitContainerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/containers/tab-container" {
    import { CSSProperties, FC } from "react";
    import { AccessorVFC, ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const tabContainerClassName = "bh-tab_ctr";
    export type TabContainerController = {
        selectTab: (code: string) => TabContainerController;
    };
    export type TabContentController = {};
    export type TabContentFC<P = {}> = AccessorVFC<P & {
        tcc: TabContentController;
    }>;
    export type TabContent<P = {}> = {
        code: string;
        title: string | JSX.Element;
        component: TabContentFC<P>;
        props?: P;
        style?: CSSProperties;
        selected?: () => void;
    };
    export type TabContainerProps = ContainerProps & {
        controller?: TabContainerController;
        border?: boolean;
        contents: Array<TabContent>;
        defaultCode?: string;
        selected?: (code: string) => void;
        tabFill?: boolean;
    };
    const TabContainer: FC<TabContainerProps>;
    export default TabContainer;
    export const TabContainerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/button" {
    import { FC, ReactNode } from "react";
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    import { ControlProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const buttonClassName = "bh-btn";
    export type ButtonController = {
        focus: () => ButtonController;
        blur: () => ButtonController;
        click: () => void;
    };
    export type ButtonOptions = {
        children?: string | ReactNode;
        image?: IconImage;
        tabIndex?: number;
    };
    export type ButtonEventListener = {
        click?: (unlock: (preventFocus?: boolean) => void, element: HTMLButtonElement) => void;
    };
    export type ButtonProps = ControlProps<ButtonController> & ButtonOptions & ButtonEventListener;
    const Button: FC<ButtonProps>;
    export default Button;
    export const ButtonStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/hooks/popup" {
    import { FC, VFC } from "react";
    export const popupClassName = "bh-popup";
    export const PopupClassNames: {
        b: string;
        b_t: string;
        m_p: string;
        m_s: string;
    };
    export type PopupPosition = {
        x?: PopupPositionX;
        y?: PopupPositionY;
    };
    export type PopupPositionX = "outer" | "inner" | "outer-left" | "outer-right" | "inner-left" | "inner-right";
    export type PopupPositionY = "outer" | "inner" | "outer-bottom" | "outer-top" | "inner-bottom" | "inner-top";
    export type PopupOptions = {
        transparent?: boolean;
        className?: string;
        hideCallback?: () => void | boolean;
    };
    const usePopup: <T extends {}>(Component: FC | VFC, options?: PopupOptions) => {
        hide: (absolute?: boolean) => void;
        show: (anchorElement: HTMLElement, showOptions?: {
            position?: PopupPosition;
            componentProps?: T;
            createMountElementCallback?: (elem: HTMLDivElement) => void;
            showedCallback?: () => void;
            hideCallback?: () => void | boolean;
        }) => void;
        getElement: () => HTMLDivElement;
        isShowed: () => boolean;
    };
    export default usePopup;
    export const PopupStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/datepicker" {
    import { VFC } from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const datePickerClassName = "bh-dtp";
    type DatePickerValue = string | number | Date;
    export type DatePickerController = {
        focus: () => DatePickerController;
        blur: () => DatePickerController;
        getValue: () => DatePickerValue;
        setValue: (value: DatePickerValue) => DatePickerController;
    };
    export type DatePickerOptions = {
        mode?: "ymd" | "ym" | "y";
        dataType?: "string" | "number" | "date";
        format?: string;
        positiveButtonLabel?: string | JSX.Element;
        negativeButtonLabel?: string | JSX.Element;
        uiType?: "list" | "calendar";
        monthTexts?: "en" | "en-s" | "ja" | "num" | Array<string>;
        weekTexts?: "en" | "ja" | Array<string>;
        startWeek?: number;
        rangeFrom?: Date;
        rangeTo?: Date;
    };
    export type DatePickerEventListener = {
        clickPositive?: (date: Date) => void | Promise<void>;
        clickNegative?: () => void | Promise<void>;
        clickCell?: (date: Date) => void;
    };
    export type DatePickerProps = InputControlProps<DatePickerController, DatePickerValue> & DatePickerOptions & DatePickerEventListener;
    const DatePicker: VFC<DatePickerProps>;
    export default DatePicker;
    export const DatePickerStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/datebox" {
    import { VFC } from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const dateBoxClassName = "bh-dtb";
    type DateBoxValue = string | number | Date;
    export type DateBoxController = {
        focus: () => DateBoxController;
        blur: () => DateBoxController;
        getValue: () => DateBoxValue;
        setValue: (value: DateBoxValue) => DateBoxController;
        getDate: () => Date;
        setDate: (date: Date) => DateBoxController;
    };
    export type DateBoxOptions = {
        mode?: "ymd" | "ym" | "y";
        dataType?: "string" | "number" | "date";
        dataFormat?: string;
        labelFormat?: string | ((date: Date) => string);
        pulldownButton?: boolean;
        clearButton?: boolean;
    };
    export type DateBoxEventListener = {
        changed?: (after: DateBoxValue, before: DateBoxValue) => void;
        focus?: (value: DateBoxValue) => void;
        blur?: (value: DateBoxValue) => void;
    };
    export type DateBoxProps = InputControlProps<DateBoxController, DateBoxValue> & DateBoxOptions & DateBoxEventListener;
    const DateBox: VFC<DateBoxProps>;
    export default DateBox;
    export const DateBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/calendar" {
    import React, { FC, VFC } from "react";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ControlProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const calendarClassName = "bh-cal";
    export type CalendarController = {
        focus: () => CalendarController;
        blur: () => CalendarController;
        getDate: () => Date;
        setDate: (date: Date) => CalendarController;
    };
    export type CalendarCellFC<P = {}> = VFC<P & {
        date: Date;
        targetYM: boolean;
    }>;
    export type CalendarOptions<P> = {
        year?: number;
        month?: number;
        monthTexts?: "en" | "en-s" | "ja" | "num" | Array<string>;
        weekTexts?: "en" | "ja" | Array<string>;
        startWeek?: number;
        cellComponent?: CalendarCellFC<P>;
        cellComponentProps?: P;
    };
    export type CalendarEventListener = {
        changed?: (after: Date, before: Date) => void;
    };
    export type CalendarProps<P> = ControlProps<CalendarController> & CalendarOptions<P> & CalendarEventListener & {
        fitToOuter?: FitToOuter;
    };
    interface CalendarFunctionComponent extends React.VoidFunctionComponent {
        <P = {}>(props: CalendarProps<P>, context?: any): React.ReactElement<any, any> | null;
    }
    const Calendar: CalendarFunctionComponent;
    export default Calendar;
    export const CalendarCellLabel: FC;
    export const CalendarStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/checkbox" {
    import React from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const checkBoxClassName = "bh-ckb";
    export type CheckBoxController<T = boolean> = {
        focus: () => CheckBoxController<T>;
        blur: () => CheckBoxController<T>;
        isChecked: () => boolean;
        setChecked: (checked: boolean) => CheckBoxController<T>;
        getValue: () => T;
        setValue: (value: T) => CheckBoxController<T>;
    };
    export type CheckBoxOptions<T = boolean> = {
        checkedValue?: T;
        uncheckedValue?: T;
        title?: string;
    };
    export type CheckBoxEventListener<T = boolean> = {
        changed?: (after: T, before: T) => void;
        focus?: (value: T) => void;
        blur?: (value: T) => void;
    };
    export type CheckBoxProps<T = boolean> = InputControlProps<CheckBoxController, T> & CheckBoxOptions<T> & CheckBoxEventListener<T>;
    interface CheckBoxFunctionComponent extends React.FunctionComponent {
        <T = boolean>(props: React.PropsWithChildren<CheckBoxProps<T>>, context?: any): React.ReactElement<any, any> | null;
    }
    const CheckBox: CheckBoxFunctionComponent;
    export default CheckBox;
    export const CheckBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/filebox" {
    import { FC } from "react";
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const fileBoxClassName = "bh-flb";
    export type FileAccept = ".txt" | ".csv" | ".jpg" | ".png" | ".gif" | ".conf" | ".zip" | ".data" | string;
    export type FileBoxController = {
        focus: () => FileBoxController;
        blur: () => FileBoxController;
        getValue: () => File;
        setValue: (file: File) => FileBoxController;
    };
    export type FileBoxOptions = {
        accept?: Array<FileAccept>;
        fileName?: boolean;
        iconImage?: IconImage;
    };
    export type FileBoxEventListener = {
        changed?: (file: File) => void;
    };
    export type FileBoxProps = InputControlProps<FileBoxController, File> & FileBoxOptions & FileBoxEventListener;
    const FileBox: FC<FileBoxProps>;
    export default FileBox;
    export const FileBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/file-listview" {
    import { VFC } from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    import { FileAccept } from "@bizhermit/react-sdk/dist/controls/filebox";
    export const fileListViewClassName = "bh-flv";
    type FileItemProps = {
        name: string;
        size: number;
        path?: string;
        file?: File;
        download: boolean;
        delete: boolean;
        add: boolean;
    };
    export type FileListViewController = {
        focus: () => FileListViewController;
        blur: () => FileListViewController;
        getCount: () => number;
        getSize: () => number;
    };
    export type FileListViewOptions = {
        accept?: Array<FileAccept>;
        downloadUI?: "anchor" | "button";
        dragDropText?: string;
        summaryCaptionText?: string;
        maxCount?: number;
        maxSize?: number;
        maxIsAdd?: boolean;
        addToTop?: boolean;
        itemHeight?: number;
        accordionItemCount?: number;
        accordionOpenWhenAtFirst?: boolean;
        displaySizeSummary?: "none" | "all" | "onlyAdd" | "both";
    };
    export type FileListViewEventListener = {
        downloadItem?: (item: FileItemProps) => void;
        overMaxCountCallback?: () => void | Promise<void>;
        overMaxSizeCallback?: () => void | Promise<void>;
    };
    export type FileListViewProps = InputControlProps<FileListViewController, Array<File | FileItemProps>> & FileListViewOptions & FileListViewEventListener;
    const FileListView: VFC<FileListViewProps>;
    export default FileListView;
    export const FileListViewStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/numericbox" {
    import React, { VFC } from "react";
    import { InputControlProps, InputValidation } from "@bizhermit/react-sdk/dist/hooks/value";
    export const numericBoxClassName = "bh-nub";
    export type NumericBoxController = {
        focus: () => NumericBoxController;
        blur: () => NumericBoxController;
        getValue: () => number;
        setValue: (value: number) => NumericBoxController;
    };
    export type NumericBoxOptions = {
        textAlign?: "left" | "center" | "right";
        placeholder?: string;
        max?: number;
        min?: number;
        sign?: "only-positive" | "only-negative" | "";
        float?: number;
        incrementInterval?: number;
        incrementWhenKeydown?: boolean;
        buttons?: boolean;
        resize?: boolean;
        validation?: InputValidation<number>;
    };
    export type NumericBoxEventListener = {
        changed?: (after: number, before: number) => void;
        keydown?: (event: React.KeyboardEvent) => void;
        focus?: (value: number) => void;
        blur?: (value: number) => void;
        resized?: (width: number) => void;
    };
    export type NumericBoxProps = InputControlProps<NumericBoxController, number> & NumericBoxOptions & NumericBoxEventListener;
    const NumericBox: VFC<NumericBoxProps>;
    export default NumericBox;
    export const NumericBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/selectbox" {
    import { VFC } from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const selectBoxClassName = "bh-slb";
    type SelectBoxValue = string | number;
    type Data = {
        [key: string]: any;
    };
    export type SelectBoxController = {
        focus: () => SelectBoxController;
        blur: () => SelectBoxController;
        getValue: () => SelectBoxValue;
        setValue: (value: SelectBoxValue) => SelectBoxController;
    };
    export type SelectBoxOptions = {
        source?: Array<{
            [key: string]: any;
        }> | (() => Promise<Array<{
            [key: string]: any;
        }>>);
        textAlign?: "left" | "center" | "right";
        valueDataName?: string;
        labelDataName?: string;
        placeholder?: string;
        resize?: boolean;
        listMaxHeight?: number;
        inputText?: boolean;
        appendEmptyItem?: boolean;
        defaultItemIsFirstItem?: boolean;
    };
    type ChangedArgData = {
        value: SelectBoxValue;
        data: Data;
    };
    export type SelectBoxEventListener = {
        changed?: (after: ChangedArgData, before: ChangedArgData) => void;
        resized?: (width: number) => void;
        focus?: (value: SelectBoxValue) => void;
        blur?: (value: SelectBoxValue) => void;
    };
    export type SelectBoxProps = InputControlProps<SelectBoxController, SelectBoxValue> & SelectBoxOptions & SelectBoxEventListener;
    const SelectBox: VFC<SelectBoxProps>;
    export default SelectBox;
    export const SelectBoxStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/pageable-listview" {
    import { FC } from "react";
    import { ListViewController, ListViewProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export const pageableListViewClassName = "bh-plv";
    export type PageableListViewController = ListViewController & {
        getPageIndex: () => number;
        getPageNumber: () => number;
    };
    export type PageableListViewProps = ListViewProps & {
        controller?: PageableListViewController;
        pageOptions?: {
            recordsPerPage?: number;
            pageNumberPosition?: "top" | "bottom" | "both";
            changedPage?: (pageIndex: number) => void;
            overridePageStatus?: {
                maxPage: number;
                pageIndex: number;
            };
        };
    };
    const PageableListView: FC<PageableListViewProps>;
    export default PageableListView;
    export const PageableListViewStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/radiobutton" {
    import React from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const radioButtonClassName = "bh-rbt";
    type RadioButtonValue = number | string;
    type Data = {
        [key: string]: any;
    };
    export type RadioButtonController<T = RadioButtonValue> = {
        focus: () => RadioButtonController<T>;
        blur: () => RadioButtonController<T>;
        getValue: () => T;
        setValue: (value: T) => RadioButtonController<T>;
    };
    export type RadioButtonOptions = {
        source: Array<Data> | (() => Promise<Array<Data>>);
        labelDataName?: string;
        valueDataName?: string;
        titleDataName?: string;
        wrap?: boolean;
        direction?: "horizontal" | "vertical";
    };
    export type RadioButtonEventListener<T = RadioButtonValue> = {
        changed?: (after: {
            value: T;
            data: Data;
        }, before: {
            value: T;
            data: Data;
        }) => void;
        focus?: (value: T) => void;
        blur?: (value: T) => void;
    };
    export type RadioButtonProps<T = RadioButtonValue> = InputControlProps<RadioButtonController<T>, T, {
        value: T;
        data: Data;
    }> & RadioButtonOptions & RadioButtonEventListener<T>;
    interface RadioButtonFunctionComponent extends React.VoidFunctionComponent {
        <T = RadioButtonValue>(props: RadioButtonProps<T>, context?: any): React.ReactElement<any, any> | null;
    }
    const RadioButton: RadioButtonFunctionComponent;
    export default RadioButton;
    export const RadioButtonStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/slider" {
    import { VFC } from "react";
    import { InputControlProps } from "@bizhermit/react-sdk/dist/hooks/value";
    export const sliderClassName = "bh-sld";
    export type SliderController = {
        focus: () => SliderController;
        blur: () => SliderController;
        getValue: () => number;
        setValue: (value: number) => SliderController;
    };
    export type SliderOptions = {
        min?: number;
        max?: number;
        keydownInterval?: number;
        flexibleWidth?: boolean;
        displayNumber?: boolean;
    };
    export type SliderEventListener = {
        changed?: (after: number, before: number) => void;
        focus?: (value: number) => void;
        blur?: (value: number) => void;
    };
    export type SliderProps = InputControlProps<SliderController, number> & SliderOptions & SliderEventListener;
    const Slider: VFC<SliderProps>;
    export default Slider;
    export const SliderStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/textarea" {
    import React, { VFC } from "react";
    import { InputControlProps, InputValidation } from "@bizhermit/react-sdk/dist/hooks/value";
    export const textAreaClassName = "bh-txa";
    export type TextAreaController = {
        focus: () => TextAreaController;
        blur: () => TextAreaController;
        getValue: () => string;
        setValue: (value: string) => TextAreaController;
    };
    export type TextAreaOptions = {
        placeholder?: string;
        maxLength?: number;
        resize?: boolean | "horizontal" | "vertical";
        validation?: InputValidation<string>;
    };
    export type TextAreaEventListener = {
        changed?: (after: string, before: string) => void;
        resized?: (size: {
            height: number;
            width: number;
        }) => void;
        keydown?: (event: React.KeyboardEvent) => void;
        focus?: (value: string) => void;
        blur?: (value: string) => void;
    };
    export type TextAreaProps = InputControlProps<TextAreaController, string> & TextAreaOptions & TextAreaEventListener;
    const TextArea: VFC<TextAreaProps>;
    export default TextArea;
    export const TextAreaStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/textbox" {
    import React, { VFC } from "react";
    import { InputControlProps, InputValidation } from "@bizhermit/react-sdk/dist/hooks/value";
    export const textBoxClassName = "bh-txb";
    export type TextBoxController = {
        focus: () => TextBoxController;
        blur: () => TextBoxController;
        getValue: () => string;
        setValue: (value: string) => TextBoxController;
    };
    export type TextBoxOptions = {
        textAlign?: "left" | "center" | "right";
        placeholder?: string;
        maxLength?: number;
        resize?: boolean;
        validation?: InputValidation<string>;
    };
    export type TextBoxEventListener = {
        changed?: (after: string, before: string) => void;
        keydown?: (event: React.KeyboardEvent) => void;
        focus?: (value: string) => void;
        blur?: (value: string) => void;
        resized?: (width: number) => void;
    };
    export type TextBoxProps = InputControlProps<TextBoxController, string> & TextBoxOptions & TextBoxEventListener;
    const TextBox: VFC<TextBoxProps>;
    export default TextBox;
}
declare module "@bizhermit/react-sdk/dist/controls/treeview" {
    import React, { FC } from "react";
    import { FitToOuter } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { ControlProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const treeViewClassName = "bh-trv";
    export type TreeViewOptions = {
        items: Array<{
            [key: string]: any;
        }>;
        labelAppearance?: "label" | "anchor";
        checkBox?: boolean;
        checkPropagation?: boolean;
        checkWhenLabelClicked?: boolean;
        filter?: (item: {
            [key: string]: any;
        }) => boolean;
        idDataName?: string;
        parentIdDataName?: string;
        labelDataName?: string;
        checkedDataName?: string;
        checkedValue?: boolean | string | number;
        uncheckedValue?: boolean | string | number;
        grouping?: Array<{
            id: string;
            dataName: string;
            labelDataName?: string | ((data: {
                [key: string]: any;
            }) => string);
        }>;
        groupingLabelAppearance?: "label" | "anchor";
    };
    export type TreeViewEventListener = {
        itemClicked?: (data: {
            [key: string]: any;
        }, e: React.MouseEvent<HTMLDivElement>) => void;
    };
    export type TreeViewProps = ControlProps & TreeViewOptions & TreeViewEventListener & {
        fitToOuter?: FitToOuter;
    };
    const TreeView: FC<TreeViewProps>;
    export default TreeView;
    export const TreeViewStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/button-column" {
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    import { ListViewColumnFunction, ListViewColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewButtonColumnClassName = "bh-lv_c-btn";
    export type ListViewButtonColumnProps = ListViewColumnProps & {
        buttonLabel?: string;
        iconImage?: IconImage;
        iconSize?: number;
        valid?: (itemData: {
            [key: string]: any;
        }) => boolean | {
            valid: boolean;
            visible?: boolean;
            buttonLabel?: string;
        };
    };
    const ListViewButtonColumn: ListViewColumnFunction<ListViewButtonColumnProps>;
    export default ListViewButtonColumn;
    export const ListViewButtonColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/checkbox-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewCheckBoxClassName = "bh-lv_col-checkbox";
    type CheckBoxValue = boolean | number | string;
    export type ListViewCheckBoxColumnProps = ListViewEditColumnProps<{
        value: CheckBoxValue;
        checked: boolean;
    }> & {
        checkedValue?: CheckBoxValue;
        uncheckedValue?: CheckBoxValue;
        batchCheck?: boolean;
        toggleCheckedWhenRowClicked?: boolean;
        checkBoxSize?: number;
    };
    const ListViewCheckBoxColumn: ListViewColumnFunction<ListViewCheckBoxColumnProps>;
    export default ListViewCheckBoxColumn;
    export const ListViewCheckBoxColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/datebox-column" {
    import { DateBoxOptions } from "@bizhermit/react-sdk/dist/controls/datebox";
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewDateBoxColumnClassName = "bh-lv_c-dtb";
    export type ListViewDateBoxColumnProps = ListViewEditColumnProps<{}> & {
        labelDataName?: string;
        labelFormat?: string | ((date: Date) => string);
        dateBoxOptions?: DateBoxOptions;
        optimizeEditedRowData?: boolean;
    };
    const ListViewDateBoxColumn: ListViewColumnFunction<ListViewDateBoxColumnProps>;
    export default ListViewDateBoxColumn;
    export const ListViewDateBoxColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/ganttchart-column" {
    import { ListViewColumnFunction } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewGanttChartColumnClassName = "bh-lv_c-gtc";
    type GanttChartColumnData = {
        dataName: string;
        fromDataName: string;
        toDataName: string;
        barLabelDataName?: string;
        rateDataName?: string;
        barClassName?: string;
        disabled?: boolean;
    };
    type GanttChartUnit = "day" | "week" | "month";
    export type ListViewGanttChartColumnProps = {
        name: string;
        disabled?: boolean;
        term: {
            from: Date;
            to: Date;
        };
        dateCellWidth?: number;
        dataNames: Array<GanttChartColumnData>;
        dataType?: "string" | "number" | "date";
        dateFormat?: string;
        progressLine?: boolean;
        unit?: GanttChartUnit;
        barTitleFormat?: (params: {
            from: Date;
            to: Date;
            length: number;
        }) => string;
    };
    const ListViewGanttChartColumn: ListViewColumnFunction<ListViewGanttChartColumnProps>;
    export default ListViewGanttChartColumn;
    export const ListViewGanttChartColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/numericbox-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    import { NumericBoxOptions } from "@bizhermit/react-sdk/dist/controls/numericbox";
    export const listViewNumericBoxColumnClassName = "bh-lv_c-nub";
    export type ListViewNumericBoxColumnProps = ListViewEditColumnProps<{
        value: number;
        label: string;
    }> & {
        labelDataName?: string;
        numericBoxOptions?: NumericBoxOptions;
    };
    const ListViewNumericBoxColumn: ListViewColumnFunction<ListViewNumericBoxColumnProps>;
    export default ListViewNumericBoxColumn;
    export const ListViewNumericBoxColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/radiobutton-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewRadioButtonColumnClassName = "bh-lv_c-rdb";
    type RadioButtonValue = boolean | number | string;
    export type ListViewRadioButtonColumnProps = ListViewEditColumnProps<{
        [key: string]: any;
    }> & {
        selectedValue?: RadioButtonValue;
        unselectedValue?: RadioButtonValue;
        selectWhenRowClicked?: boolean;
        radioButtonSize?: number;
    };
    const ListViewRadioButtonColumn: ListViewColumnFunction<ListViewRadioButtonColumnProps>;
    export default ListViewRadioButtonColumn;
    export const ListViewRadioButtonColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/reorder-column" {
    import { ListViewColumnFunction } from "@bizhermit/react-sdk/dist/controls/listview";
    export const listViewReorderColumnClassName = "bh-lv_c-rod";
    export type ListViewReorderColumnProps = {
        name?: string;
        width?: number;
        disabled?: boolean;
        iconSize?: number;
        range?: "cell" | "row";
        fixed?: boolean;
    };
    const ListViewReorderColumn: ListViewColumnFunction<ListViewReorderColumnProps>;
    export default ListViewReorderColumn;
    export const ListViewReorderColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/selectbox-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    import { SelectBoxOptions } from "@bizhermit/react-sdk/dist/controls/selectbox";
    export const listViewSelectBoxColumnClassName = "bh-lv_c-slb";
    export type ListViewSelectBoxColumnProps = ListViewEditColumnProps<{
        value: number | string;
        label: string;
    }> & {
        labelDataName?: string;
        selectBoxOptions?: SelectBoxOptions;
        source: Array<{
            [key: string]: any;
        }> | (() => Promise<Array<{
            [key: string]: any;
        }>>);
    };
    const ListViewSelectBoxColumn: ListViewColumnFunction<ListViewSelectBoxColumnProps>;
    export default ListViewSelectBoxColumn;
    export const ListViewSelectBoxColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/slider-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    import { SliderOptions } from "@bizhermit/react-sdk/dist/controls/slider";
    export const listViewSliderColumnClassName = "bh-lv_c-sld";
    export type ListViewSliderColumnProps = ListViewEditColumnProps<number> & {
        labelDataName?: string;
        sliderOptions?: SliderOptions;
        progressAlign?: "left" | "right";
        labelDisplay?: boolean;
        format?: (value: number) => string;
        progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
    };
    const ListViewSliderColumn: ListViewColumnFunction<ListViewSliderColumnProps>;
    export default ListViewSliderColumn;
    export const ListViewSliderColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/controls/listview-columns/textbox-column" {
    import { ListViewColumnFunction, ListViewEditColumnProps } from "@bizhermit/react-sdk/dist/controls/listview";
    import { TextBoxOptions } from "@bizhermit/react-sdk/dist/controls/textbox";
    export const listViewTextBoxColumnClassName = "bh-lv_c-txb";
    export type ListViewTextBoxColumnProps = ListViewEditColumnProps<string> & {
        textBoxOptions?: TextBoxOptions;
    };
    const ListViewTextBoxColumn: ListViewColumnFunction<ListViewTextBoxColumnProps>;
    export default ListViewTextBoxColumn;
    export const ListViewTextBoxColumnStyle: JSX.Element;
}
declare module "@bizhermit/react-sdk/dist/hooks/dialog-window" {
    import { CSSProperties, FC } from "react";
    import { AccessorVFC } from "@bizhermit/react-sdk/dist/utils/component-utils";
    export const dialogWindowClassName = "bh-dw";
    export type DialogWindowController = {
        close: () => void;
        hide: () => void;
    };
    export type DialogWindowContentFC<P = {}> = AccessorVFC<P & {
        dwc: DialogWindowController;
    }>;
    export type DialogWindowProps = {
        component: DialogWindowContentFC | FC;
        props: {
            [key: string]: any;
        };
        contentStyle: CSSProperties;
        dwc: DialogWindowController;
        zIndex: number;
        setZIndex: (zIndex: number) => number;
        modal?: boolean;
        header?: boolean;
        title?: string;
        closeButton?: boolean;
        minimizeButton?: boolean;
        move?: boolean;
        resize?: boolean;
        fullScreen?: boolean;
        maskClickMode?: "none" | "close" | "hide";
        top?: number | string;
        left?: number | string;
        height?: number | string;
        width?: number | string;
    };
    export const DialogWindow: FC<DialogWindowProps>;
    export const DialogWindowStyle: JSX.Element;
    export type UseDialogWindowOptions = {
        modal?: boolean;
        header?: boolean;
        title?: string;
        closeButton?: boolean;
        hideButton?: boolean;
        minimizeButton?: boolean;
        move?: boolean;
        resize?: boolean;
        fullScreen?: boolean;
        maskClickMode?: "none" | "close" | "hide";
        top?: number | string;
        left?: number | string;
        height?: number | string;
        width?: number | string;
        componentProps?: {
            [key: string]: any;
        };
        contentStyle?: CSSProperties;
        closed?: () => void;
        hided?: () => void;
    };
    const useDialogWindow: (component: DialogWindowContentFC<any> | FC<any>, options?: UseDialogWindowOptions) => {
        show: (showOptions?: UseDialogWindowOptions) => void;
        close: () => void;
        hide: () => void;
    };
    export default useDialogWindow;
}
declare module "@bizhermit/react-sdk/dist/hooks/function-key" {
    import React, { CSSProperties, FC } from "react";
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    import { ContainerProps } from "@bizhermit/react-sdk/dist/utils/component-utils";
    type FunctionKeyCode = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12";
    export const functionKeyContainerClassName = "bh-fnk_ctr";
    export type FunctionKeyProps = {
        label?: string | JSX.Element;
        image?: IconImage;
        title?: string;
        disabled?: boolean;
        click?: (unlock: () => void) => (void | Promise<void>);
    };
    export type FunctionKeyActions = Array<FunctionKeyProps>;
    export type FunctionKeyContainerProps = ContainerProps & {
        contentStyle?: CSSProperties;
        defaultActions?: FunctionKeyActions;
        disabled?: boolean;
        buttonVisible?: boolean;
    };
    export const FunctionKeyContainer: FC<FunctionKeyContainerProps>;
    export const useFunctionKey: (actions: FunctionKeyActions, deps?: React.DependencyList) => void;
    export default useFunctionKey;
    export const FnKeyContainerStyle: JSX.Element;
    type generateFunctionKeyActionsController = {
        set: (key: FunctionKeyCode, props: FunctionKeyProps) => generateFunctionKeyActionsController;
    };
    export const generateFunctionKeyActions: (func?: (con: generateFunctionKeyActionsController) => void) => any[];
}
declare module "@bizhermit/react-sdk/dist/hooks/menu" {
    import { VFC } from "react";
    import { MenuItemProps } from "@bizhermit/react-sdk/dist/controls/menu-list";
    import { Direction } from "@bizhermit/react-sdk/dist/utils/classname-utils";
    import { PopupPosition } from "@bizhermit/react-sdk/dist/hooks/popup";
    export const popupMenuClassName = "bh-ppu_menu";
    export type PopupMenuProps = {
        className?: string;
        items: Array<MenuItemProps>;
        hide: () => void;
        direction?: Direction;
    };
    export const PopupMenu: VFC<PopupMenuProps>;
    export const PopupMenuStyle: JSX.Element;
    export type UseMenuOptions = {
        className?: string;
        direction?: Direction;
    };
    const useMenu: (menuItems: Array<MenuItemProps>, options?: UseMenuOptions) => {
        hide: (absolute?: boolean) => void;
        show: (anchorElement: HTMLElement, showOptions?: {
            position?: PopupPosition;
            direction?: Direction;
        }) => void;
    };
    export default useMenu;
}
declare module "@bizhermit/react-sdk/dist/hooks/message-box" {
    import { FC } from "react";
    import { TextBoxProps } from "@bizhermit/react-sdk/dist/controls/textbox";
    import { IconImage } from "@bizhermit/react-sdk/dist/graphics/icon";
    export const messageBoxClassName = "bh-msg_box";
    export type MessageBoxButton = {
        code: string;
        text?: string;
        iconImage?: IconImage;
        click?: (params: {
            [key: string]: any;
        }) => void;
    };
    export type MessageBoxConfirmTemplate = "delete" | "registration" | "update" | "modification" | "save" | "saveover" | "saveas";
    export type MessageBoxProps = {
        title?: string;
        iconImage?: IconImage;
        message: string | JSX.Element;
        buttons: Array<MessageBoxButton>;
        bind?: {
            [key: string]: any;
        };
        textbox?: {
            defaultValue?: string;
            width?: number;
            options?: TextBoxProps;
        };
        click?: (btn: MessageBoxButton) => void;
        preventButtonClickEvent?: boolean;
    };
    export const MessageBox: FC<MessageBoxProps>;
    const useMessageBox: () => {
        layout: any;
        open: (props: MessageBoxProps) => Promise<string>;
        alert: (message: string | JSX.Element) => Promise<string>;
        confirm: (options?: {
            message?: string | JSX.Element;
            title?: string;
            template?: MessageBoxConfirmTemplate;
            subject?: string;
            iconImage?: IconImage;
        }) => Promise<boolean>;
        textbox: (options: {
            message: string | JSX.Element;
            title: string;
            defaultValue?: string;
            textboxWidth?: number;
            textboxOptions?: TextBoxProps;
        }) => Promise<{
            judge: boolean;
            value: string;
        }>;
    };
    export default useMessageBox;
}
declare module "@bizhermit/react-sdk/dist/hooks/message" {
    import { VFC } from "react";
    import { MessageCallback, MessageItem } from "@bizhermit/react-sdk/dist/utils/message-utils";
    export const popupMessageClassName = "bh-ppu_msg";
    export const messageHistoryClassName = "bh-msg_his";
    export type PopupMessageProps = {};
    export const PopupMessage: VFC<PopupMessageProps>;
    export type MessageHistoryProps = {};
    export const MessageHistory: VFC<MessageHistoryProps>;
    export const PopupMessageStyle: JSX.Element;
    const useMessage: (callback?: MessageCallback) => {
        append: (messages: Array<MessageItem>) => void;
        error: (e: any) => void;
        clear: () => void;
        showHistory: () => void;
        closeHistory: () => void;
    };
    export default useMessage;
}
