import hamburger from "./asset/hamburger.svg";
import youtubelogo from "./asset/youtube-logo.svg";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import React from "react";
import styles from  "./navigation_bar.module.css"
function Navbar() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const r = await fetch("https://youtube-backend-beta.vercel.app/api/search", {
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
            <img src={hamburger} alt="menu" />
            <img src={youtubelogo} alt="youtube logo" />

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder="Search" {...register("Search")} />
                <button className={styles.button} type="submit"> Search</button>
            </form>
            <div className={styles.container_login}>
            <NavLink to="/login" className={styles.btn}><div className={styles.signup}>
                Login</div>
            </NavLink>
            <NavLink to="/signup" className={styles.btn}><div className={styles.signup}>
                SignUp</div>
            </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
