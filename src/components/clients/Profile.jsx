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
               <h4 className='pb-3 text-red-700 font-medium'>{textHeading}</h4>
               <p>{withQuotes ? `"${text}"` : text}</p>
            </div>
        </div>
           
    </>
  )
}

export default Profile