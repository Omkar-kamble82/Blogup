import { Link } from "react-router-dom";

export function Navbar () {
    return (
        <nav className="px-3 flex justify-between bg-[#354249] shadow-xl py-4">
            <img className="w-[120px] cursor-pointer md:w-[170px]" src="/logo.png" alt="blog-up-logo"/>
            <button className=" text-sm rounded-xl font-bold bg-[#283035] text-[#405159] py-1 px-2 drop-shadow-md md:px-4 md:text-2xl">What's on your mind?</button>
        </nav>
    );
}
