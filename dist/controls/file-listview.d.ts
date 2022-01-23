import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
import { FileAccept } from "./filebox";
export declare const fileListViewClassName = "bh-flv";
declare type FileItemProps = {
    name: string;
    size: number;
    path?: string;
    file?: File;
    download: boolean;
    delete: boolean;
    add: boolean;
};
export declare type FileListViewController = {
    focus: () => FileListViewController;
    blur: () => FileListViewController;
    getCount: () => number;
    getSize: () => number;
};
export declare type FileListViewOptions = {
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
export declare type FileListViewEventListener = {
    downloadItem?: (item: FileItemProps) => void;
    overMaxCountCallback?: () => void | Promise<void>;
    overMaxSizeCallback?: () => void | Promise<void>;
};
export declare type FileListViewProps = InputControlProps<FileListViewController, Array<File | FileItemProps>> & FileListViewOptions & FileListViewEventListener;
declare const FileListView: VFC<FileListViewProps>;
export default FileListView;
export declare const FileListViewStyle: JSX.Element;
