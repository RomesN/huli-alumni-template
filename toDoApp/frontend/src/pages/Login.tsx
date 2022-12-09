import { AxiosError, isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { LoginInputs } from "../shared/types/forms";
import { loginUser } from "../api/toDoApi";
import styles from "../styles/loginRegister.module.css";

const Login = () => {
    const [error, setError] = useState<AxiosError | null>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        const response = await loginUser(data.username, data.password);
        if (isAxiosError(response)) {
            setError(response);
        } else {
            navigate("/todo");
        }
    };

    const showError = (error: AxiosError) => {
        if (error.response?.status === 401) {
            return <p className={styles.errorMessage}>wrong credentials</p>;
        } else {
            return <p className={styles.errorMessage}>{error.message}</p>;
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.header}>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <input type="text" {...register("username", { required: true })} />
                    <label className={watch("username") ? styles.usedLabel : undefined}>Username</label>
                    {errors.username && <span className={styles.error}>the field is required</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("password", { required: true })} />
                    <label className={watch("password") ? styles.usedLabel : undefined}>Password</label>
                    {errors.password && <span className={styles.error}>the field is required</span>}
                    {error && showError(error)}
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
