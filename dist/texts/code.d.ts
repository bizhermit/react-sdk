import { CSSProperties, VFC } from "react";
import { FitToOuter } from "../utils/classname-utils";
export declare const codeClassName = "bh-code";
export declare type CodeProps = {
    className?: string;
    style?: CSSProperties;
    fitToOuter?: FitToOuter;
    language?: "ts" | "tsx" | "js" | "jsx" | "html" | "css" | "scss" | "sass";
    children: string;
};
declare const Code: VFC<CodeProps>;
export default Code;
export declare const CodeStyle: JSX.Element;
