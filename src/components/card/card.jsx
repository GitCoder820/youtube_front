import React, { useState } from "react"
import count_Views from "./views"
import styles from "./card.module.css"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../../urls";
import { useEffect } from "react";
export default function Card({ address, setresd }) {

    const navigate = useNavigate();
    // const colorThief = new ColorThief();
    const [size, setSize] = useState(300)
    const [view, setView] = useState();
    const [time, setTime] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [bgurl, seturl] = useState();
    async function bgurlset() {
        let bg = await fetch(`/api/download/thumbnail/${encodeURIComponent(address.thumbnail)}`)
        seturl(bg.url)
    }
    function viewCount(views) {
        let view_set = views;
        if (view_set > 1000000000) {
            view_set = view_set / 1000000000;
            view_set = Math.floor(view_set * 10) / 10;
            const res = `${view_set}B`;
            return res;
        }
        else if (view_set > 100000) {
            view_set = view_set / 1000000;
            view_set = Math.floor(view_set * 10) / 10;
            const res = `${view_set}M`;
            return res;
        }
        else if (view_set > 1000) {
            view_set = view_set / 1000;
            view_set = Math.floor(view_set * 10) / 10;
            const res = `${view_set}K`;
            return res;
        }
        else {
            return view_set
        }

    }
    useEffect(() => {
        let newView = viewCount(address.views);
        setView(newView);
        const uploadTimestr = address.publish_date;
        // const uploadTimestr=address.address.publish_date;
        // const uploadTimestr = "2025-12-06T15:52:09.000Z"
        const uploadTime = new Date(uploadTimestr);
        const currentTime = new Date();
        const uploadDateTime = currentTime.getTime() - uploadTime.getTime();
        console.log(uploadDateTime+address.title)
        let second = Math.floor(uploadDateTime / 1000);
        let minutes = Math.floor(second / 60);
        let hours = Math.floor(minutes / 60);
        const day = Math.floor(hours / 24);
        minutes = minutes - hours * 60
        hours = hours - day * 24;
        setView(newView);
        bgurlset()
        if (day) {
            setTime(`${day} day ago`)
        }
        else {
            if (hours) {
                setTime(`${hours} hours ago`)
            }
            if (minutes) {
                setTime(`${minutes} minutes ago`)
            }
            else {
                setTime(`Now`)
            }
        }
    }, []);

    // useEffect(() => {
        // let newView = viewCount(address.views);
        // setView(newView);
        // bgurlset()
        // if (day) {
        //     setTime(`${day} day ago`)
        // }
        // else {
        //     if (hours) {
        //         setTime(`${hours} hours ago`)
        //     }
        //     if (minutes) {
        //         setTime(`${minutes} minutes ago`)
        //     }
        //     else {
        //         setTime(`Now`)
        //     }
        // }
    // }, []);

    const handleVideoLoad = () => {
        let newView = viewCount(view + 1)
        setView(newView);
        let res = fetch(`/api/list/ins`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address)
        })
        navigate(`/video`, { state: { searchResults: address } });
    };
    return (<div className={styles.main}>
        <div className={styles} style={{ position: "relative" }}>
            <img id="image" className={styles.image} src={`/api/download/thumbnail/${encodeURIComponent(address.thumbnail)}`} width={size} onClick={() => handleVideoLoad(address)} />
            <span className={styles.float}>{address.duration}</span>
        </div>
        <div className={styles.box}>
            <div className={styles.title}>{address.title}</div>
            <h4 className={styles.subTitle}>{view} views</h4>
            <h4 className={styles.subTitle}>{address.channel_name} • {time}</h4>
        </div>
    </div>
    )
}
