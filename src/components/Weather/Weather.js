/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import sun from "../../assets/sun.png";
import rain from "../../assets/rain.png";
import "./Weather.Module.css";
import cloud from "../../assets/cloud.png";
import axios from "axios";
import { useSelector } from "react-redux";
const Weather = () => {
  const [data, setData] = useState("");
  const weather = useSelector((state) => state.weather.weatherData);

  useEffect(() => {
    axios(
      weather
        ? `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=hourly,minutely&units=metric&lang=tr&appid=4bfb6dc33daaa4a28d8691947f075ef7`
        : `https://api.openweathermap.org/data/2.5/onecall?lat=41.0351&lon=28.9833&exclude=hourly,minutely&units=metric&lang=tr&appid=4bfb6dc33daaa4a28d8691947f075ef7`
    )
      .then((res) => res.data)
      .then((data) => setData(data));
  }, [weather]);
  console.log(weather);

  return (
    <div>
      {data && (
        <div className="last-line-div">
          {data.daily.map((dat, index) => {
            let date = new Date(dat.dt * 1000);
            if (index < 7 && index > 0) {
              return (
                <div className="cards" key={index}>
                  <div className="cards-text">
                    {date.toUTCString().slice(0, 3)}
                  </div>
                  <div className="card-weather">
                    <img
                      src={
                        dat.weather[0].description === "parçalı bulutlu" ||
                        dat.weather[0].description === "az bulutlu" ||
                        dat.weather[0].description === "parçalı az bulutlu"
                          ? cloud
                          : dat.weather[0].description === "hafif yağmur" ||
                            dat.weather[0].description ===
                              "orta şiddetli yağmur" ||
                            dat.weather[0].description === "yağmur" ||
                            dat.weather[0].description === "sağanak yağmur"
                          ? rain
                          : sun
                      }
                      alt=""
                      className="card-weather-img"
                    />
                    {dat.weather[0].description}
                  </div>

                  <div className="card-weather-heat">
                    Max : {dat.temp.max} *C
                  </div>
                  <div className="card-weather-heat">
                    Min : {dat.temp.min} *C
                  </div>
                  <div className="card-weather-date">{date.toUTCString()}</div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Weather;
