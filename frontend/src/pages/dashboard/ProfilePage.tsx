import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSection from "@/components/dashboard/ProfileSection";

const ProfilePage = () => {
  return (
    <DashboardLayout title="Profile Settings">
      <ProfileSection />
    </DashboardLayout>
  );
};

export default ProfilePage;
