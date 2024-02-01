interface ItemCounterProps {
  /**
   * Number of items.
   */
  itemCount: number;
}

export function ItemCounter({ itemCount }: ItemCounterProps) {
  return (
    <div className='flex items-end justify-end w-full text-right'>
      <span className='text-xs text-gray-500'>{itemCount} items</span>
    </div>
  );
}
