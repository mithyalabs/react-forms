import * as React from 'react';
import { IFieldProps } from '../index';
export interface IReadonlyProps extends IFieldProps {
    label: React.ReactNode;
    value: React.ReactNode;
}
export declare const MUIReadOnly: React.FC<IReadonlyProps>;
export default MUIReadOnly;
