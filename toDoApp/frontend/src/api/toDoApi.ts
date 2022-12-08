import axios from "axios";
import { LoginResponse } from "../types/responses";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const getServices = async () => {
    const response = await api.get<LoginResponse>("/api/services");
    return response.data;
};
