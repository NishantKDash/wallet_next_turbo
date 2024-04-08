"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          onClick();
        }}
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 mb-2"
      >
        {children}
      </button>
    </div>
  );
};
