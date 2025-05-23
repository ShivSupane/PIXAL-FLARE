import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Service functions
const apiService = {
  // Get auth token from localStorage
  getAuthToken: () => {
    // Try multiple possible token storage keys
    return localStorage.getItem('token') || 
           localStorage.getItem('authToken') || 
           localStorage.getItem('accessToken') || 
           sessionStorage.getItem('token') ||
           '';
  },

  // Calculate booking price
  calculatePrice: async (photographyServiceId: string, additionalServices: Array<{serviceId: string, quantity: number}>) => {
    try {
      const token = apiService.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/bookings/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          photographyServiceId,
          additionalServices
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Price calculation error:', error);
      throw error;
    }
  },

  // Create booking
  createBooking: async (bookingData: any) => {
    try {
      const token = apiService.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Booking creation error:', error);
      throw error;
    }
  }
};

// Mock data - replace with API calls in production
const packages: Package[] = [
  {
    id: "6756d123e4b0a1234567890a", // Use MongoDB-like ObjectId format
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
  },
  {
    id: "6756d123e4b0a1234567890b",
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
  },
  {
    id: "6756d123e4b0a1234567890c",
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
  },
];

const additionalServices: AdditionalService[] = [
  { id: "6756d123e4b0a1234567891a", name: "Drone Photography", price: 299 },
  { id: "6756d123e4b0a1234567891b", name: "Extra Hour Coverage", price: 199 },
  { id: "6756d123e4b0a1234567891c", name: "Rush Delivery", price: 149 },
  { id: "6756d123e4b0a1234567891d", name: "Raw Files", price: 249 },
  { id: "6756d123e4b0a1234567891e", name: "Premium Prints Package", price: 199 },
  { id: "6756d123e4b0a1234567891f", name: "Second Photographer", price: 399 },
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const BookingSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Core form state
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({});
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  
  // Contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [notes, setNotes] = useState("");
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  // Calculate price from backend
  const calculatePriceFromBackend = async () => {
    if (!selectedPackage) return;

    setPriceLoading(true);
    try {
      const additionalServicesArray = Object.entries(selectedServices).map(([serviceId, quantity]) => ({
        serviceId,
        quantity
      }));

      const result = await apiService.calculatePrice(selectedPackage.id, additionalServicesArray);
      setCalculatedPrice(result.data);
      setError(""); // Clear any previous errors
    } catch (error: any) {
      console.error('Failed to calculate price:', error);
      setError(`Price calculation failed: ${error.message}`);
      setCalculatedPrice(null);
    } finally {
      setPriceLoading(false);
    }
  };

  // Recalculate price when dependencies change
  useEffect(() => {
    if (selectedPackage) {
      const timeoutId = setTimeout(() => {
        calculatePriceFromBackend();
      }, 500); // Debounce API calls

      return () => clearTimeout(timeoutId);
    }
  }, [selectedPackage, selectedServices]);

  // Fallback price calculation
  const calculateTotal = () => {
    if (calculatedPrice?.totalAmount) {
      return calculatedPrice.totalAmount;
    }
    
    let total = selectedPackage ? selectedPackage.price : 0;
    Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      if (service) {
        total += service.price * quantity;
      }
    });
    return total;
  };

  // Handle package selection
  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setError("");
  };

  // Toggle additional service
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newServices = { ...prev };
      if (newServices[serviceId]) {
        delete newServices[serviceId];
      } else {
        newServices[serviceId] = 1;
      }
      return newServices;
    });
  };

  // Update service quantity
  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedServices((prev) => {
        const newServices = { ...prev };
        delete newServices[serviceId];
        return newServices;
      });
    } else {
      setSelectedServices((prev) => ({
        ...prev,
        [serviceId]: quantity
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    if (!selectedPackage) {
      setError("Please select a package");
      return false;
    }
    if (!date || !time) {
      setError("Please select a date and time");
      return false;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return false;
    }
    if (!eventLocation.trim()) {
      setError("Please enter the event location");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare booking data exactly as expected by backend
      const eventDateTime = new Date(date!);
      const [hours, minutes] = time.split(':');
      eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const bookingData = {
        photographyServiceId: selectedPackage!.id,
        additionalServices: Object.entries(selectedServices).map(([serviceId, quantity]) => ({
          serviceId,
          quantity
        })),
        eventDate: eventDateTime.toISOString(),
        eventLocation: eventLocation.trim(),
        contactDetails: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          ...(address.trim() && { address: address.trim() })
        },
        ...(notes.trim() && { specialRequirements: notes.trim() })
      };

      console.log('Sending booking data:', bookingData); // Debug log

      const result = await apiService.createBooking(bookingData);
      
      console.log('Booking created successfully:', result); // Debug log
      
      setShowSuccess(true);
      
      // Store booking reference
      if (result.data?._id) {
        localStorage.setItem('lastBookingId', result.data._id);
      }
      
      // Redirect after success
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/booking-confirmation', { 
          state: { 
            bookingData: result.data,
            success: true
          } 
        });
      }, 2000);

    } catch (error: any) {
      console.error('Booking submission error:', error);
      
      // Handle specific error types
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setError('Please log in to create a booking');
      } else if (error.message.includes('400')) {
        setError('Please check your booking details and try again');
      } else if (error.message.includes('404')) {
        setError('Selected service not found. Please refresh and try again');
      } else if (error.message.includes('Failed to fetch')) {
        setError('Unable to connect to server. Please check your internet connection');
      } else {
        setError(error.message || 'Failed to create booking. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Initialize from URL state
  useEffect(() => {
    if (location.state?.selectedPackage) {
      const packageId = location.state.selectedPackage;
      const pkg = packages.find((p) => p.id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }
  }, [location.state]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Book Your Photography Session
      </h1>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2 max-w-2xl mx-auto"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center max-w-2xl mx-auto"
        >
          ✓ Booking created successfully! Redirecting to confirmation...
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Package Selection & Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Package Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Select Your Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${selectedPackage?.id === pkg.id ? "bg-yellow-500/20 border-yellow-500" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-yellow-500 text-xl font-semibold mb-2">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <ul className="space-y-1">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-white/80 text-sm flex items-start"
                      >
                        <span className="text-yellow-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                    {pkg.features.length > 3 && (
                      <li className="text-white/60 text-sm italic">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {additionalServices.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${selectedServices[service.id] ? "bg-yellow-500/20 border-yellow-500" : "bg-white/5 border-white/10"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        id={service.id}
                        checked={!!selectedServices[service.id]}
                        onCheckedChange={() => toggleService(service.id)}
                        className="mr-3"
                      />
                      <Label
                        htmlFor={service.id}
                        className="text-white cursor-pointer"
                      >
                        {service.name}
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-500 font-semibold">
                        ₹{service.price.toLocaleString("en-IN")}
                      </span>
                      {selectedServices[service.id] && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateServiceQuantity(service.id, (selectedServices[service.id] || 1) - 1)}
                            className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-white w-8 text-center">
                            {selectedServices[service.id]}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateServiceQuantity(service.id, (selectedServices[service.id] || 1) + 1)}
                            className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Details
            </h2>
            <div className="space-y-6">
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    Select Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                          !date && "text-white/50",
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date() ||
                          date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Select Time *
                  </Label>
                  <Select onValueChange={setTime} value={time}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 12345 67890"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your Address (Optional)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventLocation" className="text-white">
                    Event Location *
                  </Label>
                  <Input
                    id="eventLocation"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Where will the event take place?"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white">
                    Special Requirements
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or information"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-24"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Booking Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6">
              Booking Summary
            </h2>

            {selectedPackage ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Package Details */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl text-white">
                        {selectedPackage.name} Package
                      </h3>
                      <p className="text-white/70 text-sm">
                        {selectedPackage.description}
                      </p>
                    </div>
                    <span className="text-yellow-500 font-semibold">
                      ₹{selectedPackage.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Additional Services */}
                  {Object.keys(selectedServices).length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium">
                        Additional Services:
                      </h4>
                      {Object.entries(selectedServices).map(([serviceId, quantity]) => {
                        const service = additionalServices.find((s) => s.id === serviceId);
                        return (
                          service && (
                            <div
                              key={service.id}
                              className="flex justify-between text-white/80"
                            >
                              <span>{service.name} x{quantity}</span>
                              <span>₹{(service.price * quantity).toLocaleString("en-IN")}</span>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}

                  {/* Appointment Details */}
                  {(date || time || eventLocation) && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium">
                        Event Details:
                      </h4>
                      {date && (
                        <div className="text-white/80">
                          Date: {format(date, "PPP")}
                        </div>
                      )}
                      {time && (
                        <div className="text-white/80">Time: {time}</div>
                      )}
                      {eventLocation && (
                        <div className="text-white/80">Location: {eventLocation}</div>
                      )}
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total:</span>
                      <div className="text-right">
                        {priceLoading ? (
                          <div className="flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            <span className="text-white/70">Calculating...</span>
                          </div>
                        ) : (
                          <span className="text-yellow-500">
                            ₹{calculateTotal().toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading || priceLoading}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white transition-all duration-300 transform hover:scale-105 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating Booking...
                    </>
                  ) : (
                    'Create Booking'
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70">
                  Select a package to see your booking summary
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSystem;