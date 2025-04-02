"use client";

import React, { useState } from "react";
import { auth } from "../../../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/login"); // Redirect to login page after signup
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#80CBC4] h-screen flex flex-col  items-center p-6  text-[#f7f7f7]">
      <p className="text-[28px] font-bold orbitron tracking-wider text-center mb-6">
                    Larinlord
            </p>
      <div className="w-full lg:w-[40%] lg:border-2 bg-[#f7f7f7] pt-8 pb-10  lg:px-0 rounded-xl">
        
        <p className="text-[14px] lg:text-[16px] text-center text-[#808080] mb-6 lg:mb-6">SIGN UP</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col items-center w-full">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="w-[85%] h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="w-[85%] h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-[85%] h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-[85%] h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-[85%] h-[52px] bg-[#80CBC4] text-xs lg:text-sm text-white font-bold rounded-lg mt-4 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        
      </div>
      <p className="text-xs lg:text-sm pt-5 text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
    </div>
  );
};

export default SignUp;
