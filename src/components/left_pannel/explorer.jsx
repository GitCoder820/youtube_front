import { NavLink } from "react-router-dom"
import styles from  "./explorer.module.css"
export default function () {
    return (<>
        <ul className={styles.ul}>
            <li>
                <NavLink to='/home'><div className="styles.links">
                    Home
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/trending'><div className="styles.links">
                    Trending
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/upload'><div className="styles.links">
                    Upload
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/library'><div className="styles.links">
                    Library
                </div></NavLink>
                
            </li>
            <li>
                <NavLink to='/history'><div className="styles.links">
                    History
                </div></NavLink>
                
            </li>
        </ul>
    </>)
}