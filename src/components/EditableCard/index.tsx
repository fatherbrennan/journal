import { Form } from '~/components';

import type { Field } from '~/../types/types';

interface EditableCardProps {
  /**
   * Field options.
   */
  fields: Field[];

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

export function EditableCard({ fields, title, onSubmit, onCancel }: EditableCardProps) {
  return (
    <div className='w-full p-4 mt-2 mb-8 overflow-auto bg-white border rounded-lg shadow max-w-7xl border-cyan-200 sm:p-6'>
      <Form fields={fields} title={title} onCancel={onCancel} onSubmit={onSubmit} />
    </div>
  );
}
