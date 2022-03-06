"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignRadioButton = exports.ColorRadioButton = void 0;
const react_1 = __importStar(require("react"));
const radiobutton_1 = __importDefault(require("../controls/radiobutton"));
const style_1 = require("../layouts/style");
const ColorRadioButton = ({ unset, direction, changed, labels, customColors }) => {
    const layout = (0, style_1.useLayout)();
    const source = (0, react_1.useMemo)(() => {
        return [
            ...(unset ? [{ label: labels?.unset ?? "unset", value: null }] : []),
            { label: labels?.light ?? "Lignt", value: "light" },
            { label: labels?.dark ?? "Dark", value: "dark" },
            ...(customColors ?? []),
        ];
    }, [unset, customColors]);
    return (react_1.default.createElement(radiobutton_1.default, { defaultValue: layout.color, source: source, direction: direction, changed: v => {
            layout.setColor(v.value);
            changed?.(v.value);
        } }));
};
exports.ColorRadioButton = ColorRadioButton;
const DesignRadioButton = ({ unset, direction, changed, labels, customDesigns }) => {
    const layout = (0, style_1.useLayout)();
    const source = (0, react_1.useMemo)(() => {
        return [
            ...(unset ? [{ label: labels?.unset ?? "unset", value: null }] : []),
            { label: labels?.material ?? "Material", value: "material" },
            { label: labels?.neumorphism ?? "Neumorphism", value: "neumorphism" },
            ...(customDesigns ?? []),
        ];
    }, [unset, customDesigns]);
    return (react_1.default.createElement(radiobutton_1.default, { defaultValue: layout.design, source: source, direction: direction, changed: v => {
            layout.setDesign(v.value);
            changed?.(v.value);
        } }));
};
exports.DesignRadioButton = DesignRadioButton;
