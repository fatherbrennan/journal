import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IconButton } from '~/components';
import { TodoContext } from '~/context';
import { Checklist, Journal } from '~/icons';

type Links = {
  /**
   * Link label.
   */
  label: string;

  /**
   * Link route.
   */
  value: string;
}[];

export function Navbar() {
  const todoContext = useContext(TodoContext);
  const location = useLocation();
  const links: Links = [
    { label: 'Contacts', value: '/contacts' },
    { label: 'Library', value: '/library' },
    { label: 'To Do', value: '/todo' },
  ];

  return (
    <div className='flex-none transition-colors duration-500 backdrop-blur lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60'>
      <div className='mx-auto max-w-7x1'>
        <div className='py-4 mx-4 border-b border-slate-900/10 md:px-8 md:border-0 md:mx-0'>
          <div className='relative flex items-center'>
            <Link className='mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto h-8 flex items-center' to='/'>
              <label className='sr-only'>Journal Dashboard</label>
              <Journal />
            </Link>
            <div className='relative items-center hidden ml-auto md:flex'>
              <nav className='text-sm font-semibold leading-6 text-slate-700'>
                <ul className='flex items-center space-x-8'>
                  {links.map((link) => (
                    <li key={link.value}>
                      <Link className='select-none hover:text-teal-400' to={link.value}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {/* To Do Modal */}
                  <li>
                    {/* Hide the To Do icon when on the To Do page. */}
                    {location.pathname !== '/todo' && (
                      <IconButton icon={<Checklist className={todoContext.isActive ? 'fill-teal-400' : ''} />} onClick={todoContext.toggleVisibility} />
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
