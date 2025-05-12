"use client";

import Login from "./components/Login";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row-reverse h-screen">
      <div className="flex-1 bg-[#006B59] flex flex-col justify-center items-center p-6">
        <p className="italic text-white text-lg">a Board</p>
      </div>

      <div className="flex-1 bg-[#0D2F2E] flex items-center justify-center p-6">
        <Login />
      </div>
    </main>
  );
}
