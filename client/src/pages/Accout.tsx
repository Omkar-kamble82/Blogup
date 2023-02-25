import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext"
import { Navbar } from "../components/Navbar";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface blog {
    _id:Number
    title:string
    description:String
    tags:[String]
    url:string
    createdAt:string
    updatedAt:Number
}

export function Accout() {

    const context = useContext(UserContext)
    const [Blog, setBlog] = useState<blog[]>()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER_ID,{
                headers: {'Authorization': `Bearer ${context.user?.token}`},
            })
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = JSON.parse(data)
            setBlog(blog)
            if (response.ok) {
            }
        }
        fetchWorkouts()
    }, [])
    return (
        <div className="min-h-screen w-screen bg-[#354249]">
            <Navbar Postbutton = {false}/>
            <div className="mt-20 md:mt-32 flex justify-center items-center flex-col">
                {Blog?.map((item:blog,i) => {
                    return(
                    <div key={i} className="flex bg-[#283035] mx-4 rounded-xl my-4 max-w-[950px] p-4 flex-col-reverse sm:flex-row md:max-w-[850px] md:min-w-[845px] justify-between items-center">
                        <div className="flex flex-col justify-between">
                            <p className="text-xl sm:text-4xl py-2 text-[#57676f] font-bold">{item.title}</p>
                            <p className="text-sm sm:text-lg text-[#636363]">{item.description}</p>
                            <div className="flex mt-2 cursor-pointer">{item.tags.map((t,i) => (<p className="mr-4 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold" key={i}>{t}</p>))}</div>
                            <p className="text-[#57676f] mt-5 font-bold text-[12px]">{formatDistanceToNow(new Date((item.createdAt)), { addSuffix: true })}</p>
                        </div>
                        <img className="object-contain sm:max-w-[250px]" src={item.url} alt={item.title} />
                    </div>
                    )}
                )}
            </div>
        </div>
    )
}