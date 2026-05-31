import { useEffect, useState } from "react";
import styles from './home.module.css'
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import Card from "../card/card";
// import { BASE_URL } from "../../../urls";
export default function Home({ setappv }) {
    const [list, setList] = useState([]);
    const address = async () => {
        let vid = await fetch(`/api/list`, { method: 'GET' });
        let l = await vid.json();

        setList(l)
    }
    useEffect(() => {
        address();
    }, [])
    return (

        <div className={styles.app}>
      <nav className={styles.nav}><Navbar /></nav>
       <div className={styles.main}>
          <div className={styles.content}><>
            {list.map((value, index) => (
                <Card
                    key={index}
                    address={value}
                    setappv={setappv}
                />
            ))}
        </></div>
          <div className={styles.explorer}><Explorer /></div>
        </div>
    </div>

    )
}
