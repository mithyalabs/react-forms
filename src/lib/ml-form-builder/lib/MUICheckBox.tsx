import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormControlLabelProps, FormControlProps, FormGroup, FormGroupProps, FormHelperText, FormHelperTextProps, FormLabel, FormLabelProps } from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, indexOf, isEmpty, map } from 'lodash';
import * as React from 'react';
import { FormConfig, IFieldProps } from '../index';
import { getFieldError, getMenuOptions, MenuOptionObject, MenuOptions } from '../Utils';


export interface IMUICheckboxProps extends CheckboxProps {
    label?: string,
    helperText?: string,
    options?: MenuOptions<FormControlLabelProps>,
    header?: string
    headerProps?: FormLabelProps
    checkGroupProps?: FormGroupProps
    formControlLabelProps?: FormControlLabelProps
    formControlProps?: FormControlProps
    formHelperTextProps?: FormHelperTextProps;

    isLabelHtmlString?: boolean;

}
export interface ICheckboxProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps
}
export const MUICheckBox: React.FC<ICheckboxProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUICheckboxProps } = props;
    const { label = '', helperText, options = [], header, headerProps, checkGroupProps, formControlProps, formHelperTextProps, formControlLabelProps, isLabelHtmlString = false, ...checkboxProps } = fieldProps;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const value = get(formikProps, `values.${fieldProps.name}`);
    const menuOptions = getMenuOptions(options);
    return (
        <FormControl error={!!fieldError} {...formControlProps}>
            {
                (header) &&
                (
                    <FormLabel {...headerProps}>{header}</FormLabel>
                )
            }
            <FormGroup {...checkGroupProps}>
                {
                    (!isEmpty(menuOptions)) ?
                        (
                            map(menuOptions, (item: MenuOptionObject<FormControlLabelProps>, index) => {
                                const { value: option, name, control, ...rest } = item;
                                return (
                                    <FormControlLabel
                                        key={`${fieldConfig.id}_check_${index}`}
                                        label={name || ''}
                                        {...formControlLabelProps}
                                        control={control ?? <Checkbox checked={(indexOf(value, option) > -1)} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} value={item.value}  {...{ ...checkboxProps, id: `${fieldConfig.id}_check_${index}` }} />}
                                        {...rest}
                                    />
                                )
                            })
                        ) : (
                            <FormControlLabel
                                control={<Checkbox checked={(value || false)} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange}  {...checkboxProps} />}
                                label={isLabelHtmlString ? <div dangerouslySetInnerHTML={{ __html: label }} /> : label}
                                {...formControlLabelProps}
                            />
                        )
                }
            </FormGroup>


            {
                (fieldError || helperText) &&
                (<FormHelperText {...formHelperTextProps}>{fieldError || helperText}</FormHelperText>)
            }
        </FormControl>
    )
}