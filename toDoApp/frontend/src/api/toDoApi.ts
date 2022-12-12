import axios, { AxiosInstance } from "axios";
import { QueryClient, QueryFunctionContext, QueryKey } from "react-query";
import { LoginResponseOk, RegisterResponseOk } from "../shared/types/responses";
import { ToDo } from "../shared/types/toDos";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const apiPrivate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginUser = async (username: string, password: string) => {
    return await api
        .post<LoginResponseOk>("/public/login", { username, password })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);
};

export const registerUser = async (password: string, passwordRepeat: string, username: string, email: string) => {
    return await api
        .post<RegisterResponseOk>("/public/register", { password, passwordRepeat, username, email })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);
};

export const queryClient = new QueryClient();

export const getToDos = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
    const [, params] = queryKey as [string, [AxiosInstance]];
    return await params[0].get<ToDo[]>("/to-do");
};
