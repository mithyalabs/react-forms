import React__default, { createElement, cloneElement, Fragment, useEffect as useEffect$1, useState as useState$1 } from 'react';
import Button$1 from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { map, isString, get, isEmpty, indexOf, forEach, isArray, isFunction, uniqueId } from 'lodash';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, FormLabel, FormGroup, FormControlLabel, Checkbox, Switch, RadioGroup, Radio, IconButton, Button, makeStyles as makeStyles$1, createStyles as createStyles$1 } from '@material-ui/core';
import { FieldArray, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function toVal(mix) {
	var k, y, str='';
	if (mix) {
		if (typeof mix === 'object') {
			if (Array.isArray(mix)) {
				for (k=0; k < mix.length; k++) {
					if (mix[k] && (y = toVal(mix[k]))) {
						str && (str += ' ');
						str += y;
					}
				}
			} else {
				for (k in mix) {
					if (mix[k] && (y = toVal(k))) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else if (typeof mix !== 'boolean' && !mix.call) {
			str && (str += ' ');
			str += mix;
		}
	}
	return str;
}

function clsx () {
	var i=0, x, str='';
	while (i < arguments.length) {
		if (x = toVal(arguments[i++])) {
			str && (str += ' ');
			str += x;
		}
	}
	return str;
}

var getMenuOptions = function (options) {
    return map(options, function (item) {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
};
var getFieldError = function (fieldName, formikProps) {
    var fieldError = get(formikProps, "errors." + fieldName);
    var isTouched = get(formikProps, "touched." + fieldName);
    if (!isTouched && formikProps.submitCount < 1)
        return '';
    return fieldError;
};
var processFilesWithCallback = function (files, callback, readAs, encoding) {
    var imgFiles = [];
    var remFiles = [];
    Array.from(files).forEach(function (file) {
        var reader = new FileReader();
        reader.onload = function () {
            var fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1024) + ' kB',
                base64: file.type.includes('image') ? reader.result : null,
                file: file,
            };
            if (file.type.includes('image')) {
                imgFiles.push(fileInfo);
            }
            else {
                remFiles.push(file);
            }
            if (imgFiles.length + remFiles.length === files.length) {
                callback({ imgs: imgFiles, rem: remFiles });
            }
        };
        reader[readAs || 'readAsDataURL'](file, encoding);
        // This works but remember only readAsText can take encoding as a parameter. Might want to mention this in the documentation.
        console.log(imgFiles, remFiles);
    });
};
var setValue = function (value, formikProps, fieldProps) {
    formikProps.setFieldValue(get(fieldProps, 'name'), value);
};

var MUIReadOnly = function (props) {
    return (createElement("div", null,
        createElement(Typography, { variant: "subtitle1" }, props.label || ''),
        createElement(Typography, null, props.value || 'NA')));
};

var MUITextField = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.isReadOnly, isReadOnly = _c === void 0 ? false : _c;
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: fieldError || fieldProps.helperText || '', onChange: formikProps.handleChange, onBlur: formikProps.handleBlur, value: get(formikProps, "values." + fieldProps.name) || '' });
    // console.log('Text field props read only', isReadOnly);
    if (isReadOnly) {
        return (createElement(MUIReadOnly, { label: updatedProps.label, value: updatedProps.value }));
    }
    return (createElement(TextField, __assign({}, updatedProps)));
};

var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, _e = fieldProps.emptyMenuItemProps, emptyMenuItemProps = _e === void 0 ? {} : _e, _f = fieldProps.menuItemProps, menuItemProps = _f === void 0 ? {} : _f, _g = fieldProps.inputLabelProps, inputLabelProps = _g === void 0 ? {} : _g, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText", "formControlProps", "formHelperTextProps", "emptyMenuItemProps", "menuItemProps", "inputLabelProps"]);
    var labelId = fieldConfig.id + "_label";
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = getMenuOptions(options);
    var value = get(formikProps, "values." + fieldProps.name) || ((selectProps.multiple) ? [] : '');
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        label &&
            (createElement(InputLabel, __assign({ id: labelId }, inputLabelProps), label)),
        createElement(Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, selectProps),
            (emptyItem) &&
                (createElement(MenuItem, __assign({ value: '' }, emptyMenuItemProps), emptyItemText)),
            map(menuOptions, function (item, index) { return (createElement(MenuItem, __assign({ key: fieldConfig.id + "_menu_item_" + index, value: item.value }, menuItemProps), item.name)); })),
        (fieldError || fieldProps.helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || fieldProps.helperText))));
};

