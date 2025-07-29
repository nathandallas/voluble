import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const errors = [];
    const email = formData.email.trim();
    if (!formData.username.trim()) errors.push("Username is required");

    if (!email) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email format");
    }

    if (!formData.password) errors.push("Password is required");
    else if (formData.password.length < 6) errors.push("Password must be at least 6 characters");

    if (errors.length > 0) {
      errors.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error);
        }, index * 200);
      });
      return false;
    }

    return true;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* SIGN UP FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Username"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect and share with friends!"
      />
    </div>
  );
};

export default SignUpPage;
