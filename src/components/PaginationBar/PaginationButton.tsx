import type { MouseEventHandler } from 'react';

interface PaginationButtonProps {
  value: number | string;
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function PaginationButton(props: PaginationButtonProps) {
  const { isActive, value, onClick } = props;
  const className = 'flex items-center justify-center w-8 h-8 px-2 py-2 mx-1 overflow-hidden select-none hover:bg-zinc-200 rounded-xl';

  return (
    <button className={isActive ? className : `${className}`} type='button' onClick={onClick}>
      {value}
    </button>
  );
}
