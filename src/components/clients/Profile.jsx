import React from 'react'

const Profile = ({ textHeading,text,path }) => {
  return (
    <>
        <div className='grid grid-rows-2  place-items-center'>
            <div className="avatar">
                <div className="w-40 rounded-full">
                    <img src={path} />
                </div>
            </div>

            <div>
               {/* <h4 className='pb-5'>{textHeading}</h4> */}
               <div className="diff aspect-[16/9]">
                     <div className="diff-item-1">
                        <div className="bg-red-700 text-white text-lg font-black grid place-content-center">{textHeading}</div>
                     </div>
                    <div className="diff-item-2">
                         <div className="bg-base-200  font-black grid place-content-center">{text}</div>
                    </div>
                 <div className="diff-resizer"></div>
                </div>
               {/* <p>{text}</p> */}
            </div>
        </div>
           
    </>
  )
}

export default Profile