import React, { useState } from 'react';


const Pagination = ({ totalPages }) => {
  const [selectedPage, setSelectedPage] = useState(1)

  const handlePageClick = (page) => {
    setSelectedPage(page)
  }

  return (
    <div className="join">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        const isSelected = page === selectedPage
        return (
          <button
            key={page}
            className={`join-item btn btn-square ${isSelected ? 'bg-red-700 text-white' : 'bg-white text-black'} hover:bg-red-100`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
