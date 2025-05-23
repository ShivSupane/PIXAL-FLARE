import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { User } from "@/types/auth";
import { Camera, Check, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  address?: string;
  city?: string;
  instagram?: string;
}

interface NotificationPreferences {
  emailBookingConfirmation: boolean;
  emailBookingReminder: boolean;
  emailPromotions: boolean;
  smsBookingConfirmation: boolean;
  smsBookingReminder: boolean;
}

const ProfileSection = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [avatarHover, setAvatarHover] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPreferences>({
      emailBookingConfirmation: true,
      emailBookingReminder: true,
      emailPromotions: false,
      smsBookingConfirmation: true,
      smsBookingReminder: false,
    });

  const { values, handleChange, handleSubmit, isSubmitting } =
    useForm<ProfileFormData>({
      initialValues: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: "+91 98765 43210",
        bio: "Photography enthusiast with a passion for capturing life's special moments.",
        address: "123 Sunshine Avenue",
        city: "Mumbai",
        instagram: "@pixelflare_client",
      },
      onSubmit: async (values) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Update profile:", values);
        console.log("Notification preferences:", notificationPrefs);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      },
    });

  const toggleNotificationPref = (key: keyof NotificationPreferences) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8">
          <div
            className="relative group"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div
              className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? "opacity-100" : "opacity-0"}`}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 bg-[#D4AF37] hover:bg-[#B59020] rounded-full w-8 h-8 p-0 shadow-lg"
            >
              <span className="sr-only">Change avatar</span>+
            </Button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-playfair text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-white/70">{user?.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full">
                Premium Client
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-full">
                Since{" "}
                {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" },
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="personal"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Personal Information
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-white">
                      Instagram Handle
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={values.instagram}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mr-4 flex items-center text-green-400"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Profile updated successfully
                    </motion.div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D4AF37] hover:bg-[#B59020] text-white min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-white/90 font-medium">
                    Email Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">
                          Booking Confirmations
                        </Label>
                        <p className="text-sm text-white/70">
                          Receive email when a booking is confirmed
                        </p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailBookingConfirmation}
                        onCheckedChange={() =>
                          toggleNotificationPref("emailBookingConfirmation")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Booking Reminders</Label>
                        <p className="text-sm text-white/70">
                          Receive email reminders before your session
                        </p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailBookingReminder}
                        onCheckedChange={() =>
                          toggleNotificationPref("emailBookingReminder")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Promotions & News</Label>
                        <p className="text-sm text-white/70">
                          Receive special offers and studio updates
                        </p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailPromotions}
                        onCheckedChange={() =>
                          toggleNotificationPref("emailPromotions")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-white/90 font-medium">
                    SMS Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">
                          Booking Confirmations
                        </Label>
                        <p className="text-sm text-white/70">
                          Receive SMS when a booking is confirmed
                        </p>
                      </div>
                      <Switch
                        checked={notificationPrefs.smsBookingConfirmation}
                        onCheckedChange={() =>
                          toggleNotificationPref("smsBookingConfirmation")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Booking Reminders</Label>
                        <p className="text-sm text-white/70">
                          Receive SMS reminders before your session
                        </p>
                      </div>
                      <Switch
                        checked={notificationPrefs.smsBookingReminder}
                        onCheckedChange={() =>
                          toggleNotificationPref("smsBookingReminder")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mr-4 flex items-center text-green-400"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Preferences updated successfully
                  </motion.div>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#D4AF37] hover:bg-[#B59020] text-white min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
