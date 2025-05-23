import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { LoginCredentials } from "@/types/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuth();

  const { values, handleChange, handleSubmit } = useForm<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await login(values);
      navigate("/dashboard");
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
          {error}
        </div>
      )}

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
          placeholder="Enter your password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/forgot-password"
            className="text-sm text-[#D4AF37] hover:text-[#B59020]"
          >
            Forgot password?
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/signup"
            className="text-sm text-[#D4AF37] hover:text-[#B59020]"
          >
            Create account
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
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-white/70 bg-[#0c0c0c]">
            Or continue with
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

export default LoginForm;
