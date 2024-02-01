import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar, TodoModal } from '~/components';
import { TodoContextProvider } from '~/context';
import { Contacts, Dashboard, Library, Todo } from '~/pages';

export function App() {
  return (
    <BrowserRouter>
      <TodoContextProvider>
        <header className='sticky top-0 z-40 w-full'>
          <Navbar />
        </header>
        <main className='flex-grow w-full overflow-y-auto'>
          <div className='max-w-screen-xl px-6 mx-auto'>
            <TodoModal />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/library' element={<Library />} />
              <Route path='/todo' element={<Todo />} />
            </Routes>
          </div>
        </main>
      </TodoContextProvider>
    </BrowserRouter>
  );
}
