import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  activePage: number;
  rangeMax: number;
  rangeMin: number;
  pageNumbers: number[];
  onPage: (pageNumber: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationBar({ activePage, pageNumbers, rangeMin, rangeMax, onPage, onPrev, onNext }: PaginationProps) {
  return (
    <div className='flex flex-row py-4'>
      {activePage > rangeMin && <PaginationButton value='<' onClick={onPrev} />}
      {pageNumbers.map((pageNumber, i) => (
        <PaginationButton key={i} value={pageNumber} isActive={pageNumber === activePage} onClick={() => onPage(pageNumber)} />
      ))}
      {activePage < rangeMax && <PaginationButton value='>' onClick={onNext} />}
    </div>
  );
}
