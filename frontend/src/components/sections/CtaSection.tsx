import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Ready to Capture Your Special Moments?",
  description = "Book a session with our professional photographers and create memories that last a lifetime.",
  buttonText = "Book Your Session Now",
  buttonLink = "/book",
  backgroundImage,
}) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxControls = useAnimation();

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Check if section is in view
        if (
          scrollY + viewportHeight > sectionTop &&
          scrollY < sectionTop + sectionHeight
        ) {
          // Calculate parallax effect
          const yOffset = (scrollY - sectionTop) * 0.1;
          parallaxControls.start({ y: yOffset });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxControls]);

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <FadeInSection>
      <section
        className="py-24 bg-black relative overflow-hidden"
        ref={sectionRef}
      >
        {backgroundImage && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={backgroundStyle}
            animate={parallaxControls}
          />
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-16 text-center max-w-4xl mx-auto shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            {/* Subtle glow effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-[100px]" />

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-white/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate(buttonLink)}
                className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white px-10 py-4 rounded-full text-lg font-medium
                  shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]
                  transition-all duration-300 transform group"
              >
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                  {buttonText}
                </span>
                {/* Glassmorphism effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Subtle light glow on hover */}
                <span className="absolute inset-0 w-full h-full bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default CtaSection;
