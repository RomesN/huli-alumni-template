import React, { useContext } from "react";
import { Props } from "../shared/types/others";
import { useLocalStorage } from "./useLocalStorage";

type TokenContextType = {
    accessToken: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

export const TokenContext = React.createContext({} as TokenContextType);

export function useTokenContext() {
    return useContext(TokenContext);
}

export const TokenContextProvider = ({ children }: Props) => {
    const [accessToken, setAccessToken] = useLocalStorage("", import.meta.env.VITE_JWT_LOCALSTORAGE_NAME);
    return <TokenContext.Provider value={{ accessToken, setAccessToken }}>{children}</TokenContext.Provider>;
};
