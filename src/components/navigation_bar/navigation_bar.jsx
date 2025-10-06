import hamburger from "./asset/hamburger.svg";
import youtubelogo from "./asset/youtube-logo.svg";
import sign_in from "./asset/sign_in.svg";
import login from "./asset/login.svg";
import search from "./asset/search.svg";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import React from "react";
import styles from  "./navigation_bar.module.css"
import { BASE_URL } from "../../../urls";
function Navbar() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const r = await fetch(`${BASE_URL}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let res = await r.text();
        console.log("Form submitted:", res);
        reset({ Search: "" });
        // reset();
    };

    return (
        <div className={styles.flex}>
            <div className={styles.icons}>
                <img src={hamburger} alt="menu" />
               <div className={styles.youtubelogo}><img className={styles.svg} src={youtubelogo} alt="youtube logo" /> <p className={styles.hidden}>YOUTUBE<sup> IN</sup></p></div>
                
            </div>
            

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder="Search" {...register("Search")} />
                <button className={styles.button} type="submit"> <img src={search} alt="menu" /></button>
            </form>
            <div className={styles.container_login}>
            <NavLink to="/login" className={styles.btn}><div className={styles.signup}>
                <img  className={styles.sign_up_icons} src={login} alt="menu" /> <div className={styles.hidden}>Login</div></div>
            </NavLink>
            <NavLink to="/signup" className={styles.btn}><div className={styles.signup}>
                <img  className={styles.sign_up_icons} src={sign_in} alt="menu" /> <div className={styles.hidden}>Sign In</div></div>
            </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
