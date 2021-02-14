import * as React from 'react';
import { FormikValues } from 'formik';
export declare type MenuOptionObject<T = unknown> = {
    name: string | React.ReactNode;
    value: string;
} & T;
export declare type MenuOptions<T> = Array<string> | Array<MenuOptionObject<T>>;
export declare type ReadAsType = keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL' | 'readAsArrayBuffer' | 'readAsText'>;
export declare const getMenuOptions: <T extends any>(options: MenuOptions<T>) => (number | MenuOptionObject<T> | ((...items: string[]) => number) | ((...items: MenuOptionObject<T>[]) => number) | {
    (...items: ConcatArray<string>[]): string[];
    (...items: (string | ConcatArray<string>)[]): string[];
} | {
    (...items: ConcatArray<MenuOptionObject<T>>[]): MenuOptionObject<T>[];
    (...items: (MenuOptionObject<T> | ConcatArray<MenuOptionObject<T>>)[]): MenuOptionObject<T>[];
} | ((separator?: string | undefined) => string) | ((compareFn?: ((a: string, b: string) => number) | undefined) => string[]) | ((compareFn?: ((a: MenuOptionObject<T>, b: MenuOptionObject<T>) => number) | undefined) => MenuOptionObject<T>[]) | ((searchElement: string, fromIndex?: number | undefined) => number) | ((searchElement: MenuOptionObject<T>, fromIndex?: number | undefined) => number) | ((callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void) | ((callbackfn: (value: MenuOptionObject<T>, index: number, array: MenuOptionObject<T>[]) => void, thisArg?: any) => void) | {
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
    <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
} | {
    (callbackfn: (previousValue: MenuOptionObject<T>, currentValue: MenuOptionObject<T>, currentIndex: number, array: MenuOptionObject<T>[]) => MenuOptionObject<T>): MenuOptionObject<T>;
    (callbackfn: (previousValue: MenuOptionObject<T>, currentValue: MenuOptionObject<T>, currentIndex: number, array: MenuOptionObject<T>[]) => MenuOptionObject<T>, initialValue: MenuOptionObject<T>): MenuOptionObject<T>;
    <U_1>(callbackfn: (previousValue: U_1, currentValue: MenuOptionObject<T>, currentIndex: number, array: MenuOptionObject<T>[]) => U_1, initialValue: U_1): U_1;
} | ((value: string, start?: number | undefined, end?: number | undefined) => string[]) | ((value: MenuOptionObject<T>, start?: number | undefined, end?: number | undefined) => MenuOptionObject<T>[]) | ((target: number, start: number, end?: number | undefined) => string[]) | ((target: number, start: number, end?: number | undefined) => MenuOptionObject<T>[]) | ((searchElement: string, fromIndex?: number | undefined) => boolean) | ((searchElement: MenuOptionObject<T>, fromIndex?: number | undefined) => boolean) | {
    name: string;
    value: string;
})[];
export declare const getFieldError: (fieldName: string, formikProps: FormikValues) => any;
export declare const processFilesWithCallback: (files: FileList | File[], callback: Function, readAs?: "readAsBinaryString" | "readAsDataURL" | "readAsArrayBuffer" | "readAsText" | undefined, encoding?: string | undefined) => void;
export declare const setValue: (value: any, formikProps: FormikValues, fieldProps: any) => void;
