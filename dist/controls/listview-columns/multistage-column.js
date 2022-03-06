"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const ListViewMultiStageColumn = (props) => {
    return {
        name: props.name ?? string_utils_1.default.generateUuidV4(),
        fixed: props.fixed,
        fill: props.fill,
        _rows: props.rows,
    };
};
exports.default = ListViewMultiStageColumn;
