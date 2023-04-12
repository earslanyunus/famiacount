import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import HeroSection from '../components/homePage/HeroSection'
import FeaturesSection from '../components/homePage/FeaturesSection'
import SupportedSection from '../components/homePage/SupportedSection'
import CommentSection from '../components/homePage/CommentSection'
import ContactSection from '../components/homePage/ContactSection'


function Homepage() {

  return (
    <>
       <Navbar/>
       <HeroSection/>
       <FeaturesSection/>
       <SupportedSection/>
       <CommentSection/>
       <ContactSection/>
       <Footer/>
    </>
  )
}

export default Homepage
