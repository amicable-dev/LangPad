// src/components/Home.tsx
import React from "react";
import type { Character, ViewType } from "../types";

interface HomeProps {
  setCurrentView: (view: ViewType) => void;
  characters?: Character[];
}

const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to LangPad!
      </h1>
      <p className="text-gray-600 mb-6">
        Learn Chinese characters through fun stroke order animations and practice.
      </p>

      {/* Decorative Chinese-themed images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <img src="/images/chinese1.png" alt="Chinese art" className="rounded-lg shadow-md" />
        <img src="/images/chinese2.png" alt="Calligraphy" className="rounded-lg shadow-md" />
        <img src="/images/chinese3.png" alt="Lanterns" className="rounded-lg shadow-md" />
        <img src="/images/chinese4.png" alt="Temple" className="rounded-lg shadow-md" />
      </div>

      {/* Quick links */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentView("library")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse Library
        </button>
        <button
          onClick={() => setCurrentView("draw")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
};

export default Home;
