import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { apiPrivate } from "../api/toDoApi";
import { useTokenContext } from "./useTokenContext";

const usePrivateApi = () => {
    const { accessToken, setAccessToken } = useTokenContext();

    useEffect(() => {
        const requestIntercept = apiPrivate.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (!config.headers) {
                    config.headers = {};
                }
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [accessToken]);

    return apiPrivate;
};

export default usePrivateApi;
