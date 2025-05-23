import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials = [
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
  ],
  autoplaySpeed = 5000,
  pauseOnHover = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic sliding
  useEffect(() => {
    if ((pauseOnHover && isHovered) || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, autoplaySpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplaySpeed, testimonials.length, isPaused, isHovered, pauseOnHover]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {testimonials[currentIndex].image && (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="text-[#D4AF37] text-4xl font-serif mb-4">❝</div>
                <p className="text-white/90 italic mb-6 text-lg">
                  {testimonials[currentIndex].quote}
                </p>
                <div>
                  <p className="text-white font-medium text-lg">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-[#D4AF37] text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#D4AF37] w-6" : "bg-white/30 hover:bg-white/50"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
