import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";

const ClientGalleryPage = () => {
  const { accessId } = useParams<{ accessId: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6 text-center">
            Client Gallery
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg text-center mb-12">
            Access ID: {accessId}
          </p>
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10 max-w-4xl mx-auto">
            <p className="text-white text-center">
              Gallery content will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientGalleryPage;
