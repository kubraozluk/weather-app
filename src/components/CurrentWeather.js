"use client";

export default function CurrentWeather({ data, unit }) {
  if (!data) return null;

  const { current, cityName } = data;
  let temp = current.temperature_2m;
  let feelsLike = current.apparent_temperature;

  // EĞER BİRİM FAHRENHEIT İSE ÇEVİR
  if (unit === "F") {
    temp = temp * 1.8 + 32;
    feelsLike = feelsLike * 1.8 + 32;
  }

  const weatherCode = current.weather_code;

  const date = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getWeatherStatus = (code) => {
    if (code === 0) return { label: "Açık", icon: "☀️" };
    if (code === 1 || code === 2)
      return { label: "Parçalı Bulutlu", icon: "⛅" };
    if (code === 3) return { label: "Kapalı", icon: "☁️" };
    if (code >= 45 && code <= 48) return { label: "Sisli", icon: "🌫️" };
    if (code >= 51 && code <= 67) return { label: "Yağmurlu", icon: "🌧️" };
    if (code >= 71 && code <= 77) return { label: "Karlı", icon: "❄️" };
    if (code >= 80 && code <= 82) return { label: "Sağanak", icon: "🌦️" };
    if (code >= 95) return { label: "Fırtınalı", icon: "⛈️" };
    return { label: "Bilinmiyor", icon: "❓" };
  };

  const status = getWeatherStatus(weatherCode);

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 mt-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[30px] p-10 text-white shadow-2xl relative overflow-hidden h-[300px] flex flex-col justify-between">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 opacity-20 rounded-full blur-xl"></div>

        <div className="z-10">
          <h2 className="text-4xl font-bold tracking-wide drop-shadow-md">
            {cityName}
          </h2>
          <p className="text-blue-100 text-lg mt-2 font-medium">{date}</p>
        </div>

        <div className="flex items-end justify-between z-10">
          <div className="flex flex-col">
            <span className="text-8xl font-bold tracking-tighter drop-shadow-lg">
              {Math.round(temp)}°
            </span>
            <span className="text-2xl font-semibold mt-1 opacity-90">
              {status.label}
            </span>
          </div>
          <div className="text-8xl filter drop-shadow-lg animate-pulse-slow">
            {status.icon}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailItem
          label="Rüzgar"
          value={`${current.wind_speed_10m} km/h`}
          icon="🌬️"
        />
        <DetailItem
          label="Nem"
          value={`${current.relative_humidity_2m}%`}
          icon="💧"
        />
        <DetailItem
          label="Hissedilen"
          // Hissedilen sıcaklığı çevirdik
          value={`${Math.round(feelsLike)}°`}
          icon="🌡️"
        />
        <DetailItem
          label="Yağış"
          value={`${current.precipitation} mm`}
          icon="☔"
        />
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="bg-weather-card/80 backdrop-blur-md p-5 rounded-2xl flex flex-col items-start justify-center shadow-lg border border-white/5 hover:bg-weather-card transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">
          {label}
        </span>
      </div>
      <span className="text-3xl font-bold text-white">{value}</span>
    </div>
  );
}
