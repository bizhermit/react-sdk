import { CSSProperties, FC } from "react";
import { AccessorVFC, ContainerProps } from "../utils/component-utils";
export declare const tabContainerClassName = "bh-tab_ctr";
export declare type TabContainerController = {
    selectTab: (code: string) => TabContainerController;
};
export declare type TabContentController = {};
export declare type TabContentFC<P = {}> = AccessorVFC<P & {
    tcc: TabContentController;
}>;
export declare type TabContent = {
    code: string;
    title: string | JSX.Element;
    component: TabContentFC<any>;
    props?: {
        [key: string]: any;
    };
    style?: CSSProperties;
    selected?: () => void;
};
export declare type TabContainerProps = ContainerProps & {
    controller?: TabContainerController;
    border?: boolean;
    contents: Array<TabContent>;
    defaultCode?: string;
    selected?: (code: string) => void;
    tabFill?: boolean;
};
declare const TabContainer: FC<TabContainerProps>;
export default TabContainer;
export declare const TabContainerStyle: JSX.Element;
