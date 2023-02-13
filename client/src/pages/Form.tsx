import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState, ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, list,} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { imagedata } from "../constant/data";

export function Form () {
    const navigate = useNavigate();
    const [title,setTitle] = useState<String>("")
    const [Tags,setTags] = useState<String>("")
    const [description,setDescription] = useState<String>("")
    const [url,setImageurl] = useState<string>("")
    const [fileuploadtype, setFileUploadType] = useState<number>(0)
    const [error,setError] = useState<String>("")
    const [emptyFields,setEmptyFields] = useState<string[]>([])

    const submit = async () => {
        const tags = Tags.split(",")
        const blog = {title, tags, url,description}
        const response = await fetch(import.meta.env.VITE_SERVER, {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError("")
            setTitle('')
            setTags('')
            setDescription('')
            setImageurl('')
            navigate("/home")
        }
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
            <div className="flex justify-center relative items-center min-h-screen w-screen bg-[#354249]">
                {fileuploadtype === 3 && 
                    <div onClick={() => {setFileUploadType(0)}} className="inset-0 z-10 bg-black/80 absolute">
                        <img onClick={() => {setFileUploadType(0)}} className="bg-white absolute right-0 mx-10 my-6 rounded-full p-2 h-[40px]" src="/close.svg" alt="close-icon" />
                        <div className="my-24 mx-10 flex justify-evenly flex-wrap">
                            {imagedata.map((image) => {
                            return(
                                    <img onClick={() => {setImageurl(image.url);setFileUploadType(0)}} key={image.id} className="min-w-[200px] max-w-[270px] cursor-pointer m-2 scale-100 object-contain" src={image.url} alt="image"/>
                                )
                            })}
                        </div>
                    </div>
                }
                <div className="rounded-xl bg-black/10 pb-6 backdrop-blur-xl drop-shadow-lg mb-6 minh-[380px] mt-20 sm:mt-24 md:mt-14 lg:mt-[100px] w-[500px] mx-4">
                    <h2 className="text-4xl py-2 font-extrabold text-[#57676f] text-center mt-4">Create a post</h2>
                    <div className="mt-10 px-4">
                        <label className="text-2xl font-bold text-[#57676f]">Title </label>
                        <input onChange={(e) => setTitle(e.target.value)} className="px-2 mt-2 text-sm text-[#57676f] rounded-md mb-4 lg:mb-6 py-2 w-full placeholder-[#57676f] drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="My first blog...." />
                        <label className="text-2xl font-bold text-[#57676f]">Tags </label>
                        <input onChange={(e) => setTags(e.target.value)} className="px-2 mt-2 mb-2 text-sm text-[#57676f] rounded-md py-2 w-full placeholder-[#57676f] drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="Tech, AI, Health, Chat-GPT...." />
                        <p className="mb-8 text-[#57676f] text-sm font-bold lg:mb-6">*seprate tags with a comma</p>
                        <label className="text-2xl mt-10 font-bold text-[#57676f]">Upload a relevent image </label>
                        <div className="">
                            <button onClick={() => {setFileUploadType(1)}} className="text-sm rounded-xl min-w-[100px] mr-2 font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">File</button>
                            <button onClick={() => {setFileUploadType(2)}} className="text-sm rounded-xl min-w-[100px] mx-2 font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">URL</button>
                            <button onClick={() => {setFileUploadType(3)}} className="text-sm rounded-xl min-w-[100px] my-3 font-bold bg-[#283035] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4 sm:m-2">Choose from gallary</button>
                        </div> 
                        <div className="mb-4">
                            {fileuploadtype === 1 && <input onChange={upload} className="bg-[#283035] p-4 mt-2 text-[#57676f] rounded-xl" type="file" name="filename" />}
                            {fileuploadtype === 2 && <input onChange={(e) => {setImageurl(e.target.value)}} className="px-2 mt-2 text-[#8b99a0] placeholder-[#57676f] rounded-md lg:mb-6 py-2 w-full drop-shadow-lg bg-[#283035]" type="text" name="title" placeholder="https://www.google.com/" />}
                        </div>  
                        {url !== "" ? <p className="text-[#05bd05] ml-2 mb-6">Image Uploaded</p> :<p className="text-[#c72931] font-semibold ml-2 mb-6">Image not uploaded</p>}                    
                        <label className="text-2xl font-bold text-[#57676f]">Blog </label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="px-2 placeholder-[#57676f] text-sm mt-2 text-[#57676f] rounded-md py-1 w-full drop-shadow-lg bg-[#283035]" name="password" placeholder="This is a blog...." />
                        <button type="submit" onClick = {submit} className="mt-6 rounded-lg px-4 py-1 font-bold text-[#ffffff] bg-[#c72931] text-lg hover:duration-1000 hover:opacity-80 hover:text-white">Post</button>
                        {error && <div className="mt-2 text-[#c72931]">{error}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}
