import React from 'react';
import { IFieldProps } from '../index';
import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { get } from 'lodash';
import { IconButton, Button, ButtonProps, IconButtonProps, TextFieldProps } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { getComponentConfig } from '../index';

interface IFieldArrayProps {
    name: string
    id: string
    itemType: string
    addButtonProps?: ButtonProps
    addButtonText?: string
    addButton?: JSX.Element
    removeButton?: JSX.Element
    removeButtonProps?: IconButtonProps
    textFieldProps?: TextFieldProps
    onAddButtonClick?: () => Promise<any|undefined>
    onRemoveButtonClick?: (index: number) => Promise<boolean>
}
export interface IFieldsArrayProps extends IFieldProps {
    fieldProps?: IFieldArrayProps
}

/* interface IArrayItemProps extends TextFieldProps {
    fieldValue?: string
    formikProps?: FormikValues
    name?: string
    itemIndex?: number

} */

/* export const ArrayItem:React.FC<IArrayItemProps> = (props) => {
    const {fieldValue='',} = props;
    return (
        <div>
            <TextField/>
        </div>
    )
} */

export const MUIFieldArray: React.FC<IFieldsArrayProps> = (props) => {
    const { formikProps = {} as FormikValues, fieldProps = {} as IFieldArrayProps } = props;
    const { itemType, addButtonText = 'Add', addButtonProps, addButton, removeButton, removeButtonProps, textFieldProps = {},onAddButtonClick,onRemoveButtonClick } = fieldProps;
    const values = get(formikProps, `values.${fieldProps.name}`);
    const itemComponentConfig = getComponentConfig(itemType);
    const classes = useStyles();
    const handleElementAdd = async(arrayHelpers:FieldArrayRenderProps) => {
        if(!onAddButtonClick){
            arrayHelpers.push({});
            return;
        }
       const res =  await onAddButtonClick();
       if(res){
           arrayHelpers.push(res??{});
       }
    }
    const handleElementRemove = async (arrayHelpers: FieldArrayRenderProps,index:number) => {
        if(!onRemoveButtonClick){
            arrayHelpers.remove(index);
            return;
        }
        const isRemoved = await onRemoveButtonClick(index);
        if(isRemoved)
            arrayHelpers.remove(index);
    }
    return (
        <FieldArray name={fieldProps.name}
            render={arrayHelpers => (
                <div>
                    {
                        (values || []).map((value: any, index: number) => (
                            <div key={`${fieldProps.name}-${index}`} className={classes.arrayItem}>
                                {React.cloneElement(itemComponentConfig.component, { name: fieldProps.name, itemIndex: index, arrayHelpers, fieldValue: value, formikProps, ...itemComponentConfig.props, ...textFieldProps })}
                                {
                                    (removeButton) ? removeButton : (
                                        <IconButton className={classes.arrayRemoveIcon} size="small" onClick={() => handleElementRemove(arrayHelpers,index)} {...removeButtonProps}><CloseIcon /></IconButton>
                                    )
                                }

                            </div>
                        ))
                    }
                    {
                        (addButton) ? addButton : (<Button type="button" onClick={() => handleElementAdd(arrayHelpers)} {...addButtonProps}>{addButtonText}</Button>)
                    }

                </div>

            )}
        />
    )
}

const useStyles = makeStyles<Theme>(() => {
    return (createStyles({
        arrayItem: {
            position: 'relative'
        },
        arrayRemoveIcon: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(0,-50%)'
        }
    }))
})