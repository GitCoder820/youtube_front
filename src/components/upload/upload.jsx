import { useState } from "react";
import styles from "./upload.module.css"
import { set, useForm } from "react-hook-form";
export default function Upload() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [user, setUser] = useState("");

    const upload = async (data) => {
        const formData = new FormData();
        formData.append("Title", data.Title);
        
        let check = await fetch("https://youtube-backend-gilt.vercel.app/api/list/check", {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        check = await check.text();
        if (check == "Pass") {
            formData.append("Thumbnail", data.Thumbnail[0]);
            formData.append("Video", data.Video[0]);
            console.log(data.Thumbnail[0]);
            let res = await fetch("https://youtube-backend-gilt.vercel.app/api/list/upload/files", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const result = await res.text();
            console.log(result);
            setUser(result);
        }
        else {
            setUser(check);
        }

    }
    return (
        <div className={styles.center}>

            <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit((data) => {
                upload(data);
            })}>
                <h2 style={{ padding: "5px" }}>Upload Page </h2>
                <div>
                    <input className={styles.wrapper} type="text" placeholder="Enter your Video Title" {...register("Title", { required: "This field is required", minLength: { value: 3, message: "enter your correct Name" } })} />
                    {errors.Title && <div className={styles.error}>{errors.Title.message}</div>}
                </div>
                <div>
                    Select Thumbnail
                    <input className={styles.file_upload} type="file" accept="image/*" name="Thumbnail" placeholder="Enter your Thumbnail" {...register("Thumbnail", { required: "This field is required" })} />
                    {errors.Thumbnail && <div className={styles.error}>{errors.Thumbnail.message}</div>}
                </div>
                <div>
                    <h4 style={{ color: "red" }}>{user}</h4>
                    Select Video
                    <input className={styles.file_upload} type="file" accept="video/*" name="Video" placeholder="Enter your Video" {...register("Video", { required: "This field is required" })} />
                    {errors.Video && <div className={styles.error}>{errors.Video.message}

                    </div>}
                </div>
                <input className={styles.submit} type="Submit" />
                <input className={styles.submit} type="Reset" />
            </form>
        </div>
    )
}
