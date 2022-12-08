type LoginInputs = {
    username: string;
    password: string;
};

type RegisterInputs = {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
};

export type { LoginInputs, RegisterInputs };
