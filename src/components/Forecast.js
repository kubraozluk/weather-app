"use client";

export default function Forecast({ data, selectedIndex, onSelectDay, unit }) {
  if (!data || !data.daily) return null;

  const { time, weather_code, temperature_2m_max, temperature_2m_min } =
    data.daily;

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    if (new Date().toDateString() === date.toDateString()) return "Bugün";
    return date.toLocaleDateString("tr-TR", { weekday: "short" });
  };

  const getIcon = (code) => {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 95) return "⛈️";
    return "❓";
  };

  // Derece Çevirici Fonksiyon
  const formatTemp = (temp) => {
    if (unit === "F") {
      return Math.round(temp * 1.8 + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-7 gap-4">
      {time.map((day, index) => {
        if (index > 6) return null;

        const isSelected = index === selectedIndex;

        return (
          <div
            key={index}
            onClick={() => onSelectDay(index)}
            className={`p-4 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg transition-all cursor-pointer border-2 ${
              isSelected
                ? "bg-blue-600 border-blue-400 scale-105"
                : "bg-weather-card border-transparent hover:bg-gray-800 hover:border-gray-600"
            }`}
          >
            <p
              className={`text-sm mb-1 font-semibold ${
                isSelected ? "text-blue-100" : "text-gray-400"
              }`}
            >
              {getDayName(day)}
            </p>
            <div className="text-4xl my-2 filter drop-shadow-md">
              {getIcon(weather_code[index])}
            </div>
            <div className="flex gap-2 text-sm font-bold">
              <span className="text-white">
                {formatTemp(temperature_2m_max[index])}°
              </span>
              <span className="text-gray-500">
                {formatTemp(temperature_2m_min[index])}°
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
