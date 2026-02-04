"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function Lightbox({ src, title, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:scale-110 transition"
      >
        <X size={32} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[90vh]"
      >
        <img
          src={src}
          alt={title}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
        <p className="mt-4 text-center text-white text-lg">
          {title}
        </p>
      </div>
    </div>
  );
}
