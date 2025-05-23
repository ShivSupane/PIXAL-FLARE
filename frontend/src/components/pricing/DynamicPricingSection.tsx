import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PricingCategory =
  | "wedding"
  | "babyShower"
  | "product"
  | "portrait"
  | "event"
  | "commercial";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  discount?: string;
  duration: string;
  editedPhotos: number;
  deliveryTime: string;
}

interface PricingCategoryData {
  id: PricingCategory;
  label: string;
  icon: string;
  plans: PricingPlan[];
  hasMonthlyOption?: boolean;
}

const pricingData: PricingCategoryData[] = [
  {
    id: "wedding",
    label: "Wedding Photography",
    icon: "💍",
    plans: [
      {
        id: "wedding-basic",
        name: "Basic",
        price: 49999,
        description: "Perfect for intimate weddings",
        duration: "6 Hours",
        editedPhotos: 200,
        deliveryTime: "14 Days",
        features: [
          "6-Hour Photography Coverage",
          "200 Edited Photos",
          "1 Photographer",
          "Online Gallery",
          "Basic Retouching",
          "Digital Downloads",
        ],
      },
      {
        id: "wedding-premium",
        name: "Premium",
        price: 89999,
        description: "Ideal for traditional weddings",
        duration: "10 Hours",
        editedPhotos: 400,
        deliveryTime: "10 Days",
        features: [
          "10-Hour Photo & Video Coverage",
          "400 Edited Photos",
          "10-Minute Highlight Video",
          "2 Photographers",
          "Advanced Retouching",
          "Online Gallery",
          "USB Drive Delivery",
          "Wedding Album (30 Pages)",
        ],
        popular: true,
        discount: "10% OFF",
      },
      {
        id: "wedding-professional",
        name: "Professional",
        price: 149999,
        description: "Complete coverage for your special day",
        duration: "Full Day (12+ Hours)",
        editedPhotos: 600,
        deliveryTime: "7 Days",
        features: [
          "Full Day Coverage (Pre-wedding to Reception)",
          "600+ Edited Photos",
          "20-Minute Cinematic Film",
          "3 Photographers + 1 Videographer",
          "Drone Aerial Coverage",
          "Premium Retouching",
          "Online Gallery",
          "Luxury Wedding Album (50 Pages)",
          "Engagement Photoshoot Included",
        ],
      },
    ],
  },
  {
    id: "babyShower",
    label: "Baby Shower Photography",
    icon: "👶",
    plans: [
      {
        id: "babyshower-basic",
        name: "Basic",
        price: 14999,
        description: "Capture the special moments",
        duration: "2 Hours",
        editedPhotos: 75,
        deliveryTime: "7 Days",
        features: [
          "2-Hour Photography Coverage",
          "75 Edited Photos",
          "1 Photographer",
          "Online Gallery",
          "Basic Retouching",
          "Digital Downloads",
        ],
      },
      {
        id: "babyshower-premium",
        name: "Premium",
        price: 24999,
        description: "Comprehensive coverage of your celebration",
        duration: "3 Hours",
        editedPhotos: 150,
        deliveryTime: "5 Days",
        features: [
          "3-Hour Photography Coverage",
          "150 Edited Photos",
          "1 Photographer",
          "Online Gallery",
          "Advanced Retouching",
          "Digital Downloads",
          "Photo Album (20 Pages)",
          "5 Printed Photos (8×10)",
        ],
        popular: true,
      },
      {
        id: "babyshower-professional",
        name: "Professional",
        price: 34999,
        description: "Premium coverage with video highlights",
        duration: "4 Hours",
        editedPhotos: 200,
        deliveryTime: "3 Days",
        features: [
          "4-Hour Photo & Video Coverage",
          "200 Edited Photos",
          "5-Minute Highlight Video",
          "2 Photographers",
          "Premium Retouching",
          "Online Gallery",
          "Luxury Photo Album (30 Pages)",
          "10 Printed Photos (8×10)",
          "Same-Day Preview (10 Photos)",
        ],
      },
    ],
  },
  {
    id: "product",
    label: "Product Photography",
    icon: "📸",
    plans: [
      {
        id: "product-basic",
        name: "Basic",
        price: 9999,
        description: "Essential product shots",
        duration: "2 Hours",
        editedPhotos: 10,
        deliveryTime: "5 Days",
        features: [
          "Up to 10 Products",
          "1 Angle Per Product",
          "White Background",
          "Basic Retouching",
          "Digital Delivery",
          "Commercial Usage Rights",
        ],
      },
      {
        id: "product-premium",
        name: "Premium",
        price: 19999,
        description: "Multi-angle professional product photography",
        duration: "4 Hours",
        editedPhotos: 30,
        deliveryTime: "3 Days",
        features: [
          "Up to 15 Products",
          "3 Angles Per Product",
          "Choice of 3 Backgrounds",
          "Advanced Retouching",
          "Digital Delivery",
          "Commercial Usage Rights",
          "Basic Styling",
        ],
        popular: true,
      },
      {
        id: "product-professional",
        name: "Professional",
        price: 34999,
        description: "Complete e-commerce ready product photography",
        duration: "Full Day",
        editedPhotos: 50,
        deliveryTime: "2 Days",
        features: [
          "Up to 25 Products",
          "5 Angles Per Product",
          "Custom Backgrounds & Setups",
          "Premium Retouching",
          "Digital Delivery",
          "Commercial Usage Rights",
          "Professional Styling",
          "Lifestyle Shots Included",
          "360° Rotating Views",
        ],
      },
    ],
  },
  {
    id: "portrait",
    label: "Portrait Photoshoots",
    icon: "🧑",
    plans: [
      {
        id: "portrait-basic",
        name: "Basic",
        price: 7999,
        description: "Perfect for individuals and professionals",
        duration: "1 Hour",
        editedPhotos: 15,
        deliveryTime: "7 Days",
        features: [
          "1-Hour Session",
          "15 Edited Photos",
          "1 Outfit Change",
          "1 Location",
          "Basic Retouching",
          "Digital Delivery",
          "Personal Usage Rights",
        ],
      },
      {
        id: "portrait-premium",
        name: "Premium",
        price: 14999,
        description: "Extended session with more variety",
        duration: "2 Hours",
        editedPhotos: 30,
        deliveryTime: "5 Days",
        features: [
          "2-Hour Session",
          "30 Edited Photos",
          "3 Outfit Changes",
          "2 Locations",
          "Advanced Retouching",
          "Digital Delivery",
          "Personal Usage Rights",
          "5 Printed Photos (8×10)",
        ],
        popular: true,
      },
      {
        id: "portrait-professional",
        name: "Professional",
        price: 24999,
        description: "Comprehensive portrait experience",
        duration: "3 Hours",
        editedPhotos: 50,
        deliveryTime: "3 Days",
        features: [
          "3-Hour Session",
          "50 Edited Photos",
          "Unlimited Outfit Changes",
          "3 Locations",
          "Premium Retouching",
          "Digital Delivery",
          "Commercial Usage Rights",
          "Hair & Makeup Artist Included",
          "10 Printed Photos (8×10)",
          "Photo Album (20 Pages)",
        ],
      },
    ],
  },
  {
    id: "event",
    label: "Event Coverage",
    icon: "🎉",
    plans: [
      {
        id: "event-basic",
        name: "Basic",
        price: 19999,
        description: "Essential event documentation",
        duration: "3 Hours",
        editedPhotos: 100,
        deliveryTime: "7 Days",
        features: [
          "3-Hour Coverage",
          "100 Edited Photos",
          "1 Photographer",
          "Online Gallery",
          "Basic Retouching",
          "Digital Delivery",
        ],
      },
      {
        id: "event-premium",
        name: "Premium",
        price: 34999,
        description: "Comprehensive event coverage",
        duration: "5 Hours",
        editedPhotos: 200,
        deliveryTime: "5 Days",
        features: [
          "5-Hour Coverage",
          "200 Edited Photos",
          "2 Photographers",
          "Online Gallery",
          "Advanced Retouching",
          "Digital Delivery",
          "5-Minute Highlight Reel",
          "Event Photo Album (20 Pages)",
        ],
        popular: true,
      },
      {
        id: "event-professional",
        name: "Professional",
        price: 59999,
        description: "Premium coverage for important events",
        duration: "8 Hours",
        editedPhotos: 300,
        deliveryTime: "3 Days",
        features: [
          "8-Hour Coverage",
          "300 Edited Photos",
          "2 Photographers + 1 Videographer",
          "Online Gallery",
          "Premium Retouching",
          "Digital Delivery",
          "10-Minute Highlight Video",
          "Drone Aerial Coverage",
          "Luxury Event Album (30 Pages)",
          "Same-Day Preview (20 Photos)",
        ],
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial & Branding",
    icon: "🏢",
    plans: [
      {
        id: "commercial-basic",
        name: "Basic",
        price: 24999,
        description: "Essential branding photography",
        duration: "Half Day (4 Hours)",
        editedPhotos: 30,
        deliveryTime: "7 Days",
        features: [
          "Half-Day Shoot (4 Hours)",
          "30 Edited Photos",
          "1 Location",
          "Basic Styling",
          "Commercial Usage Rights",
          "Digital Delivery",
          "Basic Retouching",
        ],
      },
      {
        id: "commercial-premium",
        name: "Premium",
        price: 49999,
        description: "Comprehensive branding package",
        duration: "Full Day (8 Hours)",
        editedPhotos: 60,
        deliveryTime: "5 Days",
        features: [
          "Full-Day Shoot (8 Hours)",
          "60 Edited Photos",
          "2 Locations",
          "Professional Styling",
          "Commercial Usage Rights",
          "Digital Delivery",
          "Advanced Retouching",
          "Social Media Optimized Images",
          "Basic Video Clips",
        ],
        popular: true,
      },
      {
        id: "commercial-professional",
        name: "Professional",
        price: 99999,
        description: "Premium commercial photography solution",
        duration: "2 Full Days",
        editedPhotos: 100,
        deliveryTime: "3 Days",
        features: [
          "2 Full-Day Shoots",
          "100 Edited Photos",
          "Multiple Locations",
          "Professional Styling & Art Direction",
          "Commercial Usage Rights",
          "Digital Delivery",
          "Premium Retouching",
          "Social Media Campaign Package",
          "2-Minute Brand Video",
          "Drone Aerial Coverage",
          "Print-Ready Files",
        ],
      },
    ],
    hasMonthlyOption: true,
  },
];

const DynamicPricingSection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<PricingCategory>("wedding");
  const [billingCycle, setBillingCycle] = useState<"onetime" | "monthly">(
    "onetime",
  );

  const selectedCategoryData = pricingData.find(
    (category) => category.id === selectedCategory,
  );

  const handleBookNow = (plan: PricingPlan) => {
    navigate("/book", {
      state: {
        selectedPackage: plan.id,
        packageName: plan.name,
        packagePrice: plan.price,
        packageCategory: selectedCategory,
        billingCycle: billingCycle,
      },
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate monthly price (for commercial packages)
  const getMonthlyPrice = (price: number): number => {
    // 6-month contract with 10% discount
    return Math.round((price * 0.9) / 6);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            Photography Packages
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Choose the perfect package for your photography needs
          </p>
        </motion.div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {pricingData.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setBillingCycle("onetime"); // Reset billing cycle when changing category
              }}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id ? "bg-[#D4AF37] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        {/* Billing Cycle Toggle (Only for Commercial) */}
        {selectedCategoryData?.hasMonthlyOption && (
          <div className="flex justify-center mb-12">
            <Tabs
              defaultValue="onetime"
              value={billingCycle}
              onValueChange={(value) =>
                setBillingCycle(value as "onetime" | "monthly")
              }
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="onetime" className="text-white">
                  One-time
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-white">
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Pricing Plans */}
        {selectedCategoryData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCategoryData.plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-lg border ${plan.popular ? "bg-white/10 border-[#D4AF37]" : "bg-white/5 border-white/10"} backdrop-blur-sm`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37]">
                    Most Popular
                  </Badge>
                )}
                {plan.discount && (
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    {plan.discount}
                  </Badge>
                )}
                <h3 className="text-2xl font-playfair text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-[#D4AF37] mb-4">
                  {billingCycle === "monthly" &&
                  selectedCategoryData.hasMonthlyOption
                    ? formatPrice(getMonthlyPrice(plan.price)) + "/mo"
                    : formatPrice(plan.price)}
                </div>
                <p className="text-white/70 mb-6">{plan.description}</p>

                {/* Key details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-sm font-medium mb-1">
                      Duration
                    </div>
                    <div className="text-white">{plan.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-sm font-medium mb-1">
                      Photos
                    </div>
                    <div className="text-white">{plan.editedPhotos}+</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#D4AF37] text-sm font-medium mb-1">
                      Delivery
                    </div>
                    <div className="text-white">{plan.deliveryTime}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-white/80">
                      <span className="text-[#D4AF37] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleBookNow(plan)}
                  className={`w-full ${plan.popular ? "bg-[#D4AF37] hover:bg-[#B59020]" : "bg-white/10 hover:bg-white/20"} text-white transition-all duration-300`}
                >
                  Book Now
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicPricingSection;
