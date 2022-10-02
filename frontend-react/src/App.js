import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Value from './components/Value';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './routes/MainPage';
import Routing from './routes/Routing';

function App() {
  const [date, setDate] = useState(null);
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [rain, setRain] = useState(0);
  
  function fetchData(index){
    fetch('http://localhost:8080/api?lon=16.57&lat=59.3281', {
      mode: 'no-cors'
    })
    .then(r => r.json())
    .then(d => {
      const weatherData = d.timeSeries[index];
      const parameters = weatherData.parameters;
      setDate(weatherData.validTime);
      setTemp(parameters[10].values[0]);
      setWind(parameters[14].values[0]);
      setRain(parameters[3].values[0]);
      console.log(parameters[14].values[0])
    });
    
  }
  useEffect(()=>{
    fetchData(0);
  }, [])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage 
          fetchData={fetchData} 
          temp={temp} 
          wind={wind} 
          rain={rain} 
          date={date} />} />
        <Route path='/bookmarks' element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
