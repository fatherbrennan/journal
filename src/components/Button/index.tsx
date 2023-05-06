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

export default function Button(props: ButtonProps) {
  return (
    <button
      className='flex w-full rounded-lg my-2 cursor-pointer bg-primary'
      type={props.isSubmit ? 'submit' : 'button'}
      onClick={props.onClick}
    >
      <div className='w-full text-sm text-center font-normal text-gray-600 rounded-xl p-2 border border-transparent border-gray-100 hover:border-gray-300'>
        {props.children}
      </div>
    </button>
  );
}
