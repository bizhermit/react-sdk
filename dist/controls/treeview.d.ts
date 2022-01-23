import React, { FC } from "react";
import { FitToOuter } from "../utils/classname-utils";
import { ControlProps } from "../utils/component-utils";
export declare const treeViewClassName = "bh-trv";
export declare type TreeViewOptions = {
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
export declare type TreeViewEventListener = {
    itemClicked?: (data: {
        [key: string]: any;
    }, e: React.MouseEvent<HTMLDivElement>) => void;
};
export declare type TreeViewProps = ControlProps & TreeViewOptions & TreeViewEventListener & {
    fitToOuter?: FitToOuter;
};
declare const TreeView: FC<TreeViewProps>;
export default TreeView;
export declare const TreeViewStyle: JSX.Element;
