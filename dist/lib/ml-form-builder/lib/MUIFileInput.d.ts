import React from 'react';
import { IFieldProps } from '..';
import { ReadAsType } from '../Utils';
export interface IMUIFileInputProps {
    readAs?: ReadAsType;
    encoding?: string;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    disableDefaultTooltip?: boolean;
    invisible?: boolean;
    onFilesChange?: (files: FileList) => void;
    onDone?: (imgFiles: TFile[], remFiles?: File[]) => void;
    wrapWith?: (input: JSX.Element) => JSX.Element;
    nativeInputProps?: React.InputHTMLAttributes<{}>;
}
export interface IFileInputProps extends IFieldProps {
    fieldProps?: IMUIFileInputProps;
}
export interface TFile {
    name: string;
    type: string;
    size: string | number;
    base64?: string | ArrayBuffer | null;
    file: File;
}
export declare const MUIFileInput: React.FC<IFileInputProps>;
