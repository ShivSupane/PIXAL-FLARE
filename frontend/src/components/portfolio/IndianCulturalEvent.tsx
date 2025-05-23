import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface IndianCulturalEventProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  date?: string;
  location?: string;
}

const IndianCulturalEvent: React.FC<IndianCulturalEventProps> = ({
  title = "Navratri Festival",
  description = "Nine nights of dance, music and celebration honoring the goddess Durga",
  imageSrc = "https://images.unsplash.com/photo-1634478711210-a66caa7c2b98?w=800&q=80",
  date = "October 12-21, 2024",
  location = "Mumbai, Maharashtra",
}) => {
  return (
    <div className="bg-black/50 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-playfair text-white mb-2">{title}</h3>
          <div className="flex items-center text-[#D4AF37] text-sm mb-2">
            <span className="mr-2">📅</span>
            {date}
          </div>
          <div className="flex items-center text-white/70 text-sm">
            <span className="mr-2">📍</span>
            {location}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-white/80 mb-6">{description}</p>
        <div className="flex justify-between items-center">
          <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white transition-all duration-300">
            Learn More
          </Button>
          <div className="text-white/50 text-sm">Annual Event</div>
        </div>
      </div>
    </div>
  );
};

export default IndianCulturalEvent;
