import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthLayout title="Create Account" subtitle="Join us to start your journey">
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
