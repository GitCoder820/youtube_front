import { useEffect, useState } from "react";
import { BASE_URL } from "../../../urls";

function videoHome() {
    const [list, setList] = useState([]);
    const address = async () => {
        let vid = await fetch(`${BASE_URL}/api/list`, { method: 'GET' });
        console.log("bleow")
        // let l=await vid.text()
        // console.log(l);
        let l = await vid.json();

        setList(l)
        console.log("this is video")
        console.log(l)
        console.log("this is videoHOMEEEE")
    }
    useEffect(() => {
        address();
    }, [])
    return (
        <>
            {list.map((value,index) => (
                <videoCard/>
            ))}
            
        </>
    )
}
 fyfyjj
export default videoHome;
