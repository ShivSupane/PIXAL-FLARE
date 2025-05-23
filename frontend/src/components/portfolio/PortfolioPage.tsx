import React from "react";
import Navbar from "../navigation/Navbar";
import PortfolioGrid from "./PortfolioGrid";
import FadeInSection from "../sections/FadeInSection";
import CtaSection from "../sections/CtaSection";
import Footer from "../layout/Footer";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                Our Portfolio
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Explore our diverse collection of photography and cinematography
                work
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <PortfolioGrid />
          </FadeInSection>
        </div>
      </div>
      <CtaSection
        title="Love What You See?"
        description="Let us create stunning visuals for your next project or special occasion."
        buttonText="Book a Session"
        backgroundImage="https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1600&q=80"
      />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
