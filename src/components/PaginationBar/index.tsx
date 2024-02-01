import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  activePage: number;
  totalPages: number;
  onPage: (pageNumber: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationBar({ activePage, totalPages, onPage, onPrev, onNext }: PaginationProps) {
  const getScopedPageNumbers = () => {
    const rangeMax = Math.min(totalPages, Math.max(1, activePage - 2) + 4);
    const pageNumbers: number[] = [];
    const rangeMin = Math.max(1, rangeMax - 4);
    for (let i = Math.max(1, rangeMax - 4); i <= rangeMax; i++) {
      pageNumbers.push(i);
    }
    return { pageNumbers, rangeMax, rangeMin };
  };

  const { pageNumbers, rangeMax, rangeMin } = getScopedPageNumbers();

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
