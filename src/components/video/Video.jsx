import { useParams } from "react-router-dom";
import { setCount } from "../../data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import Home from "../home/home";
import { getObj } from "../../data"
import styles from "./video.module.css"
import { BASE_URL } from "../../../urls";
export default function Video() {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log("Browser back button pressed!");
    setCount();
    navigate("/home");
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  };

  window.addEventListener("popstate", handleBack);

  let obj = getObj()
  if (!obj) {
    obj = {};
    obj.channel_name = "Select a video"
    obj.link = "no link"
    obj.title = "No Video is selcted"
  }
  console.log(getObj())
  console.log("video is opening")
  return (<>
    <nav><Navbar /></nav>
    <div className={styles.explorer}><Explorer /></div>
    <div className={styles.white}>
      <div className={styles.content}>
        <div className={styles.video_tag}>
          <video className={styles.video}
            src={`${BASE_URL}/api/download/${encodeURIComponent(obj.Video)}`}
            muted:false
            controls
            autoPlay
          // height="800"
          />
          <br />
          {obj.title}
          <br />
          {obj.channel_name}
        </div>
        <div className={styles.sidebar} >
          <Home />
        </div>
      </div>
    </div>
    </>
  )
}
