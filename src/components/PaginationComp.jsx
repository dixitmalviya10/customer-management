import React from "react";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const PaginationComp = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      pageClassName={"list-item"}
      previousClassName={"prev-btn"}
      nextClassName={"next-btn"}
      className={"container"}
      breakClassName={"list-item"}
      pageLinkClassName={"page-link-item"}
      activeLinkClassName={"active-page"}
      previousLinkClassName={"prev-btn-link"}
      nextLinkClassName={"next-btn-link"}
    />
  );
};

export default PaginationComp;
