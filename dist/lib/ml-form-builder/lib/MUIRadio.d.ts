import { FormControlLabelProps, FormControlProps, FormHelperTextProps, FormLabelProps, RadioGroupProps, RadioProps } from '@material-ui/core';
import * as React from 'react';
import { IFieldProps } from '../index';
import { MenuOptions } from '../Utils';
export interface IMUIRadioProps {
    options?: MenuOptions<FormControlLabelProps>;
    header?: string;
    name?: string;
    id?: string;
    headerProps?: FormLabelProps;
    helperText?: string;
    radioProps?: RadioProps;
    radioGroupProps?: RadioGroupProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}
interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps;
}
export declare const MUIRadio: React.FC<IProps>;
export {};
