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
import { IFieldProps, FormConfig } from "../index";
import { FormikValues } from "formik";
import { get, map, isString } from "lodash";
import {
  MenuOptions,
  MenuOptionObject,
  getMenuOptions,
  getFieldError,
} from "../Utils";

export interface IMUISelectProps extends SelectProps {
  label?: string;
  options?: MenuOptions;
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
        (item: MenuOptionObject, index: number) => (
          <option
            key={`${fieldConfig.id}_menu_item_${index}`}
            value={item.value}
            {...menuItemProps}
          >
            {item.name}
          </option>
        )
      );

    if (emptyItem)
      optionsList.unshift(
        <option
          key={`${fieldConfig.id}_menu_item_default_option`}
          value=""
          selected
          {...emptyMenuItemProps}
        >
          {emptyItemText}
        </option>
      );
  } else {
    if (menuOptions)
      optionsList = map<any, JSX.Element>(
        menuOptions,
        (item: MenuOptionObject, index: number) => (
          <MenuItem
            key={`${fieldConfig.id}_menu_item_${index}`}
            value={item.value}
            {...menuItemProps}
          >
            {item.name}
          </MenuItem>
        )
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
        <InputLabel id={labelId} {...inputLabelProps}>
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
      {(fieldError || fieldProps.helperText) && (
        <FormHelperText {...formHelperTextProps}>
          {fieldError || fieldProps.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
