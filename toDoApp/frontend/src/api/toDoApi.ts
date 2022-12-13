import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryClient } from "react-query";
import { LoginResponseOk, RegisterResponseOk } from "../shared/types/responses";
import { ToDo } from "../shared/types/toDos";

// public
export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: { "Content-Type": "application/json" },
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

// private
export const apiPrivate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const request = async ({ ...options }) => {
    apiPrivate.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem("ToDoAppJwt") || "")}`;
    const onSuccess = (response: AxiosResponse) => response.data;
    return apiPrivate(options).then(onSuccess);
};

export const getToDos = async () => {
    return request({ url: "/to-do", method: "get" });
};

export const updateToDo = async (toDoParam: ToDo) => {
    return request({ url: `/to-do/${toDoParam.id}`, method: "patch", data: toDoParam });
};

export const deleteToDo = async (toDoParam: ToDo) => {
    return request({ url: `/to-do/${toDoParam.id}`, method: "delete" });
};

// query client
export const queryClient = new QueryClient();
