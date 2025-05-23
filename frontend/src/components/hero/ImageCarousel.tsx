import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface ImageCarouselProps {
  images?: string[];
  interval?: number;
  overlay?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80", // Wedding photography
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1600&q=80", // Nature photography
    "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=1600&q=80", // Studio photography
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80", // Camera closeup
    "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=1600&q=80", // Landscape photography
    "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=1600&q=80", // Portrait photography
    "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=1600&q=80", // Event photography
  ],
  interval = 5000,
  overlay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    Array(images.length).fill(false),
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
      });
    };

    preloadImages();
  }, [images]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }
  }, [isPaused, images.length, interval]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrevious = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    startTimer();
  };

  const handleNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startTimer();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            fetchPriority="high"
          />
          {overlay && <div className="absolute inset-0 bg-black/30" />}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-white" />
            ) : (
              <Pause className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (timerRef.current) clearInterval(timerRef.current);
                startTimer();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"} focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="opacity-0">Placeholder</div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default ImageCarousel;
