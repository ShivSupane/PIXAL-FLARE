import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead Photographer - Mumbai",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Award-winning photographer with 10+ years of experience",
    specialization: "Weddings & Fashion",
    rating: 4.9,
    reviews: 128,
  },
  {
    name: "Michael Chen",
    role: "Senior Cinematographer - Delhi",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    bio: "Specialized in wedding and commercial videography",
    specialization: "Cinematography & Events",
    rating: 4.8,
    reviews: 95,
  },
  {
    name: "Emma Davis",
    role: "Creative Director - Bangalore",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    bio: "Visionary leader with a passion for storytelling",
    specialization: "Commercial & Editorial",
    rating: 4.9,
    reviews: 156,
  },
  {
    name: "Raj Patel",
    role: "Lead Photographer - Delhi",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=raj",
    bio: "Expert in traditional and contemporary wedding photography",
    specialization: "Weddings & Portraits",
    rating: 4.7,
    reviews: 142,
  },
  {
    name: "Priya Sharma",
    role: "Senior Photographer - Mumbai",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    bio: "Fashion and editorial photography specialist",
    specialization: "Fashion & Commercial",
    rating: 4.8,
    reviews: 89,
  },
  {
    name: "Alex Thompson",
    role: "Drone Specialist - Bangalore",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Pioneering aerial photography and cinematography",
    specialization: "Drone & Events",
    rating: 4.9,
    reviews: 73,
  },
];

const testimonials = [
  {
    name: "Jessica & Tom",
    text: "PixelFlare captured our wedding day perfectly. Every moment was beautifully documented.",
    role: "Wedding Clients - Mumbai",
    photographer: "Sarah Johnson",
    rating: 5,
    date: "March 2024",
  },
  {
    name: "Tech Innovations Inc.",
    text: "The commercial photography exceeded our expectations. Professional and creative team.",
    role: "Corporate Client - Bangalore",
    photographer: "Emma Davis",
    rating: 4.8,
    date: "February 2024",
  },
  {
    name: "Maria & Rahul",
    text: "Amazing wedding photoshoot! The team made us feel comfortable and the results were stunning.",
    role: "Wedding Clients - Delhi",
    photographer: "Raj Patel",
    rating: 5,
    date: "January 2024",
  },
  {
    name: "Fashion Forward",
    text: "Exceptional fashion photography that perfectly captured our brand's essence.",
    role: "Fashion Brand - Mumbai",
    photographer: "Priya Sharma",
    rating: 4.9,
    date: "March 2024",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6">
              About PixelFlare
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Founded in 2015, PixelFlare has been at the forefront of visual
              storytelling, combining artistic vision with technical excellence
              to create stunning photography and cinematography.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-playfair text-white text-center mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-[#D4AF37]/50 group-hover:bg-white/10">
                    <div className="p-6 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-xl font-playfair text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-[#D4AF37] mb-2">{member.role}</p>
                      <p className="text-white/70 mb-4">{member.bio}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-center text-white/90">
                          <span className="text-[#D4AF37] mr-2">
                            Specialization:
                          </span>
                          {member.specialization}
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(member.rating) ? "text-[#D4AF37]" : "text-white/20"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-white/70">
                            {member.rating} ({member.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-playfair text-white text-center mb-12">
              Client Testimonials
            </h2>
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="px-4">
                    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10">
                      <div className="flex items-center justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? "text-[#D4AF37]" : "text-white/20"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/90 text-lg mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="space-y-2">
                        <p className="text-[#D4AF37] font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-white/70">{testimonial.role}</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-white/50">
                          <span>Shot by {testimonial.photographer}</span>
                          <span>•</span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
