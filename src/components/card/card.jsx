import React, { useState } from "react"
import count_Views from "./views"
import styles from "./card.module.css"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../../urls";
export default function Card(address) {
    console.log("inner list",address.address)
    const [view, setView] = useState(address.address.views);
    const navigate = useNavigate();
    const [size, setSize] = useState(300)
    const handleVideoLoad = () => {
        setView(view+1);
        console.log("video clicked");
        let res = fetch(`${BASE_URL}/api/list/ins`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address.address)
        })
        navigate(`/video` , { state: { searchResults: address.address } });
    };
    return (<span className={styles.main}>
        <span style={{ display: "inline-block",position:"relative" }}>
            <img className={styles.image} src={`${BASE_URL}/api/download/thumbnail/${encodeURIComponent(address.address.thumbnail)}`} width={size} onClick={() => handleVideoLoad(address)} />
            <span className={styles.float}>{address.address.duration}</span>
        </span>
        <des>
            <h4>{address.address.title}</h4>
            <h4>{view} Views</h4>
        </des>

    </span>
    )
}
