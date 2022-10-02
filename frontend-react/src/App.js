import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Value from './components/Value';
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom';
import MainPage from './routes/MainPage';
import Bookmarks from './routes/Bookmarks';

function App() {
  const [date, setDate] = useState(null);
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [rain, setRain] = useState(0);
  
  const [bookmarked, setBookmarked] = useState([]);
  
  async function fetchData(index){
    const cache = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.57/lat/59.3281/data.json')
    let d = await cache.json();

    const timeSeries = d.timeSeries;
    const weatherData = timeSeries[index];
    const parameters = weatherData.parameters;
    const validTime = weatherData.validTime;

    return {
      date: validTime,
      timeSeries,
      weatherData,
      parameters,
      temp: parameters[10].values[0],
      wind: parameters[14].values[0],
      rain: parameters[3].values[0]
    }
  }
  
  return (
    <Router>
      <header>
      <NavLink to="/" className="btn">
        Start
      </NavLink>
        <NavLink to={'/bookmarks'} className="btn">Bokmärken</NavLink>
      </header>
      <Routes>
        <Route path='/bookmarks' element={<Bookmarks 
          bookmarked={bookmarked} 
          setBookmarked={setBookmarked} 
          fetchData={fetchData} />} />
        <Route path='/' exact element={<MainPage 
          fetchData={fetchData} 
          setDate={setDate}
          setTemp={setTemp}
          setRain={setRain}
          setWind={setWind}
          bookmarked={bookmarked} 
          setBookmarked={setBookmarked} 
          temp={temp} 
          wind={wind} 
          rain={rain} 
          date={date} />} />
      </Routes>
    </Router>
  );
}

export default App;
