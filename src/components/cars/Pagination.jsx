// Pagination.jsx
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
  const handlePageClick = (page) => {
    onPageClick(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // Determine which page numbers to display based on the total pages
    let displayedPages = [];
    if (totalPages <= 3) {
      displayedPages = pageNumbers; // Show all pages if total pages <= 3
    } else {
      if (currentPage <= 2) {
        displayedPages = pageNumbers.slice(0, 3); // Show first 3 pages
      } else if (currentPage >= totalPages - 1) {
        displayedPages = pageNumbers.slice(totalPages - 3, totalPages); // Show last 3 pages
      } else {
        displayedPages = pageNumbers.slice(currentPage - 1, currentPage + 2); // Show 3 pages around the current page
      }
    }

    return (
      <>
        {currentPage > 1 && (
          <button
            className="join-item btn btn-square bg-white text-black hover:bg-red-100"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {'<'}
          </button>
        )}
        {displayedPages.map((page) => (
          <button
            key={page}
            className={`join-item btn btn-square ${page === currentPage ? 'bg-red-700 text-white' : 'bg-white text-black'} hover:bg-red-100`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className="join-item btn btn-square bg-white text-black hover:bg-red-100"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {'>'}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="join">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
