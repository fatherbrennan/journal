import { v4 } from 'uuid';

import { JournalStore, SearchStore, Store, TodoStore } from './context';
import { fsInitFromFile, fsWriteFile } from './fs';

import type { Field, PlainObject } from '../../types/types';

/**
 * Generate and return a random UUID.
 * @returns A random UUID.
 */
const randomUUID = () => {
  return v4();
};

/**
 * Return a sorted array in descending order.
 * - Dates: Oldest > Recent
 * - Numbers: Smallest > Largest
 * - Letters: A > Z
 * @param items Array to sort.
 * @returns Shallow copy of sorted array.
 */
const sortDescending = (items: Array<any>) => {
  return items.sort((a, b) => (a ? -1 : b ? 1 : 0));
};

/**
 * Return a sorted array in ascending order.
 * - Dates: Recent > Oldest
 * - Numbers: Largest > Smallest
 * - Letters: Z > A
 * @param items Array to sort.
 * @returns Shallow copy of sorted array.
 */
const sortAscending = (items: Array<any>) => {
  return items.sort((a, b) => (b ? -1 : a ? 1 : 0));
};

export class Fields<T extends PlainObject<any>> {
  /**
   * Field options.
   */
  private _fields: Array<Field>;

  /**
   * Return fields. If `value` is omitted, return default `fields`.
   * @param value Object in key:value pair structure where 'key' is `fields[number].key` and 'value' is the new value.
   * @returns New array with updated values.
   */
  get(value?: T | PlainObject<any>): Array<Field> {
    return value
      ? this._fields.map((field) =>
          field.key in value ? { ...field, value: value[field.key] } : field
        )
      : [...this._fields];
  }

  constructor(fields: Array<Field>) {
    this._fields = fields;
  }
}

export {
  fsInitFromFile,
  fsWriteFile,
  JournalStore,
  randomUUID,
  SearchStore,
  sortAscending,
  sortDescending,
  Store,
  TodoStore,
};
