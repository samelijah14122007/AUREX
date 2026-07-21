import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "@/layouts/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";

function ForgotPassword() {
  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password"
        subtitle="We'll send a reset link to your email."
      >
        <form>

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 h-12 w-full rounded-xl bg-cyan-500 font-semibold text-white hover:bg-cyan-600 transition"
          >
            Send Reset Link
          </motion.button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-300">
          <Link
            to="/"
            className="text-cyan-400"
          >
            Back to Login
          </Link>
        </p>

      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPassword;