import { FC } from "react";
import { IconImage } from "../graphics/icon";
import { InputControlProps } from "../hooks/value";
export declare const fileBoxClassName = "bh-flb";
export declare type FileAccept = ".txt" | ".csv" | ".jpg" | ".png" | ".gif" | ".conf" | ".zip" | ".data" | string;
export declare type FileBoxController = {
    focus: () => FileBoxController;
    blur: () => FileBoxController;
    getValue: () => File;
    setValue: (file: File) => FileBoxController;
};
export declare type FileBoxOptions = {
    accept?: Array<FileAccept>;
    fileName?: boolean;
    iconImage?: IconImage;
};
export declare type FileBoxEventListener = {
    changed?: (file: File) => void;
};
export declare type FileBoxProps = InputControlProps<FileBoxController, File> & FileBoxOptions & FileBoxEventListener;
declare const FileBox: FC<FileBoxProps>;
export default FileBox;
export declare const FileBoxStyle: JSX.Element;
