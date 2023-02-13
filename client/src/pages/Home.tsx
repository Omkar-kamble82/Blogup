import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";

interface blog {
    _id:Number
    title:String
    description:String
    tags:[String]
    url:string
    createdAt:Number
    updatedAt:Number
}
interface tags {
    tags:[string]
}

export function Home () {
    const [items, setItems] = useState<blog[]>()
    const [tags, setTags] = useState<tags[]>()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:3000/api/blogs')
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = JSON.parse(data)
            setItems(blog)
            if (response.ok) {
            }
        }
        fetchWorkouts()
    }, [])
    return (
        <div className="h-screen w-screen bg-[#354249]">
            <Navbar Postbutton = {false}/>
            <div className="mt-20 md:mt-32">
                {items?.map((item,i) => {
                    return(
                    <div key={i}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{item.tags}</p>
                        <img src={item.url} alt="" />
                    </div>
                )}
                )}
            </div>
        </div>
    );
}