var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, helperText = fieldProps.helperText, _d = fieldProps.options, options = _d === void 0 ? [] : _d, header = fieldProps.header, headerProps = fieldProps.headerProps, checkGroupProps = fieldProps.checkGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, formControlLabelProps = fieldProps.formControlLabelProps, checkboxProps = __rest(fieldProps, ["label", "helperText", "options", "header", "headerProps", "checkGroupProps", "formControlProps", "formHelperTextProps", "formControlLabelProps"]);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var value = get(formikProps, "values." + fieldProps.name);
    var menuOptions = getMenuOptions(options);
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (createElement(FormLabel, __assign({}, headerProps), header)),
        createElement(FormGroup, __assign({}, checkGroupProps), (!isEmpty(menuOptions)) ?
            (map(menuOptions, function (item, index) { return (createElement(FormControlLabel, __assign({ key: fieldConfig.id + "_check_" + index, control: createElement(Checkbox, __assign({ checked: (indexOf(value, item.value) > -1), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange, value: item.value }, __assign(__assign({}, checkboxProps), { id: fieldConfig.id + "_check_" + index }))), label: item.name || '' }, formControlLabelProps))); })) : (createElement(FormControlLabel, __assign({ control: createElement(Checkbox, __assign({ checked: (value || false), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange }, checkboxProps)), label: label || '' }, formControlLabelProps)))),
        (fieldError || helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

var MUISwitch = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b, _c = props.isReadOnly, isReadOnly = _c === void 0 ? false : _c;
    var label = fieldProps.label, switchProps = __rest(fieldProps, ["label"]);
    var value = get(formikProps, "values." + fieldProps.name);
    var handleOnChange = function () {
        formikProps.setFieldValue(fieldProps.name, !value);
    };
    // console.log('Switch props', { ...{ ...switchProps, disabled: (switchProps.disabled || isReadOnly) } });
    return (createElement(FormControlLabel, { control: createElement(Switch, __assign({ checked: !!value, onChange: handleOnChange, onBlur: formikProps.handleBlur, inputProps: { 'aria-label': 'secondary checkbox' }, value: value }, __assign(__assign({}, switchProps), { disabled: (switchProps.disabled || isReadOnly) }))), label: label || '' }));
};

