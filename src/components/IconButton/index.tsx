import type { MouseEventHandler, ReactNode } from 'react';

export interface IconButtonProps {
  /**
   * Icon. (SVG).
   */
  icon: ReactNode;

  /**
   * Icon button title.
   */
  title?: string;

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

export function IconButton({ icon, isSubmit, title, onClick }: IconButtonProps) {
  return (
    <button
      className='flex items-center justify-center w-8 h-8 px-2 py-2 mx-1 overflow-hidden select-none bg-zinc-200 hover:bg-zinc-300 rounded-xl'
      type={isSubmit ? 'submit' : 'button'}
      title={title}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
