import { useMemo, useState } from 'react';

interface DbResponse<T> {
  result: T;
  count: number;
}

interface UsePaginationProps<T> {
  /**
   * @default 1
   */
  activePage?: number;

  /**
   * @default 0
   */
  count: number;

  /**
   * @default []
   */
  items: T;

  /**
   * @default 50
   */
  itemsPerPage?: number;

  /**
   * @default 1
   */
  totalPages?: number;
}

export function usePagination<T>(props?: UsePaginationProps<T>) {
  const [items, setItems] = useState(props?.items ?? []);
  const [count, setCount] = useState<number>(props?.count ?? 0);
  const [activePage, setActivePage] = useState<number>(props?.activePage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(props?.itemsPerPage ?? 25);
  const [totalPages, setTotalPages] = useState<number>(props?.totalPages ?? 1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [rangeMax, setRangeMax] = useState<number>(0);
  const [rangeMin, setRangeMin] = useState<number>(0);
  const displayedPageCount = 4;

  useMemo(() => {
    const newRangeMax = Math.min(totalPages, Math.max(1, activePage - 2) + displayedPageCount);
    setRangeMax(Math.min(totalPages, Math.max(1, activePage - 2) + displayedPageCount));
    setRangeMin(Math.max(1, newRangeMax - displayedPageCount));

    // Never let the active page be greater than the maximum number of pages
    if (activePage > newRangeMax && activePage !== 1) {
      setActivePage(newRangeMax);
    }

    const tempPageNumbers: number[] = [];
    for (let i = Math.max(1, newRangeMax - displayedPageCount); i <= newRangeMax; i++) {
      tempPageNumbers.push(i);
    }
    setPageNumbers(tempPageNumbers);
  }, [totalPages, activePage]);

  useMemo(() => {
    setTotalPages(Math.ceil(count / itemsPerPage));
  }, [count, itemsPerPage]);

  const onPage = (pageNumber: number) => {
    setActivePage(() => pageNumber);
  };

  const onPrev = () => {
    setActivePage((prev) => prev - 1);
  };

  const onNext = () => {
    setActivePage((prev) => prev + 1);
  };

  const handleDbResponse = (response: DbResponse<T>) => {
    setCount(response.count ?? 0);
    setItems(response.result ?? []);
  };

  return {
    activePage,
    count,
    items,
    itemsPerPage,
    pageNumbers,
    rangeMax,
    rangeMin,
    totalPages,
    onPage,
    onPrev,
    onNext,
    handleDbResponse,
  };
}
