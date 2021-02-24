import React, { FC } from "react";
import { Typography, TypographyProps } from "@material-ui/core";
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

const PlainText: FC<PlainTextProps> = (props) => {
  const { fieldProps = {} as PlainTextFieldProps } = props;
  const {
    isTextHtmlString = false,
    text = "",
    typographyProps = {},
    className = "",
  } = fieldProps;
  return (
    <>
      {isTextHtmlString && typeof text === "string" ? (
        <div className={className} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <Typography {...typographyProps}>{text}</Typography>
      )}
    </>
  );
};

export default PlainText;
