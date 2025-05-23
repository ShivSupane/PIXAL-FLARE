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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  category: string[];
}

interface City {
  id: string;
  name: string;
  available: boolean;
  alternativeMessage?: string;
}

interface BookingState {
  selectedPackage: string;
  packageName: string;
  packagePrice: number;
  packageCategory: string;
  billingCycle: "onetime" | "monthly";
}

const additionalServices: AdditionalService[] = [
  {
    id: "drone",
    name: "Drone Photography",
    price: 9999,
    category: ["wedding", "event", "commercial"],
  },
  {
    id: "extra-hour",
    name: "Extra Hour Coverage",
    price: 4999,
    category: [
      "wedding",
      "babyShower",
      "event",
      "portrait",
      "product",
      "commercial",
    ],
  },
  {
    id: "rush",
    name: "Rush Delivery (24 Hours)",
    price: 3999,
    category: [
      "wedding",
      "babyShower",
      "event",
      "portrait",
      "product",
      "commercial",
    ],
  },
  {
    id: "raw",
    name: "Raw Files",
    price: 2999,
    category: [
      "wedding",
      "babyShower",
      "event",
      "portrait",
      "product",
      "commercial",
    ],
  },
  {
    id: "prints",
    name: "Premium Prints Package",
    price: 4999,
    category: ["wedding", "babyShower", "portrait"],
  },
  {
    id: "second-shooter",
    name: "Additional Photographer",
    price: 7999,
    category: ["wedding", "babyShower", "event", "commercial"],
  },
  {
    id: "makeup",
    name: "Hair & Makeup Artist",
    price: 5999,
    category: ["wedding", "portrait", "commercial"],
  },
  {
    id: "album",
    name: "Additional Photo Album",
    price: 6999,
    category: ["wedding", "babyShower", "event", "portrait"],
  },
  {
    id: "social",
    name: "Social Media Optimization",
    price: 3999,
    category: ["product", "commercial"],
  },
  {
    id: "location",
    name: "Additional Location",
    price: 4999,
    category: ["portrait", "product", "commercial"],
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const categoryLabels: Record<string, string> = {
  wedding: "Wedding Photography",
  babyShower: "Baby Shower Photography",
  product: "Product Photography",
  portrait: "Portrait Photoshoot",
  event: "Event Coverage",
  commercial: "Commercial & Branding",
};

// Available cities data
const cities: City[] = [
  { id: "mumbai", name: "Mumbai", available: true },
  { id: "delhi", name: "Delhi", available: true },
  { id: "bangalore", name: "Bangalore", available: true },
  { id: "hyderabad", name: "Hyderabad", available: true },
  { id: "chennai", name: "Chennai", available: true },
  {
    id: "kolkata",
    name: "Kolkata",
    available: false,
    alternativeMessage:
      "We'll be launching in Kolkata next month. Please check back soon!",
  },
  { id: "pune", name: "Pune", available: true },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    available: false,
    alternativeMessage:
      "Our services in Ahmedabad will be available from next quarter. Please contact us for special arrangements.",
  },
  { id: "jaipur", name: "Jaipur", available: true },
  {
    id: "lucknow",
    name: "Lucknow",
    available: false,
    alternativeMessage:
      "We currently don't have photographers in Lucknow. Please consider our services in Delhi or Jaipur.",
  },
  { id: "chandigarh", name: "Chandigarh", available: true },
  { id: "kochi", name: "Kochi", available: true },
  { id: "goa", name: "Goa", available: true },
  {
    id: "indore",
    name: "Indore",
    available: false,
    alternativeMessage:
      "We're expanding to Indore soon. Please check back in a few weeks.",
  },
  {
    id: "bhopal",
    name: "Bhopal",
    available: false,
    alternativeMessage:
      "Our services in Bhopal will be available soon. Please contact us for special arrangements.",
  },
  {
    id: "nagpur",
    name: "Nagpur",
    available: false,
    alternativeMessage:
      "We don't currently serve Nagpur. Please consider our services in Pune or Mumbai.",
  },
  { id: "surat", name: "Surat", available: true },
  { id: "vadodara", name: "Vadodara", available: true },
  {
    id: "patna",
    name: "Patna",
    available: false,
    alternativeMessage:
      "We're not currently available in Patna. Please check back later.",
  },
  {
    id: "bhubaneswar",
    name: "Bhubaneswar",
    available: false,
    alternativeMessage:
      "We'll be launching in Bhubaneswar soon. Please contact us for more information.",
  },
];

const DynamicBookingSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [citySearchValue, setCitySearchValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [serviceAvailability, setServiceAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingState | null>(
    null,
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Format price in INR
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!bookingDetails) return 0;

    let total = bookingDetails.packagePrice;
    selectedServices.forEach((serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      if (service) {
        total += service.price;
      }
    });
    return total;
  };

  // Toggle additional service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  // Detect user's location using Geolocation API and convert to city name via OpenCage API
  const detectUserLocation = () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // In a real app, we would make an API call to OpenCage API
            // Example API call (not executed here):
            // const apiKey = 'your-opencage-api-key';
            // const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
            // const data = await response.json();
            // const cityName = data.results[0].components.city;

            // For demo purposes, we'll simulate the API call with a timeout
            setTimeout(() => {
              // Simulate finding the nearest city based on coordinates
              // In this demo, we'll randomly select one of the available cities
              const availableCities = cities.filter((city) => city.available);
              const randomIndex = Math.floor(
                Math.random() * availableCities.length,
              );
              const detectedCity = availableCities[randomIndex];

              if (detectedCity) {
                setCity(detectedCity.id);
                checkServiceAvailability(detectedCity.id);
              }
              setIsDetectingLocation(false);
            }, 1500);
          } catch (error) {
            console.error("Error fetching city from coordinates:", error);
            setLocationError(
              "Could not determine your city. Please select manually.",
            );
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(
            "Location access denied. Please select your city manually.",
          );
          setIsDetectingLocation(false);
        },
      );
    } else {
      setLocationError(
        "Geolocation is not supported by your browser. Please select your city manually.",
      );
      setIsDetectingLocation(false);
    }
  };

  // Check service availability in selected city
  const checkServiceAvailability = (cityId: string) => {
    const selectedCity = cities.find((c) => c.id === cityId);
    if (selectedCity) {
      if (selectedCity.available) {
        setServiceAvailability({
          available: true,
          message: `Great news! Our photography services are available in ${selectedCity.name}.`,
        });
      } else {
        setServiceAvailability({
          available: false,
          message:
            selectedCity.alternativeMessage ||
            `We're sorry, our services are not currently available in ${selectedCity.name}.`,
        });
      }
    } else {
      setServiceAvailability(null);
    }
  };

  // Handle city selection
  const handleCityChange = (cityId: string) => {
    setCity(cityId);
    checkServiceAvailability(cityId);
  };

  // No need for filtering cities as we're using a simple select dropdown

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails) {
      alert("Package details not found");
      return;
    }
    if (!date || !time) {
      alert("Please select a date and time");
      return;
    }
    if (!city) {
      alert("Please select your city");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if service is available in the selected city
    const selectedCity = cities.find((c) => c.id === city);
    if (!selectedCity?.available) {
      alert("Sorry, our services are not available in the selected city.");
      return;
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // In a real app, you would redirect to payment page or confirmation page
      navigate("/");
    }, 3000);
  };

  // Check if a package was selected from pricing page
  useEffect(() => {
    if (location.state) {
      const state = location.state as BookingState;
      setBookingDetails(state);

      // Don't auto-detect location on page load
      // User will need to click the button to detect location
    } else {
      // If no package was selected, redirect to pricing page
      navigate("/pricing");
    }
  }, [location.state, navigate]);

  // Filter additional services based on selected category
  const filteredAdditionalServices = additionalServices.filter(
    (service) =>
      bookingDetails &&
      service.category.includes(bookingDetails.packageCategory),
  );

  if (!bookingDetails) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair text-white text-center mb-8">
        Book Your {categoryLabels[bookingDetails.packageCategory]} Session
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Package Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-playfair text-white mb-6">
              Selected Package
            </h2>
            <div className="p-4 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-playfair text-white mb-2">
                    {bookingDetails.packageName} Package -{" "}
                    {categoryLabels[bookingDetails.packageCategory]}
                  </h3>
                  {bookingDetails.billingCycle === "monthly" ? (
                    <p className="text-white/70">
                      Monthly billing (6-month contract)
                    </p>
                  ) : null}
                </div>
                <span className="text-[#D4AF37] font-semibold text-xl">
                  {formatPrice(bookingDetails.packagePrice)}
                  {bookingDetails.billingCycle === "monthly" ? "/mo" : ""}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Additional Services */}
          {filteredAdditionalServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
            >
              <h2 className="text-2xl font-playfair text-white mb-6">
                Additional Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAdditionalServices.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-300 ${selectedServices.includes(service.id) ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
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
                    <span className="text-[#D4AF37] font-semibold">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-playfair text-white mb-6">
              Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    Select Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white rounded-lg",
                          !date && "text-white/50",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                          date >
                            new Date(
                              new Date().setMonth(new Date().getMonth() + 3),
                            )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Select Time
                  </Label>
                  <Select onValueChange={setTime}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-lg">
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

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="city" className="text-white">
                    Your City
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={detectUserLocation}
                    disabled={isDetectingLocation}
                    className="text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
                  >
                    {isDetectingLocation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Detecting your location...
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Auto-Detect My Location
                      </>
                    )}
                  </Button>
                </div>

                <Select onValueChange={handleCityChange}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-lg">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="py-2 px-3 text-sm text-white/70 border-b border-white/10">
                      Available Cities
                    </div>
                    {cities
                      .filter((city) => city.available)
                      .map((city) => (
                        <SelectItem
                          key={city.id}
                          value={city.id}
                          className="flex items-center"
                        >
                          <div className="flex items-center">
                            <span>{city.name}</span>
                            <span className="ml-2 text-green-500 text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10">
                              Available
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    <div className="py-2 px-3 text-sm text-white/70 border-b border-white/10 mt-2">
                      Coming Soon
                    </div>
                    {cities
                      .filter((city) => !city.available)
                      .map((city) => (
                        <SelectItem key={city.id} value={city.id} disabled>
                          <div className="flex items-center">
                            <span>{city.name}</span>
                            <span className="ml-2 text-amber-500 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10">
                              Coming soon
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {locationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-3 rounded-lg text-sm bg-amber-500/20 border border-amber-500/50 text-amber-400"
                  >
                    {locationError}
                  </motion.div>
                )}

                {serviceAvailability && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-2 p-3 rounded-lg text-sm ${serviceAvailability.available ? "bg-green-500/20 border border-green-500/50 text-green-400" : "bg-amber-500/20 border border-amber-500/50 text-amber-400"}`}
                  >
                    {serviceAvailability.message}
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your Phone"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or information"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px] rounded-lg"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={serviceAvailability && !serviceAvailability.available}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white transition-all duration-300 transform hover:scale-105 py-6 text-lg rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Right Column - Booking Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 sticky top-24">
            <h2 className="text-2xl font-playfair text-white mb-6">
              Booking Summary
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl text-white">
                      {bookingDetails.packageName} Package
                    </h3>
                    <p className="text-white/70 text-sm">
                      {categoryLabels[bookingDetails.packageCategory]}
                    </p>
                  </div>
                  <span className="text-[#D4AF37] font-semibold">
                    {formatPrice(bookingDetails.packagePrice)}
                    {bookingDetails.billingCycle === "monthly" ? "/mo" : ""}
                  </span>
                </div>

                {selectedServices.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <h4 className="text-white font-medium">
                      Additional Services:
                    </h4>
                    {selectedServices.map((serviceId) => {
                      const service = additionalServices.find(
                        (s) => s.id === serviceId,
                      );
                      return (
                        service && (
                          <div
                            key={service.id}
                            className="flex justify-between text-white/80"
                          >
                            <span>{service.name}</span>
                            <span>{formatPrice(service.price)}</span>
                          </div>
                        )
                      );
                    })}
                  </div>
                )}

                {(date || time) && (
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <h4 className="text-white font-medium">
                      Appointment Details:
                    </h4>
                    {date && (
                      <div className="text-white/80">
                        Date: {format(date, "PPP")}
                      </div>
                    )}
                    {time && <div className="text-white/80">Time: {time}</div>}
                    {city && (
                      <div className="text-white/80">
                        Location: {cities.find((c) => c.id === city)?.name}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total:</span>
                    <span className="text-[#D4AF37]">
                      {formatPrice(calculateTotal())}
                      {bookingDetails.billingCycle === "monthly" ? "/mo" : ""}
                    </span>
                  </div>
                  {bookingDetails.billingCycle === "monthly" && (
                    <div className="text-white/50 text-sm text-right mt-1">
                      6-month contract total:{" "}
                      {formatPrice(calculateTotal() * 6)}
                    </div>
                  )}
                </div>
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                >
                  Booking request sent successfully! We'll contact you shortly.
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicBookingSystem;
