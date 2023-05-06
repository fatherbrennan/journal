import { useForm } from 'react-hook-form';

import { Check, X } from '../../icons';
import IconButton from '../IconButton';
import FormGroup from './FormGroup';

import type { Field, HTMLElementClassName } from '../../../types/types';

interface FormProps {
  /**
   * `<form>` class.
   */
  className?: HTMLElementClassName;

  /**
   * Field options.
   */
  fields: Array<Field>;

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
  onSubmit?: (data: any, event: any) => void;
}

/**
 * Create a stateful form.
 */
export default function Form(props: FormProps) {
  const { handleSubmit, register } = useForm();
  const onSubmit = props.onSubmit || (() => {});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={props.className}>
      <div
        className={
          props.headerClassName === undefined
            ? 'w-full flex justify-between mb-3'
            : props.headerClassName
        }
      >
        {props.title && (
          <h5 className='mb-0 text-base font-semibold text-gray-900 md:text-xl'>
            {props.title}
          </h5>
        )}
        <div className='flex flex-row'>
          <IconButton isSubmit icon={<Check />} />
          <IconButton onClick={props.onCancel} icon={<X />} />
        </div>
      </div>
      {props.fields.map(
        (field) =>
          (field.hasForm || field.hasForm === undefined) && (
            <FormGroup
              key={field.key}
              field={field}
              register={register}
              className={props.formGroupClassName}
            />
          )
      )}
    </form>
  );
}
