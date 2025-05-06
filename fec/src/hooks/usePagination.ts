import { useCallback, useEffect, useState } from "react";

const usePagination = <T>(items: T[], productsPerPage: number = 12) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<T[]>([]);
  const [pages, setPages] = useState<number[]>([]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) {
        return;
      }

      setCurrentPage(page);
    },
    [totalPages],
  );

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / productsPerPage));
  }, [items, productsPerPage]);

  useEffect(() => {
    setPaginatedProducts(items.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
  }, [items, currentPage, productsPerPage]);

  useEffect(() => {
    if (totalPages <= 5) {
      setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      return;
    }

    setPages([1]);

    // Dấu ba dấu "..." nếu trang hiện tại cách trang đầu tiên hơn 2
    const left = Math.max(2, currentPage - 2);
    if (left > 2) {
      setPages((prev) => [...prev, -1]);
    }

    const right = Math.min(totalPages - 1, currentPage + 2);
    for (let i = left; i <= right; i++) {
      setPages((prev) => [...prev, i]);
    }
    if (right < totalPages - 1) setPages((prev) => [...prev, -1]);

    setPages((prev) => [...prev, totalPages]);
  }, [items, currentPage, totalPages]);

  return { pages, currentPage, paginatedProducts, handlePageChange, setPaginatedProducts };
};

export default usePagination;
