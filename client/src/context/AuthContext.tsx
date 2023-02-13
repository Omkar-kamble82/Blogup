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
        const user_info = JSON.parse(localStorage.getItem('user')) || null
        if (user_info) {
            setUser(user_info)
            }
        }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    )
}