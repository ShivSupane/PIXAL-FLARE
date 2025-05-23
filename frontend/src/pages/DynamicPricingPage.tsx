import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import DynamicPricingSection from "@/components/pricing/DynamicPricingSection";
import Footer from "@/components/layout/Footer";

const DynamicPricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <DynamicPricingSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DynamicPricingPage;
