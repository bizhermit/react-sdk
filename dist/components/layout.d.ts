import { VFC } from "react";
import { Direction } from "../utils/classname-utils";
declare type ColorRadioButtonProps = {
    unset?: boolean;
    direction?: Direction;
    changed?: (color: string) => void;
    labels?: {
        unset?: string;
        light?: string;
        dark?: string;
    };
    customColors?: Array<{
        value: string;
        label: string;
    }>;
};
export declare const ColorRadioButton: VFC<ColorRadioButtonProps>;
declare type DesignRadioButtonProps = {
    unset?: boolean;
    direction?: Direction;
    changed?: (design: string) => void;
    labels?: {
        unset?: string;
        material?: string;
        neumorphism?: string;
    };
    customDesigns?: Array<{
        value: string;
        label: string;
    }>;
};
export declare const DesignRadioButton: VFC<DesignRadioButtonProps>;
export {};
