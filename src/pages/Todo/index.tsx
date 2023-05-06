import { useContext } from 'react';

import { Heading, ItemCounter, TodoList } from '../../components';
import { TodoContext } from '../../context';

export default function () {
  const todo = useContext(TodoContext);

  return (
    <>
      <Heading value='Todo' />
      <ItemCounter itemCount={todo.store.length} />
      <div className='p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow sm:p-6 my-2'>
        <TodoList />
      </div>
    </>
  );
}
