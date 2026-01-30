import { useState } from "react";
import styles from "./login.module.css"
import Navbar from "../navigation_bar/navigation_bar";
import { useNavigate } from "react-router-dom"
import Explorer from "../left_pannel/explorer";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../urls";
import { loggedstatus } from "./logged";
export default function Login() {
    const [response, setResponse] = useState("")
    const [lstatus, setLstatus] = useState("")
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        let r = await fetch(`/api/register/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });
        if (r.ok==true) {
            r = await r.json();
            console.log(r)
            setResponse(r.message)
            setTimeout(()=>{
                localStorage.setItem("login", r.name);
                loggedstatus(r.name)
                setLstatus(r.name)
                navigate("/home");
            },2000)
        }
        else {
        r = await r.text();
        console.log(r)
        setResponse(r)
        }
    }
    return (<>
        <nav className={styles.nav}><Navbar lstatus={lstatus}/></nav>
        <div className={styles.main}>
        
        <div className={styles.center}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.login}>Login {response && <h3><br />{response}</h3>}</h2>
                <div className={styles.fields}>
                    <input className={styles.wrapper} type="email" placeholder="Enter your Email" {...register("Email", { required: "This field is required", minLength: { value: 4, message: "enter your correct email" } })} />
                    {errors.Email && <div className={styles.error}>{errors.Email.message}</div>}
                    <input className={styles.wrapper} type="password" placeholder="Enter your Password" {...register("Password", { required: "This field is required", minLength: { value: 4, message: "enter your correct Password" } })} />
                    {errors.Password && <div className={styles.error}>{errors.Password.message}</div>}
                </div>
                <input className={styles.submit} type="Submit" />
            </form>
        </div>
        <div className={styles.explorer}><Explorer/></div>
        </div>
        </>
    )
}
