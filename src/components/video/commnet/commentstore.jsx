import { useEffect, useState } from "react"
import styles from './comment.module.css'
export default function CommentBox(data){
    const[user,setUser]=useState();
    const[text,setText]=useState();
    useEffect(()=>{
        setUser(data.data.userName);
        setText(data.data.text)
    },[]) 
    return(<>
    <div className={styles.comment}>
        <p className={styles.content}><span className={styles.user}>{user} :</span>{text}</p>
    </div>
    
    </>)
}