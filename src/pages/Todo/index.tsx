import { useContext } from 'react';

import { Heading, ItemCounter, TodoList } from '~/components';
import { TodoContext } from '~/context';

export function Todo() {
  const todoContext = useContext(TodoContext);

  return (
    <>
      <Heading value='To Do' />
      <ItemCounter itemCount={todoContext.itemCount} />
      <div className='p-4 my-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow sm:p-6'>
        <TodoList doHideItemCount />
      </div>
    </>
  );
}