var MUIRadio = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var header = fieldProps.header, _c = fieldProps.options, options = _c === void 0 ? [] : _c, headerProps = fieldProps.headerProps, helperText = fieldProps.helperText, radioProps = fieldProps.radioProps, radioGroupProps = fieldProps.radioGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps;
    var fieldValue = get(formikProps, "values." + fieldProps.name) || '';
    var menuOptions = getMenuOptions(options);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    return (createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (createElement(FormLabel, __assign({}, headerProps), header)),
        createElement(RadioGroup, __assign({ name: fieldProps.name, value: fieldValue, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, radioGroupProps), map(menuOptions, function (option, index) {
            var value = option.value, name = option.name, rest = __rest(option, ["value", "name"]);
            return (createElement(FormControlLabel, __assign({ key: fieldProps.id + "_option_item_" + index, value: value + '', label: name, control: createElement(Radio, __assign({}, radioProps)) }, rest)));
        })),
        (fieldError || helperText) &&
            (createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};

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
var MUIFieldArray = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var itemType = fieldProps.itemType, _c = fieldProps.addButtonText, addButtonText = _c === void 0 ? 'Add' : _c, addButtonProps = fieldProps.addButtonProps, addButton = fieldProps.addButton, removeButton = fieldProps.removeButton, removeButtonProps = fieldProps.removeButtonProps, _d = fieldProps.textFieldProps, textFieldProps = _d === void 0 ? {} : _d;
    var values = get(formikProps, "values." + fieldProps.name);
    var itemComponentConfig = getComponentConfig(itemType);
    var classes = useStyles();
    return (React__default.createElement(FieldArray, { name: fieldProps.name, render: function (arrayHelpers) { return (React__default.createElement("div", null,
            (values || []).map(function (value, index) { return (React__default.createElement("div", { key: fieldProps.name + "-" + index, className: classes.arrayItem },
                React__default.cloneElement(itemComponentConfig.component, __assign(__assign({ name: fieldProps.name, itemIndex: index, arrayHelpers: arrayHelpers, fieldValue: value, formikProps: formikProps }, itemComponentConfig.props), textFieldProps)),
                (removeButton) ? removeButton : (React__default.createElement(IconButton, __assign({ className: classes.arrayRemoveIcon, size: "small", onClick: function () { return arrayHelpers.remove(index); } }, removeButtonProps),
                    React__default.createElement(CloseIcon, null))))); }),
            (addButton) ? addButton : (React__default.createElement(Button, __assign({ type: "button", onClick: function () { return arrayHelpers.push({}); } }, addButtonProps), addButtonText)))); } }));
};
var useStyles = makeStyles(function () {
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
    }));
});

