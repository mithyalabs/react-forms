- [1. React-form](#1-React-form)
	- [1.1. Installation](#11-installation)
	- [1.2. Getting started with react-forms](#12-getting-started-with-react-forms)
	- [1.3. Built In Components](#13-built-in-components)
	- [1.4. Configuration File](#14-configuration-file)
	- [1.5. Sample Object Structures](#15-sample-object-structures)
	- [1.6. Setting default props](#16-setting-default-props)
	- [1.7. Add your own Component](#17-add-your-own-component)
	- [1.8. Adding Condition to your form field.](#18-adding-condition-to-your-form-field)
	- [1.9. Validating Form Fields](#19-validating-form-fields)
	- [1.10. Initial Values](#110-initial-values)
	- [1.11. Managing Form action](#111-managing-form-action)

---

# 1. React-form

Hi! This is a react library that builds a form component for you.
It uses basic [material-ui](https://www.npmjs.com/package/@material-ui/core) library for designing and [formik](https://www.npmjs.com/package/formik) library for form action handling. 


## 1.1. Installation

```sh
    npm i https://github.com/mithyalabs/react-forms.git
```

## 1.2. Getting started with react-forms

```js
import {ReactForm} from 'react-forms'
import React from 'react'

export default const MyReactComponent = () => {
	const myConfig = [
		{
			type : 'text',
			valueKey : 'myTextField',
			fieldProps : { label : 'Sample Text Field' , fullWidth: true },
		} 
	]
	const myInitialValues = [{ myTextField : '' }]

	return (
		<div>
			<ReactForm
				config={myConfig}
				initialValues={myInitialValue}
				onSubmit = {(values : object) => {console.log(values)}}  
			/>
		</div> 
	)
}
```

## 1.3. Built In Components

 - Text Field
 - Check box
 - Radio button
 - Select Field
 - File upload field
 - Phone number field
 - Switch Field
 - Plain Text

## 1.4. Configuration File

 ***Type :***
The config file is a an array , where each item is an Object or array of Object.
Each item represents a row , so if the item contains single object then there will be single component in the row or else the form width will be distributed among the column components.
***Object Structure :***
*type* : string (component you want to render)
*valueKey* : string  (unique key used to identify the field)
*fieldProps*: Accept all the default props available in their respective material-ui Api
*styles*: CSS style object to be applied on the wrapper. Each component is wrapped around with a div component.

*You don't need to pass any onChange since it all will be handled by the form builder using formik library*

## 1.5. Sample Object Structures 

### 1.5.1 TextField    
```js
{
	type : 'text',
	valueKey: 'myText',
	fieldProps : { ...textFieldProps },
	styles : { margin : '0 auto'}
}
```
> textFieldProps = [TextFieldProps](https://material-ui.com/api/text-field/)



### 1.5.2 SelectField
```js
{
	type : 'select',
	valueKey: 'mySelect',
	fieldProps : {
		...selectProps
		options :[
			{name : 'Abc' , value : 'abc'}, 
			{name : 'XYZ' , value : 'xyz'}
		] 
	},
	styles : { width : '50%' }
}
```
> selectProps = [SelectProps](https://material-ui.com/api/select/)


### 1.5.3 Checkbox
```js
{ 
	type : 'checkbox'
	valueKey: 'myCheckbox',
	fieldProps : { 
		...checkboxProps , 
		options :[
			{name : 'Abc' , value : 'abc'}, 
			{name : 'XYZ' , value : 'xyz'}
		] ,
		header : 'My Checkbox Header',
		formControlLabelProps : formControlLabelProps,
		formControlProps : formControlProps,
		formHelperTextProps : formHelperTextProps
	}
}
```
> `Options` can be an Array of string or Array of {name , value} object. This structure is followed by SelectField , Checkbox and Radiobutton.

**Except options, all other props are optional and the following are the types of the other props**
- formControlLabelProps : [formControlLabelProps](https://material-ui.com/api/form-control-label/#formcontrollabel-api),
- formControlProps : [formControlProps](https://material-ui.com/api/form-control/#formcontrol-api)
- formHelperTextProps : [formHelperTextProps](https://material-ui.com/api/form-helper-text/#formhelpertext-api)
- checkboxProps : [CheckboxProps](https://material-ui.com/api/checkbox/)

### 1.5.4 Radio Button
```js
{
	type : 'radio',
	valueKey : 'myRadio',
		fieldProps : {
			...radioProps ,
			options :[
				{name : 'Abc' , value : 'abc'}, 
				{name : 'XYZ' , value : 'xyz'}
			],
			formControlProps : formControlProps,
			formHelperTextProps : formHelperTextProps
		}
}
```
> radioProps : [RadioButtonProps](https://material-ui.com/api/radio/)


### 1.5.5 Switch
```js
{
	type : 'switch' , 
	valueKey : 'mySwitch',
	fieldProps : { 
		label: 'Demo Switch',
		...switchProps
	}
}
``` 
> switchProps: [SwitchProps](https://material-ui.com/api/switch/)

### 1.5.6 Password
```js
{
	type : 'password' ,
	valueKey : 'myPasswordField',	  
	fieldProps :{
		label : 'Enter password',
		...textFieldProps
	}
}
```


### 1.5.7 File
```ts
{
	type: 'file',
	valueKey: 'myFile',
	fieldProps:{
		readAs?: 'readAsBinaryString' | 'readAsDataURL' | 'readAsArrayBuffer' | 'readAsText',
		encoding?: string,
		disabled?: boolean,
		multiple?: boolean,
		accept?: string,
		disableDefaultTooltip?: boolean,
		invisible?: boolean,
		onFilesChange?: (files: FileList) => void,
		onDone?: (imgFiles: TFile[], remFiles?: File[]) => void,
		wrapWith?: (input: JSX.Element) => JSX.Element,
		nativeInputProps?: React.InputHTMLAttributes<{}>,
	}
}
```


**Notes :**
  + Do not specify encoding if readAs is not set to readAsText. It will throw an error since only text can have encoding  property in JS' FileReader.
  + Any props specified in nativeInputProps will override other defaults and properties set in the component. 
  + Function passed to wrapWith should take the input Element and return the same within the wrapped element. The input element is always invisible if wrapWith is provided
  + Specify the type of files you want to accept using accept.


  
### 1.5.8 Plain Text
This simply displays a bit of text formatted as required. This is useful if you're creating some consent form and want to display some text. Sure there are other ways to do the same, but if you need to, you can use this too.
```js
{
	type: 'mui-plain-text',
	valueKey: 'doNotIgnoreThisProperty',
	fieldProps:{ 
		isTextHtmlString?: false,
		text: "Please read all the terms of this agreement."
		typographyProps?: TypographyProps,
		className?: 'my-formatted-text',
	}
}
```

**Notes :**
 + Do not forget to specify the valueKey and keep it unique within the form. It is a required field.
 + If isTextHtmlString is set to true, typographyProps is not used. Conversely className is ignored when isTextHtmlString is set to false. *Please note that the className provided in typographyProps is not ignored when isTextHtmlString is set to false*


---
## 1.6. Setting default props
You can set your own default props for a specific field that would be used all over the application. All you need to do is use the setDefaultProps() method and pass the field type and your default props object.

**Example :**
```js
import { setDefaultProps } from 'react-forms';
setDefaultProps('text' , {fullWidth : true , color : 'secondary'})
```

Now this props would be default properties followed throughout the application.
And of course if you don't want to use them somewhere then you can pass your own fieldProps in config file.

## 1.7. Add your own Component
If you want to create your own custom component then we have provided a attachField property for you.
```js
import {react , FC} from 'react'
import  {attachField} from 'react-forms'

const YourComponent = () => {
	return <div/>
}

attachField('your-component',<YourComponent/> ,{default-props})
```

## 1.8. Adding Condition to form field.

Just imagine if you want to make a component behave differently based on the state of another component. Well it is possible by passing condition props to the config file. 
*Check this example on sandbox*
```js
const config = [
	{
		type : 'text' ,
		valueKey : 'myText'
	},
	{
		type "text",
		valueKey : 'myText2'
	},
	{
		type : 'radio' ,
		valueKey : 'myRadio',
		fieldProps :{
			options : ['option1' , 'option2']
		},
		condition : {
			hidden : true ,
			defaultProps : { same as fieldProps} ,
			truthyProps : { same as fieldProps} ,
			logicOpn : 'AND' | 'OR',
			values : [
				{
					key : 'myText',
					compareValue : 30 ,
					operator : '==='
				},
				{
					key : 'myText2',
					compareValue : 'abc' ,
					operator : '!=='
				}
			]
		}
	}
]
```

**Note**
- *hidden* : if True the component  will be rendered if and only if the given conditions are true.
- *logicOpn* : AND or OR
- *defaultProps* : this props will be passed with fieldProps if the necessary conditions are not satisfied.
- *truthyProps* : this props will be passed with fieldProps if the conditions are satisfied.
- *values* : every object in the array contains a 
- *key* : which uniquely identifies the field in the form.
- *compareValue* : the value to be compared with the value of the field identified by the key.
- *operator* : comparison operator.

## 1.9. Validating Form Fields 

No form is complete without some some constraints or validation.
We use [YUP](https://www.npmjs.com/package/yup) library for all kind of field validations.

Example : 
```js
import * as YUP from 'yup'
import { ReactForm } from 'react-forms'
const formValidation = Yup.object({
	offerType: Yup.string().required('Select at least 1 offer'),
	myText: Yup.number().max(50)
})

const config = [
	{
		type : 'text',
		value : 'myText'
	},
	{
		type: 'radio',
		valueKey: 'offerType',
		fieldProps: {
			options: [
				{
					name: 'Offer1',
					value: 1
				}, 
				{
					name: 'Offer2',
					value: 2
				}
			],
			header: 'My Offers',
		}
	}
]
	
export default const Example = () => {
	return (
		<div>
			<ReactForm
				config={config}
				validationSchema={formValidation}
				onSubmit={(values)=>{console.log(values)} 
			/>
		</div>
	)
}
```

Once you hit the submit button it will perform validation as per the validation schema.

## 1.10. Initial Values 

You can provide initial values if you want to the field of your choice.
All you need to do is pass an array that looks something like this:
```
[ {valueKey : value} , {valueKey : value} .....]

initVals = [ {myText : 'Init Value' , myCheckBox : ['option_2'] }
```

## 1.11. Managing Form action

Now the form is filled , what to do next?
Well the last thing which the ReactForm takes is an actionConfig object.

**The Structure**
```
actionConfig = {
	submitButtonText: string,
	submitButtonLayout: 'right'|'center'|'fullWidth'
	submitButtonProps: submitButtonProps,
	loaderProps: loaderProps,
	actionContent: JSX
}
```
    

  submitButtonProps: [submitButtonProps](https://material-ui.com/api/button/)
  
  loaderProps:[loaderProps](https://material-ui.com/api/circular-progress/#circularprogress-api)

Dependencies

1. formik
2. lodash
3. @material-ui/core
4. @material-ui/icons
