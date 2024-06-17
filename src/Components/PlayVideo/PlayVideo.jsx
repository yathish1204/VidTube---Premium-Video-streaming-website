import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../Assets/video.mp4";
import like from "../../Assets/like.png";
import dislike from "../../Assets/dislike.png";
import share from "../../Assets/share.png";
import save from "../../Assets/save.png";
import jack from "../../Assets/jack.png";
import user_profile from "../../Assets/user_profile.jpg";
import {API_KEY,valueConvertor} from '../../data'
import moment from "moment";
import { useParams } from "react-router-dom";


const PlayVideo = () => {

  const {videoId}=useParams();

  const [apiData, setApiData] = useState(null);
  const[channelData,setChannelData]=useState(null);
  const [commentData, setCommentData] = useState([]);

const fetchVideoData = async()=>{
  //Fetching videos data
  const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
  await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
  // console.log(apiData.snippet.publishedAt)
}

const fetchOtherData = async()=>{
  //fetching other data
  const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
  await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))


  //fetching comment data
  const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
  await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
}

useEffect(() => {
  fetchVideoData();
}, [videoId])

useEffect(() => {
  fetchOtherData();
}, [apiData])

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
      <div className="play-video-info">
        <p>{apiData?valueConvertor(apiData.statistics.viewCount):"16K"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}  </p>   
        <div>
          <span>
            <img src={like} alt="like" />
            {apiData?valueConvertor(apiData.statistics.likeCount):155}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
          </span>
          <span>
            <img src={share} alt="dislike" />
            Share
          </span>
          <span>
            <img src={save} alt="dislike" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="jack" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?valueConvertor(channelData.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-desc">
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
        
        <hr />
        <h4>{apiData?valueConvertor(apiData.statistics.commentCount):103} Commments</h4>
        {commentData.map((item,i)=>{
            return <div key={i} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user Profile" />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{valueConvertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="like" />
                <span></span>
              </div>
            </div>
          </div>
        })}
        
      </div>
    </div>
  );
};

export default PlayVideo;
