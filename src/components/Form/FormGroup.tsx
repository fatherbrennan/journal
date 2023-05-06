import type { HTMLInputTypeAttribute } from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

import type { FormField, HTMLElementClassName } from '../../../types/types';

interface FormGroupProps {
  /**
   * Form group class.
   */
  className?: HTMLElementClassName;

  /**
   * Field options.
   */
  field: FormField;

  /**
   * React Hook Form register method.
   */
  register: UseFormRegister<FieldValues>;
}

interface FormFieldProps {
  /**
   * True if element should be auto focused.
   */
  autoFocus?: boolean;
}

interface InputAttributes extends FormFieldProps {
  /**
   * `<input type="checkbox" />` `checked` attribute.
   */
  checked?: boolean;

  /**
   * HTML `<input>` class.
   */
  className?: HTMLElementClassName;

  /**
   * HTML `<input>` type.
   */
  type: HTMLInputTypeAttribute;

  /**
   * HTML `<input>` value.
   */
  value?: string | boolean;
}

export default function FormGroup(props: FormGroupProps) {
  /**
   * Return a HTML `<input>` element.
   * @param attr Input attributes.
   * @returns An input element.
   */
  const Input = (attr: InputAttributes) => (
    // Disabled unique ID in .hintrc file because would not recognise this unique ID
    <input
      id={props.field.key}
      className={attr.className}
      type={attr.type}
      defaultValue={attr.value as string}
      defaultChecked={attr.checked}
      autoFocus={props.field.autoFocus}
      {...props.register(props.field.key, {
        required: props.field.required,
      })}
    />
  );

  interface TextAreaProps extends FormFieldProps {
    /**
     * HTML `<textarea>` class.
     */
    className: HTMLElementClassName;
  }

  /**
   * Return a HTML `<textarea>` element.
   * @param attr Textarea attributes.
   * @returns A textarea element.
   */
  const TextArea = (attr: TextAreaProps) => (
    <textarea
      id={props.field.key}
      className={attr.className}
      defaultValue={props.field.value?.toString()}
      rows={6}
      autoFocus={props.field.autoFocus}
      {...props.register(props.field.key, {
        required: true,
      })}
    ></textarea>
  );

  /**
   * Return a HTML input element.
   * @returns HTML input element.
   */
  const Field = () => {
    const value = props.field.value;
    let className =
      'w-full text-sm font-normal text-gray-500 rounded-xl p-2 border border-transparent border-gray-100 hover:border-gray-300';

    switch (props.field.type) {
      case 'string':
        return <Input type='text' value={value} className={className} />;
      case 'integer':
        return <Input type='text' value={value} className={className} />;
      case 'number':
        return <Input type='text' value={value} className={className} />;
      case 'date':
        return <Input type='date' value={value} className={className} />;
      case 'boolean':
        return (
          <Input
            type='checkbox'
            checked={value as boolean}
            className="h-6 w-11 appearance-none rounded-full border-none bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] checked:bg-teal-300 checked:bg-none checked:after:translate-x-full hover:checked:bg-teal-300 focus:checked:bg-teal-300 focus:hover:checked:bg-teal-300"
          />
        );
      case 'note':
        return <TextArea className={`${className} whitespace-pre-line`} />;
      default:
        return <Input type='text' value={value} className={className} />;
    }
  };

  return (
    <div className={props.className === undefined ? 'mb-6' : props.className}>
      <div className='flex flex-col'>
        <label
          htmlFor={props.field.key}
          className={props.field.isSrOnly ? 'sr-only' : 'mb-2'}
        >
          {props.field.label}
        </label>
        <div className='relative inline-flex cursor-pointer items-center'>
          <Field />
        </div>
      </div>
    </div>
  );
}
