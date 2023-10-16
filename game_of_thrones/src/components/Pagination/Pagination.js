// Pagination.js
import React from "react";
import styles from "../Pagination/Pagination.module.css";

export default function Pagination({ currentPage, onPageChange }) {
  function handleClickOnNext() {
    // Call onPageChange with the new page number
    onPageChange(currentPage + 1);
  }

  function handleClickOnPrevious() {
    // Call onPageChange with the new page number
    onPageChange(currentPage - 1);
  }

  return (
    <div className={styles.paginationContainer}>
      {currentPage !== 1 && (
        <span onClick={handleClickOnPrevious} className={styles.pagination}>
          {"<< "} Previous {"  "}
        </span>
      )}
      <span className={styles.currentPage}>{currentPage}</span>
      <span onClick={handleClickOnNext} className={styles.pagination}>
        {"  "}
        Next{" >>"}
      </span>
    </div>
  );
}
