import { NavLink } from "react-router-dom"
import { setCurrent } from "./current"
import { getCurrent } from "./current"
import styles from  "./explorer.module.css"
import home from "./asset/home.svg"
import trending from "./asset/trending.svg"
import you from "./asset/you.svg"
import upload from "./asset/upload.svg"
import like from "./asset/like.svg"
import { useEffect, useState } from "react"
export default function Explorer() {
    const [red,setRed]=useState("red")
    useEffect(() => {
    const el = document.getElementById(getCurrent());
    if (el) {
      el.style.backgroundColor = "red";
    }
  }, []);
    return (<div className={styles.hero}>
        <ul className={styles.ul}>
            <li>
                <NavLink to='/home' className={({ isActive }) =>isActive ? `${styles.activeLink}` : `${styles.links}`}><div className="styles.links">
                    <img className={styles.icons} src={home} alt="menu" /> <div className={styles.hidden}>Home</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/trending' className={({ isActive }) =>isActive ? `${styles.activeLink}` : `${styles.links}`}><div className="styles.links">
                    <img className={styles.icons} src={trending} alt="menu" /> <div className={styles.hidden}>Trending</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/upload'  className={({ isActive }) =>isActive ? `${styles.activeLink}` : `${styles.links}`} ><div className="styles.links">
                    <img style={{background:"black",borderRadius:"3.14rem"}} className={styles.icons} src={upload} alt="menu" /> <div className={styles.hidden}>Upload</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/library' className={({ isActive }) =>isActive ? `${styles.activeLink}` : `${styles.links}`}><div className="styles.links">
                    <img style={{background:"black",borderRadius:"3.14rem"}} className={styles.icons} src={you} alt="menu" /> <div className={styles.hidden}>You</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/history' className={({ isActive }) =>isActive ? `${styles.activeLink}` : `${styles.links}`}><div className="styles.links">
                    <img  className={styles.icons} src={like} alt="menu" /> <div className={styles.hidden}>Like</div>
                </div></NavLink>
                
            </li>
        </ul>
    </div>)
}