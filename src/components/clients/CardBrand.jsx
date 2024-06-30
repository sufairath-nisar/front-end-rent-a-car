import React from 'react'

const CardBrand = ( {name, path} ) => {
  return (
    <>
         <div className="card bg-base-100 md:w-30 w-28 h-30 md:h-32 shadow-2xl ">
           
                <figure className="md:px-6 md:pt-6 p-3 md:h-3/4 h-24">                   
                  <img
                    src={`${path}`}
                    alt="image"
                    className="md:rounded-xl rounded-sm " />
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