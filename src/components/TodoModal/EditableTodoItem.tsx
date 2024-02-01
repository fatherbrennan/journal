import { Form } from '~/components';
import { TodoItemCheckbox } from './TodoItemCheckbox';

import { Fields } from '~/utils';

interface TodoItemFormData {
  value: string;
}

interface EditableTodoItemProps {
  /**
   * Item value.
   */
  value: string;

  /**
   * Callback function to execute on cancel event.
   */
  onCancel: () => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   */
  onSubmit: (data: any) => void;
}

export function EditableTodoItem({ value, onCancel, onSubmit }: EditableTodoItemProps) {
  const fields = new Fields([{ key: 'value', value: value, label: 'Value', isSrOnly: true, required: true, autoFocus: true }]);

  return (
    <div className='flex w-full group'>
      <div className='flex flex-row items-center'>
        <TodoItemCheckbox isDisabled />
      </div>
      <Form
        fields={fields.get()}
        className='flex flex-row-reverse items-center justify-between w-full ml-1'
        onCancel={onCancel}
        onSubmit={onSubmit}
        headerClassName=''
        formGroupClassName='flex-grow'
      />
    </div>
  );
}
