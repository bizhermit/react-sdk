import React, { FC, VFC } from "react";
export declare const styleColorDataName = "data-bh-color";
export declare type StyleColor = "light" | "dark";
export declare const styleDesignDataName = "data-bh-design";
export declare const StyleDesign: {
    flat: string;
    material: string;
    neumorphism: string;
};
export declare type StyleContextProps = {
    color: StyleColor;
    design: keyof typeof StyleDesign;
    setColor: (color?: StyleColor) => void;
    setDesign: (design?: keyof typeof StyleDesign) => void;
};
export declare const StyleContext: React.Context<StyleContextProps>;
export declare const LayoutProvider: FC<{
    color?: StyleColor;
    design?: keyof typeof StyleDesign;
}>;
export declare const useLayout: () => StyleContextProps;
export declare type StyledJsxProps = {
    id: string;
    css: (params: {
        color: StyleColor;
        design: keyof typeof StyleDesign;
    }) => string;
    notDepsDesign?: boolean;
    notDepsColor?: boolean;
};
declare const Style: VFC<StyledJsxProps>;
export default Style;
export declare const cssParamsSize: () => number;
export declare const CssPV: {
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
export declare const CssVar: {
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
export declare const CssParam: {
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
export declare type StyleVFC = VFC<{
    color: StyleColor;
    design: keyof typeof StyleDesign;
}>;
export declare const scrollbarClassName = "bh-sb";
