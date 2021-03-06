import { Box, BoxProps, FormControl, FormControlProps, InputLabel, InputLabelProps, Select, SelectProps, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { FormikValues } from "formik";
import { get } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { CountryCodeFormat, COUNTRY_LIST } from ".";
import { IFieldProps } from "..";
import { getFieldError } from "../Utils";


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

export const MUIPhoneField: FC<MUIPhoneFieldProps> = (props) => {
	const {
		formikProps = {} as FormikValues,
		fieldProps = {} as IMUIPhoneFieldProps,
		fieldConfig,
	} = props;
	const [code, setCode] = useState<string>("");
	const classes = useStyles();
	const value = (get(formikProps, `values.${fieldProps.name}`) || "") as string;
	useEffect(() => {
		if (value) {
			setCode(value.split('-')[0] || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fieldProps.name]);

	const handleRenderOption = (country: CountryCodeFormat, index: number) => {
		if (!country.dial_code) return null;
		return (
			<option
				key={index}
				value={country.dial_code}
			>{`${country.name} (${country.dial_code})`}</option>
		);
	};


	const {
		countryCodeProps,
		phoneNumberProps,
		countryCodeLabel,
		phoneLabel,
		countryCodeFormControlProps,
		countryCodeContainerProps,
		countryCodeLabelProps,
		phoneContainerProps,
		emptyItem,
		emptyItemText,
		renderOption = handleRenderOption,
	} = fieldProps;

	const onChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		event.preventDefault();
		let number = event.target.value.replace("-", "");
		formikProps.setFieldValue(`${fieldProps.name}`, `${code}-${number}`);
	};
	const codeChange = (e: React.ChangeEvent<{ value: unknown; }>) => {
		let number = value.split("-");
		formikProps.setFieldValue(`${fieldProps.name}`, `${e.target.value as string}-${number[1] || ''}`);
		setCode(e.target.value as string);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (formikProps && formikProps.handleBlur) formikProps?.handleBlur(e);
	};
	const newError = getFieldError(fieldProps.name || '', formikProps); //formikProps.errors[`${fieldProps.name}`];
	const error = !!newError;
	return (
		<>
			<Box width="100%" display="flex" alignItems="flex-end">
				<Box width="30%" {...countryCodeContainerProps}>
					<FormControl fullWidth {...countryCodeFormControlProps} error={error}>
						<InputLabel {...countryCodeLabelProps} id={fieldProps.name}>
							{countryCodeLabel || "Country code"}
						</InputLabel>
						<Select
							labelId={fieldProps.name}
							value={code}
							onChange={codeChange}
							{...countryCodeProps}
							native
						>
							{
								(emptyItem) &&
								(<option value=''>
									{emptyItemText}
								</option>)
							}
							{(COUNTRY_LIST as unknown as CountryCodeFormat[]).map(renderOption)}
						</Select>
					</FormControl>
				</Box>
				<Box width="70%" marginLeft="5px" {...phoneContainerProps}>
					<TextField
						fullWidth
						label={phoneLabel || "Phone"}
						InputProps={{
							name: fieldConfig?.valueKey,
						}}
						onBlur={handleBlur}
						autoComplete="nope"
						type="tel"
						value={value.split("-")[1] || ""}
						error={error}
						onChange={onChange}
						className={classes.tf}
						{...phoneNumberProps}
					></TextField>
				</Box>
			</Box>
			{error && (
				<Typography
					variant="overline"
					className={newError ? classes.errorField : ""}
				>
					{newError}
				</Typography>
			)}
		</>
	);
};

const useStyles = makeStyles<Theme>(() => {
	return createStyles({
		errorField: {
			color: "#B71840",
			fontSize: 12,
			fontWeight: "bold",
			textTransform: "none",
		},
		tf: {

		}
	});
});

export default MUIPhoneField;