var MUIFileInput = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var onDone = fieldProps.onDone, multiple = fieldProps.multiple, invisible = fieldProps.invisible, disableDefaultTooltip = fieldProps.disableDefaultTooltip, accept = fieldProps.accept, readAs = fieldProps.readAs, disabled = fieldProps.disabled, onFilesChange = fieldProps.onFilesChange, wrapWith = fieldProps.wrapWith, nativeInputProps = fieldProps.nativeInputProps, _c = fieldProps.encoding, encoding = _c === void 0 ? 'utf-8' : _c;
    var classes = useStyles$1();
    var handleChange = function (event) {
        var files = event.target.files || new FileList();
        if (onFilesChange) {
            onFilesChange(files);
            setValue(files, formikProps, fieldProps);
        }
        processFilesWithCallback(files, function (prop) {
            var imgs = prop.imgs, rem = prop.rem;
            onDone === null || onDone === void 0 ? void 0 : onDone(imgs, rem);
            var files = [].concat(imgs || []).concat(rem || []);
            setValue(files, formikProps, fieldProps);
        }, readAs, encoding);
    };
    var input = React__default.createElement("input", __assign({ type: "file", disabled: disabled, multiple: multiple, className: invisible || wrapWith ? classes.invisibleInput : "", title: disableDefaultTooltip ? " " : undefined, accept: accept, onChange: handleChange }, nativeInputProps));
    return (React__default.createElement(React__default.Fragment, null, wrapWith ? wrapWith(input) : input));
};
var useStyles$1 = makeStyles$1(function () { return createStyles$1({
    invisibleInput: { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' }
}); });

var compare = function (value1, operator, value2) {
    switch (operator) {
        case '>': return value1 > value2;
        case '<': return value1 < value2;
        case '>=': return value1 >= value2;
        case '<=': return value1 <= value2;
        case '==': return value1 == value2;
        case '!=': return value1 != value2;
        case '===': return value1 === value2;
        case '!==': return value1 !== value2;
        default: return false;
    }
};
var getConditionalOutput = function (itemCondition, formikProps) {
    var itemValue = get(formikProps, "values." + itemCondition.key);
    return compare(itemValue, itemCondition.operator, itemCondition.compareValue);
};
var hasTruthyValue = function (logicalOperation, values, formikProps) {
    if (logicalOperation === void 0) { logicalOperation = 'AND'; }
    var outputResult = false;
    forEach(values, function (item, index) {
        var result = getConditionalOutput(item, formikProps);
        if (logicalOperation === 'AND' && !result) {
            outputResult = false;
            return false;
        }
        if (logicalOperation === 'OR' && result) {
            outputResult = true;
            return false;
        }
        if (index === values.length - 1) {
            outputResult = (logicalOperation === 'AND') ? true : false;
        }
        return;
    });
    return outputResult;
};
var getConditionalProps = function (itemConfig, formikProps) {
    var conditionInstructions = itemConfig.condition;
    if (!conditionInstructions || isEmpty(conditionInstructions.values)) {
        return { finalProps: {} };
    }
    var isValidCondition = hasTruthyValue(conditionInstructions.logicOpn, conditionInstructions.values || [], formikProps);
    //console.log('Conditional props valid condition', isValidCondition);
    if (isValidCondition) {
        /*
        IF CONDITION IS TRUE THEN RETURN THE TRUTHY PROPS ELSE RETURN THE DEFAULT PROPS
        */
        return { finalProps: conditionInstructions.postEffectProps };
    }
    else {
        if (conditionInstructions.hidden === true)
            return { finalProps: conditionInstructions.defaultProps, hidden: true };
        else
            return { finalProps: conditionInstructions.defaultProps, };
    }
};

var useEffect = useEffect$1, useState = useState$1;
var ComponentMapConfig = {};
var getComponentConfig = function (type) {
    return ComponentMapConfig[type];
};
var attachField = function (type, component, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item] = { component: component, props: props }; });
    }
    else
        ComponentMapConfig[type] = { component: component, props: props };
};
var setDefaultProps = function (type, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item].props = __assign(__assign({}, ComponentMapConfig[item].props), props); });
    }
    else
        ComponentMapConfig[type].props = __assign(__assign({}, ComponentMapConfig[type].props), props);
};
attachField('text', createElement(MUITextField, null), { type: 'text' });
attachField('password', createElement(MUITextField, null), { type: 'password' });
attachField('select', createElement(MUISelectField, null));
attachField('checkbox', createElement(MUICheckBox, null));
attachField('switch', createElement(MUISwitch, null));
attachField('radio', createElement(MUIRadio, null));
attachField('array', createElement(MUIFieldArray, null));
attachField('file', createElement(MUIFileInput, null));
var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.settings, settings = _b === void 0 ? { horizontalSpacing: 10, verticalSpacing: 10, columnHorizontalPadding: 0, isReadOnly: false } : _b;
    var columnItems = get(schema, 'columns');
    var rowSettings = __assign(__assign({}, settings), get(schema, 'settings'));
    var colItems = (isArray(schema) ? schema : ((isArray(columnItems) ? columnItems : [schema])));
    var classes = useFormStyles();
    var rowStyle = { marginBottom: (rowSettings.verticalSpacing || 10) };
    return (createElement("div", { className: classes.row, style: rowStyle }, map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        var horizontalSpacing = (index === (colItems.length - 1)) ? 0 : (rowSettings.horizontalSpacing || 10);
        if (!componentConfig)
            return createElement("div", { key: rowId + "_field_" + index });
        var conditionalProps = getConditionalProps(item, formikProps);
        var fieldProps = __assign(__assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps), conditionalProps.finalProps);
        var Component = componentConfig.component;
        if (conditionalProps.hidden === true)
            return createElement("div", { key: rowId + "_field_" + index });
        return (createElement("div", { key: rowId + "_field_" + index, className: clsx(item.classNames, classes.column), style: __assign({ flex: (item.flex || 1), marginRight: horizontalSpacing, paddingLeft: rowSettings.columnHorizontalPadding, paddingRight: rowSettings.columnHorizontalPadding, maxWidth: '100%' }, item.styles) }, (settings.isReadOnly && item.readOnlyProps && isFunction(item.readOnlyProps.renderer)) ?
            (item.readOnlyProps.renderer({ formikProps: formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })) :
            cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })));
    })));
};
var getUpdateSchema = function (schema, formId) {
    return map(schema, function (schemaItem) {
        if (isArray(schemaItem)) {
            return map(schemaItem, function (item) { return (__assign(__assign({}, item), { id: formId + "_" + uniqueId() })); });
        }
        return __assign(__assign({}, schemaItem), { id: formId + "_" + uniqueId() });
    });
};
var MLFormContent = function (props) {
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps, settings = props.settings;
    var _a = useState(schema), formSchema = _a[0], setFormSchema = _a[1];
    useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (createElement(Fragment, null, map(formSchema, function (configRow, index) {
        var rowId = formId + "_row_" + index;
        return (createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps, settings: settings }));
    })));
};
var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps, loaderProps = props.loaderProps;
    var classes = useFormStyles();
    if (props.actionContent)
        return (cloneElement(props.actionContent || createElement("div", null), { formikProps: formikProps }));
    var layoutClassName = "action-" + submitButtonLayout;
    return (createElement("div", { className: clsx(classes.actionContainer, layoutClassName, containerClassNames) }, (props.actionContent) ?
        (cloneElement(props.actionContent || createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (createElement(Fragment, null,
            createElement(Button$1, __assign({ type: "submit", disabled: formikProps.isSubmitting, variant: "contained", color: "primary" }, submitButtonProps), submitButtonText),
            (formikProps.isSubmitting) && (createElement(CircularProgress, __assign({ size: 24, color: "secondary", className: classes.submitLoader }, loaderProps)))))));
};
var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, _c = props.actionConfig, actionConfig = _c === void 0 ? {} : _c;
    useEffect(function () {
        if (isInProgress === false)
            formikProps.setSubmitting(false);
    }, [isInProgress]);
    return (createElement("form", { onSubmit: formikProps.handleSubmit },
        createElement(MLFormContent, __assign({}, props)),
        (actionConfig.displayActions !== false) &&
            (createElement(MLFormAction, __assign({ formId: props.formId, formikProps: formikProps }, actionConfig)))));
};
var useFormStyles = makeStyles(function () {
    return (createStyles({
        row: {
            display: 'flex'
        },
        column: {},
        actionContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            '&.action-center': {
                justifyContent: 'center'
            },
            '&.action-right': {
                justifyContent: 'flex-end'
            },
            '&.action-fullWidth > button': {
                flex: 1
            }
        },
        submitLoader: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            marginTop: -5
        }
    }));
});

var ReactForm = function (props) {
    var config = props.config, formId = props.formId, _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, onSubmit = props.onSubmit, actionConfig = props.actionConfig, formSettings = props.formSettings, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, _c = props.isReadOnly, isReadOnly = _c === void 0 ? false : _c, formikProps = __rest(props, ["config", "formId", "initialValues", "onSubmit", "actionConfig", "formSettings", "isInProgress", "isReadOnly"]);
    return (createElement(Formik, __assign({ initialValues: initialValues, onSubmit: onSubmit }, formikProps), function (formProps) { return (createElement(MLFormBuilder, { schema: config, formId: formId, actionConfig: actionConfig, settings: __assign(__assign({}, formSettings), { isReadOnly: isReadOnly }), formikProps: formProps, isInProgress: isInProgress })); }));
};

var index = './lib/ReactForm';

export default index;
export { BuildFormRow, MLFormAction, MLFormBuilder, MLFormContent, MUICheckBox, MUIFieldArray, MUIFileInput, MUIRadio, MUIReadOnly, MUISelectField, MUISwitch, MUITextField, ReactForm, attachField, getComponentConfig, getFieldError, getMenuOptions, processFilesWithCallback, setDefaultProps, setValue };
//# sourceMappingURL=index.es.js.map
