import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedServices,
  onServiceToggle,
}) => {
  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(212, 175, 55, 0.5)",
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <Checkbox
            id={service.id}
            checked={selectedServices.includes(service.id)}
            onCheckedChange={() => onServiceToggle(service.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor={service.id}
              className="text-lg font-medium text-white cursor-pointer"
            >
              {service.name}
            </label>
            <p className="text-white/70 text-sm mt-1">{service.description}</p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-[#D4AF37]">{service.duration}</span>
              <span className="text-white">₹{service.price}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceSelection;
