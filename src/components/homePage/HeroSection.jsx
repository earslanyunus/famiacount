import heroImage from '../../assets/heroImage.jpg'


export default function HeroSection() {
  return (
    <div className='py-16'>
        <div className='flex flex-col container gap-16'>
            {/* HERO TEXT AND BTN AREA */}
            <div className='flex-col '>
                <p className='text-display-md font-semibold text-gray-900 mb-4'>Not spending much on subscriptions is possible.</p>
                <p className='text-text-lg font-normal text-gray-600'>Thanks to Famiacount, paying too much for subscription services is now a thing of the past. Find your partners and make payments easier.</p>
                <button className='btn-primary-lg w-full mt-8' type='button'>Find Your Partners</button>
            </div>
            {/* Hero Image */}
            <img className='w-100' src={heroImage} alt="" />
        </div>
    </div>
  )
}