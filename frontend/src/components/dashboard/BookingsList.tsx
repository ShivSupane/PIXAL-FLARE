import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  MoreVertical,
  Edit,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

interface BookingsListProps {
  bookings: Booking[];
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(
    null,
  );
  const [dialogAction, setDialogAction] = React.useState<
    "cancel" | "reschedule" | null
  >(null);

  const handleAction = (
    booking: Booking,
    action: "cancel" | "reschedule" | "edit",
  ) => {
    setSelectedBooking(booking);
    if (action === "cancel" || action === "reschedule") {
      setDialogAction(action);
    } else {
      // Handle edit action
      console.log("Edit booking", booking.id);
    }
  };

  const confirmAction = () => {
    // In a real app, this would call an API
    console.log(`Confirmed ${dialogAction} for booking ${selectedBooking?.id}`);
    setDialogAction(null);
    setSelectedBooking(null);
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10 text-center">
        <p className="text-white/70">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-playfair text-white mb-2 flex items-center justify-between">
                <span>{booking.service}</span>
                <span
                  className={`md:hidden inline-block px-3 py-1 rounded-full text-xs ${getStatusStyles(booking.status)}`}
                >
                  {booking.status}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center text-white/70">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{booking.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-row md:flex-col items-center justify-between md:items-end gap-2 md:gap-0">
              <div className="text-lg font-semibold text-[#D4AF37]">
                ₹{booking.price.toLocaleString("en-IN")}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`hidden md:inline-block px-3 py-1 rounded-full text-sm ${getStatusStyles(booking.status)}`}
                >
                  {booking.status}
                </span>
                {booking.status === "upcoming" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-900/95 border-white/10"
                    >
                      <DropdownMenuItem
                        className="text-white hover:bg-white/10 cursor-pointer"
                        onClick={() => handleAction(booking, "edit")}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-white/10 cursor-pointer"
                        onClick={() => handleAction(booking, "reschedule")}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                        onClick={() => handleAction(booking, "cancel")}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogAction !== null}
        onOpenChange={() => setDialogAction(null)}
      >
        <DialogContent className="bg-gray-900/95 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "cancel"
                ? "Cancel Booking"
                : "Reschedule Booking"}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {dialogAction === "cancel"
                ? "Are you sure you want to cancel this booking? This action cannot be undone."
                : "Would you like to reschedule this booking? Our team will contact you to arrange a new date and time."}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="font-medium">{selectedBooking?.service}</p>
            <div className="flex items-center text-white/70 mt-2">
              <Calendar className="w-4 h-4 mr-2" />
              {selectedBooking &&
                new Date(selectedBooking.date).toLocaleDateString()}
              , {selectedBooking?.time}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogAction(null)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className={
                dialogAction === "cancel"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#D4AF37] hover:bg-[#B59020]"
              }
            >
              {dialogAction === "cancel"
                ? "Yes, Cancel Booking"
                : "Request Reschedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function getStatusStyles(status: Booking["status"]) {
  switch (status) {
    case "upcoming":
      return "bg-green-500/20 text-green-400";
    case "completed":
      return "bg-blue-500/20 text-blue-400";
    case "cancelled":
      return "bg-red-500/20 text-red-400";
    default:
      return "";
  }
}

export default BookingsList;
