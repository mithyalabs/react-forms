import React from 'react';
import { ReadAsType } from '../Utils';
import { IFieldProps } from '..';
export interface IMUIFileInputProps {
    name?: string;
    readAs?: ReadAsType;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    disableDefaultTooltip?: boolean;
    invisible?: boolean;
    onFilesChange?: (files: FileList) => void;
    onDone?: (files: TFile[], remFiles?: TFile[]) => void;
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
