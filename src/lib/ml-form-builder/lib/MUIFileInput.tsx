import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import _ from 'lodash';
import { FormikValues } from 'formik';
import { setValue, processFiles, ReadAsType } from '../Utils';
import { IFieldProps } from '..';

export interface IMUIFileInputProps {
	name?: string
	readAs?: ReadAsType
	disabled?: boolean
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
	onFilesChange?: (files: FileList) => void
	onDone?: (files: TFile[], remFiles?: TFile[]) => void
	/* File for when multiple is false and File[] for when multiple is true */
	wrapWith?: (input: JSX.Element) => JSX.Element
	/* Function passed to wrapWith should take the input Element and return the same within the wrapped element.
	The input element is always invisible if wrapWith is provided*/
	nativeInputProps?: React.InputHTMLAttributes<{}>
}

export interface IFileInputProps extends IFieldProps {
	fieldProps?: IMUIFileInputProps
}

export interface TFile {
	name: string,
	type: string,
	size: string | number,
	base64?: string | ArrayBuffer | null,
	file: File
}

export const MUIFileInput: React.FC<IFileInputProps> = (props) => {
	const { formikProps = {} as FormikValues, fieldProps = {} as IMUIFileInputProps } = props;
	const {
		onDone,
		multiple,
		invisible,
		disableDefaultTooltip,
		accept,
		readAs,
		disabled,
		onFilesChange,
		wrapWith,
		nativeInputProps
	} = fieldProps
	
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let files = event.target.files || new FileList()
		if (onFilesChange) {
			onFilesChange(files);
			setValue(files, formikProps, fieldProps)
		}
		const finalFiles = processFiles(files, readAs)
		onDone?.(finalFiles)
		setValue(finalFiles, formikProps, fieldProps)
	}

	const input = <input type="file" disabled={disabled}
		multiple={multiple}
		className={invisible || wrapWith ? classes.invisibleInput : ""}
		title={disableDefaultTooltip ? " " : undefined}
		accept={accept}
		onChange={handleChange}
		{...nativeInputProps}
	/>
	return (<>
		{
			wrapWith ? wrapWith(input) : input
		}</>

	)
}

const useStyles = makeStyles<Theme>(() => createStyles({
	invisibleInput: { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' }
}))

