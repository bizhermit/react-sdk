"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const ListViewGroupColumn = (props) => {
    return {
        name: props.groupName ?? string_utils_1.default.generateUuidV4(),
        fixed: props.fixed,
        fill: props.fill,
        _rows: [{
                columns: [{
                        name: props.name ?? string_utils_1.default.generateUuidV4(),
                        headerCellLabel: props.headerCellLabel,
                        headerCellTextAlign: props.headerCellTextAlign,
                        clickedHeaderCell: props.clickedHeaderCell,
                        sort: false,
                        resize: false,
                        fill: true,
                    }],
                body: false,
                footer: false,
            }, {
                columns: props.columns,
            }],
    };
};
exports.default = ListViewGroupColumn;
