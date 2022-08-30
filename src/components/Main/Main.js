import React, { useEffect, useRef } from "react";
import "./Main.Module.css";
import sun from "../../assets/sun.png";
import cloud from "../../assets/cloud.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSelectCity, getWeatherData } from "../../redux/weatherSlice";
import Weather from "../Weather/Weather";
import rain from "../../assets/rain.png";
const Main = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.weather.allCities);
  const selectCities = useSelector((state) => state.weather.selectCity);
  const data = useSelector((state) => state.weather.weatherData);
  const dateRef = useRef();
  function tarihSaat() {
    var date = new Date().toLocaleString("tr-TR");
    dateRef.current.innerHTML = date;
  }
  setInterval(tarihSaat, 500);

  setInterval(() => {
    Date();
  }, 1000);
  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        selectCities ? selectCities : "istanbul"
      }&appid=c039ab324444a7dbf26207aeb967e1b5&units=metric&lang=tr`
    )
      .then((res) => res.data)
      .then((data) => dispatch(getWeatherData(data)));
  }, [selectCities, dispatch]);
  return (
    <>
      <header>
        <div className="header-text">Pyson Weather App</div>
      </header>
      <div className="container">
        <div className="first-line-div">
          <div className="row">
            <div className="col-md-8 img-div">
              {data && (
                <img
                  src={
                    data.weather[0].description === "parçalı bulutlu" ||
                    data.weather[0].description === "az bulutlu" ||
                    data.weather[0].description === "parçalı az bulutlu"
                      ? cloud
                      : data.weather[0].description === "hafif yağmur" ||
                        data.weather[0].description === "yağmur" ||
                        data.weather[0].description ===
                          "orta şiddetli yağmur" ||
                        data.weather[0].description === "sağanak yağmur"
                      ? rain
                      : sun
                  }
                  alt="sun"
                  className="weather-img"
                />
              )}
              <div className="img-div-text">
                {data && (
                  <>
                    <p>{data.weather[0].description}</p>
                    <p>{data.main.temp} *C</p>
                    <p ref={dateRef}></p>
                  </>
                )}
                {!data && <p>Error</p>}
              </div>
            </div>
            <div className="col-md-4 first-line-right-div">
              <div>İl Seçiniz: {selectCities ? selectCities : "İstanbul"}</div>

              <select
                className="weather-select form-select"
                placeholder="Şehir Seçiniz"
                onChange={(e) => dispatch(getSelectCity(e.target.value))}
              >
                {cities.map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Weather />
      </div>
    </>
  );
};

export default Main;
