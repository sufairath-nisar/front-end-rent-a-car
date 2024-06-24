import React from 'react'

const Profile = ({ textHeading,text,path,className,withQuotes }) => {
  return (
    <>
        <div className='grid grid-rows-2  '>
          <div className='place-items-center'>
                <div className="avatar ">
                      <div className="w-40 rounded-full ring-red-700 ring-offset-base-100 ">
                          <img src={path} alt="image" />
                      </div>
                </div>
          </div>
          
            <div className={`pt-2 ${className}`}>
                <h4 className='pb-3 font-medium text-red-700'>{textHeading}</h4>
                {withQuotes && (
                 <div className="rating">
                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-red-700" />
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-red-700"
                   defaultChecked />
                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-red-700" />
                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-red-700" />
                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-red-700" />
               </div>
                )}
                <p className={withQuotes ? 'text-white pb-10' : ''}>{withQuotes ? `"${text}"` : text}</p>
            </div>
        </div>
           
    </>
  )
}

export default Profile