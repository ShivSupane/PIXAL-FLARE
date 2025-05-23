import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Camera,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BookingsList from "./BookingsList";

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    service: "Wedding Photography",
    date: "2024-04-15",
    time: "14:00",
    location: "Grand Plaza Hotel",
    status: "upcoming",
    price: 89999,
  },
  {
    id: "2",
    service: "Portrait Session",
    date: "2024-03-20",
    time: "10:00",
    location: "Studio One",
    status: "completed",
    price: 14999,
  },
  {
    id: "3",
    service: "Product Photography",
    date: "2024-02-10",
    time: "13:30",
    location: "PixelFlare Studio",
    status: "completed",
    price: 19999,
  },
  {
    id: "4",
    service: "Family Photoshoot",
    date: "2024-05-05",
    time: "11:00",
    location: "Sunset Park",
    status: "upcoming",
    price: 24999,
  },
  {
    id: "5",
    service: "Event Coverage",
    date: "2024-01-15",
    time: "18:00",
    location: "Crystal Ballroom",
    status: "cancelled",
    price: 34999,
  },
];

const DashboardOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Calculate analytics data
  const totalSpent = mockBookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.price, 0);

  const upcomingBookings = mockBookings.filter(
    (booking) => booking.status === "upcoming",
  );

  const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;

  // Get most booked service
  const serviceCount: Record<string, number> = {};
  mockBookings.forEach((booking) => {
    serviceCount[booking.service] = (serviceCount[booking.service] || 0) + 1;
  });

  const mostBookedService = Object.entries(serviceCount).reduce(
    (max, [service, count]) => (count > max[1] ? [service, count] : max),
    ["", 0],
  )[0];

  // Filter and sort bookings based on tab, search, and sort options
  const getFilteredBookings = (
    status: "upcoming" | "completed" | "cancelled" | "all",
  ) => {
    let filtered = mockBookings;

    if (status !== "all") {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Spent</p>
              <h3 className="text-2xl font-semibold text-white mt-1">
                ₹{totalSpent.toLocaleString("en-IN")}
              </h3>
              <p className="text-[#D4AF37] text-sm mt-2">
                {mockBookings.filter((b) => b.status === "completed").length}{" "}
                completed sessions
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Most Booked Service</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                {mostBookedService || "None"}
              </h3>
              <p className="text-[#D4AF37] text-sm mt-2">
                {mostBookedService ? serviceCount[mostBookedService] : 0}{" "}
                bookings
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Next Appointment</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                {nextBooking
                  ? new Date(nextBooking.date).toLocaleDateString()
                  : "No upcoming bookings"}
              </h3>
              <p className="text-[#D4AF37] text-sm mt-2">
                {nextBooking ? nextBooking.service : ""}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Booking Activity
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Completed</span>
              <span className="text-white/70">
                {mockBookings.filter((b) => b.status === "completed").length} /{" "}
                {mockBookings.length}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-green-500 transition-all"
                style={{
                  width: `${(mockBookings.filter((b) => b.status === "completed").length / mockBookings.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Upcoming</span>
              <span className="text-white/70">
                {mockBookings.filter((b) => b.status === "upcoming").length} /{" "}
                {mockBookings.length}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-[#D4AF37] transition-all"
                style={{
                  width: `${(mockBookings.filter((b) => b.status === "upcoming").length / mockBookings.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Cancelled</span>
              <span className="text-white/70">
                {mockBookings.filter((b) => b.status === "cancelled").length} /{" "}
                {mockBookings.length}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-red-500 transition-all"
                style={{
                  width: `${(mockBookings.filter((b) => b.status === "cancelled").length / mockBookings.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bookings List with Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-semibold text-white">Your Bookings</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("date")}
                className={`border-white/10 ${sortBy === "date" ? "bg-white/10 text-white" : "text-white/50"}`}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Date
                {sortBy === "date" && (
                  <span
                    className="ml-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("price")}
                className={`border-white/10 ${sortBy === "price" ? "bg-white/10 text-white" : "text-white/50"}`}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Price
                {sortBy === "price" && (
                  <span
                    className="ml-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              All Bookings
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <BookingsList bookings={getFilteredBookings("all")} />
          </TabsContent>
          <TabsContent value="upcoming">
            <BookingsList bookings={getFilteredBookings("upcoming")} />
          </TabsContent>
          <TabsContent value="completed">
            <BookingsList bookings={getFilteredBookings("completed")} />
          </TabsContent>
          <TabsContent value="cancelled">
            <BookingsList bookings={getFilteredBookings("cancelled")} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
