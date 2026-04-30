import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import VideoHome from "../videoHome/videohome";
import Home from "../home/home";
import styles from "./video.module.css"
// import { BASE_URL } from "../../../urls";
import { useLocation } from "react-router-dom";
import Hls from "hls.js";
import Comment from "./commnet/Comment";
export default function Video({ viddata }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [resd, setresd] = useState();
  // const [vidData,setvidData]= useState();
  const [Video, setVideo] = useState("");
  const [views, setView] = useState("");
  const [channel_name, setchannel_name] = useState("");
  const [title, settitle] = useState("");
  const [vidid, setid] = useState("");

  useEffect(() => {
    // let el = document.getElementById("Videoplaytag");
    // const stord = localStorage.getItem("list");
    // const lit = stord ? JSON.parse(stord) : [];
    // const curent = parseInt(localStorage.getItem("current"));
    // lit[curent].time = el.currentTime;
    // localStorage.setItem("list", JSON.stringify(lit));

    const video = videoRef.current;
    console.log("resd", resd)
    if (!resd) return;
    settitle(resd.title)
    setchannel_name(resd.channel_name)
    setView(resd.views)
    setid(resd._id)

    //playtime update
    const elem = document.getElementById("Videoplaytag");
    const stored = localStorage.getItem("list");
    const list = stored ? JSON.parse(stored) : [];

    const current = parseInt(localStorage.getItem("current"));

    if (elem && list[current]?.time != null) {
      elem.addEventListener("loadedmetadata", () => {
        elem.currentTime = list[current].time;
        console.log("go on tome")
      });
    }


  }, [resd])

  useEffect(() => {
    console.log("reloaded")
    const stored = localStorage.getItem("list");
    const list = stored ? JSON.parse(stored) : [];
    const current = parseInt(localStorage.getItem("current"));
    setresd(list[current]);
    // if (!resd) {
    //   let vid_data = location.state.searchResults;
    //   setVideo(vid_data.Video)
    //   settitle(vid_data.title)
    //   setchannel_name(vid_data.channel_name)
    //   setView(vid_data.views)
    //   setid(vid_data._id)
    // }

    const videonav = (event) => {
      console.log(event.key)
      event.stopPropagation()
      let elem = document.getElementById("Videoplaytag");
      if (event.key == "F" || event.key == "f") {
        elem.requestFullscreen();
      }
      else if (event.key == "i" || event.key == "I") {
        document.exitFullscreen();
      }
      else if (event.key == "k" || event.key == "K") {
        elem.requestPictureInPicture();
      }
      else if (event.key == " ") {
        if (elem.paused) {
          elem.play();
        }
        else {
          elem.pause();
        }
      }
      else if (event.key == "ArrowRight") {
        elem.currentTime += 5;
      }
      else if (event.key == "ArrowLeft") {
        elem.currentTime -= 5;
      }
      else if (event.key == "A" || event.key == "a") {
        const stored = localStorage.getItem("list");
        let list = stored ? JSON.parse(stored) : [];
        const current = parseInt(localStorage.getItem("current"));
        if (current > 0) {
          list[current].time = elem.currentTime;
          localStorage.setItem("list", JSON.stringify(list));
          console.log(list)
          setresd(list[current - 1]);
          localStorage.setItem("current", current - 1);
        }
      }

      else if (event.key == "d" || event.key == "D") {
        const stored = localStorage.getItem("list");
        const list = stored ? JSON.parse(stored) : [];
        const current = parseInt(localStorage.getItem("current"));
        const end = parseInt(localStorage.getItem("end"));
        if (current < end) {
          list[current].time = elem.currentTime;
          localStorage.setItem("list", JSON.stringify(list));
          setresd(list[current + 1]);
          localStorage.setItem("current", current + 1);
        }
      }

      else if (event.key == "Q" || event.key == "q") {
        console.log(elem.currentTime);
      }

    }

    addEventListener("keydown", videonav)

    return () => {
      removeEventListener("keydown", videonav)
      console.log("Listener Removed");
    };

  }, [])

  return (<>
    <nav className={styles.nav}><Navbar /></nav>
    <div className={styles.white}>
      <div className={styles.content}>
        <div className={styles.video_tag}>
          <video id="Videoplaytag" className={styles.video}
            src={`/api/stream/${encodeURIComponent(vidid)}`}
            // preload="metadata"
            type={`video/mp4`}
            // muted="false"
            controls
            autoPlay
            controlsList="nodownload"
          />
          <div className={styles.vidcontent}>
            <span className={styles.title}>{title}</span>
            <div className={styles.channelSubcribe}>
              <div>
                <span className={styles.vidview}> {views}</span><br />
                <span className={styles.channelName}>{channel_name}</span>
                <span className={styles.channelSubscribe}> 100</span>
              </div>
              <button className={styles.subscribe}>Subscribe</button>
            </div>
          </div>
          <div className={styles.commnetBox}>
            <Comment id={vidid} />
          </div>
        </div>
        <div className={styles.sidebar} >
          <VideoHome setresd={setresd} />
        </div>
      </div>
      <div className={styles.explorer}><Explorer /></div>
    </div>

  </>
  )
}
