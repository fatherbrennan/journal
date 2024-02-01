interface HeadingProps {
  /**
   * Heading.
   */
  value: string;
}

export function Heading({ value }: HeadingProps) {
  return (
    <div className='flex items-center justify-center w-full'>
      <h1 className='my-6 text-base font-semibold text-gray-900 md:text-2xl'>{value}</h1>
    </div>
  );
}
