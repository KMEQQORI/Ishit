"use client";
import { useState } from "react";
import { signOut } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/user.store";
import NavbarMenu from "@/components/Navbar/NavbarMenu";
import Link from "next/link";
import Image from "next/image";
import { UserType } from "@/types/user.type";
import { AnimatePresence, motion } from "motion/react";

export default function OpenNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const user = useUserStore((state) => state.user) as UserType;

  const handleLogout = async () => {
    await signOut(auth);
    logoutUser();
  };
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-slate-200 p-2 flex justify-between items-center">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-12 h-12 bg-gray-900 text-white p-3 rounded-md focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* User Profile SVG */}
        <div className="w-16 h-16 flex  items-center justify-center">
          <Link href="/profile">
            <img
              className="rounded-full"
              src={user?.photoURL || "/logo.png"}
              alt="Vercel Logo"
              width={300}
              height={300}
            />
          </Link>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence initial={true}>
        {isMenuOpen && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 200 }}
          >
            <NavbarMenu setIsMenuOpen={setIsMenuOpen} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
