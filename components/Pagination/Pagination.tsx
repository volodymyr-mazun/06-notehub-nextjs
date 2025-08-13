
// ----------КОМПОНЕНТ, НАЛАШТУВАННЯ БІБЛІОТЕКИ REACT PAGINATION----------

import css from './Pagination.module.css';
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination ({ pageCount, onPageChange, currentPage, }: PaginationProps ) {
  return (
    <ReactPaginate
      previousLabel={'← Назад'}
      nextLabel={'Вперед →'}
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={currentPage}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
};