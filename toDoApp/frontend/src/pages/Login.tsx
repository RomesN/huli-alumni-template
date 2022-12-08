import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginInputs } from "../types/forms";
import styles from "../styles/loginRegister.module.css";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInputs>();
    const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.header}>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <input type="text" {...register("username", { required: true })} />
                    <label className={watch("username") ? styles.usedLabel : undefined}>Username</label>
                    {errors.username && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("password", { required: true })} />
                    <label className={watch("password") ? styles.usedLabel : undefined}>Password</label>
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
                    <Link to={"/register"} className={styles.nonMainButtonLink}>
                        <button>Register</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
