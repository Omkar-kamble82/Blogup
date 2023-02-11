import { Link } from "react-router-dom";

export function Register () {
    return (
        <>
            <Link to="/"><button className="h-10 z-10 fixed w-[100px] top-0 right-0 mt-3 mr-4 text-white font-bold rounded-lg bg-[#c72931]">Login</button></Link>
            <div className="h-screen relative overflow-hidden flex justify-center items-center w-screen bg-[url('/register-banner.jpg')] bg-cover bg-no-repeat">
                <div className="w-[400px] min-h-[350px] flex flex-col justify-center items-center rounded-3xl backdrop-blur-sm bg-white/40  mx-4 z-10 px-6 py-4 bg-white">
                    <h1 className="text text-[#c72931] font-bold p-4 text-6xl">Register</h1>
                    <div className="flex flex-col my-4 lg:my-10">
                        <label className="text-xl mb-1 font-bold text-white">Username </label>
                        <input className="px-2 rounded-md mb-4 lg:mb-6 py-1 w-full" type="text" name="username" placeholder="johndoe123..." />
                        <label className="text-xl mb-1 font-bold text-white">Password </label>
                        <input className="px-2 rounded-md py-1 w-full" type="password" name="password" placeholder="*************" />
                        <Link to="/home"><button className="mt-6 rounded-lg w-full py-1 font-bold text-[#ffffff] bg-[#c72931] text-lg hover:duration-1000 hover:opacity-80 hover:text-white">Register</button></Link>
                    </div>
                    <p className="text-[#303a40] text-center font-bold text-sm">*Please use your account to log in if you are registered.</p>            
                </div>
                <div className="h-screen w-screen bg-[#303a40]/50 absolute"/>
            </div>
        </>
    );
}
