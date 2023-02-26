import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext"
import { Navbar } from "../components/Navbar";

interface Blog {
    _id:string
    title:string
    description:String
    tags:[String]
    url:string
    user_name:string
    createdAt:string
    updatedAt:Number
}

export function Blog () {
    let { id } = useParams();
    const context = useContext(UserContext)
    const[userblog,setUserblog] = useState<Blog>();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER,{
                headers: {'Authorization': `Bearer ${context.user?.token}`},
            })
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = JSON.parse(data)
            blog.map((blog:Blog) => {
                if(blog._id === id) {
                    setUserblog(blog)
                }
            })
        }
        fetchWorkouts()
    }, [])
    
    return (
        // <h1>Blog : {userblog?.title}</h1>
        <div className="min-h-screen w-screen bg-[#354249]">
            <Navbar Postbutton = {false}/>
            <div className="px-4 mt-24 sm:px-10">
                <h1 className="font-bold leading-[45px] py-4 text-[#22282c] text-[35px] lg:text-[50px]">{userblog?.title}</h1>
                {/* <span className="font-bold h-[10px] rounded-xl p-2 items-center bg-[#22282c] text-[#57676f]">{`Author: ${userblog?.user_name}`}</span> */}
                <div className="flex items-center p-1 mb-1 cursor-pointer"><p className="mr-3 text-lg font-bold text-[#22282c] ">Author: </p>{<p className="mr-2 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold">{userblog?.user_name}</p>}</div>
                <div className="flex items-center p-1 cursor-pointer"><p className="mr-3 text-lg font-bold text-[#22282c] ">Tags: </p>{userblog?.tags.map((t,i) => (<p className="mr-2 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold" key={i}>{t}</p>))}</div>
            </div>
            <div className="px-4 sm:px-10 flex justify-center items-center">
                <img className="flex-1/2 h-[60vh]" src={userblog?.url} alt="blog-img"/>
                <p className="flex-1">{userblog?.description}</p>
            </div>
        </div>
    );
}
