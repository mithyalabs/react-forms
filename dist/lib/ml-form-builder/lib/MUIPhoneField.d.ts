import { BoxProps, FormControlProps, InputLabelProps, SelectProps, TextFieldProps } from "@material-ui/core";
import { FC } from "react";
import { CountryCodeFormat } from ".";
import { IFieldProps } from "..";
export interface IMUIPhoneFieldProps {
    name?: string;
    countryCodeProps?: SelectProps;
    countryCodeLabel?: string;
    countryCodeFormControlProps?: FormControlProps;
    countryCodeLabelProps?: InputLabelProps;
    phoneNumberProps?: TextFieldProps;
    phoneLabel?: string;
    countryCodeContainerProps: BoxProps;
    phoneContainerProps: BoxProps;
    emptyItem?: string | boolean;
    emptyItemText?: string;
    renderOption?: (country: CountryCodeFormat, index?: number) => JSX.Element;
}
export interface MUIPhoneFieldProps extends IFieldProps {
    fieldProps?: IMUIPhoneFieldProps;
}
export declare const MUIPhoneField: FC<MUIPhoneFieldProps>;
export default MUIPhoneField;
