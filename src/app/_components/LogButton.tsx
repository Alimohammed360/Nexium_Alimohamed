"use client";
import React from "react";

interface LoginButtonProps {
  login?: boolean;
  handleAuth?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ login, handleAuth }) => {
  return (
    <button
      onClick={handleAuth}
      className="px-6 py-2 rounded-md font-semibold transition-colors bg-blue-900 text-white hover:bg-blue-800 shadow-md"
    >
      {login ? "Logout" : "Login"}
    </button>
  );
};

export default LoginButton;
