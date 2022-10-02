
import {useEffect, useState} from 'react';
import Value from '../components/Value';
import {useNavigate} from 'react-router-dom';

function MainPage({fetchData, temp, wind, rain, date, bookmarked, setBookmarked, setDate, setTemp, setWind, setRain}) {
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 59.3281152,18.0679784,16.57
    (async function(){
        const weather = await fetchData(index);

        setDate(weather.date);
        setTemp(weather.temp);
        setWind(weather.wind);
        setRain(weather.rain);
    })()
  }, [index]);

  function getDate(timeStamp){
    if(timeStamp) {
      let dd = new Date(timeStamp);
      const y = dd?.getFullYear();
      const m = (dd?.getMonth() < 10) ? `0${dd?.getMonth()}`: dd?.getMonth();
      const d = (dd?.getDate() < 10) ? `0${dd?.getDate()}`: dd?.getDate();
      const hh = (dd?.getHours() < 10) ? `0${dd?.getHours()}`: dd?.getHours();
      const mm = (dd?.getMinutes() < 10) ? `0${dd?.getMinutes()}`: dd?.getMinutes();
      const ss = (dd?.getSeconds() < 10) ? `0${dd?.getSeconds()}`: dd?.getSeconds();

    return `${y}-${parseInt(m) + 1}-${d} ${hh}:${mm}:${ss}`;
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
        <button 
            type="button"
            onClick={() => {
              const a = [...bookmarked];
              let add = true;
                for (let i = 0; i < a.length; i++){
                  if (a[i] == date) {
                    add = false;
                  }
                }
                if(add){
                  date && a.push(date);
                  setBookmarked(a);
                } else {
                    let b = [...a].filter((e) => {
                        return !(e == date)
                    });
                    setBookmarked(b)
                }
            }} 
            id="bookmark" className={[...bookmarked].includes(date) ? 'marked' : ''}>bokmärk</button>
        </center>
      </header>
      <main>
        <center>
          <Value name={'Temperatur'} value={temp} unit={'C'}/>
          <Value name={'Vind'} value={wind} unit={'m/s'}/>
          <Value name={'Regn'} value={rain} unit={'kg/m2/h'}/>
        </center>
        <center>
          <button onClick={() => {
              if (0 < index){
                setIndex(index - 1);
              }
            }}> prev </button>
          <button onClick={() => {
              setIndex(index + 1);
            }}> next </button>
        </center>
      </main>
    </>
  );
}

export default MainPage;
