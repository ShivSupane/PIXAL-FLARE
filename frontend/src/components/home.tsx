import React from "react";
import { motion } from "framer-motion";
import Navbar from "./navigation/Navbar";
import HeroSection from "./hero/HeroSection";
import FadeInSection from "./sections/FadeInSection";
import CtaSection from "./sections/CtaSection";
import PortfolioCarousel from "./sections/PortfolioCarousel";
import TestimonialsCarousel from "./sections/TestimonialsCarousel";
import Footer from "./layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Clock, Award, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-playfair text-white text-center mb-16">
                Why Choose <span className="text-[#D4AF37]">PixelFlare</span>
              </h2>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Camera,
                  title: "Premium Equipment",
                  description:
                    "Professional-grade cameras and lenses for exceptional image quality",
                  delay: 0.1,
                },
                {
                  icon: Clock,
                  title: "Timely Delivery",
                  description:
                    "Quick turnaround times without compromising on quality",
                  delay: 0.2,
                },
                {
                  icon: Award,
                  title: "Award Winning",
                  description:
                    "Recognized excellence in photography and cinematography",
                  delay: 0.3,
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description:
                    "Skilled professionals with years of industry experience",
                  delay: 0.4,
                },
              ].map((feature, index) => (
                <FadeInSection key={index} delay={feature.delay} direction="up">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover:border-[#D4AF37]/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-playfair text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Preview Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-playfair text-white text-center mb-6">
                Our Portfolio
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
                Explore our diverse collection of photography and cinematography
                work
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <PortfolioCarousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80",
                    alt: "Wedding photography",
                    title: "Wedding Photography",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
                    alt: "Portrait photography",
                    title: "Portrait Sessions",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80",
                    alt: "Event photography",
                    title: "Event Coverage",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
                    alt: "Commercial photography",
                    title: "Commercial Photography",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1200&q=80",
                    alt: "Film production",
                    title: "Cinematography",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=1200&q=80",
                    alt: "Landscape photography",
                    title: "Landscape Photography",
                  },
                ]}
                autoplaySpeed={3000}
                pauseOnHover={true}
              />
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="text-center mt-12">
                <Button
                  onClick={() => (window.location.href = "/portfolio")}
                  className="bg-[#D4AF37] hover:bg-[#B59020] text-white px-6 py-2"
                >
                  View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-playfair text-white text-center mb-16">
                What Our Clients Say
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <TestimonialsCarousel
                testimonials={[
                  {
                    quote:
                      "The photos from our wedding day exceeded all expectations. Every moment was captured beautifully with incredible attention to detail.",
                    author: "Sarah & Michael",
                    role: "Wedding Clients",
                    image:
                      "https://images.unsplash.com/photo-1623091410901-00e2d268901f?w=400&q=80",
                  },
                  {
                    quote:
                      "Working with PixelFlare for our product photography transformed our brand's visual identity. The quality and creativity are unmatched.",
                    author: "James Wilson",
                    role: "Marketing Director",
                    image:
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
                  },
                  {
                    quote:
                      "The portrait session was a wonderful experience, and the results are absolutely stunning. I couldn't be happier with how they turned out.",
                    author: "Emily Chen",
                    role: "Portrait Client",
                    image:
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                  },
                  {
                    quote:
                      "The team's professionalism and artistic vision made our corporate event coverage exceptional. They captured the essence perfectly.",
                    author: "Robert Johnson",
                    role: "Event Coordinator",
                    image:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                  },
                  {
                    quote:
                      "The cinematic quality of our brand video exceeded our expectations. PixelFlare has an incredible eye for storytelling through visuals.",
                    author: "Sophia Martinez",
                    role: "Brand Manager",
                    image:
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                  },
                ]}
                autoplaySpeed={5000}
                pauseOnHover={true}
              />
            </FadeInSection>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection backgroundImage="https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=1600&q=80" />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Home;
