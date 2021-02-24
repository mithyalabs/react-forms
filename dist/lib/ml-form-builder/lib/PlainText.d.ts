import { FC } from "react";
import { TypographyProps } from "@material-ui/core";
import { IFieldProps } from "..";
export interface PlainTextFieldProps {
    isTextHtmlString?: boolean;
    text: string | JSX.Element;
    typographyProps?: TypographyProps;
    className?: string;
}
export interface PlainTextProps extends IFieldProps {
    fieldProps?: PlainTextFieldProps;
}
declare const PlainText: FC<PlainTextProps>;
export default PlainText;
