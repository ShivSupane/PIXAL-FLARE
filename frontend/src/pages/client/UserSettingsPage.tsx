import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import UserPasswordForm from "@/components/user/UserPasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Bell, Lock, CreditCard, ChevronRight } from "lucide-react";

const UserSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  
  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Not Implemented",
      description: "This feature is not yet implemented.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-playfair text-white mb-3">Account Settings</h1>
            <p className="text-white/70">
              Manage your account settings and set email preferences
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.name || "User"}</h3>
                    <p className="text-sm text-white/50">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
                
                <div className="p-3">
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${
                      activeTab === "account" ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <User className="mr-3 h-5 w-5 text-[#D4AF37]" />
                      <span>Account</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${
                      activeTab === "password" ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <Lock className="mr-3 h-5 w-5 text-[#D4AF37]" />
                      <span>Password</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${
                      activeTab === "notifications" ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <Bell className="mr-3 h-5 w-5 text-[#D4AF37]" />
                      <span>Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("billing")}
                    className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${
                      activeTab === "billing" ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-3 h-5 w-5 text-[#D4AF37]" />
                      <span>Billing</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                </div>
              </Card>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              {/* Account */}
              {activeTab === "account" && (
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Account Information</CardTitle>
                    <CardDescription className="text-white/70">
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <Input
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Your Name"
                          defaultValue={user?.name}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Your Email"
                          defaultValue={user?.email}
                          type="email"
                        />
                      </div>
                      
                      <Button
                        className="bg-[#D4AF37] hover:bg-[#B59020] text-black"
                        onClick={handleEmailUpdate}
                      >
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              {/* Password */}
              {activeTab === "password" && (
                <UserPasswordForm />
              )}
              
              {/* Notifications */}
              {activeTab === "notifications" && (
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage how we contact you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/50 text-center py-10">
                      Notification preferences are coming soon
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {/* Billing */}
              {activeTab === "billing" && (
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Billing Information</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage your payment methods and view billing history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/50 text-center py-10">
                      Billing information is coming soon
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserSettingsPage;