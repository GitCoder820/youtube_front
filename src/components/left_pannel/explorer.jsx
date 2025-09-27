import { NavLink } from "react-router-dom"
import styles from  "./explorer.module.css"
import home from "./asset/home.svg"
import trending from "./asset/trending.svg"
import you from "./asset/you.svg"
import like from "./asset/like.svg"
export default function () {
    return (<>
        <ul className={styles.ul}>
            <li>
                <NavLink to='/home'><div className="styles.links">
                    <img className={styles.icons} src={home} alt="menu" /> <div>Home</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/trending'><div className="styles.links">
                    <img className={styles.icons} src={trending} alt="menu" /> <div>Trending</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/upload'><div className="styles.links">
                    Upload
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/library'><div className="styles.links">
                    <img style={{background:"black",borderRadius:"3.14rem"}} className={styles.icons} src={you} alt="menu" /> <div>You</div>
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/history'><div className="styles.links">
                    <img  className={styles.icons} src={like} alt="menu" /> <div>Like</div>
                </div></NavLink>
                
            </li>
        </ul>
    </>)
}