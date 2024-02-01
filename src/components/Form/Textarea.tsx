import { useState } from 'react';

import type { ChangeEvent } from 'react';

import type { FormGroupSharedProps } from './FormGroup';

interface TextAreaProps extends FormGroupSharedProps {}

export function TextArea({ formHandler, id, label, autoFocus, required, value }: TextAreaProps) {
  const [text, setText] = useState(value?.toString() ?? '');
  const dict = [
    { value: 'Patrick', pattern: /\bpatrick\b/g },
    { value: 'filter', pattern: /\bphilter\b/g },
    { value: 'am', pattern: /(?<=\d)\sAM\b/g },
    { value: 'pm', pattern: /(?<=\d)\sPM\b/g },
  ];

  const updateTextAgainstDictionary = (text: string): string => {
    for (let i = 0; i < dict.length; i++) {
      const { pattern, value } = dict[i];
      text.replace(pattern, value);
    }
    return text;
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = updateTextAgainstDictionary(event.target.value);
    setText(newValue);
    formHandler(id, newValue);
  };

  return (
    <textarea
      id={id}
      title={label}
      className='w-full p-2 text-sm font-normal text-gray-500 whitespace-pre-line bg-transparent border border-transparent border-gray-100 rounded-xl hover:border-gray-300'
      value={text}
      rows={6}
      autoFocus={autoFocus}
      required={required}
      onChange={onChange}
    ></textarea>
  );
}
