import {useEffect, useState} from 'react';
import Value from '../components/Value';
import {useNavigate, useParams} from 'react-router-dom';
import Bookmark from '../components/Bookmark';

function Bookmarks({bookmarked, setBookmarked, fetchData}) {

  return <main>
    <center>
    {
      bookmarked.map((e, i) => {

        console.log("e", e);
        return <Bookmark 
          fetchData={fetchData}
          e={e} 
          i={i}
          bookmarked={bookmarked} 
          setBookmarked={setBookmarked} 
          key={i} />
      })
    }
    </center>
  </main>
}

export default Bookmarks;
