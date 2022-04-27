import React from "react";
import styles from "../../src/styles/components/Pagination.module.scss";
import { usePagination, DOTS } from "../hooks/usePagination";

interface Props {
  onPageChange: (arg0: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}
export const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  }
  const onNext = () => {
    if (currentPage === Math.ceil(totalCount / pageSize)) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.paginationBar}>
      <li className={styles.paginationItem} onClick={onPrevious}>
        &laquo;
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={
              pageNumber === currentPage
                ? `${styles.paginationItem} ${styles.selected}`
                : styles.paginationItem
            }
            onClick={
              typeof pageNumber === "number"
                ? () => onPageChange(pageNumber)
                : undefined
            }
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={styles.paginationItem} onClick={onNext}>
        &raquo;
      </li>
    </ul>
  );
};
