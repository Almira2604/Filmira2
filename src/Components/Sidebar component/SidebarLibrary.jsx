import React from "react";
import { FaRegClock } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";


export default function SidebarLibrary() {
  const navItems = [
      { name: "Recent", icon: <FaRegClock  className="text-xl" />, link: "/recent" },
      { name: "Top Rated", icon: <FaRegStar  className="text-xl" />, link: "/top rated" },
      { name: "Download", icon: <FiDownload className="text-xl" />, link: "/download" },
    ];
  return (
    <div className="mt-8">
      <h2 className="text-sm md:text-lg font-semibold text-gray-200 mb-3">Library</h2>
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
