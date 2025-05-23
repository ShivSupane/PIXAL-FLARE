import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isScrolled?: boolean;
  logo?: string;
  links?: Array<{ href: string; label: string }>;
}

const Navbar = ({
  isScrolled = false,
  logo = "PixelFlare",
  links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(isScrolled);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"} transition-all duration-500`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-white font-playfair text-2xl font-bold tracking-wider hover:text-[#D4AF37] transition-all duration-300"
            whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
          >
            {logo}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {links.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <NavigationMenuLink
                        href={link.href}
                        className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 font-medium tracking-wide text-sm
                          after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#D4AF37]
                          after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => navigate("/book")}
                    className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white px-6 py-2.5 rounded-full font-medium
                      shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                      transition-all duration-300 transform"
                  >
                    Book Now
                  </Button>
                </motion.div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border-2 border-[#D4AF37]"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-black/95 backdrop-blur-md border-white/10"
                  >
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="w-[200px] truncate text-sm text-white/70">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/settings")}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                    aria-label={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => navigate("/signup")}
                    className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white px-6 py-2.5 rounded-full font-medium
                      shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                      transition-all duration-300 transform"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/95 border-l border-[#D4AF37]/20 backdrop-blur-xl"
              >
                <nav className="flex flex-col gap-6 mt-8">
                  <AnimatePresence>
                    {isAuthenticated && (
                      <div className="flex items-center space-x-4 mb-6">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                          alt="Profile"
                          className="h-10 w-10 rounded-full border-2 border-[#D4AF37]"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-white/70 text-sm">{user?.email}</p>
                        </div>
                      </div>
                    )}
                    {links.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          onClick={() => handleNavigation(link.href)}
                          className="text-white/90 hover:text-white transition-all duration-300 text-lg font-medium tracking-wide block
                            hover:translate-x-2 hover:text-[#D4AF37] cursor-pointer"
                        >
                          {link.label}
                        </a>
                      </motion.div>
                    ))}
                    {isAuthenticated ? (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: links.length * 0.1 }}
                        >
                          <a
                            onClick={() => handleNavigation("/dashboard")}
                            className="text-white/90 hover:text-white transition-all duration-300 text-lg font-medium tracking-wide block
                              hover:translate-x-2 hover:text-[#D4AF37] cursor-pointer"
                          >
                            Dashboard
                          </a>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: (links.length + 1) * 0.1 }}
                        >
                          <a
                            onClick={() => handleNavigation("/settings")}
                            className="text-white/90 hover:text-white transition-all duration-300 text-lg font-medium tracking-wide block
                              hover:translate-x-2 hover:text-[#D4AF37] cursor-pointer"
                          >
                            Settings
                          </a>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: (links.length + 2) * 0.1 }}
                        >
                          <Button
                            onClick={() => handleNavigation("/book")}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white mt-4
                              hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
                          >
                            Book Now
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: (links.length + 3) * 0.1 }}
                        >
                          <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-2"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: links.length * 0.1 }}
                        >
                          <Button
                            onClick={() => handleNavigation("/login")}
                            variant="outline"
                            className="w-full text-white hover:bg-white/10 mt-4"
                          >
                            Login
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: (links.length + 1) * 0.1 }}
                        >
                          <Button
                            onClick={() => handleNavigation("/signup")}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white mt-2
                              hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
                          >
                            Sign Up
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
