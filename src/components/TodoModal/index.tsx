import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoContext } from '../../context';
import TodoList from './TodoList';

export default function TodoModal() {
  const todo = useContext(TodoContext);
  const location = useLocation();

  // Modal is visible everywhere excluding Todo page
  return todo.isActive && location.pathname !== '/todo' ? (
    <div className='absolute z-10 right-0 p-1 lg:p-2'>
      <div className='max-w-xl w-56 sm:w-56 md:w-64 lg:w-80 3xl:w-[36rem] p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg sm:p-6'>
        <div className='w-full flex items-center justify-center'>
          <h2 className='my-2 text-base font-semibold text-gray-900 md:text-xl'>
            Todo
          </h2>
        </div>
        <TodoList hasItemCount={true} />
      </div>
    </div>
  ) : (
    <></>
  );
}
