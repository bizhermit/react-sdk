"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useTimer = (initProps) => {
    const timer = (0, react_1.useRef)();
    const stop = (0, react_1.useCallback)(() => {
        if (timer.current == null)
            return;
        clearInterval(timer.current);
        timer.current = null;
    }, []);
    const start = (0, react_1.useCallback)((props) => {
        stop();
        const func = props?.callback ?? initProps?.callback;
        if (func == null)
            return;
        const interval = props?.interval ?? initProps?.interval ?? 0;
        timer.current = setInterval(() => {
            if (func() === false)
                stop();
        }, interval);
    }, []);
    (0, react_1.useEffect)(() => {
        return () => { stop(); };
    }, []);
    return { start, stop };
};
exports.default = useTimer;
