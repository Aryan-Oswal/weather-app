import   React, {useState} from 'react';

import './App.css';

  const api = {  
  key: "d0875a4658a82d3e8bb08b4ef49c9a13",
  base: "https://api.openweathermap.org/data/2.5/"
 }

function App() {
  const [query ,setQuery] = useState("");
  
  const [weather ,setWeather] =useState({})

  const search = evt => {  
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
       
        
      });

    
    }
}

  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June ","July ","August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    
    let year = d.getFullYear();

    return `${day} ${date} ${month} ,${year}`
  } 



  return (
    <div className="App">
        <main>
          <div className="search_box">
              <input
                type="text"
                className="search_bar"
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value = {query}
                onKeyPress={search}
              />
              </div>
              {( typeof weather.main != "undefined") ? (  
            <div>
            
            <div className="location_box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="weather_box">
                <div className="temp">
                  {Math.round(weather.main.temp)}℃
                </div>
                <div className="min"> Min Temprature:{Math.round(weather.main.temp_min)}℃</div>
                <div className="max">Max Temprature:{Math.round(weather.main.temp_max)}℃</div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="humid">Humidity:{weather.main.humidity}</div>
                <div className="wind">Wind Speed:{weather.wind.speed}</div>
                </div>
              </div>
            </div>
          ) : ['']}
        </main>
    </div>
  );
}

export default App;
