import React from "react";
import SidebarTop from "./SidebarTop";
import SidebarLibrary from "./SidebarLibrary";
import SidebarBottom from "./SidebarBottom";

export default function Sidebar() {
  return (
    // fixed left sidebar: narrow on small screens, wider on md+
    <aside className="fixed left-0 top-0 h-screen bg-[#1e293b] w-16 md:w-56 p-4 z-50 flex flex-col justify-between">
      <div>
        <SidebarTop />
        <hr className="border-gray-700 my-6" />
        <SidebarLibrary />
        <SidebarBottom />
      </div>

      <div className="text-gray-400 text-xs md:text-sm">
        <p className="hidden md:block">© 2025 Filmira</p>
      </div>
    </aside>
  );
}
