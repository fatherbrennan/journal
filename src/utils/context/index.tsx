import { randomUUID } from '..';

import type { Dispatch, SetStateAction } from 'react';

import type { PlainObject, StoreContainer } from '../../../types/types';
import type { JournalItem } from '../../context/Journal';
import type { TodoItem, TodoItemValue } from '../../context/Todo';

interface StoreProps<T> {
  /**
   * Function to update stateful store.
   */
  setStore: Dispatch<SetStateAction<StoreContainer<T>>>;

  /**
   * Stateful store.
   */
  store: StoreContainer<T>;
}

export class Store<T> {
  /**
   * Function to update stateful store.
   */
  public setStore: StoreProps<T>['setStore'] = () => {};

  /**
   * Stateful store.
   */
  public store: StoreProps<T>['store'] = [];

  /**
   * Create new item.
   * @param value Complete new value to update.
   */
  public create(value: T): void {
    this.setStore((prevState) => [
      ...prevState,
      { _id: randomUUID(), ...value },
    ]);
  }

  /**
   * Delete entire item by identifier.
   * @param id Unique item identifier.
   */
  public delete(id: StoreContainer<T>[number]['_id']): void {
    this.setStore((prevState) => prevState.filter((item) => item._id !== id));
  }

  /**
   * Update entire item value by identifier.
   * Merges old state with new state.
   * @param id Unique item identifier.
   * @param value Complete new value to update.
   */
  public update(id: StoreContainer<T>[number]['_id'], value: T): void {
    this.setStore((prevState) =>
      prevState.map((item) => (item._id === id ? { ...item, ...value } : item))
    );
  }

  constructor(props?: StoreProps<T>) {
    // Return instance shell
    if (!props) {
      return;
    }

    this.setStore = props.setStore;
    this.store = props.store;
  }
}

interface SearchStoreProps<T> extends StoreProps<T> {
  /**
   * Array of keys to search against corresponding values.
   */
  searchKeys: Array<keyof T>;
}

export class SearchStore<T extends PlainObject<any>> extends Store<T> {
  /**
   * Array of keys to search against corresponding values.
   */
  searchKeys: Array<keyof T> = [];

  /**
   * Get items (keys) that match the provided pattern.
   * @param pattern Pattern to match against.
   * @returns Items that matched `pattern`.
   */
  public search(filter: string) {
    const pattern = new RegExp(filter, 'i');
    return this.store.filter((item) => {
      for (let i = 0; i < this.searchKeys.length; i++) {
        // Return true if there is a match
        if (pattern.test(item[this.searchKeys[i]])) {
          return true;
        }
      }
    });
  }

  constructor(props?: SearchStoreProps<T>) {
    super(props);

    // Return instance shell
    if (!props) {
      return;
    }

    this.searchKeys = props.searchKeys;
  }
}

export class JournalStore extends SearchStore<JournalItem> {
  /**
   * Format date.
   * @param date UTC date object.
   * @returns Formatted date string. E.g. `'Thursday, 20 April 2023'`.
   */
  public format(date: Date): string {
    return date.toLocaleString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  constructor(props?: SearchStoreProps<JournalItem>) {
    super(props);

    // Return instance shell
    if (!props) {
      return;
    }
  }
}

interface TodoStoreProps<T> extends StoreProps<T> {
  /**
   * Stateful boolean to determine visibility.
   */
  isActive: boolean;

  /**
   * Function to update stateful boolean to determine visibility.
   */
  setIsActive: Dispatch<SetStateAction<boolean>>;

  /**
   * Stateful boolean to determine fullscreen mode.
   */
  isFullscreen: boolean;

  /**
   * Function to update stateful boolean to determine fullscreen mode.
   */
  setIsFullscreen: Dispatch<SetStateAction<boolean>>;
}

export class TodoStore extends Store<TodoItem> {
  /**
   * Stateful boolean to determine visibility.
   */
  isActive: TodoStoreProps<TodoItem>['isActive'] = false;

  /**
   * Function to update stateful boolean to determine visibility.
   */
  setIsActive: TodoStoreProps<TodoItem>['setIsActive'] = () => {};

  /**
   * Stateful boolean to determine fullscreen mode.
   */
  isFullscreen: TodoStoreProps<TodoItem>['isActive'] = false;

  /**
   * Function to update stateful boolean to determine fullscreen mode.
   */
  setIsFullscreen: TodoStoreProps<TodoItem>['setIsActive'] = () => {};

  /**
   * Toggle visibility.
   */
  public toggleVisibility = () => {
    this.setIsActive((prevState) => !prevState);
  };

  /**
   * Create new item.
   * @param id Unique item identifier.
   * @param value Complete new value to update.
   */
  public createSubitem(
    id: StoreContainer<TodoItem>[number]['_id'],
    value: TodoItemValue
  ): void {
    this.setStore((prevState) =>
      prevState.map((item) =>
        item._id === id
          ? {
              ...item,
              subItems: [...item.subItems, { _id: randomUUID(), ...value }],
            }
          : item
      )
    );
  }

  /**
   * Delete entire item by identifier.
   * @param id Unique item identifier.
   * @param subKey Unique subitem identifier.
   */
  public deleteSubitem(
    id: StoreContainer<TodoItem>[number]['_id'],
    subKey: StoreContainer<TodoItem>[number]['subItems'][number]['_id']
  ): void {
    this.setStore((prevState) =>
      prevState.map((item) =>
        item._id === id
          ? {
              ...item,
              subItems: item.subItems.filter(
                (subItem) => subItem._id !== subKey
              ),
            }
          : item
      )
    );
  }

  /**
   * Update entire item value by identifier.
   * Merges old state with new state.
   * @param id Unique item identifier.
   * @param subKey Unique subitem identifier.
   * @param value Complete new value to update.
   */
  public updateSubitem(
    id: StoreContainer<TodoItem>[number]['_id'],
    subKey: StoreContainer<TodoItem>[number]['subItems'][number]['_id'],
    value: TodoItemValue
  ): void {
    this.setStore((prevState) =>
      prevState.map((item) =>
        item._id === id
          ? {
              ...item,
              subItems: item.subItems.map((subItem) =>
                subItem._id === subKey ? { ...subItem, ...value } : subItem
              ),
            }
          : item
      )
    );
  }

  constructor(props?: TodoStoreProps<TodoItem>) {
    super(props);

    // Return instance shell
    if (!props) {
      return;
    }

    this.isActive = props.isActive;
    this.setIsActive = props.setIsActive;
    this.isFullscreen = props.isFullscreen;
    this.setIsFullscreen = props.setIsFullscreen;
  }
}
