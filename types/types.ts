import type {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  Context as ReactContext,
} from 'react';

/**
 * Plain object wrapper.
 */
export type PlainObject<T> = { [key: string]: T };

/**
 * Context.
 */
export type Context<T> = ReactContext<T>;

/**
 * Context provider.
 */
export type ContextProvider = FC<PropsWithChildren>;

interface UniqueIdentifier {
  /**
   * Item unique identifier.
   */
  _id: string;
}

/**
 * Array of items.
 */
export interface StoreContainer<T> extends Array<T & UniqueIdentifier> {}

export type HTMLElementClassName = HTMLAttributes<HTMLElement>['className'];

type FormFieldType =
  | 'boolean'
  | 'date'
  | 'integer'
  | 'note'
  | 'number'
  | 'string';

export interface FormField {
  /**
   * If field is auto focused.
   */
  autoFocus?: boolean;

  /**
   * Form input class.
   */
  className?: HTMLElementClassName;

  /**
   * If true, only a screen reader label will be used.
   */
  isSrOnly?: boolean;

  /**
   * Unique field id.
   */
  key: string;

  /**
   * Field label.
   */
  label: string;

  /**
   * If the field requires input.
   * Field is invalid when field is empty.
   * @defaultValue `false`
   */
  required?: boolean;

  /**
   * Field input type.
   * @defaultValue `'string'`
   */
  type?: FormFieldType;

  /**
   * Default field value.
   * Must be valid input for defined field `type`.
   * @defaultValue `''`
   */
  value?: string | boolean;
}

export interface Field extends FormField {
  /**
   * Show field in card component.
   * @defaultValue `true`
   */
  hasCard?: boolean;

  /**
   * Show field in editable card component.
   * @defaultValue `true`
   */
  hasForm?: boolean;

  /**
   * If false, card field will be given a label.
   * @defaultValue `true`
   */
  cardIsSrOnly?: boolean;
}
