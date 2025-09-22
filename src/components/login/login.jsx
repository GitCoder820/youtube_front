import { useState } from "react";
import styles from "./login.module.css"
import { useForm } from "react-hook-form";
export default function Signup() {
    const [response, setResponse] = useState("")
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        let r = await fetch("https://youtube-backend-gilt.vercel.app/api/register/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });
        if (r.redirected) {
            window.location.href = r.url;
        }
        else {
        r = await r.text();
        console.log(r)
        setResponse(r)
        }
    }
    return (
        <div className={styles.center}>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ padding: "5px" }}>Login {response && <h3><br />{response}</h3>}</h2>
                <div>
                    <input className={styles.wrapper} type="email" placeholder="Enter your Email" {...register("Email", { required: "This field is required", minLength: { value: 4, message: "enter your correct email" } })} />
                    {errors.Email && <div className={styles.error}>{errors.Email.message}</div>}
                    <input className={styles.wrapper} type="password" placeholder="Enter your Email" {...register("Password", { required: "This field is required", minLength: { value: 4, message: "enter your correct Password" } })} />
                    {errors.Password && <div className={styles.error}>{errors.Password.message}</div>}
                </div>
                <input className={styles.submit} type="Submit" />
            </form>
        </div>
    )
}
