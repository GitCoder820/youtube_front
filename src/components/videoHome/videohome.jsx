import { useEffect, useState } from "react";
import { BASE_URL } from "../../../urls";
import VideoCard from "./videocard";
export default function VideoHome({ setresd }) {
    const [list, setList] = useState([]);
    const address = async () => {
        let vid = await fetch(`/api/list`, { method: 'GET' });
        // let l=await vid.text()
        // console.log(l);
        let l = await vid.json();

        setList(l)
    }
    useEffect(() => {
        address();
    }, [])
    return (
        <>
            {list.map((value, index) => (
                <VideoCard
                    key={index}
                    address={value}
                    setresd={setresd}
                />
            ))}
        </>
    )
}


