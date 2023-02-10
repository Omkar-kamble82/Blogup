import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Form () {
    return (
        <>
            <Navbar Postbutton = {true}/>
            <div className="flex justify-center items-center min-h-screen w-screen bg-[#354249]">
                <div className="rounded-xl bg-black/10 pb-6 backdrop-blur-xl drop-shadow-lg mb-6 minh-[380px] mt-20 sm:mt-24 md:mt-14 lg:mt-[100px] w-[500px] mx-4">
                    <h2 className="text-4xl py-2 font-extrabold text-[#57676f] text-center mt-4">Create a post</h2>
                    <div className="mt-10 px-4">
                        <label className="text-2xl font-bold text-[#57676f]">Title </label>
                        <input className="px-2 mt-2 font-bold text-[#8b99a0] rounded-md mb-4 lg:mb-6 py-1 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="My first blog...." />
                        <label className="text-2xl font-bold text-[#57676f]">Tags </label>
                        <input className="px-2 mt-2 font-bold text-[#8b99a0] rounded-md mb-4 lg:mb-6 py-1 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="Tech, AI, Health, Chat-GPT...." />
                        <label className="text-2xl font-bold text-[#57676f]">Blog </label>
                        <textarea className="px-2 mt-2 font-bold text-[#8b99a0] rounded-md py-1 w-full drop-shadow-lg bg-[#283035]" name="password" placeholder="This is a blog...." />
                        <button className="mt-6 rounded-lg px-4 py-1 font-bold text-[#ffffff] bg-[#c72931] text-lg hover:duration-1000 hover:opacity-80 hover:text-white">Post</button>
                    </div>
                </div>
            </div>
        </>
    );
}
