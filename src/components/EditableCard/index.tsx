import { Form } from '..';

import type { Field } from '../../../types/types';

interface EditableCardProps {
  /**
   * Field options.
   */
  fields: Array<Field>;

  /**
   * Card header.
   */
  title: string;

  /**
   * Callback function to execute on cancel event.
   */
  onCancel?: () => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param event Submit event.
   */
  onSubmit: (data: any, event: any) => void;
}

export default function EditableCard(props: EditableCardProps) {
  return (
    <div className='w-full max-w-7xl p-4 bg-white border border-cyan-200 rounded-lg shadow sm:p-6 mb-8 mt-2 overflow-auto'>
      <Form
        fields={props.fields}
        title={props.title}
        onCancel={props.onCancel}
        onSubmit={props.onSubmit}
      ></Form>
    </div>
  );
}
