import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext"

interface Blog {
    _id:string
    title:string
    description:String
    tags:[String]
    url:string
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
            if (response.ok) {
            }
        }
        fetchWorkouts()
    }, [])
    
    return (
        <h1>Blog : {userblog?.title}</h1>
    );
}
