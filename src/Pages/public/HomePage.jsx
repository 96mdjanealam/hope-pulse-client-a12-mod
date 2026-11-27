import React from "react";
import HeroSection from "../../components/home/HeroSection";
import FeaturedSection from "../../components/home/FeaturedSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import PartnersSection from "../../components/home/PartnersSection";
import FaqSection from "../../components/home/FaqSection";
import VolunteerSection from "../../components/home/VolunteerSection";
import ContactSection from "../../components/home/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TestimonialsSection />
      <PartnersSection />
      <FaqSection />
      <VolunteerSection />
      <ContactSection />
    </div>
  );
}
