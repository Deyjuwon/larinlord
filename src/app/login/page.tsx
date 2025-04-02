"use client";

import React, { useState } from "react";
import { auth } from "../../../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import hide from '../../../public/ep_hide.svg'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard"); // Redirect to dashboard after login
        } catch (error: any) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="bg-[#80CBC4] h-screen p-10 text-[#f7f7f7] flex flex-col items-center">
            <p className="text-[28px] font-bold orbitron tracking-wider text-center mb-6">
                    Larinlord
            </p>
            <div className="w-full lg:w-[40%] lg:border-2 bg-[#f7f7f7] pt-8 pb-10 lg:pb-20 lg:px-0 rounded-xl">
                
                <p className="text-[14px] lg:text-[16px] text-center text-[#808080] mb-6 lg:mb-6">LOGIN TO YOUR ACCOUNT</p>

                <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-[85%] h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="w-[85%] relative">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full h-[52px] border border-[#808080] rounded-lg px-4 py-3 text-[#808080] outline-none mb-5 bg-transparent text-xs lg:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Image src={hide} className="absolute top-4 right-5 cursor-pointer" alt="hide-icon"  />
                    </div>
                    
                    <button type="submit" className="w-[85%] h-[52px] bg-[#80CBC4] text-xs lg:text-sm text-white font-bold rounded-lg mt-4 cursor-pointer">
                        Log in
                        
                    </button>
                    
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                </form>
                
            </div>
            <p className="text-xs lg:text-sm pt-5 text-center">
                    Forgot password?
                </p>
            <p className="text-xs lg:text-sm pt-2 text-center">
                    Don't have an account? <a href="/sign-up" className="underline">Sign up</a>
                </p>
        </div>
    );
};

export default Login;
