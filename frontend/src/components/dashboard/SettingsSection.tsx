import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext";

const SettingsSection = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Appearance */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Dark Mode</Label>
              <p className="text-sm text-white/70">Toggle dark/light theme</p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Email Notifications</Label>
                <p className="text-sm text-white/70">Receive booking updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">SMS Notifications</Label>
                <p className="text-sm text-white/70">Receive text alerts</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Profile Visibility</Label>
                <p className="text-sm text-white/70">Make profile public</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start text-white hover:text-white hover:bg-white/10"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsSection;
