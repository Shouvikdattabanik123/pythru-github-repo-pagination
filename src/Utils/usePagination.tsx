import { useState } from 'react';

export default function usePagination(items: any, itemsPerPage: number) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(totalPages || 6);

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  return {
    paginatedItems,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
  };
}
