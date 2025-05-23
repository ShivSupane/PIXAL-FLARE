import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BookingsList from "@/components/dashboard/BookingsList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="My Bookings">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white">Your Upcoming Sessions</h2>
          <Button
            onClick={() => navigate("/book")}
            className="bg-[#D4AF37] hover:bg-[#B59020] text-white"
          >
            Book New Session
          </Button>
        </div>
        <BookingsList />
      </div>
    </DashboardLayout>
  );
};

export default BookingsPage;
