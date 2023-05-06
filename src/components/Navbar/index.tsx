import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IconButton } from '..';
import { TodoContext } from '../../context';
import { Checklist, Journal } from '../../icons';

type Links = Array<{
  /**
   * Link label.
   */
  label: string;

  /**
   * Link route.
   */
  value: string;
}>;

export default function Navbar() {
  const todo = useContext(TodoContext);
  const location = useLocation();
  const links: Links = [
    { label: 'Contacts', value: '/contacts' },
    { label: 'Library', value: '/library' },
    { label: 'Todo', value: '/todo' },
  ];

  return (
    <div className='backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60'>
      <div className='max-w-7x1 mx-auto'>
        <div className='py-4 border-b border-slate-900/10 md:px-8 md:border-0 mx-4 md:mx-0'>
          <div className='relative flex items-center'>
            <Link
              className='mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto'
              to='/'
            >
              <span className='sr-only'>Journal Dashboard</span>
              <Journal />
            </Link>
            <div className='relative hidden md:flex items-center ml-auto'>
              <nav className='text-sm leading-6 font-semibold text-slate-700'>
                <ul className='flex space-x-8 items-center'>
                  {links.map((link) => (
                    <li key={link.value}>
                      <Link
                        className={'hover:text-teal-400 select-none'}
                        to={link.value}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {/* Todo Modal */}
                  <li>
                    {/* Hide the Todo icon when on the Todo page. */}
                    {location.pathname !== '/todo' && (
                      <IconButton
                        icon={
                          <Checklist
                            className={todo.isActive ? 'fill-teal-400' : ''}
                          />
                        }
                        onClick={todo.toggleVisibility}
                      />
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
