import { UserContext } from '../context/AuthContext'
import { useContext } from "react";

export const useLogout = () => {
    const context = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem('user')
        context.setUser(null)
    }
    return { logout }
}