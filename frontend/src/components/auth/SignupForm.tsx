import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { SignupCredentials } from "@/types/auth";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { values, handleChange, handleSubmit } = useForm<SignupCredentials>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      // Reset error state
      setError("");
      
      // Validate passwords match
      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Call the register API
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          password: values.password
        });
        
        // If the API call is successful, use the authentication context to set the user
        if (response.data.success !== false) {
          // You might want to adjust this based on how your auth context works
          await signup(values);
          navigate("/dashboard");
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || "Registration failed");
        } else {
          setError("An error occurred during registration");
        }
        console.error("Registration error:", err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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
            placeholder="Doe"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

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
          placeholder="Enter your email"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="text-sm text-[#D4AF37] hover:text-[#B59020]"
          >
            Already have an account?
          </Link>
        </motion.div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white
          hover:from-[#B59020] hover:to-[#D4AF37] transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-white/70 bg-[#0c0c0c]">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;