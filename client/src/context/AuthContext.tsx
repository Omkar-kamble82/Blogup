import React, {createContext } from 'react'

import { useState, useEffect } from 'react';

type AuthUser = {
    username: string
    token: string
}

type UserContextType = {
    user: AuthUser | null
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    useEffect(() => {
        const user = JSON.parse(localStorage?.getItem('user') || "")
        if (user) {
            setUser(user)
            }
        }, [])
    
    console.log('AuthContext state:', user)
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    )
}