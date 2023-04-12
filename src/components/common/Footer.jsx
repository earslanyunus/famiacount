import React from 'react'
import Logo from './Logo'

export default function Footer() {
  return (
    <div className='container py-16 flex flex-col items-center'>
        <Logo/>
        <p className='text-text-md font-normal text-gray-500 mt-12'>© 2022 Famiacount. All rights reserved.</p>
        
    </div>
  )
}
