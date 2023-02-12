import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState, ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, list,} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";;

export function Form () {

    const [title,setTitle] = useState<String>("")
    const [tags,setTags] = useState<String>("")
    const [blog,setBlog] = useState<String>("")
    const [imageurl,setImageurl] = useState<string>("")
    const [fileuploadtype, setFileUploadType] = useState<number>(0)

    const submit = () => {
        const Tags = tags.split(",")
        if(imageurl === "") {
            const number = Math.floor(Math.random() * 16);
            setImageurl(`/default/${number}.jpg`)
        }
        console.log({title,Tags,blog,imageurl})
    }

    const upload = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const imageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);
            uploadBytes(imageRef, e.target.files[0]).then((snapshot) => getDownloadURL(snapshot.ref)).then((url) =>{setImageurl(url)})
        }
    }

    return (
        <>
            <Navbar Postbutton = {true}/>
            <div className="flex justify-center items-center min-h-screen w-screen bg-[#354249]">
                <div className="rounded-xl bg-black/10 pb-6 backdrop-blur-xl drop-shadow-lg mb-6 minh-[380px] mt-20 sm:mt-24 md:mt-14 lg:mt-[100px] w-[500px] mx-4">
                    <h2 className="text-4xl py-2 font-extrabold text-[#57676f] text-center mt-4">Create a post</h2>
                    <div className="mt-10 px-4">
                        <label className="text-2xl font-bold text-[#57676f]">Title </label>
                        <input onChange={(e) => setTitle(e.target.value)} className="px-2 mt-2 text-[#8b99a0] rounded-md mb-4 lg:mb-6 py-1 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="My first blog...." />
                        <label className="text-2xl font-bold text-[#57676f]">Tags </label>
                        <input onChange={(e) => setTags(e.target.value)} className="px-2 mt-2 text-[#8b99a0] rounded-md mb-8 lg:mb-6 py-1 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="Tech, AI, Health, Chat-GPT...." />
                        <label className="text-2xl mt-10 font-bold text-[#57676f]">Upload a relevent image </label>
                        <div className="my-3">
                            <button onClick={() => {setFileUploadType(1)}} className="text-sm rounded-xl min-w-[100px] mr-2 font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">File</button>
                            <button onClick={() => {setFileUploadType(2)}} className="text-sm rounded-xl min-w-[100px] mx-2 font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">URL</button>
                        </div> 
                        <div className="mb-1">
                            {fileuploadtype === 1 && <input onChange={upload} className="bg-[#283035] p-4 mt-2 text-[#57676f] rounded-xl" type="file" name="filename" />}
                            {fileuploadtype === 2 && <input onChange={(e) => {setImageurl(e.target.value)}} className="px-2 mt-2 text-[#8b99a0] rounded-md lg:mb-6 py-1 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="https://www.google.com/" />}
                        </div>  
                        {imageurl !== "" ? <p className="text-[#05bd05] ml-2 mb-6">Uploaded</p> : <p className="text-[#57676f] ml-2 mb-6">*If you dont want to upload a random image will be assigned to your blog</p>}                    
                        <label className="text-2xl font-bold text-[#57676f]">Blog </label>
                        <textarea onChange={(e) => setBlog(e.target.value)} className="px-2 mt-2 text-[#8b99a0] rounded-md py-1 w-full drop-shadow-lg bg-[#283035]" name="password" placeholder="This is a blog...." />
                        <button onClick = {submit} className="mt-6 rounded-lg px-4 py-1 font-bold text-[#ffffff] bg-[#c72931] text-lg hover:duration-1000 hover:opacity-80 hover:text-white">Post</button>
                    </div>
                </div>
            </div>
        </>
    );
}
