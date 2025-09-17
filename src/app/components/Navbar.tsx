'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { usePathname } from 'next/navigation';
import { useToken } from './context/TokenContext';

type GoogleUser = {
  name: string;
  email: string;
  picture: string;
};

// Extend GoogleUser with JWT-specific fields
interface JwtPayload extends GoogleUser {
  sub: string; // Subject (user ID)
  iss: string; // Issuer
  aud: string; // Audience
  exp: number; // Expiration time
  iat: number; // Issued at
}

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const { setToken } = useToken();

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (desktopDropdownRef.current && !desktopDropdownRef.current.contains(target)) &&
        (mobileDropdownRef.current && !mobileDropdownRef.current.contains(target))
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY <= 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Google login success
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      console.error('No credential received');
      return;
    }
    const decoded: JwtPayload = jwtDecode(token);
    setToken(token);
    localStorage.setItem('google-token', token);

    const userData: GoogleUser = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    setUser(userData);
    localStorage.setItem('google-user', JSON.stringify(userData));

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  };

  const handleSignOut = () => {
    console.log('🚪 Signing out...');
    setUser(null);
    localStorage.removeItem('google-user');
    setShowDropdown(false);
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('google-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-20 z-50 p-4 md:p-6 flex justify-between items-center transition-all duration-300 ${
          isTransparent ? 'bg-transparent backdrop-blur-sm' : 'backdrop-blur-md bg-white/80'
        }`}
      >
        <div className="flex items-center space-x-4">
          <img src="/sesuni.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
          <h1 className="text-xl md:text-2xl font-bold text-black">SCET OnePlace</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <a className="text-black font-bold hover:text-blue-600" href="#about">
            About Us
          </a>
          <a className="text-black font-bold hover:text-blue-600" href="#policy">
            Policy
          </a>
          <a className="text-black font-bold hover:text-blue-600" href="#contact">
            Contact Us
          </a>
          {pathname === '/dashboard' && (
            <div className="relative">
              <button
                onClick={() => setShowAddDropdown((prev) => !prev)}
                className="text-black font-bold rounded inline-flex items-center"
              >
                Add
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showAddDropdown && (
                <div className="absolute z-10 bg-white text-black shadow-lg mt-2 rounded-md w-40">
                  <a href="/dashboard/addcompany" className="block px-4 py-2 hover:bg-gray-100">
                    Add Company
                  </a>
                  <a href="/dashboard/addoffer" className="block px-4 py-2 hover:bg-gray-100">
                    Add Offer
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Profile/Login */}
        <div className="relative hidden md:block" ref={desktopDropdownRef}>
          {user ? (
            <>
              <img
                src={user.picture}
                alt={user.name}
                onClick={() => setShowDropdown((prev) => !prev)}
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded p-4 z-[9999]">
                  <p className="font-semibold text-black">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error('❌ Google Login Failed')}
            />
          )}
        </div>

        {/* Hamburger Menu */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-0 w-full z-40 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } md:hidden`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <a className="text-black font-bold hover:text-blue-600" href="#about">
            About Us
          </a>
          <a className="text-black font-bold hover:text-blue-600" href="#policy">
            Policy
          </a>
          <a className="text-black font-bold hover:text-blue-600" href="#contact">
            Contact Us
          </a>
          {pathname === '/dashboard' && (
            <>
              <a href="/dashboard/addcompany" className="text-black font-bold hover:text-blue-600">
                Add Company
              </a>
              <a href="/dashboard/addoffer" className="text-black font-bold hover:text-blue-600">
                Add Offer
              </a>
            </>
          )}

          {/* Mobile Profile/Login */}
          <div className="mt-4 flex justify-center relative" ref={mobileDropdownRef}>
            {user ? (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 shadow cursor-pointer"
                />
                {showDropdown && (
                  <div className="absolute top-14 bg-white shadow-lg rounded p-3 text-center w-64 z-[9999]">
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('❌ Google Login Failed')}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;