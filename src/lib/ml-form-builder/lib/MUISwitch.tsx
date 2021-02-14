import * as React from 'react';
import { IFieldProps } from '../index';
import { FormikValues } from 'formik';
import { Switch, SwitchProps, FormControlLabel } from '@material-ui/core';
import { get } from 'lodash';


export interface IMUISwitchProps extends SwitchProps {
    label?: string
}

export interface ISwitchProps extends IFieldProps {
    fieldProps?: IMUISwitchProps
}

export const MUISwitch: React.FC<ISwitchProps> = (props) => {
    const { formikProps = {} as FormikValues, fieldProps = {} as IMUISwitchProps, isReadOnly = false } = props;
    const { label, ...switchProps } = fieldProps;
    const value = get(formikProps, `values.${fieldProps.name}`);

    const handleOnChange = () => {
        formikProps.setFieldValue(fieldProps.name, !value);
    }
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={!!value}
                    onChange={handleOnChange}
                    onBlur={formikProps.handleBlur}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    value={value}
                    {...{ ...switchProps, disabled: (switchProps.disabled || isReadOnly) }}
                />
            }
            label={label || ''}
        >

        </FormControlLabel>

    )
}