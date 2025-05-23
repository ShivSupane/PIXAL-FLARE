import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { Lock, ShieldAlert } from "lucide-react";

interface AdminLoginCredentials {
  email: string;
  password: string;
  adminCode: string;
}

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { values, handleChange, handleSubmit } = useForm<AdminLoginCredentials>(
    {
      initialValues: {
        email: "",
        password: "",
        adminCode: "",
      },
      onSubmit: async (values) => {
        setIsLoading(true);
        setError(null);

        try {
          // In a real app, this would be an API call to verify admin credentials
          // For demo purposes, we'll use a simple check
          if (values.adminCode !== "ADMIN123") {
            throw new Error("Invalid admin access code");
          }

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Navigate to admin dashboard on success
          navigate("/admin/dashboard");
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Authentication failed",
          );
        } finally {
          setIsLoading(false);
        }
      },
    },
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-playfair text-white">Admin Access</h2>
          <p className="mt-2 text-sm text-white/70">
            Secure login for administrative access
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
              <ShieldAlert className="h-8 w-8" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Admin Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="admin@pixelflare.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Admin Password
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

            <div className="space-y-2">
              <Label htmlFor="adminCode" className="text-white">
                Admin Access Code
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  id="adminCode"
                  name="adminCode"
                  type="password"
                  value={values.adminCode}
                  onChange={handleChange}
                  placeholder="Enter admin access code"
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">
                This is an additional security measure for admin access
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Access Admin Panel"}
            </Button>

            <div className="text-center mt-4">
              <Button
                type="button"
                variant="link"
                className="text-white/70 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Return to regular login
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;