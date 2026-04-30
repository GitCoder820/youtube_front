import { useState, useRef } from "react";
import loading1 from "./loading_svg/loading1.svg";
import loading2 from "./loading_svg/loading2.svg";
import loading3 from "./loading_svg/loading3.svg";
import loading4 from "./loading_svg/loading4.svg";
import loading5 from "./loading_svg/loading5.svg";
import loading6 from "./loading_svg/loading6.svg";
import loading7 from "./loading_svg/loading7.svg"
import loading8 from "./loading_svg/loading8.svg";;
import Navbar from "../navigation_bar/navigation_bar";
import Explorer from "../left_pannel/explorer";
import styles from "./upload.module.css"
import { set, useForm } from "react-hook-form";
// import { BASE_URL } from "../../../urls";
export default function Upload() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [user, setUser] = useState("");
    const [alert_style, setalert] = useState("none");

    function getVideoDuration(file) {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.preload = "metadata";

            video.onloadedmetadata = () => {
                resolve(video.duration); // seconds
                URL.revokeObjectURL(video.src);
            };

            video.onerror = () => {
                reject("Failed to load video metadata");
            };

            video.src = URL.createObjectURL(file);
        });
    }

    const upload = async (data) => {
        const formData = new FormData();
        formData.append("Title", data.Title);
        console.log(data.Video[0])
        const file = data.Video[0];
        const duration = await getVideoDuration(file);
        console.log(duration)
        formData.append("Duration", duration);
        try {
            let check = await fetch(`/api/list/check`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            check = await check.text();
            if (check == "Pass") {
                formData.append("Thumbnail", data.Thumbnail[0]);
                formData.append("Video", data.Video[0]);
                console.log(data.Thumbnail[0]);
                let res = await fetch(`/api/list/upload/files`, {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });
                const result = await res.text();
                console.log(result);
                setUser(result);
                setalert("block")
                const stoper = () => {
                    document.getElementById('submit').outerHTML = `<input id="submit" class="${styles.submit}" type="Submit" />`
                }
                stoper();
            }
            else {
                setUser(check);
                setalert("block")
                const stoper = () => {
                    document.getElementById('submit').outerHTML = `<input id="submit" class="${styles.submit}" type="Submit" />`
                }
                stoper();
            }
        }
        catch {
            console.log("error to connect")
            setUser("Can not connect to server");
            setalert("block")
            console.log(alert_style)
            const stoper = () => {

                document.getElementById('submit').outerHTML = `<input id="submit" class="${styles.submit}" type="Submit" />`
            }
            stoper();
        }

    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            e.target.style.background = "#5cf474";
            e.target.style.setProperty("--button-bg", "#5cf474");

            console.log("File selected:");
        } else {
            console.log("No file selected");
        }
    }

    const form_status = (data) => {
        let src = [loading1, loading2, loading3, loading4, loading5, loading6, loading7, loading8]
        console.log(src[0])
        document.getElementById('submit').outerHTML = `<div id="submit"><img src="${src[7]}"/></div>`
        function load(src) {
            document.getElementById('submit').outerHTML = `<div id="submit"><img src="${src}"/></div>`
        }
        let i = 0;
        let interval = setInterval(() => {
            if (document.getElementById('submit').tagName != 'DIV') {
                clearInterval(interval);
                return;
            }
            load(src[i])
            i++;
            if (i > 7) {
                i = 0;
            }
        }, 100)

    }
    return (<>
        <nav className={styles.nav}><Navbar /></nav>
        <div className={styles.main}>

            <div className={styles.center}>

                <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit((data, e) => {
                    upload(data);
                    form_status(data);
                })}>
                    <h2 className={styles.login}>Upload Page </h2>
                    <h4 style={{ color: "red", display: alert_style }}>{user}</h4>
                    <div>
                        <input className={styles.wrapper} type="text" placeholder="Enter your Video Title"  {...register("Title", { required: "This field is required", minLength: { value: 3, message: "enter your correct Name" } })} />
                        {errors.Title && <div className={styles.error}>{errors.Title.message}</div>}
                    </div>
                    <div className={styles.files_data}>
                        <label className={styles.label} htmlFor="thumbnail">Select Thumbnail</label>
                        <input id="thumbnail" className={styles.file_upload} type="file" accept="image/*" name="Thumbnail" placeholder="Enter your Thumbnail"  {...register("Thumbnail", { required: "This field is required", onChange: (e) => { handleFileChange(e); } })} />
                        {errors.Thumbnail && <div className={styles.error}>{errors.Thumbnail.message}</div>}
                    </div>
                    <div className={styles.files_data}>

                        <label className={styles.label} htmlFor="video">Select Video</label>
                        <input id="video" className={styles.file_upload} type="file" accept="video/*" name="Video" placeholder="Enter your Video" {...register("Video", { required: "This field is required", onChange: (e) => { handleFileChange(e); } })} />
                        {errors.Video && <div className={styles.error}>{errors.Video.message}

                        </div>}
                    </div>
                    <input id="submit" className={styles.submit} type="Submit" />
                    <input className={styles.submit} type="Reset" />
                </form>
            </div>
            <div className={styles.explorer}><Explorer /></div>
        </div>
    </>
    )
}
