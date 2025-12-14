"use client";

import { useState } from "react";

// onSearch: Ana sayfadan gelen "Ara" fonksiyonu
export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return; // Boşlukları temizle, boşsa dur
    onSearch(city); // Şehri ana sayfaya fırlat
    setCity(""); // Kutuyu temizle
  };

  return (
    <div className="flex items-center gap-4 bg-weather-card p-4 rounded-xl shadow-lg w-full max-w-md">
      <div className="flex-1 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-weather-text"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Şehir ara..."
          className="w-full bg-transparent text-white placeholder-weather-text outline-none text-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-weather-blue hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        Ara
      </button>
    </div>
  );
}
