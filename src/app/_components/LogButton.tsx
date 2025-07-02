"use client";
import React, { useState } from "react";

interface LoginButtonProps {
    isLoggedIn?: boolean; // Optional prop
    handleAuth?: () => void; // Optional prop for custom authentication handling
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoggedIn, handleAuth }) => {
    
    return (
        <button
            onClick={handleAuth}
            className={`px-6 py-2 rounded-md font-semibold transition-colors
                ${
                    isLoggedIn
                        ? "bg-blue-900 text-white hover:bg-blue-800"
                        : "bg-blue-700 text-white hover:bg-blue-800"
                }
                shadow-md
            `}
        >
            {isLoggedIn ? "Logout" : "Login"}
        </button>
    );
};

export default LoginButton;
