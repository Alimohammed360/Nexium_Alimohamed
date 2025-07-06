"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import LoginButton from './LogButton';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleAuth = () => setIsLoggedIn(prev => !prev);

  return (
    <nav className="p-4 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-800">
          Contact Manager
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/contact" className=" text-black hover:text-blue-950 mr-8">
                Contact
              </Link>
              <LoginButton login={isLoggedIn} handleAuth={toggleAuth} />
            </>
          ) : (
            <>
              <LoginButton login={isLoggedIn} handleAuth={toggleAuth} />
              <Link href="/register" className="hover:text-blue-950 mr-8">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
