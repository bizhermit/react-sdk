import { CSSProperties, FC } from "react";
import { ContainerProps } from "../utils/component-utils";
export declare const accordionContainerClassName = "bh-acc_ctr";
export declare type AccordionContainerController = {
    focus: () => AccordionContainerController;
    blur: () => AccordionContainerController;
    open: () => AccordionContainerController;
    close: () => AccordionContainerController;
    toggle: (opened?: boolean) => AccordionContainerController;
};
export declare type AccordionContainerProps = ContainerProps & {
    controller?: AccordionContainerController;
    caption: string;
    opened?: boolean;
    toggled?: (opened: boolean) => void | Promise<void>;
    containerStyles?: CSSProperties;
    disabled?: boolean;
};
declare const AccordionContainer: FC<AccordionContainerProps>;
export default AccordionContainer;
export declare const AccordionContainerStyle: JSX.Element;
