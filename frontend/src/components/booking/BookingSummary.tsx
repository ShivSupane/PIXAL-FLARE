import React from "react";
import { motion } from "framer-motion";
import { Service } from "./ServiceSelection";

interface BookingSummaryProps {
  selectedServices: Service[];
  totalPrice: number;
  date?: Date;
  time?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedServices,
  totalPrice,
  date,
  time,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-white/5 border border-white/10"
    >
      <h3 className="text-xl font-playfair text-white mb-4">Booking Summary</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white/70">
            Selected Services:
          </h4>
          {selectedServices.map((service) => (
            <div key={service.id} className="flex justify-between text-white">
              <span>{service.name}</span>
              <span>₹{service.price.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>

        {(date || time) && (
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium text-white/70">
              Appointment Details:
            </h4>
            {date && (
              <div className="text-white">
                Date: {date.toLocaleDateString()}
              </div>
            )}
            {time && <div className="text-white">Time: {time}</div>}
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-white">Total:</span>
            <span className="text-[#D4AF37]">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
