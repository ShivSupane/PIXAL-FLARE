import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";
import BookingSystem from "./BookingSystem";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <BookingSystem />
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
