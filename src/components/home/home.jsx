import { useEffect, useState } from "react";
import Card from "../card/card";
import { BASE_URL } from "../../../urls";
function Home() {
    const [list, setList] = useState([]);
    const address = async () => {
        let vid = await fetch(`${BASE_URL}/api/list`, { method: 'GET' });
        console.log("bleow")
        // let l=await vid.text()
        // console.log(l);
        let l = await vid.json();

        setList(l)
        console.log("this is video")
        // console.log(list)
        console.log("this is list")
    }
    useEffect(() => {
        address();
    }, [])
    return (
        <>
            {list.map((value, index) => (
                <Card address={value} />
            ))}
            
        </>
    )
}

export default Home;
