import * as yup from "yup";

const registerSchema = yup.object().shape({
    username: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "min. length 8, 1 uppercase, 1 number, 1 special character"
        ),
    passwordRepeat: yup.string().oneOf([yup.ref("password"), null]),
});

export { registerSchema };
