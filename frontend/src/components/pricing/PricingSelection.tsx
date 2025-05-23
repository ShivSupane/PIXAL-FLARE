import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  discount?: string;
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    description: "Perfect for small events and personal shoots",
    features: [
      "4-Hour Photography Session",
      "100 Edited Photos",
      "Online Gallery",
      "Basic Retouching",
      "Digital Downloads",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 2499,
    description: "Ideal for weddings and special occasions",
    features: [
      "8-Hour Photo & Video Coverage",
      "300 Edited Photos",
      "5-Minute Highlight Video",
      "Advanced Retouching",
      "Online Gallery",
      "USB Drive Delivery",
      "2 Photographers",
    ],
    popular: true,
    discount: "15% OFF",
  },
  {
    id: "professional",
    name: "Professional",
    price: 1799,
    description: "Great for commercial and portfolio shoots",
    features: [
      "6-Hour Photography Session",
      "200 Edited Photos",
      "Commercial Usage Rights",
      "Professional Retouching",
      "Online Gallery",
      "Express Delivery",
    ],
    popular: false,
  },
];

const PricingSelection = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBookNow = (packageId: string) => {
    navigate("/book", { state: { selectedPackage: packageId } });
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    // Add a small delay before navigating to show the selection animation
    setTimeout(() => {
      handleBookNow(packageId);
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AnimatePresence>
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(212,175,55,0.2)",
              transition: { duration: 0.2 },
            }}
            className={`relative p-8 rounded-lg border cursor-pointer ${selectedPackage === pkg.id ? "bg-white/15 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]" : pkg.popular ? "bg-white/10 border-[#D4AF37]" : "bg-white/5 border-white/10"} backdrop-blur-sm transition-all duration-300`}
            onClick={() => handlePackageSelect(pkg.id)}
          >
            {pkg.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37]">
                Most Popular
              </Badge>
            )}
            {pkg.discount && (
              <Badge className="absolute top-4 right-4 bg-green-500">
                {pkg.discount}
              </Badge>
            )}
            <motion.h3
              className="text-2xl font-playfair text-white mb-2"
              animate={{ scale: selectedPackage === pkg.id ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {pkg.name}
            </motion.h3>
            <div className="text-3xl font-bold text-[#D4AF37] mb-4">
              {formatPrice(pkg.price)}
            </div>
            <p className="text-white/70 mb-6">{pkg.description}</p>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-center text-white/80"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                >
                  <span className="text-[#D4AF37] mr-2">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookNow(pkg.id);
                }}
                className={`w-full ${pkg.popular ? "bg-[#D4AF37] hover:bg-[#B59020]" : "bg-white/10 hover:bg-white/20"} text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PricingSelection;
