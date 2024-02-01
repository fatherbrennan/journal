import type { Field, PlainObject } from '~/../types/types';

export class DateUtils {
  /**
   * Format date.
   * @param date UTC date object.
   * @returns Formatted date string. E.g. `'Thursday, 20 April 2023'`.
   */
  public static format(ts: number): string {
    return new Date(ts).toLocaleString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Return an ISO date.
   * @param ts Timestamp. If omitted, use current date.
   * @returns Date formatted in ISO.
   */
  public static ISO(ts?: number): string {
    return (ts === undefined ? new Date() : new Date(ts)).toISOString().split('T')[0];
  }

  /**
   * Return a timestamp in seconds from an ISO date string.
   * @param iso ISO format date `2000-01-25`.
   * @returns Timestamp in seconds.
   */
  public static ts(iso: string): number {
    return new Date(iso).getTime() / 1000;
  }
}

export class Fields<T extends PlainObject<any>> {
  /**
   * Field options.
   */
  private fields: Field[];

  /**
   * Return fields. If `value` is omitted, return default `fields`.
   * @param value Object in key:value pair structure where 'key' is `fields[number].key` and 'value' is the new value.
   * @returns New array with updated values.
   */
  get(value?: T | PlainObject<any>): Field[] {
    return value ? this.fields.map((field) => (field.key in value ? { ...field, value: value[field.key] } : field)) : [...this.fields];
  }

  constructor(fields: Field[]) {
    this.fields = fields;
  }
}
