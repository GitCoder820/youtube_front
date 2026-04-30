import { useEffect, useState } from "react";
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
        <>
            {list.map((value, index) => (
                <Card
                    key={index}
                    address={value}
                    setappv={setappv}
                />
            ))}
        </>
    )
}
