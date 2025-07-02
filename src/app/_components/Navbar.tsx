"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import LoginButton from './LogButton';

const Navbar = () => {
    let session: boolean = true;
    const [isLoggedIn, setIsLoggedIn] = useState(session);

    const handleAuth = () => {
        setIsLoggedIn((prev) => !prev);
    };

    return (
        <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', gap: '1rem' }}>
            <div className='container mx-auto flex justify-between items-center'>
                <Link href={"/"} className='text-xl font-bold text-blue-800'>Contact Manager</Link>
                <div className='flex items-center space-x-4'>
                    {session ? (
                        <>
                            <Link href={"/contact"} className='text-blue-500 hover:text-blue-950 mr-8'>Contact</Link>
                            <LoginButton isLoggedIn={session} />
                        </>
                    ) : (
                        <LoginButton isLoggedIn={session} />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar