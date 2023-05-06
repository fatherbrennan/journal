import { useId, useState } from 'react';

import { Search } from '../../icons';

interface SearchbarProps {
  /**
   * Callback function to execute on change event.
   * @param data Data from form as key:value.
   * @param event Change event.
   */
  onChange: (data: string, event: any) => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param event Submit event.
   */
  onSubmit: (data: string, event: any) => void;
}

export default function Searchbar(props: SearchbarProps) {
  const [value, setValue] = useState('');
  const id = useId();

  return (
    <div className='flex flex-col items-center mb-6 w-full'>
      <form
        className='flex items-center w-2/3 max-w-xl'
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(value, e);
        }}
      >
        <label htmlFor={id} className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            {<Search />}
          </div>
          <input
            type='text'
            id={id}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 '
            placeholder='Search'
            value={value}
            onChange={(e) => {
              const value = e.target.value.slice();
              setValue(value);
              props.onChange(value, e);
            }}
          />
        </div>
      </form>
    </div>
  );
}
