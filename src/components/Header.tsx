"use client";
import { useState } from "react";
import Image from "next/image";
import UserIcon from "./UserIcon"; // Adjust path as necessary
import Link from "next/link";
import logo from "@/public/mainLogo.png"; // Adjust path as necessary

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Start with user not logged in

    return (
        <main className="">
            <div className="flex bg-black w-full h-18 items-center justify-between">
                <div className="flex bg-black justify-start">
                    <Link href="/chat" passHref>
                        <Image src={logo} alt="logo" className="w-56 ml-10" />
                    </Link>
                </div>
                {!isLoggedIn ? (
                    <Link href="/login">
                        <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-full transition-transform transform hover:scale-105 shadow-lg">
                            Login
                        </button>
                    </Link>
                ) : (
                    <UserIcon />
                )}
            </div>
        </main>
    );
}
