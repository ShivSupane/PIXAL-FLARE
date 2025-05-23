import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Amit & Priya",
    role: "Wedding Clients",
    text: "PixelFlare made our wedding magical! The edits were stunning and captured every precious moment perfectly.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
  },
  {
    name: "Sarah Johnson",
    role: "Corporate Client",
    text: "The team's professionalism and attention to detail exceeded our expectations. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    name: "Michael Chen",
    role: "Portrait Client",
    text: "Amazing experience! They made me feel comfortable and the results were beyond what I imagined.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
];

const TestimonialsSection = () => {
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
            What Clients Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Read what our satisfied clients have to say about their experience
          </p>
        </motion.div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10 h-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-6"
                    />
                    <p className="text-white/90 text-lg mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="text-[#D4AF37] font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialsSection;
