import React from "react";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";

export default function SidebarTop() {
  const navItems = [
    { name: "Home", icon: <IoHomeOutline className="text-xl" />, link: "/home" },
    { name: "Discovery", icon: <FaRegCompass className="text-xl" />, link: "/discovery" },
    { name: "Trending", icon: <IoIosTrendingUp className="text-xl" />, link: "/trending" },
    { name: "Coming Soon", icon: <IoNotificationsOutline className="text-xl" />, link: "/coming-soon" },
  ];

  return (
    <div>
      <div className="pl-1 mb-6">
        <h1 className="text-2xl font-bold text-blue-400">
          <span className="hidden md:inline">FILMIRA</span>
          <span className="md:hidden">FM</span>
        </h1>
      </div>

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
  );
}
