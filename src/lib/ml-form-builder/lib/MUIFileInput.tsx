import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import _ from "lodash";
import { FormikValues } from "formik";
import { IFieldProps } from "..";
import { setValue, ReadAsType, processFilesWithCallback } from "../Utils";
import clsx from "clsx";

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
  /* Function passed to wrapWith should take the input Element and return the same within the wrapped element.
	The input element is always invisible if wrapWith is provided */
  nativeInputProps?: React.InputHTMLAttributes<{}>;
  inputClasses: string | string[];
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

export const MUIFileInput: React.FC<IFileInputProps> = (
  props: IFileInputProps
) => {
  const {
    formikProps = {} as FormikValues,
    fieldProps = {} as IMUIFileInputProps,
  } = props;
  const {
    onDone,
    multiple,
    invisible,
    disableDefaultTooltip,
    accept,
    readAs,
    disabled,
    onFilesChange,
    wrapWith,
    nativeInputProps,
    encoding = "utf-8",
    inputClasses,
  } = fieldProps;

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files || new FileList();
    if (onFilesChange) {
      onFilesChange(files);
      setValue(files, formikProps, fieldProps);
    }
    processFilesWithCallback(
      files,
      (prop: { imgs: TFile[]; rem: any[] }) => {
        const { imgs, rem } = prop;
        onDone?.(imgs, rem);
        const files = ([] as TFile[]).concat(imgs || []).concat(rem || []);
        setValue(files, formikProps, fieldProps);
      },
      readAs,
      encoding
    );
  };

  const input = (
    <input
      type="file"
      disabled={disabled}
      multiple={multiple}
      className={clsx(
        { [classes.invisibleInput]: invisible || !!wrapWith },
        inputClasses
      )}
      title={disableDefaultTooltip ? " " : undefined}
      accept={accept}
      onChange={handleChange}
      {...nativeInputProps}
    />
  );
  return <>{wrapWith ? wrapWith(input) : input}</>;
};

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    invisibleInput: {
      opacity: 0,
      width: "100%",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      cursor: "pointer",
      zIndex: 5,
    },
  })
);
