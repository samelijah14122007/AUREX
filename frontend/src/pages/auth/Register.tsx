import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AuthLayout from "@/layouts/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/api";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const strength = password.length >= 12 ? "Strong" : password.length >= 8 ? "Good" : password.length ? "Weak" : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      toast.success("Account created!");
      navigate("/analysis");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Join the AUREX Banking Intelligence Platform"
      >
        <form className="space-y-2" onSubmit={handleSubmit}>

          <AuthInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {strength && <div className="-mt-3 mb-4"><div className="flex gap-1">{[1,2,3].map(n=><span key={n} className={`h-1 flex-1 rounded ${n <= (strength === "Strong" ? 3 : strength === "Good" ? 2 : 1) ? (strength === "Weak" ? "bg-rose-400" : strength === "Good" ? "bg-amber-400" : "bg-emerald-400") : "bg-white/10"}`}/>)}</div><p className="mt-1 text-xs text-slate-400">Password strength: {strength}</p></div>}

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="mt-3 flex gap-2 text-xs leading-5 text-slate-400"><input required type="checkbox" className="mt-1 accent-cyan-400"/>I agree to the Terms & Conditions and authorised-use policy.</label>

          <AuthInput
            label="Password"
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-12 w-full rounded-xl bg-cyan-500 font-semibold text-white hover:bg-cyan-600 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </motion.button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400"
          >
            Login
          </Link>
        </p>

      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
