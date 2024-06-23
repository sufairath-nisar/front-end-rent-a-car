import React from 'react'

const Profile = ({ textHeading,text,path }) => {
  return (
    <>
        <div className='grid grid-rows-2  '>
          <div className='place-items-center'>
                <div className="avatar ">
                      <div className="w-40 rounded-full">
                          <img src={path} />
                      </div>
                </div>
          </div>
          
            <div className='pt-2'>
               <h4 className='pb-3 text-red-700 font-medium'>{textHeading}</h4>
               <p>{text}</p>
            </div>
        </div>
           
    </>
  )
}

export default Profile