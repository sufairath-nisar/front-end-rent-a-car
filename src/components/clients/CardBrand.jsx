import React from 'react'

const CardBrand = ( {name, path} ) => {
  return (
    <>
         <div className="card bg-base-100 md:w-30 md:h-40 shadow-2xl ">
           
                <figure className="px-6 pt-6  md:h-3/4">                   
                  <img
                    src={`${path}`}
                    alt="image"
                    className="rounded-xl  " />
                </figure>

                <div className="card-body p-4 items-center text-center">
                  <h2 className="card-title">{name}</h2>
                  {/* <div className="card-actions">
                      <button className="btn btn-primary">Buy Now</button>
                  </div> */}
                </div>
         
          </div>
    </>
  )
}

export default CardBrand