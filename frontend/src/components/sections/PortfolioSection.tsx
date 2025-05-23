import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PortfolioGrid from "../portfolio/PortfolioGrid";

const PortfolioSection = () => {
  return (
    <div className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            Featured Work
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Explore our portfolio of stunning photography and cinematography
            work
          </p>
        </motion.div>

        <div className="mb-16">
          <PortfolioGrid />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => (window.location.href = "/portfolio")}
            className="bg-[#D4AF37] hover:bg-[#B59020] text-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
          >
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioSection;
