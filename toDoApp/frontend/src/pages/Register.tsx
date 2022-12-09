import { AxiosError, isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { RegisterInputs } from "../shared/types/forms";
import { registerSchema } from "../shared/utils/formSchema";
import { registerUser } from "../api/toDoApi";
import styles from "../styles/loginRegister.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

const Regsiter = () => {
    const [error, setError] = useState<AxiosError | null>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterInputs>({ resolver: yupResolver(registerSchema) });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        const response = await registerUser(data.password, data.passwordRepeat, data.username, data.passwordRepeat);
        console.log(response);
        if (isAxiosError(response)) {
            setError(response);
        } else {
            navigate("/login");
        }
    };

    const showError = (error: AxiosError) => {
        if (!error.response || !error.response.data) {
            console.log(error);
            return <p className={styles.errorMessage}>{error.message}</p>;
        } else {
            return <p className={styles.errorMessage}>{error.response.data as string}</p>;
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.header}>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <input type="text" {...register("username", { required: true })} />
                    <label className={watch("username") ? styles.usedLabel : undefined}>Username</label>
                    {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="email" {...register("email", { required: true })} />
                    <label className={watch("email") ? styles.usedLabel : undefined}>Email</label>
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("password", { required: true })} />
                    <label className={watch("password") ? styles.usedLabel : undefined}>Password</label>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" {...register("passwordRepeat", { required: true })} />
                    <label className={watch("passwordRepeat") ? styles.usedLabel : undefined}>Password repeat</label>
                    {errors.passwordRepeat && (
                        <span className={styles.error}>password and password repeate do not match.</span>
                    )}
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
                    <Link to={"/login"} className={styles.nonMainButtonLink}>
                        <button>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Regsiter;
