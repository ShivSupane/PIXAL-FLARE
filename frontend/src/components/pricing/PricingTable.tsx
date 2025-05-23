import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const packages = [
  {
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

const addOns = [
  { name: "Drone Photography", price: 299 },
  { name: "Extra Hour Coverage", price: 199 },
  { name: "Rush Delivery", price: 149 },
  { name: "Raw Files", price: 249 },
];

const PricingTable = () => {
  const navigate = useNavigate();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleBookNow = (packageName: string) => {
    navigate("/book", {
      state: { selectedPackage: packageName, addOns: selectedAddOns },
    });
  };

  const toggleAddOn = (addOn: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn],
    );
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-8 rounded-lg border ${pkg.popular ? "bg-white/10 border-[#D4AF37]" : "bg-white/5 border-white/10"} backdrop-blur-sm`}
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
            <h3 className="text-2xl font-playfair text-white mb-2">
              {pkg.name}
            </h3>
            <div className="text-3xl font-bold text-[#D4AF37] mb-4">
              ₹{pkg.price.toLocaleString("en-IN")}
            </div>
            <p className="text-white/70 mb-6">{pkg.description}</p>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center text-white/80">
                  <span className="text-[#D4AF37] mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleBookNow(pkg.name)}
              className={`w-full ${pkg.popular ? "bg-[#D4AF37] hover:bg-[#B59020]" : "bg-white/10 hover:bg-white/20"} text-white transition-all duration-300`}
            >
              Book Now
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-playfair text-white mb-8 text-center">
          Additional Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addOn, index) => (
            <motion.div
              key={addOn.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${selectedAddOns.includes(addOn.name) ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-white/5 border-white/10"}`}
              onClick={() => toggleAddOn(addOn.name)}
            >
              <div className="flex justify-between items-center">
                <span className="text-white">{addOn.name}</span>
                <span className="text-[#D4AF37]">
                  ₹{addOn.price.toLocaleString("en-IN")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PricingTable;
