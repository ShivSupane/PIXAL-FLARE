import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Settings,
  Package,
  Calendar,
  DollarSign,
  BarChart2,
  LogOut,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Home,
  Camera,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PhotographerManagement from "@/components/admin/PhotographerManagement";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

  // Mock data for demonstration
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "client",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "client",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "client",
      status: "inactive",
      joinDate: "2024-03-05",
    },
  ];

  const mockServices = [
    {
      id: "1",
      name: "Wedding Photography",
      price: 89999,
      category: "wedding",
      bookings: 12,
    },
    {
      id: "2",
      name: "Portrait Session",
      price: 14999,
      category: "portrait",
      bookings: 28,
    },
    {
      id: "3",
      name: "Commercial Shoot",
      price: 49999,
      category: "commercial",
      bookings: 8,
    },
  ];

  const mockBookings = [
    {
      id: "1",
      client: "John Doe",
      service: "Wedding Photography",
      date: "2024-04-15",
      status: "confirmed",
      payment: "paid",
      amount: 89999,
    },
    {
      id: "2",
      client: "Jane Smith",
      service: "Portrait Session",
      date: "2024-04-22",
      status: "pending",
      payment: "partial",
      amount: 14999,
    },
    {
      id: "3",
      client: "Robert Johnson",
      service: "Commercial Shoot",
      date: "2024-05-10",
      status: "confirmed",
      payment: "unpaid",
      amount: 49999,
    },
  ];

  // Analytics data
  const totalRevenue = 1249985;
  const totalBookings = 48;
  const activeUsers = 32;
  const conversionRate = 68;

  const menuItems = [
    { icon: BarChart2, label: "Dashboard", value: "dashboard" },
    { icon: Users, label: "Users", value: "users" },
    { icon: Package, label: "Services", value: "services" },
    { icon: Calendar, label: "Bookings", value: "bookings" },
    { icon: Camera, label: "Photographers", value: "photographers" },
    { icon: DollarSign, label: "Payments", value: "payments" },
    { icon: Settings, label: "Settings", value: "settings" },
  ];

  const settingsTabs = [
    { value: "general", label: "General" },
    { value: "security", label: "Security" },
    { value: "emails", label: "Emails" },
    { value: "payments", label: "Payments" },
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
            <p className="text-[#D4AF37] text-sm">Admin Panel</p>
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
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-white/5 border-white/10 text-white w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-medium">
                    A
                  </div>
                  <span className="text-white">Admin</span>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Total Revenue
                        <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{totalRevenue.toLocaleString("en-IN")}
                      </div>
                      <p className="text-white/50 text-sm">
                        +12% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Total Bookings
                        <Calendar className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalBookings}</div>
                      <p className="text-white/50 text-sm">
                        +8% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Active Users
                        <Users className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{activeUsers}</div>
                      <p className="text-white/50 text-sm">
                        +5% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        Conversion Rate
                        <BarChart2 className="h-5 w-5 text-[#D4AF37]" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {conversionRate}%
                      </div>
                      <p className="text-white/50 text-sm">
                        +2% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Chart */}
                <Card className="bg-white/5 border-white/10 text-white p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Revenue Overview
                  </h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 40, 75, 50, 85, 60, 70].map((height, index) => (
                      <div
                        key={index}
                        className="relative h-full flex-1 flex flex-col justify-end"
                      >
                        <div
                          className="bg-gradient-to-t from-[#D4AF37] to-[#B59020] rounded-t-sm w-full"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs">
                          {
                            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                              index
                            ]
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-white/70">
                      <span>Total Revenue This Week: ₹349,999</span>
                      <span className="text-green-400">
                        +12% from last week
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white/5 border-white/10 text-white p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        action: "New booking",
                        user: "John Doe",
                        time: "2 hours ago",
                        details: "Wedding Photography on 2024-04-15",
                      },
                      {
                        action: "Payment received",
                        user: "Jane Smith",
                        time: "5 hours ago",
                        details: "₹7,499 for Portrait Session",
                      },
                      {
                        action: "New user registered",
                        user: "Michael Brown",
                        time: "1 day ago",
                        details: "michael@example.com",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 mr-3"></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-white font-medium">
                              {activity.action}
                            </p>
                            <span className="text-white/50 text-sm">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-white/70">
                            <span className="text-[#D4AF37]">
                              {activity.user}
                            </span>{" "}
                            - {activity.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium text-white">
                    User Management
                  </h2>
                  <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </div>

                <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Join Date</TableHead>
                        <TableHead className="text-white text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">
                            {user.name}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {user.email}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {user.role}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/70">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-900/95 border-white/10"
                              >
                                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium text-white">Services</h2>
                  <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </div>

                <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Price</TableHead>
                        <TableHead className="text-white">Category</TableHead>
                        <TableHead className="text-white">Bookings</TableHead>
                        <TableHead className="text-white text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockServices.map((service) => (
                        <TableRow
                          key={service.id}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">
                            {service.name}
                          </TableCell>
                          <TableCell className="text-white/70">
                            ₹{service.price.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-[#D4AF37]/20 text-[#D4AF37]">
                              {service.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/70">
                            {service.bookings}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-900/95 border-white/10"
                              >
                                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium text-white">Bookings</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/10"
                    >
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white">
                      <Plus className="mr-2 h-4 w-4" /> New Booking
                    </Button>
                  </div>
                </div>

                <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Client</TableHead>
                        <TableHead className="text-white">Service</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Payment</TableHead>
                        <TableHead className="text-white">Amount</TableHead>
                        <TableHead className="text-white text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBookings.map((booking) => (
                        <TableRow
                          key={booking.id}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">
                            {booking.client}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {booking.service}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {new Date(booking.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${booking.status === "confirmed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                            >
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${booking.payment === "paid" ? "bg-green-500/20 text-green-400" : booking.payment === "partial" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}
                            >
                              {booking.payment}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/70">
                            ₹{booking.amount.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-900/95 border-white/10"
                              >
                                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Cancel
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-white">
                  Payment Management
                </h2>
                <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white">Client</TableHead>
                        <TableHead className="text-white">Service</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Amount</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBookings.map((booking) => (
                        <TableRow
                          key={booking.id}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">
                            {booking.client}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {booking.service}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {new Date(booking.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-white/70">
                            ₹{booking.amount.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${booking.payment === "paid" ? "bg-green-500/20 text-green-400" : booking.payment === "partial" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}
                            >
                              {booking.payment}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-white">
                  System Settings
                </h2>
                
                <div className="mb-6">
                  <div className="flex space-x-2 border-b border-white/10">
                    {settingsTabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setActiveSettingsTab(tab.value)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          activeSettingsTab === tab.value
                            ? "text-white border-b-2 border-[#D4AF37]"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {activeSettingsTab === "general" && (
                  <Card className="bg-white/5 border-white/10 text-white p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Website Information</h3>
                          <p className="text-sm text-white/70">
                            Manage website name, description, and logo
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Social Media Links</h3>
                          <p className="text-sm text-white/70">
                            Update your social media profiles
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Contact Information</h3>
                          <p className="text-sm text-white/70">
                            Update contact details shown on website
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
                
                {activeSettingsTab === "security" && (
                  <div className="space-y-6">
                    <ChangePasswordForm />
                    
                    <Card className="bg-white/5 border-white/10 text-white p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                          <div>
                            <h3 className="font-medium">Login History</h3>
                            <p className="text-sm text-white/70">
                              View recent login attempts and activities
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-white/10 hover:bg-white/10"
                          >
                            View
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                          <div>
                            <h3 className="font-medium">Two-Factor Authentication</h3>
                            <p className="text-sm text-white/70">
                              Set up 2FA for additional security
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-white/10 hover:bg-white/10"
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
                
                {activeSettingsTab === "emails" && (
                  <Card className="bg-white/5 border-white/10 text-white p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Email Templates</h3>
                          <p className="text-sm text-white/70">
                            Configure email notification templates
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Edit Templates
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">SMTP Settings</h3>
                          <p className="text-sm text-white/70">
                            Configure email sending service
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
                
                {activeSettingsTab === "payments" && (
                  <Card className="bg-white/5 border-white/10 text-white p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Payment Gateway</h3>
                          <p className="text-sm text-white/70">
                            Configure payment processors
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Tax Settings</h3>
                          <p className="text-sm text-white/70">
                            Configure tax rates and rules
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                          <h3 className="font-medium">Currency Options</h3>
                          <p className="text-sm text-white/70">
                            Set preferred currency and display options
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Photographers Tab */}
            {activeTab === "photographers" && <PhotographerManagement />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
