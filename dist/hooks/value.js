"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinTitle = void 0;
const string_utils_1 = __importDefault(require("@bizhermit/basic-utils/dist/string-utils"));
const react_1 = require("react");
const useValue = (props, options) => {
    const ref = (0, react_1.useRef)({
        value: props.bind?.[props.name] ?? options?.defaultValue ?? props.defaultValue ?? options?.nullValue,
        title: props.title,
        status: "",
        props,
        options,
    });
    const [$value, $setValue] = (0, react_1.useState)(ref.current.value);
    const [$title, $setTitle] = (0, react_1.useState)(ref.current.title);
    const [$status, $setStatus] = (0, react_1.useState)(ref.current.status);
    ref.current.props = props;
    ref.current.options = options;
    const setValueImpl = (0, react_1.useCallback)((val) => {
        const v = val ?? ref.current.options?.nullValue;
        const valid = ref.current.props.validation?.(v);
        if (valid == null) {
            $setTitle(ref.current.title = (0, exports.joinTitle)(ref.current.props.title, ""));
            $setStatus(ref.current.status = "");
        }
        else if (string_utils_1.default.isString(valid)) {
            $setTitle(ref.current.title = (0, exports.joinTitle)(ref.current.props.title, valid));
            $setStatus(ref.current.status = string_utils_1.default.isEmpty(valid) ? "" : "err");
        }
        else {
            const res = valid;
            $setTitle(ref.current.title = (0, exports.joinTitle)(ref.current.props.title, res.title));
            $setStatus(ref.current.status = res.status ?? "");
            if (res.commit === false)
                return;
        }
        const buf = ref.current.value;
        $setValue(ref.current.value = v);
        if (ref.current.props.bind)
            ref.current.props.bind[ref.current.props.name] = v;
        ref.current.options?.changed?.(v);
        if (ref.current.options?.convertChangedArgData)
            ref.current.props.changed?.(ref.current.options.convertChangedArgData(v), ref.current.options.convertChangedArgData(buf));
        else
            ref.current.props.changed?.(v, buf);
        return v;
    }, []);
    (0, react_1.useEffect)(() => {
        const val = setValueImpl(props.bind?.[props.name] ?? options?.defaultValue ?? props.defaultValue);
        options?.binded?.(val);
    }, [props.bind]);
    return {
        value: $value,
        getValue: (0, react_1.useCallback)(() => ref.current.value, []),
        setValue: setValueImpl,
        title: $title,
        getTitle: (0, react_1.useCallback)(() => ref.current.title, []),
        status: $status,
        getStatus: (0, react_1.useCallback)(() => ref.current.status, []),
    };
};
exports.default = useValue;
const joinTitle = (baseTitle, ...addTitles) => {
    if (addTitles) {
        let ret = baseTitle ?? "";
        addTitles.forEach((title) => {
            if (string_utils_1.default.isEmpty(title))
                return;
            if (ret.length > 0)
                ret += "\n";
            ret += title;
        });
        return ret;
    }
    return baseTitle;
};
exports.joinTitle = joinTitle;
