import type { MouseEventHandler, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  /**
   * True when the button should render as a submit type.
   */
  isSubmit?: boolean;

  /**
   * Callback function for the button click event.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ isSubmit, children, onClick }: ButtonProps) {
  return (
    <button className='flex w-full my-2 rounded-lg cursor-pointer bg-primary' type={isSubmit ? 'submit' : 'button'} onClick={onClick}>
      <div className='w-full p-2 text-sm font-normal text-center text-gray-600 border border-transparent border-gray-100 rounded-xl hover:border-gray-300'>{children}</div>
    </button>
  );
}
