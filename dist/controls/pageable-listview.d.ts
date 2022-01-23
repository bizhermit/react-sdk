import { FC } from "react";
import { ListViewController, ListViewProps } from "./listview";
export declare const pageableListViewClassName = "bh-plv";
export declare type PageableListViewController = ListViewController & {
    getPageIndex: () => number;
    getPageNumber: () => number;
};
export declare type PageableListViewProps = ListViewProps & {
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
declare const PageableListView: FC<PageableListViewProps>;
export default PageableListView;
export declare const PageableListViewStyle: JSX.Element;
