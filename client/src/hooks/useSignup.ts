import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState<string | null>("")
    const [isLoading, setIsLoading] = useState<boolean | null>(null)
    // const { dispatch } = useAuthContext()

    const signup = async (username:string, password:string) => {
        setIsLoading(true)
        setError(null)
        console.log(username,password)
        const response = await fetch(import.meta.env.VITE_USER_SIGNUP, {
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
            // dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
}