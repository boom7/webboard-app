import Header from "./../components/Header";
import type { ReactNode } from "react";

export default function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E6E6E6] text-[#1F1F1F]">
      <Header />
      <div className="flex justify-center p-6">
        <div className="max-w-4xl w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
