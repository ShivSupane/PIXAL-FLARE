import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import DynamicBookingSystem from "@/components/booking/DynamicBookingSystem";

const DynamicBookingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <DynamicBookingSystem />
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicBookingPage;
