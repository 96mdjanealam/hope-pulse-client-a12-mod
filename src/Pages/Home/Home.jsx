import React from 'react'
import Header from './Header'
import FeaturedSection from './FeaturedSection'
import ContactUs from './ContactUs'
import Testimonials from './Testimonials'
import PartnersSupporters from './PartnersSupporters'

export default function Home() {
  return (
    <div>
      <Header></Header>
      <FeaturedSection></FeaturedSection>
      <Testimonials></Testimonials>
      <PartnersSupporters></PartnersSupporters>
      <ContactUs></ContactUs>
    </div>
  )
}
