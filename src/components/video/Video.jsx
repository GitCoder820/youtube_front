import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import videoHome from "../videoHome/videohome";
import Home from "../home/home";
import styles from "./video.module.css"
import { BASE_URL } from "../../../urls";
import { useLocation } from "react-router-dom";
export default function Video() {
  const navigate = useNavigate();
  const location =useLocation();
  // const handleBack = () => {
  //   console.log("Browser back button pressed!");
  //   setCount();
  //   navigate("/home");
  //   return () => {
  //     window.removeEventListener("popstate", handleBack);
  //   };
  // };

  // window.addEventListener("popstate", handleBack);
  
  addEventListener("keydown", (event) => {
    let elem=document.getElementById("Videoplaytag");
    if(event.key=="F"||event.key=="f"){
      elem.requestFullscreen();
      console.log(event.key);
    }
    else if(event.key=="i"||event.key=="I"){
      document.exitFullscreen();
    }
    else if(event.key=="k"||event.key=="K"){
      elem.requestPictureInPicture();
    }
    else if(event.key==" "){
      if(elem.paused){
        elem.play();
        console.log("played")
      }
      else{
        elem.pause();
        console.log("paused")
      }
    }
    else if(event.key=="ArrowRight"){
      elem.currentTime+=5;
    }
    else if(event.key=="ArrowLeft"){
      elem.currentTime-=5;
    }

  })
  let vid_data=location.state.searchResults;
  let vid_link=vid_data.Video;
  console.log("video link is" + vid_link);
  if (!vid_data) {
    vid_data = {};
    vid_data.channel_name = "Select a video";
    vid_link = "no link";
    vid_data.title = "No Video is selcted";
  }
  console.log("video is opening")
  return (<>
    <nav><Navbar /></nav>
    <div className={styles.explorer}><Explorer /></div>
    <div className={styles.white}>
      <div className={styles.content}>
        <div className={styles.video_tag}>
          <video id="Videoplaytag" className={styles.video}
            src={`${BASE_URL}/api/download/${encodeURIComponent(vid_link)}`}
            muted:false
            controls
            autoPlay
            controlsList="nodownload"
          />
          <br />
          {vid_data.title}
          <br />
          {vid_data.channel_name}
        </div>
        <div className={styles.sidebar} >
          <videoHome />
        </div>
      </div>
    </div>
    </>
  )
}
