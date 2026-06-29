import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 lg:ml-72">
          <Navbar />
          <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}