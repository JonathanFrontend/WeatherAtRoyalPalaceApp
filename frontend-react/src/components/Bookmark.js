import React, { useState } from 'react'
import Value from './Value';

function Bookmark({e, i, bookmarked, setBookmarked, fetchData}) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    function showInfo(ee){
        (async function(){
            const weather = await fetchData(0);
            console.log(weather);
            let s = false;
            for (let j = 0; j < weather.timeSeries.length; j++){
                if (weather.timeSeries[j].validTime == ee){
                    s = true;
                    break;
                }
            }
            console.log(s);
            if (s){
                setData(weather);
                setShow(!show);
            } else {
                alert('Vädret för tiden är inte längre tillgänglig.');
                const b = [...bookmarked];
                b.splice(i,1);
                setBookmarked(b);
            }
        })();
    }

  return (
    <div className='bookmark' onClick={() => showInfo(e)}>
        <div>
            <h1>
                {e}
            </h1>
            <h1 className='x' onClick={() => {
                const b = [...bookmarked];
                b.splice(i,1);
                setBookmarked(b);
            }}>
                x
            </h1>
        </div>
        {show && <div>
            <center>
            <Value name={'Temperatur'} value={data.temp} unit={'C'}/>
            <Value name={'Vind'} value={data.wind} unit={'m/s'}/>
            <Value name={'Regn'} value={data.rain} unit={'kg/m2/h'}/>
            </center>
        </div>}
    </div>
  )
}

export default Bookmark