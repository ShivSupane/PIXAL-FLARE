import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface PortfolioCarouselProps {
  images?: { src: string; alt: string; title?: string }[];
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({
  images = [
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
  ],
  autoplaySpeed = 3000,
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Duplicate the images array to create an infinite loop effect
  const extendedImages = [...images, ...images];

  // Handle automatic scrolling
  useEffect(() => {
    if (pauseOnHover && isHovered) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Reset to beginning when we reach the end of duplicated array
        if (nextIndex >= images.length) {
          // Smoothly transition back to the beginning
          setTimeout(() => {
            setCurrentIndex(0);
          }, 50);
          return prevIndex;
        }
        return nextIndex;
      });
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplaySpeed, images.length, isPaused, isHovered, pauseOnHover]);

  // Calculate the scroll position based on the current index
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount =
        currentIndex *
        (carouselRef.current.scrollWidth / extendedImages.length);
      controls.start({
        x: -scrollAmount,
        transition: { type: "tween", ease: "easeInOut", duration: 0.8 },
      });
    }
  }, [currentIndex, controls, extendedImages.length]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays for smooth edge transitions */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      {/* Main carousel container */}
      <div className="relative h-[400px] overflow-hidden" ref={carouselRef}>
        <motion.div
          className="flex h-full"
          animate={controls}
          initial={{ x: 0 }}
        >
          {extendedImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 h-full"
              style={{ width: "calc(100% / 3)" }} // Show 3 images at a time
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="m-2 h-full overflow-hidden rounded-lg relative group cursor-pointer">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {image.title && (
                    <h3 className="text-white text-xl font-playfair mb-2">
                      {image.title}
                    </h3>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex % images.length ? "bg-[#D4AF37] w-4" : "bg-white/50 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white z-20 transition-all duration-300"
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
  );
};

export default PortfolioCarousel;
