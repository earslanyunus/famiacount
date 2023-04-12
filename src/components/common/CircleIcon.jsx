import React from 'react'

export default function CircleIcon({children, ...props}) {
  return (
    <div className=' h-12 w-12 rounded-full flex justify-center items-center bg-primary-50'>
        <div className='w-3/4 h-3/4 rounded-full flex justify-center items-center bg-primary-100'>
            {children}
        </div>
    </div>
  )
}
