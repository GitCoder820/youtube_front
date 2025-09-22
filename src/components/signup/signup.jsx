import { useState } from "react";
import styles from "./signup.module.css"
import { useForm } from "react-hook-form";
export default function Signup() {
    const [user, setUser] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        let r = await fetch("/api/register/signup", { method: 'POST', headers: { "content-Type": "application/json" }, body: JSON.stringify(data) })
        if (r.redirected) {
            window.location.href = r.url;
        }
        else {
            r = await r.json()
            setUser(r)
            console.log(r)
        }

    }
    return (
        <div className={styles.center}>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ padding: "5px" }}>Sign Up</h2>
                {/* <h4 style={{padding:"5px"}}>{user}</h4> */}
                <div>
                    <input className={styles.wrapper} type="text" placeholder="Enter your Name" {...register("Name", { required: "This field is required", minLength: { value: 3, message: "enter your correct Name" } })} />
                    {errors.Name && <div className={styles.error}>{errors.Name.message}</div>}

                </div>
                <div>
                    <input className={styles.wrapper} type="email" placeholder="Enter your Email" {...register("Email", { required: "This field is required", minLength: { value: 4, message: "enter your correct email" } })} />
                    {errors.Email && <div className={styles.error}>{errors.Email.message}</div>}
                    <div className={styles.error}>{user.email}</div>
                </div>
                <div>
                    <input className={styles.wrapper} type="text" placeholder="Enter your Channel Name" {...register("Channel_Name", { required: "This field is required" })} />
                    {errors.Channel_Name && <div className={styles.error}>{errors.Channel_Name.message}</div>}
                    <div className={styles.error}>{user.channel}</div>
                </div>
                <div>
                    <input className={styles.wrapper} type="text" placeholder="Enter your handle" {...register("Handle", { required: "This field is required" })} />
                    {errors.Handle && <div className={styles.error}>{errors.Handle.message}</div>}
                    <div className={styles.error}>{user.handle}</div>
                </div>
                <div>
                    <input className={styles.wrapper} type="password" placeholder="Enter your Password" {...register("Password", { required: "This field is required" })} />
                    {errors.Password && <div className={styles.error}>{errors.Password.message}</div>}
                    <div className={styles.error}>{user.channel}</div>
                </div>
                <input className={styles.submit} type="Submit" />
            </form>
        </div>
    )
}