import { Form } from '..';
import TodoItemCheckbox from './TodoItemCheckbox';

import { TodoItem } from '../../context/Todo';
import { Fields } from '../../utils';

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

export default function EditableTodoItem(props: EditableTodoItemProps) {
  const fields = new Fields<TodoItem>([
    {
      key: 'value',
      value: props.value,
      label: 'Value',
      isSrOnly: true,
      required: true,
      autoFocus: true,
    },
  ]);

  return (
    <div className='group flex justify-between w-full my-2'>
      <div className='flex flex-row items-center'>
        {/* Just for aesthetics, click 'X' to cancel */}
        <TodoItemCheckbox isDisabled />
      </div>
      <Form
        fields={fields.get()}
        className='flex flex-row-reverse w-full items-center justify-between ml-1'
        onCancel={props.onCancel}
        onSubmit={props.onSubmit}
        headerClassName=''
        formGroupClassName='flex-grow'
      />
    </div>
  );
}
