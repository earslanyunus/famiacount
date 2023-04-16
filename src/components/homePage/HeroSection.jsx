import heroImage from '../../assets/heroImage.jpg'
import { NavLink } from 'react-router-dom'


export default function HeroSection() {
  return (
    <div className='py-16'>
        <div className='flex flex-col container gap-16 md:flex-row'>
            {/* HERO TEXT AND BTN AREA */}
            <div className='flex flex-col md:h-full md:justify-between'>
                <p className='text-display-md font-semibold text-gray-900 mb-4'>Not spending much on subscriptions is possible.</p>
                <p className='text-text-lg font-normal text-gray-600'>Thanks to Famiacount, paying too much for subscription services is now a thing of the past. Find your partners and make payments easier.</p>
                <NavLink to={'/findpartners'} className='btn-primary-lg w-full text-center md:text-text-xl mt-8'>Find Your Partners</NavLink>
            </div>
            {/* Hero Image */}
            <img className='w-100 md:w-1/2 rounded object-cover' src={heroImage} alt="" />
        </div>
    </div>
  )
}