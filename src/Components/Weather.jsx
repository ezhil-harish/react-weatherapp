import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import cloud from '../Assets/cloud.png'
import dizz from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'

const Weather = () => {
    const [weather, setweather]=useState(false);
    const inputref=useRef();
    const allicons={
        "01d": dizz,
        "01n": cloud,
        "02d": humidity,
        "02n": rain,
        "03d": snow,
        "03n": wind,
        "04d": rain,
        "04n": dizz,
        "10d": dizz,
    }
    const search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ddc5d4e380d57fec2b699e2c79569351`;
            const reponse = await fetch(url);
            const data = await reponse.json();
            console.log(data);
            const icon=allicons[data.weather[0].icon]|| rain;
            setweather({
                namae:data.name,
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.main.name,
                icon: icon
            })
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        search("Pondicherry");
    },[]);
  return (
    <div className='main'>
        <div className="card">
            <h1>Weather App</h1>
            <div className="inputbox">
                <input ref={inputref} type="text" placeholder='City name'/>
                <button onClick={()=>search(inputref.current.value)}>Search</button>
            </div>
            <div className="imgbox">
                <h2>{weather.namae}</h2>
                <img src={weather.icon} alt="" />
                <span>{weather.temperature}°C</span>
            </div>
            <div className="humidity">
                <span>Humidity: {weather.humidity}% </span>
                <span>Wind Speed: {weather.windspeed}Km/hr </span>
            </div>
        </div>
    </div>
  )
}

export default Weather