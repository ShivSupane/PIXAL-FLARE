import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  { icon: "🎥", text: "Professional Cinematography" },
  { icon: "📸", text: "Studio Photography" },
  { icon: "💑", text: "Wedding Photography" },
  { icon: "✨", text: "Expert Video Editing" },
];

const AboutSection = () => {
  return (
    <div className="relative py-24 bg-black">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4')] bg-cover bg-fixed bg-center"
        style={{ opacity: 0.1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            Who We Are
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            PixelFlare is a creative studio dedicated to capturing life's most
            precious moments through the art of photography and cinematography.
            Our passion lies in transforming ordinary moments into extraordinary
            memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <p className="text-white/80">{service.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={() => (window.location.href = "/about")}
            className="bg-[#D4AF37] hover:bg-[#B59020] text-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Learn More About Us
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
