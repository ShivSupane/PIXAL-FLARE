import React from "react";
import { motion } from "framer-motion";
import { Camera, Edit, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "High-Quality Cinematography",
    description: "Professional 4K equipment and expert cinematographers",
  },
  {
    icon: Edit,
    title: "Professional Editing",
    description: "Advanced retouching and color grading services",
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "We ensure your complete satisfaction with our work",
  },
  {
    icon: Clock,
    title: "Fast & Reliable",
    description: "Quick turnaround times without compromising quality",
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            Why Choose Us?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Experience excellence in every frame with our premium services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>
              <h3 className="text-xl font-playfair text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
