"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesContext = void 0;
const react_1 = require("react");
exports.MessagesContext = (0, react_1.createContext)({
    messages: [],
    callbacks: [],
    append: () => { },
    clear: () => { },
    popup: () => { },
    showHistory: () => { },
    closeHistory: () => { },
    getTimeText: (timestamp) => {
        const date = new Date(timestamp);
        const datetime = `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}:${("00" + date.getSeconds()).slice(-2)}`;
        const diff = Date.now() - timestamp;
        if (diff < 60000)
            return `${Math.floor(diff / 1000)}s (${datetime})`;
        if (diff < 3600000)
            return `${Math.floor(diff / 60000)}m (${datetime})`;
        return datetime;
    },
    getCounts: () => {
        return {
            err: 0,
            info: 0,
            total: 0,
            verified: 0,
            warn: 0,
        };
    },
});
