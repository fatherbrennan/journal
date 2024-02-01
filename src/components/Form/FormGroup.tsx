import { Input } from './Input';
import { InputToggle } from './InputToggle';
import { TextArea } from './Textarea';

import type { FormField, HTMLElementClassName } from '~/../types/types';
import type { FormDataHandler } from './';

export interface FormGroupSharedProps extends Pick<FormField, 'autoFocus' | 'label' | 'required' | 'value'> {
  /**
   * Unique ID.
   */
  id: string;

  /**
   * Function to update form data state.
   * @param key Field key.
   * @param value Field value.
   */
  formHandler: FormDataHandler;
}

interface FormGroupProps extends FormField, FormGroupSharedProps {
  /**
   * Form group class.
   */
  className?: HTMLElementClassName;
}

export function FormGroup({ id, label, formHandler, autoFocus, className, isSrOnly, required, type, value }: FormGroupProps) {
  const sharedProps = { id, formHandler, autoFocus, label, required, value };

  return (
    <div className={className === undefined ? 'mb-6' : className}>
      <div className='flex flex-col'>
        <label htmlFor={id} className={isSrOnly ? 'sr-only' : 'mb-2'}>
          {label}
        </label>
        <div className='relative inline-flex items-center cursor-pointer'>
          {type === 'boolean' ? (
            <InputToggle {...sharedProps} checked={!!value} />
          ) : type === 'date' ? (
            <Input {...sharedProps} type='date' />
          ) : type === 'note' ? (
            <TextArea {...sharedProps} />
          ) : (
            <Input {...sharedProps} type='text' />
          )}
        </div>
      </div>
    </div>
  );
}
