import { Children } from 'react';

import type { PropsWithChildren, ReactNode } from 'react';

export function FilterBar({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-row justify-start'>
      {Children.map(children, (child: ReactNode) => (
        <span className='mx-1'>{child}</span>
      ))}
    </div>
  );
}
