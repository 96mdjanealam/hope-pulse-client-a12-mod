import React from 'react'
import Header from './Header'
import FeaturedSection from './FeaturedSection'
import ContactUs from './ContactUs'
import Testimonials from './Testimonials'
import PartnersSupporters from './PartnersSupporters'
import FAQ from './FAQ'
import Volunteer from './Volunteer'

export default function Home() {
  return (
    <div>
      <Header></Header>
      <FeaturedSection></FeaturedSection>
      <Testimonials></Testimonials>
      <PartnersSupporters></PartnersSupporters>
      <FAQ></FAQ>
      <Volunteer></Volunteer>
      <ContactUs></ContactUs>
    </div>
  )
}
