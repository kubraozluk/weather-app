"use client";

export default function HourlyForecast({
  data,
  selectedIndex,
  onSelectDay,
  unit,
}) {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m, weather_code } = data.hourly;
  const dailyDateStr = data.daily.time[selectedIndex];

  const dayOptions = data.daily.time.map((dateStr, index) => {
    const date = new Date(dateStr);
    if (new Date().toDateString() === date.toDateString()) return "Bugün";
    return date.toLocaleDateString("tr-TR", { weekday: "long" });
  });

  const dayHourlyIndices = time.reduce((acc, t, i) => {
    if (t.startsWith(dailyDateStr)) acc.push(i);
    return acc;
  }, []);

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

  const formatHour = (timeStr) => {
    return new Date(timeStr).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Derece Çevirici Fonksiyon
  const formatTemp = (temp) => {
    if (unit === "F") {
      return Math.round(temp * 1.8 + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="bg-weather-card p-6 rounded-[30px] h-full w-full shadow-2xl flex flex-col">
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
        <h3 className="text-white font-bold uppercase tracking-wider text-sm">
          Saatlik Tahmin
        </h3>

        <select
          value={selectedIndex}
          onChange={(e) => onSelectDay(Number(e.target.value))}
          className="bg-[#0B131E] text-blue-400 text-sm font-bold py-1 px-3 rounded-lg outline-none cursor-pointer border border-white/10 hover:border-blue-500 transition-colors"
        >
          {dayOptions.map(
            (dayName, index) =>
              index < 7 && (
                <option
                  key={index}
                  value={index}
                  className="bg-weather-card text-white"
                >
                  {dayName}
                </option>
              )
          )}
        </select>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {dayHourlyIndices.map((realIndex) => (
          <div
            key={realIndex}
            className="flex items-center justify-between hover:bg-white/5 p-4 rounded-2xl transition-all cursor-default group"
          >
            <span className="text-gray-300 font-semibold w-16 group-hover:text-white transition-colors">
              {formatHour(time[realIndex])}
            </span>
            <span className="text-3xl filter drop-shadow-sm">
              {getIcon(weather_code[realIndex])}
            </span>
            <span className="text-white font-bold text-xl w-12 text-right">
              {formatTemp(temperature_2m[realIndex])}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
