import { useState } from "react";
import { useEffect } from "react";
import styles from "./signup.module.css"
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../urls";
export default function Signup() {
    const [user, setUser] = useState({});
    const [otpMessage, setOtpMessage] = useState("");
    const [otpSend, setOtpSend] = useState(0);
    const [formSubmit, setFormSubmit] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        let r = await fetch(
            `/api/register/signup`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // note capitalization
                body: JSON.stringify(data),
                credentials: "include"   // ✅ must include this for cookies
            }
        );
        console.log(r)

        if (r.ok == false) {
            const info = await r.json();
            setUser(info)
            console.log(user);
        }
        else if (r.ok != false) {
            setOtpSend(1);
            const info = await r.json();
            setFormSubmit(info);
        }

    }
    const onOTPSubmit = async (data) => {
        console.log("why");
        console.log(data)
        formSubmit["OTP"] = data.OTP;
        let r = await fetch(
            `/api/register/signupotp`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // note capitalization
                body: JSON.stringify(formSubmit),
                credentials: "include"   // ✅ must include this for cookies
            }
        );
        console.log(r);
        if (r.ok == false) {
            let message = await r.json()
            setOtpMessage(message.message);
            console.log(message);
        }
        else {
            let message = await r.json()
            setOtpMessage(message.message);
            console.log(message);
            setTimeout(() => {
                setOtpSend(0);
            }, 3000)
        }
    }
    return (<>
        <nav><Navbar /></nav>
        <div className={styles.explorer}><Explorer /></div>
        <div className={styles.center}>
            {otpSend == 0 && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.login}>Sign Up</h2>
                    <h4 className={styles.error}>{user.head}</h4>
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
                        <div className={styles.error}></div>
                    </div>
                    <div><input className={styles.submit} type="Submit" /></div>
                </form>
            )}
            {otpSend == 1 && (
                <form className={styles.form} onSubmit={handleSubmit(onOTPSubmit)}>
                    <input className={styles.wrapper} type="text" placeholder="enter otp" {...register("OTP", { required: "Please enter the otp", minLength: { value: 4, message: "Otp can be of length FOUR" }, maxLength: { value: 4, message: "Otp can be of length FOUR" } })} />
                    {errors.OTP && <div className={styles.error}>{errors.OTP.message}</div>}
                    <input className={styles.submit} type="submit" />
                    <div className={styles.error}>{otpMessage}</div>
                </form>
            )}
        </div></>
    )
}
