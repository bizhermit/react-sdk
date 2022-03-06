export declare type HorizontalAlign = "left" | "center" | "right";
export declare type VerticalAlign = "top" | "middle" | "bottom";
export declare type Direction = "horizontal" | "vertical";
export declare type FitToOuter = "fill" | "ffx" | "ffy" | "fx" | "fy";
export declare const className: (...names: Array<string>) => string;
declare const ClassNameUtils: {
    join: (...names: Array<string>) => string;
    hAlign: (val?: HorizontalAlign) => "bh-h-c" | "bh-h-r" | "bh-h-l";
    vAlign: (val?: VerticalAlign) => "bh-v-m" | "bh-v-b" | "bh-v-t";
    direction: (val?: Direction) => "bh-v" | "bh-h";
    fill: (fill?: boolean) => "" | "bh-fill";
    reverse: (reverse?: boolean) => "" | "bh-reverse";
    wrap: (wrap?: boolean) => "bh-wrap" | "bh-nowrap";
    fitToOuter: (val?: FitToOuter) => "" | "bh-fto-f" | "bh-fto-fx" | "bh-fto-fy" | "bh-fto-ffx" | "bh-fto-ffy";
};
export default ClassNameUtils;
