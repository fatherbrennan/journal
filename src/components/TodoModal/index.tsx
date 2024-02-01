import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoContext } from '~/context';
import { TodoList } from '..';

export function TodoModal() {
  const location = useLocation();
  const todoContext = useContext(TodoContext);

  return todoContext.isActive && location.pathname !== '/todo' ? (
    <div className='absolute right-0 z-10 flex flex-col p-1 lg:p-2 max-h-[calc(100vh-72px)]'>
      <div className='flex flex-col max-w-xl w-56 sm:w-56 md:w-64 lg:w-80 3xl:w-[36rem] p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg sm:p-6'>
        <div className='flex items-center justify-center w-full'>
          <h2 className='my-2 text-base font-semibold text-gray-900 md:text-xl'>To Do</h2>
        </div>
        <TodoList />
      </div>
    </div>
  ) : (
    <></>
  );
}
