import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Camera,
  Film,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FadeInSection from "../sections/FadeInSection";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  // Social media icon animation variants
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <FadeInSection>
      <footer className="bg-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-50" />

        <div className="container mx-auto px-4 py-20">
          {/* Newsletter Section */}
          <div className="mb-16 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Join Our Creative Community
                </motion.h3>
                <motion.p
                  className="text-white/70 mb-0 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Subscribe to our newsletter for exclusive photography tips,
                  special offers, and creative inspiration.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white/5 border-white/10 hover:border-[#D4AF37]/30 focus:border-[#D4AF37]/50 text-white rounded-lg py-6"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white transition-all duration-300 rounded-lg py-6 px-6"
                  >
                    <span className="mr-2">Subscribe</span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                {isSubscribed && (
                  <motion.p
                    className="text-green-400 mt-2 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Thank you for subscribing! Check your inbox soon.
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Logo and About */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B59020] flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <h2
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  PixelFlare
                </h2>
              </div>
              <p className="text-white/70 mb-6 border-l-2 border-[#D4AF37]/50 pl-4">
                Capturing life's precious moments through the art of photography
                and cinematography with unparalleled attention to detail and
                creative vision.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: Instagram,
                    color:
                      "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
                  },
                  { icon: Facebook, color: "hover:bg-blue-600" },
                  { icon: Twitter, color: "hover:bg-sky-500" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-transparent ${social.color} transition-all duration-300 flex items-center justify-center group`}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <ArrowRight className="h-4 w-4 text-[#D4AF37] mr-2" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/portfolio", label: "Portfolio" },
                  { to: "/pricing", label: "Pricing" },
                  { to: "/contact", label: "Contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 h-px bg-[#D4AF37] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Camera className="h-4 w-4 text-[#D4AF37] mr-2" />
                Our Services
              </h3>
              <ul className="space-y-3 border-l border-white/10 pl-4">
                {[
                  { icon: Heart, label: "Wedding Photography" },
                  { icon: Camera, label: "Portrait Sessions" },
                  { icon: Camera, label: "Commercial Photography" },
                  { icon: Camera, label: "Event Coverage" },
                  { icon: Film, label: "Cinematography" },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/services"
                      className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center"
                    >
                      <service.icon className="h-3 w-3 mr-2 text-[#D4AF37]/70" />
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Mail className="h-4 w-4 text-[#D4AF37] mr-2" />
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300">
                  <div className="p-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-3 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                    123 Photography Lane, Creative District
                    <br />
                    Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li className="flex items-center group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300">
                  <div className="p-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-3 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                    +91 98765 43210
                  </span>
                </li>
                <li className="flex items-center group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300">
                  <div className="p-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-3 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                    info@pixelflare.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()}{" "}
              <span className="text-[#D4AF37]">PixelFlare Studio</span>. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/privacy"
                className="text-white/50 text-sm hover:text-[#D4AF37] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-white/50 text-sm hover:text-[#D4AF37] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-white/50 text-sm hover:text-[#D4AF37] transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </FadeInSection>
  );
};

export default Footer;
