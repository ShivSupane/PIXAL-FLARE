import React from "react";
import Navbar from "../navigation/Navbar";
import PricingSelection from "./PricingSelection";
import FadeInSection from "../sections/FadeInSection";
import CtaSection from "../sections/CtaSection";
import Footer from "../layout/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                Pricing Plans
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Choose the perfect package for your photography and
                cinematography needs
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <PricingSelection />
          </FadeInSection>
        </div>
      </div>
      <CtaSection
        title="Find the Perfect Package for Your Needs"
        description="Not sure which package is right for you? Contact us for a personalized consultation."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <Footer />
    </div>
  );
};

export default PricingPage;
