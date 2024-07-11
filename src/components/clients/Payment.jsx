import React from 'react'

const Payment = () => {
  return (
    <>
      <div className='md:h-80 pt-32'>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pick a file</span>
              <span className="label-text-alt">Alt label</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="label">
              <span className="label-text-alt">Alt label</span>
              <span className="label-text-alt">Alt label</span>
            </div>
          </label>
      </div>
    </>
  )
}

export default Payment
