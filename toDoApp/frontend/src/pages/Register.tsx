import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterInputs } from "../types/forms";
import styles from "../styles/loginRegister.module.css";

const Regsiter = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterInputs>();
    const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data);

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.header}>Repeat</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <input type="text" {...register("username", { required: true })} />
                    <label className={watch("username") ? styles.usedLabel : undefined}>Username</label>
                    {errors.username && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="email" {...register("email", { required: true })} />
                    <label className={watch("email") ? styles.usedLabel : undefined}>Email</label>
                    {errors.username && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("password", { required: true })} />
                    <label className={watch("password") ? styles.usedLabel : undefined}>Password</label>
                    {errors.password && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("passwordRepeat", { required: true })} />
                    <label className={watch("passwordRepeat") ? styles.usedLabel : undefined}>Password repeat</label>
                    {errors.password && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" value="Submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                    <Link to={"/login"} className={styles.nonMainButtonLink}>
                        <button>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Regsiter;
