import {
    FormControl,
    FormControlLabel,
    FormControlLabelProps,
    FormControlProps,
    FormHelperText,
    FormHelperTextProps,
    FormLabel,
    FormLabelProps,
    Radio,
    RadioGroup,
    RadioGroupProps,
    RadioProps,
} from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, map } from 'lodash';
import * as React from 'react';
import { IFieldProps } from '../index';
import { getFieldError, getMenuOptions, MenuOptionObject, MenuOptions } from '../Utils';

export interface IMUIRadioProps {
    options?: MenuOptions<FormControlLabelProps>;
    header?: string;
    name?: string;
    id?: string;
    headerProps?: FormLabelProps;
    helperText?: string;
    radioProps?: RadioProps;
    radioGroupProps?: RadioGroupProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}

interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps;
}

export const MUIRadio: React.FC<IProps> = (props) => {
    const { fieldProps = {} as IMUIRadioProps, formikProps = {} as FormikValues, isReadOnly = false } = props;
    const { header, options = [], headerProps, helperText, radioProps, radioGroupProps, formControlProps, formHelperTextProps } = fieldProps;
    const fieldValue = get(formikProps, `values.${fieldProps.name}`) || '';
    const menuOptions = getMenuOptions(options);
    const fieldError = getFieldError(fieldProps.name || '', formikProps);

    return (
        <FormControl error={!!fieldError} {...formControlProps} disabled={formControlProps?.disabled || isReadOnly}>
            {header && <FormLabel {...headerProps}>{header}</FormLabel>}
            <RadioGroup
                name={fieldProps.name}
                value={fieldValue}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                {...radioGroupProps}
            >
                {map(menuOptions, (option: MenuOptionObject<FormControlLabelProps>, index: number) => {
                    const { value, name, control, ...rest } = option;
                    return (
                        <FormControlLabel
                            key={`${fieldProps.id}_option_item_${index}`}
                            value={value + ''}
                            control={control ?? <Radio {...radioProps} />}
                            label={name}
                            {...rest}
                        />
                    );
                })}
            </RadioGroup>
            {(fieldError || helperText) && <FormHelperText {...formHelperTextProps}>{fieldError || helperText}</FormHelperText>}
        </FormControl>
    );
};
