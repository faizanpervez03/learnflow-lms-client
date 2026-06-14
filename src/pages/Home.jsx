import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/HomePageComponents/HeroSection'
import TrustedClientSection from '../components/HomePageComponents/TrustedClientSection'
import FeaturesSection from '../components/HomePageComponents/FeatureSection'
import TestimonialSection from '../components/HomePageComponents/TestimonialSection'
import PricingSection from '../components/HomePageComponents/PricingSection'

const Home = () => {
  return (
    <>
    <HeroSection />
    <TrustedClientSection />
    <FeaturesSection />
    <TestimonialSection />
    <PricingSection />
    </>
  )
}

export default Home
