import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import VideoHome from "../videoHome/videohome";
import Home from "../home/home";
import styles from "./video.module.css"
import { BASE_URL } from "../../../urls";
import { useLocation } from "react-router-dom";
import Comment from "./commnet/Comment";
export default function Video({viddata}) {
  const navigate = useNavigate();
  const location =useLocation();
  const [resd,setresd]= useState();
  // const [vidData,setvidData]= useState();
  const [Video,setVideo]= useState("");
  const [channel_name,setchannel_name]= useState("");
  const [title,settitle]= useState("");
  const [vidid,setid]= useState("");
  // const handleBack = () => {
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
      }
      else{
        elem.pause();
      }
    }
    else if(event.key=="ArrowRight"){
      elem.currentTime+=5;
    }
    else if(event.key=="ArrowLeft"){
      elem.currentTime-=5;
    }

  })
  useEffect(()=>{
    console.log("resd",resd)
    if (!resd) return;
    setVideo(resd.Video)
    settitle(resd.title)
    setchannel_name(resd.channelName)
    setid(resd._id)
  },[resd])
  useEffect(()=>{
    console.log("reloaded")
    if (!resd){
    let vid_data=location.state.searchResults;
    setVideo(vid_data.Video)
    settitle(vid_data.title)
    setchannel_name(vid_data.channelName)
    setid(vid_data._id)
    }
  },[])
  return (<>
    <nav><Navbar /></nav>
    <div className={styles.explorer}><Explorer /></div>
    <div className={styles.white}>
      <div className={styles.content}>
        <div className={styles.video_tag}>
          <video id="Videoplaytag" className={styles.video}
            src={`/api/download/${encodeURIComponent(Video)}`}
            muted:false
            controls
            autoPlay
            controlsList="nodownload"
          />
          <div className={styles.vidcontent}>
            <span className={styles.title}>{title}</span>
            <div className={styles.channelSubcribe}>
            <div>
              <span className={styles.channelName}>{channel_name}</span>
              <span className={styles.channelSubscribe}></span>
            </div>
            <button className={styles.subscribe}>Subscribe</button>
            </div>
          </div>
          <div className={styles.commnetBox}>
            <Comment id={vidid} />  
        </div>
        </div>
        <div className={styles.sidebar} >
          <VideoHome setresd={setresd}/>
        </div>
      </div> 
    </div>
    </>
  )
}
