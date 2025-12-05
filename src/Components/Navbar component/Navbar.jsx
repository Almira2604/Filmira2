import React, { useState } from 'react'
import { FaSearch, FaBell } from 'react-icons/fa'
import { CgMenuHotdog } from 'react-icons/cg'

const navItems = [
  { label: "Movie", path: "/movie" },
  { label: "Series", path: "/series" },
  { label: "TV Shows", path: "/tvshows" },
]

function MobileNavbar({ setIsNavbarOpen, navItems }) {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 text-white">
      <button onClick={() => setIsNavbarOpen(false)} className="absolute top-4 right-4 text-2xl">X</button>
      {navItems.map((item, i) => (
        <a key={i} href={item.path} className="text-xl hover:text-blue-400">{item.label}</a>
      ))}
    </div>
  )
}

function Navbar({ darkMode }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 lg:px-6 px-4 lg:h-16 h-14 flex items-center justify-between shadow-md bg-[#0f172a] text-white`}>
      
      {/* Desktop nav */}
      <nav className="hidden md:flex md:space-x-6 space-x-4 font-medium">
        {navItems.map((item, i) => (
          <a 
            key={i} 
            href={item.path} 
            className={`hover:text-blue-400 ${darkMode ? "" : "hover:text-blue-600"}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right section */}
      <div className="flex items-center lg:space-x-6 space-x-13">
        <FaSearch className={`text-xl cursor-pointer ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`} />
        <FaBell className={`text-xl cursor-pointer ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`} />

        <div className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${darkMode ? "bg-blue-400 text-white" : "bg-blue-600 text-white"}`}>
          A
        </div>

        {/* Mobile menu button (only on phones) */}
        <div className="md:hidden block ml-4">
          <button onClick={() => setIsNavbarOpen(true)} className="text-3xl">
            <CgMenuHotdog />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isNavbarOpen && <MobileNavbar setIsNavbarOpen={setIsNavbarOpen} navItems={navItems} />}
    </header>
  )
}

export default Navbar
