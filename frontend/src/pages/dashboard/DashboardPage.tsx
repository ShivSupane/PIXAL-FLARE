import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const DashboardPage = () => {
  return (
    <DashboardLayout title="Dashboard">
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default DashboardPage;
