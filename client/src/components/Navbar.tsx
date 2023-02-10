import { Link } from "react-router-dom";

interface Props {
    Postbutton : boolean
}

export function Navbar ({Postbutton}:Props) {
    return (
        <nav className="px-3 fixed w-screen z-10 flex justify-between items-center bg-[#354249] shadow-xl py-4">
            <Link to="/home"><img className="w-[120px] cursor-pointer md:w-[170px]" src="/logo.png" alt="blog-up-logo"/></Link>
            {Postbutton !== true && <Link to="/form"><button className=" text-sm rounded-xl font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4 md:text-2xl">What's on your mind?</button></Link>}
        </nav>
    );
}
