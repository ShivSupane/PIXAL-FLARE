import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  DollarSign,
  Image,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  CreditCard,
  ChevronRight,
  Edit,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
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
  ];

  const mockGalleries = [
    {
      id: "1",
      title: "Wedding Day",
      date: "2024-03-15",
      imageCount: 250,
      thumbnail:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    },
    {
      id: "2",
      title: "Portrait Session",
      date: "2024-02-20",
      imageCount: 45,
      thumbnail:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    },
  ];

  const mockPayments = [
    {
      id: "1",
      service: "Wedding Photography",
      date: "2024-03-10",
      amount: 89999,
      status: "paid",
      method: "Credit Card",
    },
    {
      id: "2",
      service: "Portrait Session",
      date: "2024-02-15",
      amount: 14999,
      status: "paid",
      method: "Bank Transfer",
    },
  ];

  // Calculate analytics data
  const totalSpent = mockBookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.price, 0);

  const upcomingBookings = mockBookings.filter(
    (booking) => booking.status === "upcoming",
  );

  const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", value: "overview" },
    { icon: Calendar, label: "My Bookings", value: "bookings" },
    { icon: Image, label: "My Galleries", value: "galleries" },
    { icon: CreditCard, label: "Payments", value: "payments" },
    { icon: User, label: "Profile", value: "profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-black/50 backdrop-blur-md border-r border-white/10 p-6 flex flex-col"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-playfair text-white">PixelFlare</h2>
            <p className="text-[#D4AF37] text-sm">Client Portal</p>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-white">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-xs text-white/70">{user?.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                className={`w-full justify-start ${activeTab === item.value ? "bg-white/10 text-white border-l-2 border-[#D4AF37] pl-[30px]" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
              onClick={() => navigate("/")}
            >
              <Home className="mr-3 h-5 w-5" />
              Back to Website
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-playfair text-white">
                {menuItems.find((item) => item.value === activeTab)?.label}
              </h1>
              <Button
                onClick={() => navigate("/book")}
                className="bg-[#D4AF37] hover:bg-[#B59020] text-white"
              >
                Book New Session
              </Button>
            </div>
          </header>

          <main className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Total Spent
                        <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{totalSpent.toLocaleString("en-IN")}
                      </div>
                      <p className="text-white/50 text-sm">
                        {
                          mockBookings.filter((b) => b.status === "completed")
                            .length
                        }{" "}
                        completed sessions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Next Appointment
                        <Calendar className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {nextBooking ? (
                        <>
                          <div className="text-xl font-bold">
                            {new Date(nextBooking.date).toLocaleDateString()}
                          </div>
                          <p className="text-[#D4AF37] text-sm">
                            {nextBooking.service}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-xl font-bold">
                            No upcoming bookings
                          </div>
                          <p className="text-white/50 text-sm">
                            Book your next session now
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Galleries
                        <Image className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockGalleries.length}
                      </div>
                      <p className="text-white/50 text-sm">
                        {mockGalleries.reduce(
                          (sum, gallery) => sum + gallery.imageCount,
                          0,
                        )}{" "}
                        photos
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Bookings */}
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription className="text-white/50">
                        Your latest photography sessions
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      onClick={() => setActiveTab("bookings")}
                    >
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-white font-medium">
                                {booking.service}
                              </h3>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking.time}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(booking.status)}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Galleries */}
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Photo Galleries</CardTitle>
                      <CardDescription className="text-white/50">
                        Your photo collections
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      onClick={() => setActiveTab("galleries")}
                    >
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockGalleries.map((gallery) => (
                        <div
                          key={gallery.id}
                          className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                        >
                          <img
                            src={gallery.thumbnail}
                            alt={gallery.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-white font-medium">
                              {gallery.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {gallery.imageCount} photos •{" "}
                              {new Date(gallery.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-4">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="bg-white/5 border border-white/10 p-1 mb-4">
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
                  </TabsList>

                  <TabsContent value="all">
                    <div className="space-y-3">
                      {mockBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="upcoming">
                    <div className="space-y-3">
                      {mockBookings
                        .filter((b) => b.status === "upcoming")
                        .map((booking) => (
                          <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed">
                    <div className="space-y-3">
                      {mockBookings
                        .filter((b) => b.status === "completed")
                        .map((booking) => (
                          <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Galleries Tab */}
            {activeTab === "galleries" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockGalleries.map((gallery) => (
                    <Card
                      key={gallery.id}
                      className="bg-white/5 border-white/10 text-white overflow-hidden group cursor-pointer"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={gallery.thumbnail}
                          alt={gallery.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-medium">{gallery.title}</h3>
                        <div className="flex justify-between items-center mt-2 text-sm text-white/70">
                          <span>
                            {new Date(gallery.date).toLocaleDateString()}
                          </span>
                          <span>{gallery.imageCount} photos</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="space-y-4">
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardContent className="p-0">
                    <div className="divide-y divide-white/10">
                      {mockPayments.map((payment) => (
                        <div
                          key={payment.id}
                          className="p-4 hover:bg-white/5 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">
                                {payment.service}
                              </h4>
                              <p className="text-white/70 text-sm">
                                {new Date(payment.date).toLocaleDateString()} •{" "}
                                {payment.method}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-[#D4AF37]">
                                ₹{payment.amount.toLocaleString("en-IN")}
                              </p>
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-xs ${payment.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                              >
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-0 bg-[#D4AF37] hover:bg-[#B59020] rounded-full w-8 h-8 p-0 shadow-lg"
                        >
                          <span className="sr-only">Change avatar</span>+
                        </Button>
                      </div>
                      <div>
                        <h2 className="text-2xl font-playfair text-white">
                          {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-white/70">{user?.email}</p>
                        <div className="mt-2">
                          <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full">
                            Premium Client
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">
                          First Name
                        </label>
                        <Input
                          value={user?.firstName}
                          className="bg-white/10 border-white/20 text-white"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">
                          Last Name
                        </label>
                        <Input
                          value={user?.lastName}
                          className="bg-white/10 border-white/20 text-white"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Email</label>
                        <Input
                          value={user?.email}
                          className="bg-white/10 border-white/20 text-white"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Phone</label>
                        <Input
                          value="+91 98765 43210"
                          className="bg-white/10 border-white/20 text-white"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <Card className="bg-white/5 border-white/10 text-white hover:border-[#D4AF37]/30 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-white">
              {booking.service}
            </h3>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(booking.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {booking.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {booking.location}
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-2 md:gap-0">
            <div className="text-lg font-semibold text-[#D4AF37]">
              ₹{booking.price.toLocaleString("en-IN")}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs ${getStatusStyles(booking.status)}`}
            >
              {booking.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get status styles
function getStatusStyles(status: Booking["status"]) {
  switch (status) {
    case "upcoming":
      return "bg-green-500/20 text-green-400";
    case "completed":
      return "bg-blue-500/20 text-blue-400";
    case "cancelled":
      return "bg-red-500/20 text-red-400";
    default:
      return "";
  }
}

export default UserDashboardPage;
