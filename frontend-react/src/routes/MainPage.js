
import {useEffect, useState} from 'react';
import Value from '../components/Value';
import {useNavigate} from 'react-router-dom';

function MainPage({fetchData, temp, wind, rain, date}) {
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    // 59.3281152,18.0679784,16.57
    fetchData(index);
    let b = [...bookmarked].filter((i) => i == date);
    setChecked((b.length > 0));
  }, [index, bookmarked]);

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
            id="bookmark" className={checked ? 'marked' : ''}>bookmark</button>
        </center>
        {bookmarked}
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
          
          {console.log("checked",checked)};
          <button onClick={() => {
              setIndex(index + 1);
            }}> next </button>
        </center>
      </main>
    </>
  );
}

export default MainPage;
/*
import {useEffect, useState} from 'react';
import Value from '../components/Value';
import {useNavigate, useParams} from 'react-router-dom';

function MainPage({fetchData, temp, wind, rain, date}) {
  const [checked, setChecked] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // 59.3281152,18.0679784,16.57
    console.log('sdfknodsnonpnpin')
    setChecked(false);
  }, []);

  


  function getDate(timeStamp){
    if(timeStamp) {
      let dd = new Date(timeStamp);
      const y = dd?.getFullYear();
      const m = (dd?.getMonth() < 10) ? `0${dd?.getMonth()}` : dd?.getMonth();
      const d = (dd?.getDate() < 10) ? `0${dd?.getDate()}` : dd?.getDate();
      const hh = dd?.getHours();
      const mm = (dd?.getMinutes() < 10) ? `0${dd?.getMinutes()}` : dd?.getMinutes();
      const ss = (dd?.getSeconds() < 10) ? `0${dd?.getSeconds()}` : dd?.getSeconds();

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
          {date}
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
            defaultChecked={checked}
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
            const index = params['id'] ? parseInt(params['id']) : 0;
              if (0 < index){
                setChecked(false);
                navigate(`${index - 1}`);
                // setIndex(index - 1);
              }
            }}> prev </button>
          
          {console.log("bookmarked",bookmarked)};
          {console.log("p",params)};
          <button onClick={() => {
            const index = params['id'] ? parseInt(params['id']) : 0;
              setChecked(false);
              navigate(`${index + 1}`);
              // setIndex(index + 1);
            }}> next </button>
        </center>
      </main>
    </>
  );
}

export default MainPage;

*/