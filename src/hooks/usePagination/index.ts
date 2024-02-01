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
  const [count, setCount] = useState(props?.count ?? 0);
  const [activePage, setActivePage] = useState(props?.activePage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState(props?.itemsPerPage ?? 25);
  const [totalPages, setTotalPages] = useState(props?.totalPages ?? 1);

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
    totalPages,
    onPage,
    onPrev,
    onNext,
    handleDbResponse,
  };
}
