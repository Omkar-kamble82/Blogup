import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext"
import { Navbar } from "../components/Navbar";
import { Navigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [user,setUser] = useState(false);
    const context = useContext(UserContext)
    const[userblog,setUserblog] = useState<Blog>();

    const handledelete = async () => {

        const response = await fetch(import.meta.env.VITE_SERVER_WITHID + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${context.user?.token}`
        }
        })
        const json = await response.json()
        navigate("/home")
    }
    

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
                    if(context.user?.username === userblog?.user_name){
                        setUser(true)
                    }
                }
            })
        }
        fetchWorkouts()
    }, [])
    return (
        <div className="min-h-screen w-screen bg-[#354249]">
            <Navbar Postbutton = {false}/>
            <div className="px-4 mt-24 sm:px-10">
                <h1 className="font-bold leading-[45px] py-4 text-[#22282c] text-[35px] lg:text-[50px]">{userblog?.title}</h1>
                <div className="flex items-center p-1 mb-1 cursor-pointer"><p className="mr-3 text-lg font-bold text-[#22282c] ">Author: </p>{<p className="mr-2 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold">{userblog?.user_name}</p>}</div>
                <div className="flex items-center p-1 cursor-pointer"><p className="mr-3 text-lg font-bold text-[#22282c] ">Tags: </p>{userblog?.tags.map((t,i) => (<p className="mr-2 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold" key={i}>{t}</p>))}</div>
                {context.user?.username === userblog?.user_name ? 
                (<div className="p-1 mt-3">
                    <span className="mr-2 cursor-pointer text-sm sm:text-4sm bg-[#283035] text-[#57676f] px-3 py-1 rounded-lg font-bold">Edit</span>
                    <span className="mr-2 cursor-pointer text-sm sm:text-4sm bg-[#283035] text-[#57676f] px-3 py-1 rounded-lg font-bold" onClick={handledelete}>Delete</span>
                </div>) : 
                
                ""}
            </div>
            <div className="px-4 my-6 sm:px-10 flex flex-col md:flex-row justify-center items-center">
                <img className="flex-1 lg:max-w-[40vw] lg:mr-10 h-[80vh] lg:min-h-[80vh] object-fill rounded-xl" src={userblog?.url} alt="blog-img"/>
                <p className="flex-1 mt-6 lg:mt-0 font-bold text-[#22282c] text-md text-justify lg:text-lg">{userblog?.description}</p>
            </div>
        </div>
    );
}
