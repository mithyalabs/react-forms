import { CheckboxProps, FormControlLabelProps, FormControlProps, FormGroupProps, FormHelperTextProps, FormLabelProps } from '@material-ui/core';
import * as React from 'react';
import { IFieldProps } from '../index';
import { MenuOptions } from '../Utils';
export interface IMUICheckboxProps extends CheckboxProps {
    label?: string;
    helperText?: string;
    options?: MenuOptions<FormControlLabelProps>;
    header?: string;
    headerProps?: FormLabelProps;
    checkGroupProps?: FormGroupProps;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
    isLabelHtmlString?: boolean;
}
export interface ICheckboxProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps;
}
export declare const MUICheckBox: React.FC<ICheckboxProps>;
