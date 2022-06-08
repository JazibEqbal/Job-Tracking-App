import React from "react";
import { useStateValue } from "../StateProvider";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import styles from "./PageButtonContainer.module.css";
function PageButtonContainer() {
  const [{ page, numberOfPages }, dispatch] = useStateValue();
  // Creating Array of pages to map them
  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
    //console.log(pages);
  });
  const previousPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numberOfPages;
    }
    changePage(newPage);
    //console.log("previous");
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numberOfPages) {
      newPage = 1;
    }
    changePage(newPage);
    //console.log("next");
  };
  const changePage = (page) => {
    dispatch({
      type: "CHANGE_PAGE",
      payload: { page },
    });
  };

  //
  return (
    <div className={styles.pageButtonContainer}>
      <button className={styles.prevNextButton} onClick={previousPage}>
        <HiChevronDoubleLeft className={styles.previousIcon} />
        prev
      </button>
      <div className={styles.pageNumberArray}>
        {/* MAPPING PAGE NUMBERS FROM ARRAY CREATED */}
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={
                pageNumber === page
                  ? `${styles.btnArray} ${styles.active}`
                  : `${styles.btnArray}`
              }
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className={styles.prevNextButton} onClick={nextPage}>
        next
        <HiChevronDoubleRight className={styles.nextIcon} />
      </button>
    </div>
  );
}

export default PageButtonContainer;
