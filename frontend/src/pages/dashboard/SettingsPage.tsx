import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsSection from "@/components/dashboard/SettingsSection";

const SettingsPage = () => {
  return (
    <DashboardLayout title="Settings">
      <SettingsSection />
    </DashboardLayout>
  );
};

export default SettingsPage;
