import { TextFieldProps } from "@material-ui/core";
import React from "react";
import { IFieldProps } from "..";
export interface IProps extends IFieldProps {
    fieldProps?: TextFieldProps;
}
export declare const MUITextField: React.FC<IProps>;
export default MUITextField;
