"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bell from '../../../public/bell.svg'
import profile from '../../../public/profile.jpg'
import { IoMdArrowDropdown } from "react-icons/io";
import home from '../../../public/home-.svg';
import property from '../../../public/property 2.svg';
import people from '../../../public/pencil_people.svg';
import payment1 from '../../../public/payment1.svg';
import payment2 from '../../../public/payment2.svg';
import add from '../../../public/add-one.svg';
import menu from '../../../public/dot-menu.svg';
import home1 from '../../../public/home1.png';
import home2 from '../../../public/home2.png';
import home3 from '../../../public/home3.png';


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
        <div className="text-[#1d1d1d] bg-[#E6E6E6]  h-screen flex p-10">
            <div className="w-[5%] pt-5 bg-[#f7f7f7] rounded-3xl flex flex-col items-center">
                <div className="mb-20 h-[40px] w-[40px] flex justify-center items-center bg-[#B4EBE6] text-[#f7f7f7] rounded-2xl font-bold">
                    <p>LA</p>
                </div>
                <div className=" flex flex-col gap-10">
                    <Image src={home} alt="icon" width={30} height={30} />
                    <Image src={property} alt="icon" />
                    <Image src={people} alt="icon" />
                    <Image src={add} alt="icon" />
                </div>
                
            </div>
            <div className="w-[95%] px-10">
                <div className="flex justify-between items-center">
                    <p><span className="text-[24px]">Good morning, </span><span className="text-[24px] font-bold">Adetola!</span></p>
                    <div className="flex gap-5 items-center">
                        <div className="w-[30px] h-[30px] bg-[#D9D9D9] rounded-lg flex items-center justify-center">
                            <Image src={bell} alt="bell-icon" color="black"  />
                        </div>
                        <div className="flex  items-center">
                            <div className="w-[30px] h-[30px] bg-gray-400 rounded-full mr-2">
                                <Image src={profile} alt="profile-pic" className="rounded-full w-[30px] h-[30px] object-cover" />
                            </div>
                            <div className="cursor-pointer" onClick={() => setIsLogOutButton((prev) => !prev)}>
                                <IoMdArrowDropdown />
                            </div>
                        </div>
                    </div>

                    {isLogOutButton && <button onClick={() => signOut(auth)} className="absolute h-[30px] w-[150px] bg-[#f7f7f7] rounded-lg right-10 top-22 flex justify-center items-center text-[#1d1d1d] text-sm cursor-pointer">
                        Log out
                    </button>}
                </div>

                <div className="mt-10">
                    <div className="flex gap-10 ">
                        <div className="p-5 h-[150px] w-full bg-[#f7f7f7] rounded-xl flex gap-5 items-center">
                            <Image src={property} alt="icon" height={100} width={100} />
                            <div>
                                <p className="text-[18px] font-bold">Property</p>
                                <p className="text-[14px] text-[#808080] font-bold">Current number</p>
                                <p className="text-[18px] font-bold">4</p>
                            </div>
                        </div>
                        <div className="p-5 h-[150px] w-full bg-[#f7f7f7] rounded-xl flex gap-5 items-center">
                            <Image src={people} alt="icon" height={100} width={100} />
                            <div>
                                <p className="text-[18px] font-bold">Tenant</p>
                                <p className="text-[14px] text-[#808080] font-bold">Current number</p>
                                <p className="text-[18px] font-bold">14</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <div className="h-[200px] w-[28%] bg-[#f7f7f7] flex flex-col gap-1 rounded-xl p-5">
                            <Image src={payment1} alt="icon" height={100} width={100} />
                            <p className="text-[18px]">Total rent collected</p>
                            <p className="text-[14px] font-bold">₦ 450, 000, 000</p>
                        </div>
                        <div className="h-[200px] w-[28%] bg-[#f7f7f7] flex flex-col gap-1 rounded-xl p-5">
                            <Image src={payment2} alt="icon" height={100} width={100} />
                            <p className="text-[18px]">Outstanding rent</p>
                            <p className="text-[14px] font-bold">₦ 5, 000, 000</p>
                        </div>
                        <div className="max-h-[400px] w-[60%] bg-[#f7f7f7] rounded-xl p-5">
                            <div className="flex justify-between items-center">
                                <p>Upcoming renewals</p>
                                <div className="h-[40px] w-[40px] border border-[#D9D9D9] flex justify-center items-center">
                                    <Image src={menu} alt="icon"  />
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                </div>
               
                

            </div>
            
        </div>
    );
};

export default Dashboard;
