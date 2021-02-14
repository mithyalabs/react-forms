import * as React from 'react';
import { map, isString, get } from 'lodash';
import { FormikValues } from 'formik';
import { TFile } from './lib/MUIFileInput';



export type MenuOptionObject<T = unknown> = { name: string | React.ReactNode, value: string } & T;
export type MenuOptions<T> = Array<string> | Array<MenuOptionObject<T>>;
export type ReadAsType = keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL' | 'readAsArrayBuffer' | 'readAsText'>
export const getMenuOptions = <T extends any>(options: MenuOptions<T>) => {
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




export const processFilesWithCallback = (files: FileList | File[], callback: Function, readAs?: ReadAsType, encoding?: string) => {
	let imgFiles: Array<TFile> = [];
	let remFiles: any[] = [];
	Array.from(files).forEach(file => {
		let reader = new FileReader();
		reader.onload = () => {
			let fileInfo: TFile = {
				name: file.name,
				type: file.type,
				size: Math.round(file.size / 1024) + ' kB',
				base64: file.type.includes('image') ? reader.result : null,
				file: file,
			};
			if (file.type.includes('image')) {
				imgFiles.push(fileInfo);
			} else {
				remFiles.push(file);
			}
			if (imgFiles.length + remFiles.length === files.length) {
				callback({ imgs: imgFiles, rem: remFiles })
			}
		};
		reader[readAs || 'readAsDataURL'](file, encoding);
		// This works but remember only readAsText can take encoding as a parameter. Might want to mention this in the documentation.

	});
}

export const setValue = (value: any, formikProps: FormikValues, fieldProps: any) => {
	formikProps.setFieldValue(get(fieldProps, 'name'), value)
}
