import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Value from './components/Value';

function App() {
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

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

      console.log("weatherData", weatherData);
      console.log(parameters[10].values[0]);
      setDate(weatherData.validTime);

      setTemp(parameters[10].values[0]);
      setWind(parameters[14].values[0]);
      setRain(parameters[3].values[0]);
    })
  }, [index]);

  useEffect(() => {
    setChecked(false);
  }, [index]);

  function getDate(timeStamp){
    if(timeStamp) {
      let dd = new Date(timeStamp);
      const y = dd?.getFullYear();
      const m = (dd?.getMonth() < 10) ? `0${dd?.getMonth()}`: dd?.getMonth();
      const d = (dd?.getDate() < 10) ? `0${dd?.getDate()}`: dd?.getDate();
      const hh = dd?.getHours();
      const mm = (dd?.getMinutes() < 10) ? `0${dd?.getMinutes()}`: dd?.getMinutes();
      const ss = (dd?.getSeconds() < 10) ? `0${dd?.getSeconds()}`: dd?.getSeconds();

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    } else{
      return '';
    }
  }

  return (
    <>
      <header>
        <center>
          {getDate(date)}
        </center>
        <center>
        <input 
            type="checkbox"
            onClick={(e) => {
              const a = [...bookmarked];
              console.log('a', a);
              setChecked(e.target.checked);
              if (e.target.checked) {
                let add = true;
                for (let i = 0; i < a.length; i++){
                  if (a[i] == date) {
                    add = false;
                  }
                }
                if(add){
                  date && a.push(date);
                  setBookmarked(a);
                }
              } else if (!e.target.checked) {
                let b = [...a].filter((e) => {
                  return !(e == date)
                });
                setBookmarked(b)
              }
            }} 
            checked={checked}
            id="bookmark"
            name="bookmark"
            />
            <label htmlFor='bookmark'>bookmark</label>
        </center>
        {bookmarked}
      </header>
      <main>
        <center>
          <Value value={temp} unit={'C'}/>
          <Value value={wind} unit={'m/s'}/>
          <Value value={rain} unit={'kg/m2/h'}/>
        </center>
        <center>
          <button onClick={() => {
              if (0 < index){
                setChecked(false);
                setIndex(index - 1);
              }
            }}> prev </button>
          
          {console.log("bookmarked",bookmarked)};
          <button onClick={() => {
              setChecked(false);
              setIndex(index + 1);
            }}> next </button>
        </center>
      </main>
    </>
  );
}

export default App;
