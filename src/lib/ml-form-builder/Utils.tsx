import * as React from 'react';
import { map, isString, get } from 'lodash';
import { FormikValues } from 'formik';
import { TFile } from './lib/MUIFileInput';



export type MenuOptionObject = { name: string | React.ReactNode, value: string };
export type MenuOptions = Array<string> | Array<MenuOptionObject>;
export type ReadAsType = keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL'>

export const getMenuOptions = (options: MenuOptions) => {
    return map(options, (item) => {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
}

export const getFieldError = (fieldName: string, formikProps: FormikValues) => {
    const fieldError = get(formikProps, `errors.${fieldName}`);
    const isTouched = get(formikProps, `touched.${fieldName}`);
    if (!isTouched && formikProps.submitCount < 1)
        return '';
    return fieldError;
}




export const processFiles = (files: FileList | File[], readAs?: ReadAsType): TFile[] => {
	let allFiles: Array<TFile> = [];
	let remFiles: any[] = [];
	//@ts-ignore
	Array.from(files).forEach(file => {
		if (file.type.includes('image')) {
			let reader = new FileReader();
			//@ts-ignore
			reader.onload = () => {
				let fileInfo: TFile = {
					name: file.name,
					type: file.type,
					size: Math.round(file.size / 1000) + ' kB',
					base64: file.type.includes('image') ? reader.result : null,
					file: file,
				};
				allFiles.push(fileInfo);
				if ((allFiles.length + remFiles.length) === files.length) {
					return (allFiles.concat(remFiles))
				}
			}
			reader[readAs || 'readAsDataURL'](file);
		} else {
			remFiles.push(file);
			if ((allFiles.length + remFiles.length) === files.length) {
				return (allFiles.concat(remFiles))
			}
		}
	});
	return []
}
export const setValue = (value: any, formikProps: FormikValues, fieldProps: any) => {	
	formikProps.setFieldValue(get(fieldProps, 'name'), value)
}
