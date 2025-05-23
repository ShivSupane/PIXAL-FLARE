import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Settings,
  User,
  LogOut,
  Home,
  ArrowLeft,
  Menu,
  X,
  Bell,
  Image,
  BookOpen,
  CreditCard,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
    { icon: Image, label: "My Galleries", href: "/dashboard/profile" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/profile" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Upcoming Session",
      message:
        "Your wedding photography session is scheduled for tomorrow at 2:00 PM.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 2,
      title: "Gallery Ready",
      message:
        "Your portrait session photos are now available in your gallery.",
      time: "3 days ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payment Received",
      message:
        "We've received your payment of ₹14,999 for the portrait session.",
      time: "1 week ago",
      unread: false,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <h2 className="text-xl font-playfair text-white">PixelFlare</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/70 hover:text-white hover:bg-white/10"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications.filter((n) => n.unread).length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-gray-900/95 border-white/10 p-0 max-h-[400px] overflow-auto"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="font-medium text-white">Notifications</h3>
              </div>
              <div className="py-2">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="px-4 py-3 focus:bg-white/10 cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${notification.unread ? "bg-[#D4AF37]" : "bg-transparent"}`}
                      />
                      <div className="space-y-1">
                        <p className="font-medium text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-white/70">
                          {notification.message}
                        </p>
                        <p className="text-xs text-white/50">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  Mark all as read
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-900/95 border-white/10 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
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
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={`w-full justify-start ${isActive(item.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                      onClick={() => {
                        navigate(item.href);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
                <div className="p-4 border-t border-white/10 space-y-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 border-white/10"
                    onClick={() => {
                      navigate("/");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ArrowLeft className="mr-3 h-5 w-5" />
                    Back to Main Page
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex pt-[60px] md:pt-0">
        {/* Desktop Sidebar */}
        <motion.aside
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          className="hidden md:flex w-64 bg-white/5 backdrop-blur-lg min-h-screen p-6 border-r border-white/10 flex-col sticky top-0"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-playfair text-white">Welcome,</h2>
                <p className="text-sm text-white/70">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`w-full justify-start ${isActive(item.href) ? "bg-white/10 text-white border-l-2 border-[#D4AF37] pl-[30px]" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              ))}

              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-4"
                onClick={logout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>

              <div className="mt-8 pt-4 border-t border-white/10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
                    onClick={() => navigate("/")}
                  >
                    <ArrowLeft className="mr-3 h-5 w-5" />
                    Back to Main Page
                  </Button>
                </motion.div>
              </div>
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-playfair text-white">
                {title}
              </h1>

              {/* Desktop Notifications */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {notifications.filter((n) => n.unread).length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-96 bg-gray-900/95 border-white/10 p-0 max-h-[500px] overflow-auto"
                  >
                    <div className="p-4 border-b border-white/10">
                      <h3 className="font-medium text-white">Notifications</h3>
                    </div>
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="px-4 py-3 focus:bg-white/10 cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 ${notification.unread ? "bg-[#D4AF37]" : "bg-transparent"}`}
                            />
                            <div className="space-y-1">
                              <p className="font-medium text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-white/70">
                                {notification.message}
                              </p>
                              <p className="text-xs text-white/50">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div className="p-2 border-t border-white/10">
                      <Button
                        variant="ghost"
                        className="w-full justify-center text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        Mark all as read
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
