interface ItemCounterProps {
  /**
   * Number of items.
   */
  itemCount: number;
}

export default function ItemCounter(props: ItemCounterProps) {
  return (
    <div className='text-right w-full flex justify-end items-end'>
      <span className='text-gray-500 text-xs'>{props.itemCount} items</span>
    </div>
  );
}
