import { useId, useState } from 'react';

import { IconButton } from '~/components';
import { FormGroup } from '~/components/Form';
import { date } from '~/db/utils';
import { X } from '~/icons';

import type { Dispatch, SetStateAction } from 'react';

import type { FormDataHandler } from '~/components/Form';
import type { IconButtonProps } from '~/components/IconButton';
import type { SQLDate } from '~/db/types';

interface CalendarButtonProps extends IconButtonProps {
  label: string;
  handler: Dispatch<SetStateAction<SQLDate | undefined>>;
}

export function CalendarButton({ icon, label, handler }: CalendarButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const id = useId();

  const formHandler: FormDataHandler = (_key, value) => {
    if (isActive && typeof value === 'string') {
      handler(date(value));
    }
  };

  const showDate = () => {
    setIsActive(true);
  };

  const hideDate = () => {
    handler(undefined);
    setIsActive(false);
  };

  return (
    <div className='flex flex-row'>
      <IconButton icon={icon} onClick={showDate} title={label} />
      {isActive && (
        <>
          <FormGroup key={id} formHandler={formHandler} id={id} label={label} type='date' className='*:bg-transparent' isSrOnly />
          <button type='button' title='Remove date' onClick={hideDate}>
            <X />
          </button>
        </>
      )}
    </div>
  );
}
