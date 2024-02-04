// useAuth.ts
import { useState } from "react"

export default function useAuth() {
    const getAccessToken = () => {
        const tokenString: string | null = localStorage.getItem("accessToken")
        return tokenString
    }

    const [accessToken, setAccessToken] = useState(getAccessToken())

    const saveAccessToken = (userToken: { accessToken: string }) => {
        localStorage.setItem("accessToken", JSON.stringify(userToken))
        setAccessToken(userToken.accessToken)
    }

    const clearAccessToken = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
    };

    return {
        setAccessToken: saveAccessToken,
        clearAccessToken,
        accessToken,
        getAccessToken
    }
}