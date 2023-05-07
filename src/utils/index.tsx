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
 * Sorts a shallow copy of an array in ascending order.
 * - 1-9
 * - A-Z
 * - a-z
 * @param items Array to sort.
 * @param key Key to sort by.
 * @returns Reference to the passed array.
 */
function sortAscending<T = any>(items: Array<T>, key: keyof T) {
  return [...items].sort((a, b) =>
    a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
  );
}

/**
 * Sorts a shallow copy of an array in descending order.
 * - 9-1
 * - z-a
 * - Z-A
 * @param items Array to sort.
 * @param key Key to sort by.
 * @returns Reference to the passed array.
 */
function sortDescending<T = any>(items: Array<T>, key: keyof T) {
  return [...items].sort((a, b) =>
    a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
  );
}

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
