import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-300 p-4 shadow-md">
      <div className="grid grid-cols-3 items-center">
        {/* Left placeholder */}
        <div></div>
        {/* Center: the main links */}
        <div className="flex gap-10 justify-center">
          <Link 
            href="/" 
            className="text-black text-lg transition-transform hover:scale-110"
          >
            Messages
          </Link>
          <Link 
            href="/" 
            className="text-black text-lg transition-transform hover:scale-110"
          >
            Students
          </Link>
          <Link 
            href="/" 
            className="text-black text-lg transition-transform hover:scale-110"
          >
            Lessons
          </Link>
        </div>
        {/* Right: profile link aligned to the right */}
        <div className="flex justify-end">
          <Link 
            href="/" 
            className="text-black text-lg transition-transform hover:scale-110"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar