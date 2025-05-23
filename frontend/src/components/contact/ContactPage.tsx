import React from "react";
import Navbar from "../navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import FadeInSection from "../sections/FadeInSection";
import Footer from "../layout/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                Contact Us
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Have a question or ready to book a session? Get in touch with
                our team.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInSection direction="left" delay={0.2}>
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-playfair text-white mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">
                            Book a Session
                          </SelectItem>
                          <SelectItem value="quote">Request a Quote</SelectItem>
                          <SelectItem value="info">
                            General Information
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or inquiry"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] hover:from-[#B59020] hover:to-[#D4AF37] text-white transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </FadeInSection>

            {/* Contact Information */}
            <FadeInSection direction="right" delay={0.4}>
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10">
                  <h2 className="text-2xl font-playfair text-white mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mr-4">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Email Us</h3>
                        <p className="text-white/70 mt-1">
                          info@pixelflare.com
                        </p>
                        <p className="text-white/70">support@pixelflare.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mr-4">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Call Us</h3>
                        <p className="text-white/70 mt-1">+91 98765 43210</p>
                        <p className="text-white/70">+91 12345 67890</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mr-4">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Visit Us</h3>
                        <p className="text-white/70 mt-1">
                          123 Photography Lane, Creative District
                        </p>
                        <p className="text-white/70">
                          Mumbai, Maharashtra 400001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mr-4">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Business Hours
                        </h3>
                        <p className="text-white/70 mt-1">
                          Monday - Friday: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-white/70">
                          Saturday: 10:00 AM - 4:00 PM
                        </p>
                        <p className="text-white/70">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10">
                  <h2 className="text-2xl font-playfair text-white mb-6">
                    Follow Us
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 text-white/70 hover:text-[#D4AF37] transition-all duration-300"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 text-white/70 hover:text-[#D4AF37] transition-all duration-300"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 text-white/70 hover:text-[#D4AF37] transition-all duration-300"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Map Section */}
          <FadeInSection delay={0.6}>
            <div className="mt-16 bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-white/10 h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PixelFlare Studio Location"
              ></iframe>
            </div>
          </FadeInSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
