import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel.tsx";

interface HeroSectionProps {
  studioName?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  studioName = "PixelFlare Studio",
  ctaText = "Book Now",
  onCtaClick,
}) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate("/book");
    }
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[800px] bg-black overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[2]" />

      {/* Image Carousel with enhanced images */}
      <ImageCarousel
        images={[
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80", // Wedding photography
          "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1600&q=80", // Nature photography
          "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=1600&q=80", // Studio photography
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80", // Camera closeup
          "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=1600&q=80", // Landscape photography
          "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=1600&q=80", // Portrait photography
          "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=1600&q=80", // Event photography
        ]}
        interval={5000}
        overlay={true}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair mb-4 tracking-tight leading-tight">
              {studioName}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B59020] mx-auto mt-6 mb-8 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light"
          >
            <span className="text-[#D4AF37]">Capturing</span> Life's Precious
            Moments Through the{" "}
            <span className="text-[#D4AF37]">Art of Photography</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleCtaClick}
              className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white px-10 py-6 text-lg rounded-full font-medium
                shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                transition-all duration-300 transform group animate-pulse-slow"
            >
              <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                {ctaText}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B59020] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]" />
    </div>
  );
};

export default HeroSection;
