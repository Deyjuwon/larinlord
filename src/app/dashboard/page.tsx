"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bell from '../../../public/bell.png'
import profile from '../../../public/profile.jpg'
import { IoMdArrowDropdown } from "react-icons/io";
const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [isLogOutButton, setIsLogOutButton] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/login"); // Redirect if not logged in
            } else {
                setUser(currentUser);
            }
            console.log(currentUser)
        });
        console.log()
        return () => unsubscribe();
    }, [router]);
    

    return (
        <div className="text-white  h-screen flex ">
            <div className="w-[20%] bg-[#162447] py-10 px-10">
                <p className="text-[24px] text-[#E43F5A] font-bold orbitron tracking-widest  mb-6">
                    Larinlord
                </p>
            </div>
            <div className="w-[80%] bg-[#1F4068] py-10 px-10">
                <nav className="flex justify-between items-center">
                    <input className="w-[40%] h-[40px] border border-[#E43F5A] rounded-lg px-4 py-3 text-white outline-none bg-transparent" type="text" />
                    <div className="flex gap-10 items-center">
                        <div className="w-[30px] h-[30px] bg-[#162447] rounded-lg flex items-center justify-center">
                            <Image src={bell} alt="bell-icon"  />
                        </div>
                        <div className="flex  items-center">
                            <div className="w-[30px] h-[30px] bg-gray-400 rounded-full mr-2">
                                <Image src={profile} alt="profile-pic" className="rounded-full w-[30px] h-[30px] object-cover" />
                            </div>
                            <p className="text-[#f7f7f7] text-sm font-bold mr-1">Adejuwon.O</p>
                            <div className="cursor-pointer" onClick={() => setIsLogOutButton((prev) => !prev)}>
                                <IoMdArrowDropdown />
                            </div>
                        </div>
                    </div>

                    {isLogOutButton && <button onClick={() => signOut(auth)} className="absolute h-[30px] w-[150px] bg-[#f7f7f7] rounded-lg right-10 top-22 flex justify-center items-center text-[#1d1d1d] text-sm cursor-pointer">
                        Log out
                    </button>}
                </nav>
                <div className="mt-16 w-[45%]">
                    <h1 className="text-[#f7f7f7] font-bold text-[30px] pb-2">Welcome, Adejuwon</h1>
                    <p className="text-base text-[#f7f7f7]">Stay on top of your properties, 
                    track rent payments, and never miss a due date.</p>

                </div>
                

            </div>
            
        </div>
    );
};

export default Dashboard;
