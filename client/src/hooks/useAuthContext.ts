import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    return context
}