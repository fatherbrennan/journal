import type { MouseEventHandler, ReactNode } from 'react';

interface IconButtonProps {
  /**
   * Icon. (SVG).
   */
  icon: ReactNode;

  /**
   * True if button should be of type submit.
   * @defaultValue `false`
   */
  isSubmit?: boolean;

  /**
   * Callback function for the button click event.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      className='select-none bg-zinc-200 hover:bg-zinc-300 rounded-xl py-2 px-2 h-8 w-8 flex justify-center items-center overflow-hidden mx-1'
      type={props.isSubmit ? 'submit' : 'button'}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
