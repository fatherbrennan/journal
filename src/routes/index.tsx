import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar, TodoModal } from '../components';
import {
  ContactContextProvider,
  JournalContextProvider,
  LibraryContextProvider,
  TodoContextProvider,
} from '../context';
import { Contacts, Dashboard, Library, Todo } from '../pages';

export default function App() {
  return (
    <BrowserRouter>
      <TodoContextProvider>
        <header className='sticky top-0 z-40 w-full'>
          <Navbar />
        </header>
        <main className='w-full max-w-screen-xl mx-auto px-6'>
          <TodoModal />
          <JournalContextProvider>
            <ContactContextProvider>
              <LibraryContextProvider>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/contacts' element={<Contacts />} />
                  <Route path='/library' element={<Library />} />
                  <Route path='/todo' element={<Todo />} />
                </Routes>
              </LibraryContextProvider>
            </ContactContextProvider>
          </JournalContextProvider>
        </main>
      </TodoContextProvider>
    </BrowserRouter>
  );
}
