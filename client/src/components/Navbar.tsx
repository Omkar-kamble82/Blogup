import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext"
import { useState, useEffect,ChangeEvent } from "react";

interface Props {
    Postbutton : boolean
}

export function Navbar ({Postbutton}:Props) {
    const context = useContext(UserContext)
    const [menu, setMenu] = useState(true)
    const { logout } = useLogout()
    useEffect(() => {
        let handler = (e:MouseEvent | TouchEvent | Event) => {
            if(e.target) {
                setMenu(true)
            }
        };
        document.addEventListener("mousedown",handler);
        document.addEventListener("scroll",handler);
        return () => window.removeEventListener("scroll", handler);
    },[]);
    return (
        <div>
            <nav className="px-6 fixed w-screen z-10 flex justify-between items-center bg-[#354249] shadow-xl py-4">
                <Link to="/home"><img className="w-[120px] cursor-pointer md:w-[170px]" src="/logo.png" alt="blog-up-logo"/></Link>
                {Postbutton !== true && 
                <div className="">
                    <Link to="/form">
                        <button className="hidden sm:inline-block text-sm rounded-xl font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4 md:text-xl">What's on your mind?</button>
                    </Link>
                    <button onClick={()=>{setMenu(!menu)}} className="text-xl h-[45px] w-[45px] rounded-full font-bold bg-[#283035] text-[#57676f] py-2 px-2 ml-3 drop-shadow-md md:px-4 md:text-xl">{context.user?.username.charAt(0)}</button>
                </div>
                }
            </nav>
            <div className={`${menu ? `translate-x-[100%]` : `translate-x-0`} border-2 border-[#57676f] transition-all text-white bg-[#283035] z-[11] duration-1000 fixed w-[240px] h-[230px] top-0 right-0 lg:w-[300px]`}>
                <div onClick={()=>{setMenu(true)}} className={`h-[30px] w-[30px] bg-[#57676f] text-white p-2 rounded-[50%] absolute top-6 right-6 lg:h-[35px] lg:w-[35px]`}><img src="/close.svg" alt="close-icon"/></div>
                <div className={`absolute top-20 left-4`}>
                    <Link to="/form"><li><p className="p-2 font-bold rounded-xl cursor-pointer text-[#283035] bg-[#57676f]">What's on your mind?</p></li></Link>
                    <Link to={`/${context.user?.username}blogs`}><li><p className="p-2 font-bold text-[#57676f] text-xl">Account</p></li></Link>
                    <div className="bg-[#57676f] w-full h-[3px]"/>
                    <li onClick={logout}><p className="p-2 font-bold text-[#57676f] text-xl">Logout</p></li>
                </div>
            </div>
        </div>
    );
}
