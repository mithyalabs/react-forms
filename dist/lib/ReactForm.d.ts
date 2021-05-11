/// <reference types="react" />
import { RowSchema, IFormActionProps, BuilderSettingsProps } from './ml-form-builder';
import { FormikConfig, FormikValues } from 'formik';
export * from './ml-form-builder';
export * from './ml-form-builder/lib';
export * from './ml-form-builder/Utils';
/**
 * type1 - (text, password, email, number) will render text field with respective type, default text
 * type2 - select/multiselect - options([{key:val}] or [string])
 * type3 - checkbox/toggle - options([{key:val}] or [string])
 * type4 - radio/switch - options([{key:val}] or [string])
 *
 */
/**
 * condition:{
 *  defaultState:'disable/hide',
 *  defaultProps:{},
 *  logicOpn 'AND|OR',
 *  postEffect:'enable',
 *  postEffectProps:{},
 *  valueFn:Function,
 *  values:[{
 *         key:'xyz',
 *         compareValue:'abc',
 *         operator:'==',
 *    },{
 *         key:'abc',
 *         compareValue:4,
 *         operator:'>='
 *    }]
 * }
 */
export interface IReactFormProps<T = any> extends FormikValues {
    config: Array<RowSchema>;
    formId: string;
    innerRef?: FormikConfig<T>['innerRef'];
    actionConfig: IFormActionProps;
    formSettings?: BuilderSettingsProps;
    isInProgress?: boolean;
    isReadOnly?: boolean;
}
export declare function ReactForm<T>(props: IReactFormProps<T>): JSX.Element;
export default ReactForm;
