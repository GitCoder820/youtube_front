import hamburger from "./asset/hamburger.svg";
import youtubelogo from "./asset/youtube-logo.svg";
import sign_in from "./asset/sign_in.svg";
import login from "./asset/login.svg";
import search from "./asset/search.svg";
import { useForm } from "react-hook-form";
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./navigation_bar.module.css"
import { BASE_URL } from "../../../urls";
import { useState } from "react";
import Card from "../card/card";
import { additems } from "./searchedlist";
function Navbar() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loads,setLoads]=useState(false);
    const onSubmit = async (data) => {
        setLoads(true);
        const r = await fetch(`${BASE_URL}/api/list/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let res = await r.json();
        console.log("Form submitted:", res);
        additems(res);
        reset({ Search: "" });
        // reset();
        navigate("/searchpage", { state: { searchResults: res } });
        setLoads(false);
    };

    return (
        <div className={styles.flex}>
            <div className={styles.icons}>
                <img src={hamburger} alt="menu" />
                <div className={styles.youtubelogo}><img className={styles.svg} src={youtubelogo} alt="youtube logo" /> <p className={styles.hidden}>YOUTUBE<sup> IN</sup></p></div>

            </div>


            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder="Search" {...register("Search")} />
                <button className={styles.button} type="submit" disabled={loads}> <img src={search} alt="menu" /></button>
            </form>
            <div className={styles.container_login}>
                <NavLink to="/login" className={styles.btn}><div className={styles.signup}>
                    <img className={styles.sign_up_icons} src={login} alt="menu" /> <div className={styles.hidden}>Login</div></div>
                </NavLink>
                <NavLink to="/signup" className={styles.btn}><div className={styles.signup}>
                    <img className={styles.sign_up_icons} src={sign_in} alt="menu" /> <div className={styles.hidden}>Sign In</div></div>
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
