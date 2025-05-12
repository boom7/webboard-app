"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");
    setIsSignedIn(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsSignedIn(false);
    setShowLogoutConfirm(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-[#294B29] text-white px-4 py-3 shadow-md relative z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-serif italic">
          a Board
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm">{username}</span>
          <img
            src={`https://ui-avatars.com/api/?name=${
              username || "User"
            }&background=random&color=fff`}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          {isSignedIn ? (
            <>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="bg-[#4CAF50] hover:bg-[#3E5D4B] px-4 py-1 text-sm rounded text-white transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/">
              <button className="bg-[#4CAF50] hover:bg-[#3E5D4B] px-4 py-1 text-sm rounded text-white transition">
                Sign in
              </button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          {isSignedIn ? (
            <button
              className="block w-full bg-[#FF5C5C] hover:bg-[#cc4c4c] px-4 py-2 text-white rounded text-sm transition"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Sign out
            </button>
          ) : (
            <Link href="/">
              <button className="block w-full bg-[#4CAF50] hover:bg-[#3E5D4B] px-4 py-2 text-white rounded text-sm transition">
                Sign in
              </button>
            </Link>
          )}
        </div>
      )}

      {showLogoutConfirm && (
        <LogoutModal
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
