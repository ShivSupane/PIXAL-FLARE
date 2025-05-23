import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  duration: string;
  testimonial: string;
  popular: boolean;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  image,
  features,
  price,
  duration,
  testimonial,
  popular,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm border border-white/10 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <Badge className="absolute top-4 right-4 z-10 bg-[#D4AF37] text-white">
          Most Popular
        </Badge>
      )}

      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
      </div>

      <div className="p-8 relative">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mr-4 text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-playfair text-white">{title}</h3>
            <div className="flex items-center text-white/60 text-sm">
              <span className="mr-2">⏱</span>
              {duration}
            </div>
          </div>
        </div>

        <p className="text-white/70 mb-6">{description}</p>

        <motion.div
          className="space-y-3 mb-6"
          initial={{ height: isHovered ? "auto" : "0" }}
          animate={{
            height: isHovered ? "auto" : "0",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {features.map((feature, i) => (
            <div key={i} className="flex items-center text-white/80">
              <span className="text-[#D4AF37] mr-2">✓</span>
              {feature}
            </div>
          ))}
        </motion.div>

        <div className="text-2xl font-playfair text-white mb-4">{price}</div>

        <div className="text-sm italic text-white/60 mb-6 border-l-2 border-[#D4AF37]/50 pl-3">
          "{testimonial}"
        </div>

        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-[#D4AF37] hover:bg-[#B59020] text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => (window.location.href = "/pricing")}
          >
            View Packages
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/20 hover:border-[#D4AF37] hover:bg-white/5 text-white transition-all duration-300"
            onClick={() => (window.location.href = "/contact")}
          >
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
