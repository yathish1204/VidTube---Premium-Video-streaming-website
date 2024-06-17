import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY,valueConvertor } from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {
  const[apiData,setApiData]=useState([]);

  const fetchData = async() =>{
      const relatedVideo_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
      await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
  
  } 

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='recommended'>
      {apiData.map((item,i)=>{
        return <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={i} onClick={window.scrollTo(0,0)}>
        <img src={item.snippet.thumbnails.medium.url} alt="recommended video 1" />
        <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{valueConvertor(item.statistics.viewCount)} Views</p>
        </div>
      </Link>
      })}
      
      
    </div>
  )
}

export default Recommended
