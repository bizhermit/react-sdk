/// <reference types="react" />
declare const useProp: <T>(value: T) => import("react").MutableRefObject<T>;
export default useProp;
