interface HeadingProps {
  /**
   * Heading.
   */
  value: string;
}

export default function Heading(props: HeadingProps) {
  return (
    <div className='w-full flex items-center justify-center'>
      <h1 className='my-6 text-base font-semibold text-gray-900 md:text-2xl'>
        {props.value}
      </h1>
    </div>
  );
}
