import { ControlProps } from "../utils/component-utils";
export declare type InputControlProps<T = {}, U = string, V = U> = ControlProps<T> & ValueProps<U, V> & {
    required?: boolean;
    tabIndex?: number;
};
declare type UseValueOptions<T, U = T> = {
    nullValue?: T | null;
    binded?: (value: T) => void;
    changed?: (value: T) => void;
    convertChangedArgData?: (value: T) => U;
    defaultValue?: T;
};
export declare type ValueProps<T, U = T> = {
    name?: string;
    bind?: {
        [key: string]: any;
    };
    defaultValue?: T;
    title?: string;
    validation?: InputValidation<T>;
    changed?: (after: U, before: U) => void;
};
export declare type InputValidationResult = {
    status?: "warn" | "err" | "";
    title?: string;
    commit?: boolean;
};
export declare type InputValidation<T> = (value: T) => (void | string | InputValidationResult);
declare const useValue: <T, U = T>(props: ValueProps<T, U>, options?: UseValueOptions<T, U>) => {
    value: T;
    getValue: () => T;
    setValue: (val: T) => T;
    title: string;
    getTitle: () => string;
    status: string;
    getStatus: () => string;
};
export default useValue;
export declare const joinTitle: (baseTitle?: string, ...addTitles: Array<string>) => string;
