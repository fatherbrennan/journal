import { useState } from 'react';

import { IconButton } from '~/components/IconButton';
import { Check, X } from '~/icons';
import { FormGroup } from './FormGroup';

import type { FormEvent } from 'react';

import type { Field, HTMLElementClassName } from '~/../types/types';

interface FormProps {
  /**
   * `<form>` class.
   */
  className?: HTMLElementClassName;

  /**
   * Field options.
   */
  fields: Field[];

  /**
   * Form group class.
   */
  formGroupClassName?: HTMLElementClassName;

  /**
   * Form header group class.
   */
  headerClassName?: HTMLElementClassName;

  /**
   * Form header. If omitted, form will be header-less.
   */
  title?: string;

  /**
   * Callback function to execute on cancel event.
   */
  onCancel?: () => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param event Submit event.
   */
  onSubmit: (data: FormData, event: FormEvent<HTMLFormElement>) => void;
}

export interface FormData {
  [key: Field['key']]: string | boolean;
}

export type FormDataHandler = (key: keyof FormData, value: FormData[keyof FormData]) => void;

/**
 * Create a stateful form.
 */
export function Form({ fields, className, formGroupClassName, headerClassName, onCancel, onSubmit, title }: FormProps) {
  const [formData, setFormData] = useState<FormData>(
    fields.reduce<FormData>((acc, curr) => {
      if (curr.hasForm || curr.hasForm === undefined) {
        acc[curr.key] = typeof curr.value !== 'boolean' || curr.value !== undefined ? (curr.value as string) : '';
      }
      return acc;
    }, {})
  );

  const formHandler: FormDataHandler = (key, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData, event);
  };

  return (
    <form onSubmit={handleFormSubmit} className={className}>
      <div className={headerClassName === undefined ? 'w-full flex justify-between mb-3' : headerClassName}>
        {title && <h5 className='mb-0 text-base font-semibold text-gray-900 md:text-xl'>{title}</h5>}
        <div className='flex flex-row'>
          <IconButton isSubmit icon={<Check />} />
          <IconButton onClick={onCancel} icon={<X />} />
        </div>
      </div>
      {fields.map((field) => (field.hasForm || field.hasForm === undefined) && <FormGroup id={field.key} className={formGroupClassName} formHandler={formHandler} {...field} />)}
    </form>
  );
}

export { FormGroup };
