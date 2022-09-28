import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Value from './components/Value';

function App() {
  const [index, setIndex] = useState(0);

  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [rain, setRain] = useState(0);

  useEffect(() => {
    // 59.3281152,18.0679784,16.57
    fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.57/lat/59.3281/data.json')
    .then(r => r.json())
    .then(d => {
      console.log("d",d)

      const weatherData = d.timeSeries[index];
      const parameters = weatherData.parameters;

      console.log(weatherData, parameters[10].values[0]);

      setTemp(parameters[10].values[0]);
      setWind(parameters[14].values[0]);
      setRain(parameters[3].values[0]);
    })
  }, [index]);

  return (
    <>
      <header>

      </header>
      <main>
        <center>
          <Value value={temp} unit={'C'}/>
          <Value value={wind} unit={'m/s'}/>
          <Value value={rain} unit={'kg/m2/h'}/>
        </center>
      </main>
    </>
  );
}

export default App;
