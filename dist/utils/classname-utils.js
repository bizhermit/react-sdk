"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.className = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const className = (...names) => {
    return string_utils_1.default.join(" ", ...names);
};
exports.className = className;
const ClassNameUtils = {
    join: exports.className,
    hAlign: (val = "left") => {
        if (val === "center")
            return "bh-h-c";
        if (val === "right")
            return "bh-h-r";
        return "bh-h-l";
    },
    vAlign: (val = "top") => {
        if (val === "middle")
            return "bh-v-m";
        if (val === "bottom")
            return "bh-v-b";
        return "bh-v-t";
    },
    direction: (val = "vertical") => {
        if (val === "vertical")
            return "bh-v";
        return "bh-h";
    },
    fill: (fill) => {
        if (fill)
            return "bh-fill";
        return "";
    },
    reverse: (reverse) => {
        if (reverse)
            return "bh-reverse";
        return "";
    },
    wrap: (wrap) => {
        if (wrap)
            return "bh-wrap";
        return "bh-nowrap";
    },
    fitToOuter: (val) => {
        if (val === "fill")
            return "bh-fto-f";
        if (val === "fx")
            return "bh-fto-fx";
        if (val === "fy")
            return "bh-fto-fy";
        if (val === "ffx")
            return "bh-fto-ffx";
        if (val === "ffy")
            return "bh-fto-ffy";
        return "";
    },
};
exports.default = ClassNameUtils;
