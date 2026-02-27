import { BASE_URL } from "../../../../urls"
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './comments.module.css'
import CommentBox from "./commentstore";
import send from "./send.png"
export default function Comment(id) {
    const [comments, setComment] = useState([]);
    const [reload, setReload] = useState([0]);
    const [datain, setData] = useState(true);
    const[event,setEvent] = useState("")
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        data.id = id.id
        let res = await fetch(
            `/api/comment/upload/add`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // note capitalization
                body: JSON.stringify(data),
                credentials: "include"
            }
        );
        res = await res.text()
        console.log(data)
        console.log(res)
        setReload(reload + 1)
        setComment([])
        commentsfun()
        reset({ Comment: "" });
        document.getElementById("form").addEventListener("keydown", (event) => {
        event.stopPropagation();
        setEvent("change")
        })
        console.log("added")

    };
    async function commentsfun() {
        console.log(id)
        setData(id)
        let res = await fetch(
            `/api/comment/load`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // note capitalization
                body: JSON.stringify(id),
                credentials: "include"
            }
        );
        let data = await res.json()
        setComment(data.commentList);
        console.log(comments)
    }

    useEffect(() => {
        if (datain.id == id.id) {
            return
        }
        else {
            console.log(datain)
            console.log(id)
            setComment([])
            commentsfun()
        }
        document.getElementById("text").addEventListener("keydown", (event) => {
            event.stopPropagation();
        })
        setComment([])
    }, [id])
    try{
        document.getElementById('form').addEventListener("keydown", (event) => {
            console.log(event.key)
            event.stopPropagation()
        })
    }
    catch{
        console.log("not found")
    }
    return (
        <div className={styles.box} key={`${reload}-${id.id}`}>
            <div className={styles.container} key={`${reload}-${id.id}`}>
                {Array.isArray(comments) &&
                    comments.map((value, index) => (
                        <CommentBox key={`${reload}-${id.id}`}
                            data={value} />
                    ))
                }

            </div>
            <div className={styles.input}>
                <form id="form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.text} id="text" autoComplete="off" type="text" placeholder="Enter Comment" {...register("Comment")} />
                    <button className={styles.button} type="submit"><img className={styles.send} src={send} /></button>
                </form>
            </div>
        </div>
    );
}