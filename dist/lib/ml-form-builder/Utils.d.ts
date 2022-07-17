import * as React from 'react';
import { FormikValues } from 'formik';
export declare type MenuOptionObject<T = unknown, ValueType = string> = {
    name: string | React.ReactNode;
    value: ValueType;
} & T;
export declare type MenuOptions<T, V = string> = Array<string> | Array<MenuOptionObject<T, V>>;
export declare type ReadAsType = keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL' | 'readAsArrayBuffer' | 'readAsText'>;
export declare const getMenuOptions: <T extends any, V extends any>(options: MenuOptions<T, V>) => (number | MenuOptionObject<T, V> | ((...items: string[]) => number) | ((...items: MenuOptionObject<T, V>[]) => number) | {
    (...items: ConcatArray<string>[]): string[];
    (...items: (string | ConcatArray<string>)[]): string[];
} | {
    (...items: ConcatArray<MenuOptionObject<T, V>>[]): MenuOptionObject<T, V>[];
    (...items: (MenuOptionObject<T, V> | ConcatArray<MenuOptionObject<T, V>>)[]): MenuOptionObject<T, V>[];
} | ((separator?: string | undefined) => string) | ((compareFn?: ((a: string, b: string) => number) | undefined) => string[]) | ((compareFn?: ((a: MenuOptionObject<T, V>, b: MenuOptionObject<T, V>) => number) | undefined) => MenuOptionObject<T, V>[]) | ((searchElement: string, fromIndex?: number | undefined) => number) | ((searchElement: MenuOptionObject<T, V>, fromIndex?: number | undefined) => number) | ((callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void) | ((callbackfn: (value: MenuOptionObject<T, V>, index: number, array: MenuOptionObject<T, V>[]) => void, thisArg?: any) => void) | {
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
    <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
} | {
    (callbackfn: (previousValue: MenuOptionObject<T, V>, currentValue: MenuOptionObject<T, V>, currentIndex: number, array: MenuOptionObject<T, V>[]) => MenuOptionObject<T, V>): MenuOptionObject<T, V>;
    (callbackfn: (previousValue: MenuOptionObject<T, V>, currentValue: MenuOptionObject<T, V>, currentIndex: number, array: MenuOptionObject<T, V>[]) => MenuOptionObject<T, V>, initialValue: MenuOptionObject<T, V>): MenuOptionObject<T, V>;
    <U_1>(callbackfn: (previousValue: U_1, currentValue: MenuOptionObject<T, V>, currentIndex: number, array: MenuOptionObject<T, V>[]) => U_1, initialValue: U_1): U_1;
} | ((value: string, start?: number | undefined, end?: number | undefined) => string[]) | ((value: MenuOptionObject<T, V>, start?: number | undefined, end?: number | undefined) => MenuOptionObject<T, V>[]) | ((target: number, start: number, end?: number | undefined) => string[]) | ((target: number, start: number, end?: number | undefined) => MenuOptionObject<T, V>[]) | ((searchElement: string, fromIndex?: number | undefined) => boolean) | ((searchElement: MenuOptionObject<T, V>, fromIndex?: number | undefined) => boolean) | {
    name: string;
    value: string;
})[];
export declare const getFieldError: (fieldName: string, formikProps: FormikValues) => any;
export declare const processFilesWithCallback: (files: FileList | File[], callback: Function, readAs?: "readAsBinaryString" | "readAsDataURL" | "readAsArrayBuffer" | "readAsText" | undefined, encoding?: string | undefined) => void;
export declare const setValue: (value: any, formikProps: FormikValues, fieldProps: any) => void;
