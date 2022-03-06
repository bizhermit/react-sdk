"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initController = void 0;
const react_1 = require("react");
const initController = (controller, func, dependencyList = []) => {
    (0, react_1.useEffect)(() => {
        if (controller)
            func?.(controller);
    }, [controller, ...dependencyList]);
};
exports.initController = initController;
const useController = () => {
    return (0, react_1.useMemo)(() => {
        return {};
    }, []);
};
exports.default = useController;
