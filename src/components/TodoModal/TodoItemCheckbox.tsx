import { CheckLg } from 'react-bootstrap-icons';

import { Theme } from '~/db/utils/theme';

import type { MouseEventHandler } from 'react';
import type { ThemeTypeValue } from '~/db/utils/theme';

interface TodoItemCheckboxProps {
  /**
   * True when the item is checked.
   */
  isCheckActive?: boolean;

  /**
   * True when the item is checked.
   */
  isChecked?: boolean;

  /**
   * When true, use default (arrow) cursor.
   */
  isDisabled?: boolean;

  /**
   * Checkbox theme.
   */
  theme?: ThemeTypeValue;

  /**
   * Callback function for the button click event.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function TodoItemCheckbox({ theme, onClick, ...props }: TodoItemCheckboxProps) {
  const isCheckActive = !!props.isCheckActive;
  const isChecked = !!props.isChecked;
  const isDisabled = !!props.isDisabled;
  const className = 'flex items-center justify-center w-5 h-5 rounded-full';
  const statusTheme = (theme ?? Theme.default).checkbox[isCheckActive ? 'active' : isChecked ? 'checked' : 'default'];

  return (
    <div className={`flex items-center justify-center mx-1 border rounded-full select-none min-h-7 max-h-7 min-w-7 max-w-7 ${statusTheme.border}`}>
      {!isDisabled ? (
        <button className={`${className} ${statusTheme.backgroundColor}`} type='button' title={`Mark Item as ${isChecked ? 'Inc' : 'C'}omplete!`} onClick={onClick}>
          <CheckLg className={statusTheme.check} />
        </button>
      ) : (
        <span className={className}></span>
      )}
    </div>
  );
}
