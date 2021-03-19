import { TextFieldProps, makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { FormikValues } from "formik";
import { get } from "lodash";
import React from "react";
import { MUIReadOnly } from ".";
import { IFieldProps } from "..";
import { getFieldError } from "../Utils";

export interface IProps extends IFieldProps {
	fieldProps?: TextFieldProps;
}

export const MUITextField: React.FC<IProps> = (props) => {
	const {
		fieldProps = {} as TextFieldProps,
		formikProps = {} as FormikValues,
		isReadOnly = false,
	} = props;

	const classes = useStyles();

	const fieldError = getFieldError(fieldProps.name || "", formikProps);
	const updatedProps = {
		...fieldProps,
		error: !!fieldError,
		helperText: fieldError || fieldProps.helperText || "",
		onChange: formikProps.handleChange,
		onBlur: formikProps.handleBlur,
		value: get(formikProps, `values.${fieldProps.name}`) || "",
		className: clsx(fieldProps.className, {
			[classes.numberInput]: fieldProps.type === "number",
		}),
	};
	if (isReadOnly) {
		return (
			<MUIReadOnly label={updatedProps.label} value={updatedProps.value} />
		);
	}
	return <TextField {...updatedProps} />;
};

export default MUITextField;

const useStyles = makeStyles<Theme>(() =>
	createStyles({
		numberInput: {
			'& input[type="number"]': {
				"& ::-webkit-outer-spin-button": {
					"-webkit-appearance": "none",
					margin: 0,
				},
				"&::-webkit-inner-spin-button": {
					"-webkit-appearance": "none",
					margin: 0,
				},
				appearance: "textfield",
			},
		},
	})
);
