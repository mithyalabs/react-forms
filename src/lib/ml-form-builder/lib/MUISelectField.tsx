import * as React from "react";
import {
	Select,
	FormControl,
	FormControlProps,
	FormHelperText,
	FormHelperTextProps,
	MenuItem,
	InputLabel,
	SelectProps,
	MenuItemProps,
	InputLabelProps,
} from "@material-ui/core";
import { FormikValues } from "formik";
import { get, map, isString } from "lodash";
import { IFieldProps, FormConfig } from "..";
import { MenuOptions, getFieldError, getMenuOptions, MenuOptionObject } from "../Utils";



export interface IMUISelectProps extends SelectProps {
	label?: string;
	options?: MenuOptions<MenuItemProps>;
	emptyItem?: string | boolean;
	helperText?: string;
	formControlProps?: FormControlProps;
	formHelperTextProps?: FormHelperTextProps;
	emptyMenuItemProps?: object;
	menuItemProps?: object;
	inputLabelProps?: object;
}

export interface ISelectProps extends IFieldProps {
	fieldProps?: IMUISelectProps;
}

export const MUISelectField: React.FC<ISelectProps> = (props) => {
	const {
		fieldConfig = {} as FormConfig,
		formikProps = {} as FormikValues,
		fieldProps = {} as IMUISelectProps,
	} = props;
	const {
		label,
		options = [],
		emptyItem,
		helperText,
		formControlProps,
		formHelperTextProps,
		emptyMenuItemProps = {} as MenuItemProps,
		menuItemProps = {} as MenuItemProps,
		inputLabelProps = {} as InputLabelProps,
		...selectProps
	} = fieldProps;
	const labelId = `${fieldConfig.id}_label`;
	const fieldError = getFieldError(fieldProps.name || "", formikProps);
	const emptyItemText = isString(emptyItem) ? emptyItem : "None";
	const menuOptions = getMenuOptions(options);
	const value =
		get(formikProps, `values.${fieldProps.name}`) ||
		(selectProps.multiple ? [] : "");

	let optionsList: JSX.Element[] = [];
	if (selectProps.native) {
		if (menuOptions)
			optionsList = map<any, JSX.Element>(
				menuOptions,
				(item: MenuOptionObject, index: number) => {
					const { name, value, ...rest } = item;
					return (
						<option
							key={`${fieldConfig.id}_menu_item_${index}`}
							value={value}
							{...menuItemProps}
							{...rest}
						>
							{name}
						</option>
					);
				}
			);

		if (emptyItem)
			optionsList.unshift(
				<option
					key={`${fieldConfig.id}_menu_item_default_option`}
					value=""
					{...emptyMenuItemProps}
				>
					{emptyItemText}
				</option>
			);
	} else {
		if (menuOptions)
			optionsList = map<any, JSX.Element>(
				menuOptions,
				(item: MenuOptionObject, index: number) => {
					const { name, value, ...rest } = item;
					return (
						<MenuItem
							key={`${fieldConfig.id}_menu_item_${index}`}
							value={value}
							{...menuItemProps}
							{...rest}
						>
							{name}
						</MenuItem>
					);
				}
			);

		if (emptyItem)
			optionsList.unshift(
				<MenuItem value="" {...emptyMenuItemProps}>
					{emptyItemText}
				</MenuItem>
			);
	}

	return (
		<FormControl error={!!fieldError} {...formControlProps}>
			{label && (
				<InputLabel error={!!fieldError} id={labelId} {...inputLabelProps}>
					{label}
				</InputLabel>
			)}
			<Select
				labelId={labelId}
				id={fieldConfig.id}
				value={value}
				onChange={formikProps.handleChange}
				onBlur={formikProps.handleBlur}
				{...selectProps}
			>
				{optionsList}
			</Select>
			{
				<FormHelperText {...formHelperTextProps} error={!!fieldError}>
					{fieldError || helperText}
				</FormHelperText>
			}
		</FormControl>
	);
};
