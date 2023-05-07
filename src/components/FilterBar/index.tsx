import { IconButton } from '..';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface FilterBarItem {
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

interface FilterBarProps {
  items: Array<FilterBarItem>;
}

export default function FilterBar(props: FilterBarProps) {
  return (
    <div className='flex'>
      {props.items.map((item, i) => {
        /**
         * Toggle filter state.
         */
        const toggle = () => {
          item.setState((prevState) => !prevState);
        };

        return item.state ? (
          <IconButton key={i} icon={item.activeIcon} onClick={toggle} />
        ) : (
          <IconButton key={i} icon={item.inactiveIcon} onClick={toggle} />
        );
      })}
    </div>
  );
}
