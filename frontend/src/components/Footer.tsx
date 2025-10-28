import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#3B5BA9] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Reporter</h3>
            <p className="text-sm text-gray-200">
              Streamlining shift reporting and operations management for modern businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-gray-200 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-200 hover:text-white transition">
                  Profile
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Logo Section (Center) */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 rounded-full bg-white p-4">
              <svg
                width="60"
                height="50"
                viewBox="0 0 100 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#3B5BA9]"
              >
                {/* Desktop/Monitor */}
                <rect x="10" y="15" width="50" height="35" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="16" y="20" width="20" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="16" y1="35" x2="32" y2="35" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="39" x2="52" y2="39" stroke="currentColor" strokeWidth="2"/>
                <circle cx="14" cy="18" r="1" fill="currentColor"/>
                <line x1="25" y1="52" x2="45" y2="52" stroke="currentColor" strokeWidth="3"/>

                {/* Mobile Phone */}
                <rect x="60" y="25" width="18" height="30" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
                <line x1="63" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="63" y1="48" x2="75" y2="48" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="67" y1="51" x2="71" y2="51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-wider">Reporter</h2>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Email: support@reporter.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Business St.</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-blue-400">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
            <p>&copy; {new Date().getFullYear()} The Reporter. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
