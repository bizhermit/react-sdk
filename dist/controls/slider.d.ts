import { VFC } from "react";
import { InputControlProps } from "../hooks/value";
export declare const sliderClassName = "bh-sld";
export declare type SliderController = {
    focus: () => SliderController;
    blur: () => SliderController;
    getValue: () => number;
    setValue: (value: number) => SliderController;
};
export declare type SliderOptions = {
    min?: number;
    max?: number;
    keydownInterval?: number;
    flexibleWidth?: boolean;
    displayNumber?: boolean;
};
export declare type SliderEventListener = {
    changed?: (after: number, before: number) => void;
    focus?: (value: number) => void;
    blur?: (value: number) => void;
};
export declare type SliderProps = InputControlProps<SliderController, number> & SliderOptions & SliderEventListener;
declare const Slider: VFC<SliderProps>;
export default Slider;
export declare const SliderStyle: JSX.Element;
