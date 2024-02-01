import { useState } from 'react';

import type { ReactNode } from 'react';

interface StatefulIconButtonProps {
  /**
   * Icon. (SVG).
   */
  activeIcon: ReactNode;

  /**
   * Icon. (SVG).
   */
  inactiveIcon: ReactNode;

  /**
   * True if button should be of type submit.
   * @defaultValue `false`
   */
  isSubmit?: boolean;

  /**
   * Button title on active.
   */
  activeTitle?: string;

  /**
   * Button title on inactive.
   */
  inactiveTitle?: string;

  /**
   * Callback function for when button becomes active.
   */
  onActive: () => void;

  /**
   * Callback function for when button becomes inactive.
   */
  onInactive: () => void;
}

export function StatefulIconButton({ activeIcon, inactiveIcon, isSubmit, activeTitle, inactiveTitle, onActive, onInactive }: StatefulIconButtonProps) {
  const [isActive, setIsActive] = useState(false);

  /**
   * Update the button active state, and call relevent callback function.
   */
  const onClick = () => {
    setIsActive((prevState) => !prevState);
    isActive ? onActive() : onInactive();
  };

  return (
    <button
      className='flex items-center justify-center w-8 h-8 px-2 py-2 mx-1 overflow-hidden select-none bg-zinc-200 hover:bg-zinc-300 rounded-xl'
      type={isSubmit ? 'submit' : 'button'}
      title={isActive ? activeTitle : inactiveTitle}
      onClick={onClick}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
}
