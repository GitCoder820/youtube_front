import Navbar from "../navigation_bar/navigation_bar"
import { getitems } from "../navigation_bar/searchedlist";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../card/card";
import styles from './search.module.css'
import Explorer from "../left_pannel/explorer";
export default function Searched() {
    const [list, setList] = useState([]);
    const location =useLocation();
    const reset = () => {
        setList(getitems());
    };
    useEffect(() => {
        if (location.state?.searchResults) {
            setList(getitems());
            console.log("last")
        }
    }, [location.state]);
    return (
        <div className={styles.app}>
            <nav> <Navbar /></nav>
            <div className={styles.main}>
                <div className={styles.explorer}><Explorer /></div>
                <div className={styles.content}>{list.length>0 ? (list.map((value, index) => (
                    <Card address={value} />
                ))):(<div style={{color:"white"}}>No search</div>)}
                </div>
                
            </div>
        </div>

    )
}