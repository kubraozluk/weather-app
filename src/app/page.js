"use client";

import { useState } from "react";
import SearchBox from "../components/SearchBox";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import HourlyForecast from "../components/HourlyForecast";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [unit, setUnit] = useState("C");

  // YENİ: Menünün açık mı kapalı mı olduğunu takip eden hafıza
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchWeather = async (city) => {
    try {
      const formattedCity = city.toLocaleUpperCase("tr-TR");
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          formattedCity
        )}&count=1&language=tr&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("Şehir bulunamadı! Lütfen tekrar dene.");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await weatherRes.json();

      setWeatherData({ ...data, cityName: name });
      setSelectedDayIndex(0);
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Veri çekilirken bir hata oldu.");
    }
  };

  // Birim seçilince çalışacak fonksiyon
  const handleUnitSelect = (selectedUnit) => {
    setUnit(selectedUnit);
    setIsDropdownOpen(false); // Seçim yapınca menüyü kapat
  };

  return (
    <main className="min-h-screen bg-weather-dark text-white py-8 px-4 md:px-16">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-16 relative">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-3xl">☀️</span>
          <h1 className="text-xl font-bold tracking-wide">Weather Now</h1>
        </div>

        {/* --- TASARIMA UYGUN DROPDOWN MENU --- */}
        <div className="relative">
          {/* Ana Buton */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-weather-card py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors border border-white/10 shadow-lg"
          >
            ⚙️ Units
            {/* Küçük ok işareti */}
            <span
              className={`text-xs transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Açılır Pencere (Sadece isDropdownOpen true ise görünür) */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-40 bg-weather-card border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col">
              <button
                onClick={() => handleUnitSelect("C")}
                className={`px-4 py-3 text-left text-sm hover:bg-gray-700 transition-colors flex justify-between items-center ${
                  unit === "C" ? "text-blue-400 font-bold" : "text-white"
                }`}
              >
                Celsius (°C)
                {unit === "C" && <span>✓</span>}
              </button>
              <div className="h-[1px] bg-white/10"></div> {/* Çizgi */}
              <button
                onClick={() => handleUnitSelect("F")}
                className={`px-4 py-3 text-left text-sm hover:bg-gray-700 transition-colors flex justify-between items-center ${
                  unit === "F" ? "text-blue-400 font-bold" : "text-white"
                }`}
              >
                Fahrenheit (°F)
                {unit === "F" && <span>✓</span>}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ANA İÇERİK */}
      <div className="flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          How's the sky looking today?
        </h2>

        <SearchBox onSearch={fetchWeather} />

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-12 w-full max-w-7xl">
            <div className="flex flex-col gap-8">
              <CurrentWeather data={weatherData} unit={unit} />
              <Forecast
                data={weatherData}
                selectedIndex={selectedDayIndex}
                onSelectDay={setSelectedDayIndex}
                unit={unit}
              />
            </div>
            <div className="flex flex-col h-full">
              <HourlyForecast
                data={weatherData}
                selectedIndex={selectedDayIndex}
                onSelectDay={setSelectedDayIndex}
                unit={unit}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
