import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Category =
  | "all"
  | "weddings"
  | "fashion"
  | "cultural"
  | "festivals"
  | "landmarks"
  | "portrait";

interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  type: "image" | "video";
  thumbnail: string;
  videoUrl?: string;
  description: string;
  date: string;
}

const portfolioItems: PortfolioItem[] = [
  // Wedding Category
  {
    id: "1",
    title: "Royal Indian Wedding",
    category: "weddings",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80",
    description:
      "Opulent Indian wedding ceremony with traditional rituals and decor",
    date: "2024-03-15",
  },
  {
    id: "2",
    title: "Wedding Preparations",
    category: "weddings",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1583318432730-a19c89692612?w=800&q=80",
    description: "Beautifully embroidered traditional Indian wedding attire",
    date: "2024-02-28",
  },
  {
    id: "3",
    title: "Traditional Ceremony",
    category: "weddings",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1517457210348-703079e57d4b?w=800&q=80",
    description:
      "Traditional Indian wedding with elaborate decorations and rituals",
    date: "2024-01-20",
  },

  // Fashion Category
  {
    id: "4",
    title: "Silk Saree Artistry",
    category: "fashion",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
    description: "Intricately designed traditional silk saree with gold work",
    date: "2024-02-20",
  },
  {
    id: "5",
    title: "Traditional Pagdi",
    category: "fashion",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1491852807958-4326560208e9?w=800&q=80",
    description: "Man wearing a traditional Rajasthani turban with pride",
    date: "2024-03-05",
  },
  {
    id: "6",
    title: "Contemporary Fashion",
    category: "fashion",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
    description: "Elegant silk saree with intricate embroidery and designs",
    date: "2024-02-10",
  },

  // Cultural Category
  {
    id: "7",
    title: "Classical Dance Performance",
    category: "cultural",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    description:
      "Graceful dancer performing traditional Indian classical dance",
    date: "2024-01-10",
  },
  {
    id: "8",
    title: "Kathakali Expression",
    category: "cultural",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=800&q=80",
    description:
      "Elaborate makeup and expressions of Kathakali dance form from Kerala",
    date: "2024-02-15",
  },
  {
    id: "9",
    title: "Spice Market",
    category: "cultural",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80",
    videoUrl: "https://example.com/video.mp4",
    description: "Colorful array of spices in a traditional Indian market",
    date: "2024-03-12",
  },

  // Festivals Category
  {
    id: "10",
    title: "Diwali Festival of Lights",
    category: "festivals",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1635168840837-56c7b8e0d3c0?w=800&q=80",
    description:
      "Beautifully arranged diyas illuminating the night during Diwali celebrations",
    date: "2024-03-10",
  },
  {
    id: "11",
    title: "Holi Celebrations",
    category: "festivals",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?w=800&q=80",
    description:
      "Vibrant colors filling the air during the joyous Holi festival",
    date: "2024-01-25",
  },
  {
    id: "12",
    title: "Festival Procession",
    category: "festivals",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1592466575533-5dbf3a8a93c4?w=800&q=80",
    videoUrl: "https://example.com/conference.mp4",
    description:
      "Joyful celebration of the Holi festival with colorful powders",
    date: "2024-02-05",
  },

  // Landmarks Category
  {
    id: "13",
    title: "Majestic Taj Mahal",
    category: "landmarks",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    videoUrl: "https://example.com/drone.mp4",
    description: "Iconic Taj Mahal reflecting in water during perfect light",
    date: "2024-03-01",
  },
  {
    id: "14",
    title: "Amber Fort",
    category: "landmarks",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    description: "Stunning architecture of the historic Amber Fort in Jaipur",
    date: "2024-02-18",
  },
  {
    id: "15",
    title: "Golden Temple",
    category: "landmarks",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1518792528501-352f829886dc?w=800&q=80",
    description: "Serene Golden Temple in Amritsar glowing at dusk",
    date: "2024-03-20",
  },

  // Portrait Category
  {
    id: "16",
    title: "Traditional Portrait",
    category: "portrait",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1583318432730-a19c89692612?w=800&q=80",
    videoUrl: "https://example.com/film.mp4",
    description: "Classical Bharatanatyam dancer in traditional costume",
    date: "2024-02-15",
  },
  {
    id: "17",
    title: "Cultural Portrait",
    category: "portrait",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    description:
      "Elegant Kathak dancer showcasing intricate footwork and expressions",
    date: "2024-01-30",
  },
  {
    id: "18",
    title: "Modern Indian Portrait",
    category: "portrait",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1594819047050-99defca82545?w=800&q=80",
    description:
      "Modern portrait showcasing traditional Indian elements with contemporary style",
    date: "2024-03-08",
  },
];

const categories: { value: Category; label: string; icon: string }[] = [
  { value: "all", label: "All Work", icon: "🎨" },
  { value: "weddings", label: "Weddings", icon: "💍" },
  { value: "fashion", label: "Fashion", icon: "👗" },
  { value: "cultural", label: "Cultural", icon: "🎭" },
  { value: "festivals", label: "Festivals", icon: "🪔" },
  { value: "landmarks", label: "Landmarks", icon: "🏛️" },
  { value: "portrait", label: "Portraits", icon: "📸" },
];

const PortfolioGrid = () => {
  // Add animation styles
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease-out;
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  );

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <Button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.value ? "bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        <AnimatePresence mode="wait">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-lg">
                    <motion.img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      fetchPriority={index < 6 ? "high" : "auto"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-sm">
                      <h3 className="text-white text-xl font-playfair mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {item.description}
                      </p>
                      {item.type === "video" && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37]/90 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-110">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black/95 border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.7)]">
                  {item.type === "image" ? (
                    <img
                      src={item.thumbnail.replace("w=800", "w=1200")}
                      alt={item.title}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/50 border border-[#D4AF37]/30">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <div className="bg-[#D4AF37]/90 p-6 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.5)] animate-pulse">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-white/70 font-medium">
                          Click to play video
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <h3 className="text-2xl font-playfair text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70">{item.description}</p>
                    <p className="text-white/50 text-sm mt-2">{item.date}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioGrid;
