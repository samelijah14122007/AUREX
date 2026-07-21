import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AuthLayout from "@/layouts/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue to AUREX"
      >
        <form className="space-y-2" onSubmit={handleSubmit}>

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mt-2 flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                className="rounded"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Forgot Password?
            </Link>

          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="
              mt-6
              h-12
              w-full
              rounded-xl
              bg-cyan-500
              font-semibold
              text-white
              transition-all
              hover:bg-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </motion.button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400"
          >
            Register
          </Link>
        </p>

      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
