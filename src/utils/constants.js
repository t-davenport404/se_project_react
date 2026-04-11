export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/day_sunny.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/day_cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/day_fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/day_rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/day_snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/day_storm.svg", import.meta.url).href,
  },
  //Night
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/night_sunny.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/night_cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/night_fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/night_rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/night_snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/night_storm.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default_day.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default_night.svg", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 33.590808759419,
  longitude: -84.41692398046567,
};
export const APIkey = "fa2ca66c2e58d56f7108b18102bb85ff";
