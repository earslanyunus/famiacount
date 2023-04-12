import React from 'react'

export default function PlatformsIcon({image}) {
  return (
    <div className='w-16 h-16 '>
        <img src={image} className='w-full h-full object-fill' alt="" />
    </div>
  )
}
