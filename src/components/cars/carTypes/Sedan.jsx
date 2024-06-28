import React, { useState, useEffect } from 'react'
import CardCar from '../CardCar'
import Pagination from '../Pagination'

const Sedan = () => {
  const [totalPages, setTotalPages] = useState(4) // Example value

  useEffect(() => {
    // Fetch or calculate the total number of pages.
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      // Example data fetching
      const data = { totalItems: 100, itemsPerPage: 25 }
      const totalPages = Math.ceil(data.totalItems / data.itemsPerPage)
      setTotalPages(totalPages)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='section-carlist px-16 py-16'>
        <h2 className="font-semibold text-red-700 mb-12 text-center">Sedan</h2>
        <div className=''>
          <CardCar />
        </div>
        
        <div className='flex justify-center pt-10 pb-5'>
          <Pagination totalPages={totalPages} />
        </div>
        
      </div>
    </>
  )
}

export default Sedan
