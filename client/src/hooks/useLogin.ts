import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { UserContext } from '../context/AuthContext'
import { useContext } from "react";

export const useLogin = () => {
    const context = useContext(UserContext)
    const [error, setError] = useState<string | null>("")
    const [isLoading, setIsLoading] = useState<boolean | null>(null)

    const login = async (username:string, password:string) => {
        setIsLoading(true)
        setError(null)
        console.log(username,password)
        const response = await fetch(import.meta.env.VITE_USER_LOGIN, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        context.setUser({
            username: json.username,
            token: json.token
        })
        setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}