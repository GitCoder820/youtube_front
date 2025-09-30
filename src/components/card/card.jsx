import React, { useState } from "react"
import count_Views from "./views"
import styles from "./card.module.css"
import { useNavigate } from "react-router-dom"
import { setObj } from "../../data"
import { getObj } from "../../data"
export default function Card(address) {
    const [view, setView] = useState(address.address.views);
    const navigate = useNavigate();
    const [size, setSize] = useState(300)
    const handleVideoLoad = () => {
        setView(address.address.views + 1);
        console.log("video clicked")
        setObj(address.address)
        let res = fetch("https://youtube-backend-8o8a.onrender.com/api/list/ins", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getObj())
        })
        navigate(`/video`);
    };
    return (<span className={styles.main}>
        <span style={{ display: "inline-block",position:"relative" }}>
            <img className={styles.image} src={`https://youtube-backend-8o8a.onrender.com/api/download/${encodeURIComponent(address.address.thumbnail)}`} width={size} onClick={() => handleVideoLoad(address)} />
            <span className={styles.float}>{address.address.duration}</span>
        </span>
        <des>
            <h4>{address.address.title}</h4>
            <h4>{view} Views</h4>
        </des>

    </span>
    )
}
