import React from 'react';
import Hero from '../components/Home/Hero';
import LogoCarousel from '../components/Home/LogoCarousel';
import PricingSection from '../components/Home/Pricing';
import Testimonials from '../components/Home/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogoCarousel />
      <PricingSection />
      <Testimonials />
    </div>
  );
}