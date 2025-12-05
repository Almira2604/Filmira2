import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

export default function SidebarBottom() {
    const navItems = [
        { name: "Settings", icon: <IoSettingsOutline className="text-xl" />, link: "/settings" },
        { name: "Log Out", icon: <IoLogOutOutline className="text-xl" />, link: "/logout" },
    ];
  return (
    <div>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="group flex items-center md:gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition"
          >
            <div className="text-gray-200">{item.icon}</div>
            <span className="hidden md:inline text-gray-200">{item.name}</span>

            {/* tooltip on small screens */}
            <span className="md:hidden absolute left-16 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap transition">
              {item.name}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}
