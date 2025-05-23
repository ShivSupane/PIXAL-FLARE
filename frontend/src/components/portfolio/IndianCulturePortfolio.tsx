import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PortfolioImage {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
}

const indianCultureImages: PortfolioImage[] = [
  {
    id: "1",
    title: "Diwali Festival of Lights",
    category: "festivals",
    src: "https://images.unsplash.com/photo-1604423062408-4e5c9dfa22e1?w=800&q=80",
    description:
      "Beautifully arranged diyas illuminating the night during Diwali celebrations",
  },
  {
    id: "2",
    title: "Holi Celebrations",
    category: "festivals",
    src: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?w=800&q=80",
    description:
      "Vibrant colors filling the air during the joyous Holi festival",
  },
  {
    id: "3",
    title: "Classical Dance Performance",
    category: "dance",
    src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    description:
      "Graceful dancer performing traditional Indian classical dance",
  },
  {
    id: "4",
    title: "Kathakali Expression",
    category: "dance",
    src: "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=800&q=80",
    description:
      "Elaborate makeup and expressions of Kathakali dance form from Kerala",
  },
  {
    id: "5",
    title: "Royal Indian Wedding",
    category: "weddings",
    src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80",
    description:
      "Opulent Indian wedding ceremony with traditional rituals and decor",
  },
  {
    id: "6",
    title: "Majestic Taj Mahal",
    category: "landmarks",
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    description: "Iconic Taj Mahal reflecting in water during perfect light",
  },
  {
    id: "7",
    title: "Amber Fort",
    category: "landmarks",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    description: "Stunning architecture of the historic Amber Fort in Jaipur",
  },
  {
    id: "8",
    title: "Golden Temple",
    category: "landmarks",
    src: "https://images.unsplash.com/photo-1518792528501-352f829886dc?w=800&q=80",
    description: "Serene Golden Temple in Amritsar glowing at dusk",
  },
  {
    id: "9",
    title: "Spice Market",
    category: "culture",
    src: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80",
    description: "Colorful array of spices in a traditional Indian market",
  },
  {
    id: "10",
    title: "Silk Saree Artistry",
    category: "attire",
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
    description: "Intricately designed traditional silk saree with gold work",
  },
  {
    id: "11",
    title: "Traditional Pagdi",
    category: "attire",
    src: "https://images.unsplash.com/photo-1491852807958-4326560208e9?w=800&q=80",
    description: "Man wearing a traditional Rajasthani turban with pride",
  },
  {
    id: "12",
    title: "Festival Procession",
    category: "festivals",
    src: "https://images.unsplash.com/photo-1592466575533-5dbf3a8a93c4?w=800&q=80",
    description: "Colorful festival procession with traditional decorations",
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "festivals", label: "Festivals" },
  { value: "dance", label: "Classical Dance" },
  { value: "weddings", label: "Weddings" },
  { value: "landmarks", label: "Heritage Sites" },
  { value: "culture", label: "Cultural Life" },
  { value: "attire", label: "Traditional Attire" },
];

const IndianCulturePortfolio = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredImages = indianCultureImages.filter(
    (image) =>
      selectedCategory === "all" || image.category === selectedCategory,
  );

  return <></>;
};

export default IndianCulturePortfolio;
